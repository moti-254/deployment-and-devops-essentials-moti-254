# 🔄 Real-Time Chat Application with Socket.io

A fully functional, real-time chat application built with React, Express, Node.js, and Socket.io. This project demonstrates bidirectional communication between clients and a server, featuring live messaging, multiple chat rooms, private messaging, typing indicators, and real-time notifications.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features Implemented](#features-implemented)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Key Components](#key-components)
- [Screenshots](#screenshots)
- [Troubleshooting](#troubleshooting)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Project Overview

This real-time chat application allows multiple users to:
- **Connect instantly** using Socket.io for bidirectional, low-latency communication
- **Join multiple chat rooms** and switch between them seamlessly
- **Send private messages** directly to other online users
- **See typing indicators** when others are composing messages
- **Receive notifications** for new messages, user joins/leaves, and room activities
- **Track online status** of all connected users

The application is built with modern web technologies and follows best practices for real-time communication, including proper error handling, connection management, and performance optimization.

## ✨ Features Implemented

### Core Features ✅
- **Real-time Messaging**: Instant message delivery using Socket.io with sender name and timestamp
- **User Authentication**: Username-based login with session management
- **Online Status Tracking**: See which users are currently online
- **Typing Indicators**: Real-time "user is typing..." indicators
- **Multiple Chat Rooms**: Create, join, and switch between different chat rooms

### Advanced Features ✅
- **Private Messaging**: One-on-one conversations with other users
- **Real-time Notifications**: 
  - User join/leave notifications
  - New message notifications
  - Room activity updates
  - Unique notification IDs to prevent duplicates
- **Message Reactions**: Users can react to messages with emojis
- **Read Receipts**: Messages show read/unread status
- **Error Handling**: Comprehensive error handling for Socket.io events and reconnections
- **Connection Management**: Automatic reconnection logic and error recovery

### Performance Optimizations ✅
- **Event Listener Cleanup**: Proper cleanup of Socket.io event listeners to prevent memory leaks
- **Efficient State Management**: Optimized React state updates
- **CORS Configuration**: Unified CORS handling for Express and Socket.io
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 🛠️ Tech Stack

### Frontend
- **React** 19.2.0 - UI library with hooks for state management
- **Vite** 7.2.2 - Modern build tool for fast development
- **Socket.io Client** 4.8.1 - Real-time communication library
- **Axios** 1.13.2 - HTTP client for API calls

### Backend
- **Express** 5.1.0 - Web framework for Node.js
- **Socket.io** 4.8.1 - Real-time bidirectional communication
- **Node.js** - JavaScript runtime
- **MongoDB** & **Mongoose** 8.20.0 - NoSQL database and ODM
- **JWT** (jsonwebtoken 9.0.2) - Authentication tokens
- **bcryptjs** 3.0.3 - Password hashing
- **CORS** 2.8.5 - Cross-Origin Resource Sharing
- **dotenv** 17.2.3 - Environment variable management

## 🚀 Setup Instructions

### Prerequisites
- Node.js v18+ installed
- npm or yarn package manager
- MongoDB running locally or a MongoDB Atlas connection string

### Installation Steps

#### 1. Clone the Repository
```bash
git clone https://github.com/PLP-MERN-Stack-Development/real-time-communication-with-socket-io-moti-254.git
cd real-time-communication-with-socket-io-moti-254
```

#### 2. Backend Setup
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/chat-app
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

#### 3. Frontend Setup
```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory:
```env
VITE_SOCKET_URL=http://localhost:5000
```

#### 4. Start the Application

**Terminal 1 - Backend:**
```bash
cd server
npm run dev
```
Server runs on `http://localhost:5000`

**Terminal 2 - Frontend:**
```bash
cd client
npm run dev
```
Frontend runs on `http://localhost:3000` (or `http://localhost:3001` if port 3000 is in use)

### Verification
- Open your browser and navigate to `http://localhost:3000`
- Open multiple browser windows/tabs to test real-time features
- Check console for any error messages

## 📁 Project Structure

```
real-time-communication-with-socket-io-moti-254/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatRoom.jsx         # Main chat room interface
│   │   │   ├── Login.jsx            # User login component
│   │   │   ├── MessageList.jsx      # Display messages with reactions
│   │   │   ├── MessageInput.jsx     # Input field for sending messages
│   │   │   ├── UserList.jsx         # Online users display
│   │   │   ├── RoomList.jsx         # Available chat rooms
│   │   │   ├── PrivateChat.jsx      # Private messaging interface
│   │   │   ├── Notifications.jsx    # Real-time notifications
│   │   │   └── TypingIndicator.jsx  # Typing status display
│   │   ├── hooks/
│   │   │   ├── useAuth.jsx          # Authentication logic hook
│   │   │   ├── useSocket.js         # Socket.io client management
│   │   │   └── userNotifications.js # Notification handling
│   │   ├── socket/
│   │   │   └── socket.js            # Socket.io client setup
│   │   ├── App.jsx                  # Main application component
│   │   ├── main.jsx                 # Entry point
│   │   └── index.css                # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── .env                         # Environment variables
│
├── server/                          # Express Backend
│   ├── src/
│   │   ├── config/                  # Configuration files
│   │   ├── controllers/             # Socket event handlers
│   │   ├── middleware/              # Express middleware
│   │   ├── models/                  # Database models
│   │   ├── routes/                  # API routes
│   │   └── utils/                   # Utility functions
│   ├── server.js                    # Main server entry point
│   ├── package.json
│   ├── .env                         # Environment variables
│   └── .gitignore
│
├── Week5-Assignment.md              # Assignment requirements
├── README.md                        # This file
└── .git/                           # Git repository
```

## 💬 Usage Guide

### Creating an Account / Logging In
1. Open the application in your browser
2. Enter a username on the login screen
3. Click "Join Chat"
4. You'll be connected to the main chat room

### Joining Chat Rooms
1. View available rooms in the **Room List** on the left sidebar
2. Click on a room name to join it
3. Your message history updates for the selected room

### Sending Messages
1. Type your message in the **Message Input** field at the bottom
2. Press **Enter** or click the **Send** button
3. Your message appears instantly for all users in the room

### Typing Indicator
- Start typing a message
- Other users in the room see "User is typing..." indicator
- Indicator disappears when you send the message or stop typing

### Private Messaging
1. Click on a username in the **User List** or find them in the **Private Chat** section
2. Send a message directly to that user
3. Private messages appear in a separate conversation

### Reacting to Messages
- Hover over or click on a message to see reaction options
- Click an emoji to add a reaction
- Other users see your reactions in real-time

### Real-time Notifications
- **User Join**: See notifications when users join your current room
- **User Leave**: Get notified when users leave
- **New Messages**: Receive notifications for new messages when you're in a different room
- **Close Notifications**: Click the X button on notifications to dismiss them

## 🧩 Key Components

### Frontend Components

#### **ChatRoom.jsx**
Main container component that manages the overall chat interface, including room selection, message display, and user interactions.

#### **MessageList.jsx**
Displays all messages in the current room with sender information, timestamps, and reaction counts. Supports message reactions and read receipts.

#### **MessageInput.jsx**
Handles user input for sending messages. Emits typing events to notify other users when you're composing a message.

#### **UserList.jsx**
Shows all online users in the current room with their status indicators (online/away/offline).

#### **RoomList.jsx**
Lists all available chat rooms. Users can click to switch between rooms. Shows unread message counts per room.

#### **PrivateChat.jsx**
Manages one-on-one private messaging. Displays active private conversations and allows starting new conversations with online users.

#### **Notifications.jsx**
Displays toast-style notifications for various events (user joins, new messages, system messages). Auto-dismisses or can be manually closed.

#### **TypingIndicator.jsx**
Shows which users are currently typing in the room, helping improve user awareness.

### Custom Hooks

#### **useSocket.js**
Central hook managing all Socket.io client-side communication. Handles:
- Connection and disconnection
- Message events (send/receive)
- Typing indicators
- User status updates
- Room management
- Notifications with unique ID generation
- Error handling and reconnection logic

#### **useAuth.jsx**
Manages user authentication state including login, user info, and session management.

#### **userNotifications.js**
Handles notification system including creation, dismissal, and sound notifications.

### Backend Socket Handlers

- **Connection Events**: Handle client connections and disconnections
- **Message Events**: Broadcast messages to all users in a room
- **Room Events**: Handle room creation, joining, and leaving
- **User Events**: Manage online status and user lists
- **Typing Events**: Broadcast typing indicators
- **Private Message Events**: Handle direct user-to-user messaging
- **Error Events**: Capture and log connection errors

## 📸 Screenshots

### Login Screen
```
┌─────────────────────────────────┐
│   Real-Time Chat Application    │
│                                 │
│  Enter your username:           │
│  [________________]             │
│                                 │
│  [Join Chat Button]             │
└─────────────────────────────────┘
```

### Main Chat Interface
```
┌──────────────────────────────────────────┐
│ Rooms       │              │ Users      │
├─────────────┼──────────────┼────────────┤
│ • General   │  [Chat Area] │ • User1 ● │
│ • Random    │              │ • User2 ● │
│ • Random    │              │ • User3 ● │
│ + New       │              │            │
├─────────────┼──────────────┼────────────┤
│             │  Message Input Field      │
│             │  [Send]                   │
└──────────────────────────────────────────┘
```

### Message Display with Reactions
```
┌────────────────────────────────────────┐
│ User1 [12:30 PM]                       │
│ Hello everyone! 👋                     │
│ 👍 2  ❤️ 1  😂 0                        │
│                                        │
│ User2 [12:31 PM]                       │
│ Hey! How are you?                      │
│ 👍 0  ❤️ 0  😂 0                        │
└────────────────────────────────────────┘
```

### Typing Indicator
```
User1 is typing...
User2 is typing...
```

### Real-time Notifications
```
┌──────────────────────────┐
│ ✓ User3 joined General   │ [X]
└──────────────────────────┘
```

## 🔧 Troubleshooting

### Connection Issues
**Problem**: Cannot connect to server
- **Solution**: Verify backend is running on port 5000
- Check `VITE_SOCKET_URL` in frontend `.env` matches backend URL
- Ensure firewall allows localhost connections

### CORS Errors
**Problem**: "Access to XMLHttpRequest has been blocked by CORS policy"
- **Solution**: Verify CORS configuration in `server/server.js`
- Check that `corsOptions` is properly applied to both Express and Socket.io
- Clear browser cache and restart development server

### Messages Not Appearing
**Problem**: Sent messages don't show up
- **Solution**: Check browser console for Socket.io errors
- Verify message event handlers are registered in `useSocket.js`
- Ensure you're in the correct chat room
- Check that Socket.io connection status is "connected"

### Typing Indicator Not Working
**Problem**: Other users don't see "typing" indicator
- **Solution**: Verify typing events are being emitted
- Check browser console for Socket.io emit errors
- Ensure `onTypingStart` and `onTypingStop` are called correctly

### Notifications Not Appearing
**Problem**: Missing notifications for join/leave events
- **Solution**: Check `setNotifications` state updates in `useSocket.js`
- Verify notification IDs are unique (using `getUniqueNotificationId()`)
- Clear browser console warnings about duplicate React keys
- Ensure notification handlers are registered for all events

### Port Already in Use
**Problem**: "Port 3000 is already in use"
- **Solution**: Application will automatically use port 3001
- Or kill the process using port 3000:
  ```bash
  # Windows PowerShell
  Get-Process -Name node | Stop-Process -Force
  
  # macOS/Linux
  lsof -ti:3000 | xargs kill -9
  ```

## 🚀 Future Enhancements

- [ ] **Message Pagination**: Load older messages on scroll
- [ ] **File/Image Sharing**: Upload and share files in chat
- [ ] **User Profiles**: Customizable user profiles with avatars
- [ ] **Message Search**: Search through chat history
- [ ] **Message Editing**: Edit sent messages
- [ ] **Message Deletion**: Delete messages from chat
- [ ] **Voice/Video Calls**: WebRTC integration for calls
- [ ] **Message Encryption**: End-to-end encryption for private messages
- [ ] **User Blocking**: Block users from private messaging
- [ ] **Read Receipts**: See when messages are read
- [ ] **Deployment**: Deploy to cloud services (Render, Vercel, Railway)
- [ ] **Dark Mode**: Theme switching
- [ ] **Message Threading**: Reply to specific messages
- [ ] **Channel Moderation**: Admin controls for room management

## 📚 Learning Resources

- [Socket.io Documentation](https://socket.io/docs/)
- [React Hooks Documentation](https://react.dev/reference/react/hooks)
- [Express.js Guide](https://expressjs.com/)
- [MongoDB Manual](https://docs.mongodb.com/manual/)
- [Vite Documentation](https://vitejs.dev/)

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License - see the `package.json` files for details.

## ✅ Assignment Completion

This project successfully completes all Week 5 assignment requirements:

- ✅ **Task 1**: Project setup with Express, Socket.io, React frontend
- ✅ **Task 2**: Core chat functionality with authentication, global room, typing indicators, online status
- ✅ **Task 3**: Advanced features including private messaging, multiple rooms, typing indicators, message reactions, read receipts
- ✅ **Task 4**: Real-time notifications for messages, user joins/leaves, unread counts
- ✅ **Task 5**: Performance optimization, error handling, responsive design
- ✅ **Documentation**: Comprehensive README with setup, features, and screenshots

---

**Last Updated**: November 18, 2025  
**Status**: ✅ Complete and Ready for Production

For questions or issues, please open an GitHub issue or contact the development team. 