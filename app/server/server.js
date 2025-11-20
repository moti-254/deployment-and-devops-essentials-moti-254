// server.js - Main server file for Socket.io chat application

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const server = http.createServer(app);

// CORS configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true,
};

const io = new Server(server, {
  cors: corsOptions,
});

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Production middleware - logging and security
if (process.env.NODE_ENV === 'production') {
  // Add morgan for logging in production
  const morgan = require('morgan');
  app.use(morgan('combined'));
}

// Add helmet for secure headers in all environments
try {
  const helmet = require('helmet');
  app.use(helmet());
} catch (e) {
  console.warn('Helmet not installed. Install with: npm install helmet');
}

// Enhanced data storage
const users = {};
const messages = [];
const typingUsers = {};
const rooms = ['general', 'random', 'tech', 'gaming'];
const privateMessages = new Map();

// Enhanced Socket.io connection handler
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  // Handle user joining with enhanced data
  socket.on('user_join', (userData) => {
    const { username, userId } = userData;
    users[socket.id] = { 
      username, 
      id: socket.id, 
      userId,
      room: 'general',
      isOnline: true,
      lastSeen: new Date()
    };
    
    socket.join('general');
    
    io.emit('user_list', Object.values(users));
    io.emit('user_joined', { username, id: socket.id, userId });
    
    // Send room list and message history
    socket.emit('room_list', rooms);
    socket.emit('message_history', messages.slice(-100));
    
    console.log(`${username} joined the chat`);
  });

  // Enhanced message handling with rooms
  socket.on('send_message', (messageData) => {
    const user = users[socket.id];
    if (!user) return;

    const message = {
      ...messageData,
      id: Date.now().toString(),
      sender: user.username,
      senderId: socket.id,
      senderUserId: user.userId,
      timestamp: new Date().toISOString(),
      room: messageData.room || 'general'
    };
    
    messages.push(message);
    
    // Limit stored messages to prevent memory issues
    if (messages.length > 1000) {
      messages.shift();
    }
    
    if (message.room) {
      io.to(message.room).emit('receive_message', message);
    } else {
      io.emit('receive_message', message);
    }

    // Emit notification for new message
    socket.broadcast.emit('new_message_notification', {
      sender: user.username,
      room: message.room,
      preview: message.message.substring(0, 50)
    });
  });

  // Enhanced typing indicator with rooms
  socket.on('typing', (typingData) => {
    const user = users[socket.id];
    if (!user) return;

    const { isTyping, room = 'general' } = typingData;
    
    if (isTyping) {
      typingUsers[socket.id] = {
        username: user.username,
        room: room,
        timestamp: Date.now()
      };
    } else {
      delete typingUsers[socket.id];
    }
    
    // Only send to the specific room
    io.to(room).emit('typing_users', 
      Object.values(typingUsers).filter(t => t.room === room).map(t => t.username)
    );
  });

  // Enhanced private messaging
  socket.on('private_message', ({ toUserId, message }) => {
    const fromUser = users[socket.id];
    if (!fromUser) return;

    const privateMessage = {
      id: Date.now().toString(),
      from: fromUser.username,
      fromUserId: fromUser.userId,
      toUserId: toUserId,
      message: message,
      timestamp: new Date().toISOString(),
      isPrivate: true
    };

    // Store private message
    const key = [fromUser.userId, toUserId].sort().join('_');
    if (!privateMessages.has(key)) {
      privateMessages.set(key, []);
    }
    privateMessages.get(key).push(privateMessage);

    // Find recipient socket
    const recipientSocket = Object.entries(users).find(([_, user]) => user.userId === toUserId);
    
    if (recipientSocket) {
      io.to(recipientSocket[0]).emit('private_message', privateMessage);
    }
    
    // Also send back to sender
    socket.emit('private_message', privateMessage);
  });

  // Room management
  socket.on('join_room', (room) => {
    const user = users[socket.id];
    if (!user) return;

    // Leave previous room
    if (user.room) {
      socket.leave(user.room);
    }

    // Join new room
    socket.join(room);
    user.room = room;

    // Notify room
    socket.to(room).emit('user_joined_room', {
      username: user.username,
      room: room
    });

    socket.emit('room_joined', room);
  });

  // Message reactions
  socket.on('message_reaction', ({ messageId, reaction }) => {
    const user = users[socket.id];
    if (!user) return;

    const message = messages.find(m => m.id === messageId);
    if (message) {
      if (!message.reactions) {
        message.reactions = {};
      }
      message.reactions[user.userId] = reaction;
      
      io.emit('message_updated', message);
    }
  });

  // Handle disconnection with enhanced cleanup
  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      user.isOnline = false;
      user.lastSeen = new Date();
      
      io.emit('user_left', { 
        username: user.username, 
        id: socket.id,
        userId: user.userId
      });
      
      console.log(`${user.username} left the chat`);
    }
    
    delete users[socket.id];
    delete typingUsers[socket.id];
    
    io.emit('user_list', Object.values(users));
    io.emit('typing_users', Object.values(typingUsers));
  });
});

// Enhanced health check for in-memory storage
app.get('/api/health', (req, res) => {
  const healthData = {
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: {
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024 * 100) / 100 + ' MB',
      heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024 * 100) / 100 + ' MB',
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100 + ' MB',
    },
    storage: {
      type: 'in-memory',
      users: Object.keys(users).length,
      messages: messages.length,
      rooms: rooms.length,
      privateMessages: privateMessages.size
    },
    environment: process.env.NODE_ENV || 'development'
  };
  
  res.json(healthData);
});

// Enhanced metrics endpoint
app.get('/api/metrics', (req, res) => {
  const metrics = {
    connections: {
      total: Object.keys(users).length,
      online: Object.values(users).filter(u => u.isOnline).length
    },
    messages: {
      total: messages.length,
      lastHour: messages.filter(m => {
        const messageTime = new Date(m.timestamp);
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
        return messageTime > oneHourAgo;
      }).length
    },
    rooms: {
      total: rooms.length,
      active: Array.from(new Set(messages.slice(-100).map(m => m.room))).length
    },
    performance: {
      uptime: process.uptime(),
      memory: process.memoryUsage()
    }
  };
  
  res.json(metrics);
});

// Enhanced API routes
app.get('/api/messages', (req, res) => {
  const { room, limit = 100, offset = 0 } = req.query;
  
  let filteredMessages = messages;
  if (room) {
    filteredMessages = messages.filter(m => m.room === room);
  }
  
  const paginatedMessages = filteredMessages.slice(-limit - offset, -offset || undefined);
  res.json(paginatedMessages.reverse());
});

app.get('/api/users', (req, res) => {
  res.json(Object.values(users));
});

app.get('/api/rooms', (req, res) => {
  res.json(rooms);
});

app.get('/api/private-messages/:userId1/:userId2', (req, res) => {
  const { userId1, userId2 } = req.params;
  const key = [userId1, userId2].sort().join('_');
  const messages = privateMessages.get(key) || [];
  res.json(messages);
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Socket.io Chat Server is running',
    version: '1.0.0',
    endpoints: ['/api/messages', '/api/users', '/api/rooms']
  });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  
  const statusCode = err.statusCode || 500;
  const message = process.env.NODE_ENV === 'production' 
    ? 'Internal Server Error' 
    : err.message;
  
  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Socket.io error handler
io.on('error', (error) => {
  console.error('Socket.io error:', error);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`Available rooms: ${rooms.join(', ')}`);
});

module.exports = { app, server, io };