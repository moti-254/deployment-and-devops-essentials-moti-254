// socket.js - Enhanced Socket.io client setup

import { io } from 'socket.io-client';
import { useEffect, useState, useCallback } from 'react';

// Socket.io connection URL
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

// Create socket instance
export const socket = io(SOCKET_URL, {
  autoConnect: false,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

// Custom hook for using socket.io with enhanced features
export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('general');
  const [notifications, setNotifications] = useState([]);
  const [notificationCounter] = useState({ count: 0 });

  // Connect to socket server with user data
  const connect = (userData) => {
    socket.connect();
    if (userData) {
      socket.emit('user_join', userData);
    }
  };

  // Disconnect from socket server
  const disconnect = () => {
    socket.disconnect();
  };

  // Helper to generate unique IDs for notifications
  const getUniqueNotificationId = () => {
    notificationCounter.count += 1;
    return `${Date.now()}_${notificationCounter.count}`;
  };

  // Send a message with room support
  const sendMessage = (message, room = currentRoom) => {
    socket.emit('send_message', { 
      message,
      room 
    });
  };

  // Send a private message
  const sendPrivateMessage = (toUserId, message) => {
    socket.emit('private_message', { toUserId, message });
  };

  // Set typing status with room support
  const setTyping = (isTyping, room = currentRoom) => {
    socket.emit('typing', { isTyping, room });
  };

  // Join a room
  const joinRoom = (room) => {
    socket.emit('join_room', room);
    setCurrentRoom(room);
  };

  // Add reaction to message
  const addReaction = (messageId, reaction) => {
    socket.emit('message_reaction', { messageId, reaction });
  };

  // Clear notifications
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Socket event listeners with enhanced features
  useEffect(() => {
    // Connection events
    const onConnect = () => {
      setIsConnected(true);
      console.log('Connected to server');
    };

    const onDisconnect = () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    };

    const onConnectError = (error) => {
      console.error('Connection error:', error);
    };

    const onError = (error) => {
      console.error('Socket error:', error);
    };

    // Message events
    const onReceiveMessage = (message) => {
      setLastMessage(message);
      setMessages((prev) => [...prev, message]);
    };

    const onPrivateMessage = (message) => {
      setLastMessage(message);
      setMessages((prev) => [...prev, message]);
    };

    const onMessageHistory = (history) => {
      setMessages(history);
    };

    const onMessageUpdated = (message) => {
      setMessages(prev => prev.map(m => 
        m.id === message.id ? message : m
      ));
    };

    // User events
    const onUserList = (userList) => {
      setUsers(userList);
    };

    const onUserJoined = (user) => {
      setNotifications(prev => [...prev, {
        id: getUniqueNotificationId(),
        type: 'user_joined',
        message: `${user.username} joined the chat`,
        timestamp: new Date()
      }]);
    };

    const onUserLeft = (user) => {
      setNotifications(prev => [...prev, {
        id: getUniqueNotificationId(),
        type: 'user_left',
        message: `${user.username} left the chat`,
        timestamp: new Date()
      }]);
    };

    const onUserJoinedRoom = (data) => {
      if (data.room === currentRoom) {
        setNotifications(prev => [...prev, {
          id: getUniqueNotificationId(),
          type: 'user_joined_room',
          message: `${data.username} joined the room`,
          timestamp: new Date()
        }]);
      }
    };

    // Room events
    const onRoomList = (roomList) => {
      setRooms(roomList);
    };

    const onRoomJoined = (room) => {
      setCurrentRoom(room);
      setMessages([]); // Clear messages when switching rooms
    };

    // Typing events
    const onTypingUsers = (users) => {
      setTypingUsers(users);
    };

    // Notification events
    const onNewMessageNotification = (notification) => {
      if (notification.room !== currentRoom) {
        setNotifications(prev => [...prev, {
          id: getUniqueNotificationId(),
          type: 'new_message',
          message: `New message from ${notification.sender} in ${notification.room}`,
          preview: notification.preview,
          timestamp: new Date()
        }]);
      }
    };

    // Register event listeners
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('connect_error', onConnectError);
    socket.on('error', onError);
    socket.on('receive_message', onReceiveMessage);
    socket.on('private_message', onPrivateMessage);
    socket.on('message_history', onMessageHistory);
    socket.on('message_updated', onMessageUpdated);
    socket.on('user_list', onUserList);
    socket.on('user_joined', onUserJoined);
    socket.on('user_left', onUserLeft);
    socket.on('user_joined_room', onUserJoinedRoom);
    socket.on('room_list', onRoomList);
    socket.on('room_joined', onRoomJoined);
    socket.on('typing_users', onTypingUsers);
    socket.on('new_message_notification', onNewMessageNotification);

    // Clean up event listeners
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('connect_error', onConnectError);
      socket.off('error', onError);
      socket.off('receive_message', onReceiveMessage);
      socket.off('private_message', onPrivateMessage);
      socket.off('message_history', onMessageHistory);
      socket.off('message_updated', onMessageUpdated);
      socket.off('user_list', onUserList);
      socket.off('user_joined', onUserJoined);
      socket.off('user_left', onUserLeft);
      socket.off('user_joined_room', onUserJoinedRoom);
      socket.off('room_list', onRoomList);
      socket.off('room_joined', onRoomJoined);
      socket.off('typing_users', onTypingUsers);
      socket.off('new_message_notification', onNewMessageNotification);
    };
  }, [currentRoom]);

  return {
    socket,
    isConnected,
    lastMessage,
    messages,
    users,
    typingUsers,
    rooms,
    currentRoom,
    notifications,
    connect,
    disconnect,
    sendMessage,
    sendPrivateMessage,
    setTyping,
    joinRoom,
    addReaction,
    clearNotifications,
  };
};

export default socket; 