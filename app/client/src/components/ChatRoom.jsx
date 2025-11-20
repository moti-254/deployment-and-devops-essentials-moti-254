import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useSocket } from '../socket/socket';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import UserList from './UserList';
import RoomList from './RoomList';
import TypingIndicator from './TypingIndicator';
import Notifications from './Notifications';
import './ChatRoom.css';

function ChatRoom({ username, userId }) {
  const { logout } = useAuth();
  const {
    messages,
    users,
    typingUsers,
    rooms,
    currentRoom,
    notifications,
    sendMessage,
    setTyping,
    joinRoom,
    clearNotifications,
    isConnected
  } = useSocket();

  const [showNotifications, setShowNotifications] = useState(false);

  // Join default room on component mount
  useEffect(() => {
    if (rooms.length > 0 && !currentRoom) {
      joinRoom('general');
    }
  }, [rooms, currentRoom, joinRoom]);

  const handleSendMessage = (message) => {
    if (message.trim() && currentRoom) {
      sendMessage(message, currentRoom);
    }
  };

  const handleTypingStart = () => {
    setTyping(true, currentRoom);
  };

  const handleTypingStop = () => {
    setTyping(false, currentRoom);
  };

  const handleRoomChange = (room) => {
    joinRoom(room);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="chat-room">
      <header className="chat-header">
        <div className="header-left">
          <h1>💬 Real-Time Chat</h1>
          <span className="room-badge">#{currentRoom}</span>
          <span className={`connection-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
        </div>
        <div className="header-right">
          <span className="username">👤 {username}</span>
          <button 
            className="notification-btn"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            🔔 
            {notifications.length > 0 && (
              <span className="notification-count">{notifications.length}</span>
            )}
          </button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </header>

      <div className="chat-container">
        <aside className="sidebar">
          <RoomList 
            rooms={rooms} 
            currentRoom={currentRoom} 
            onRoomChange={handleRoomChange} 
          />
          <UserList users={users} currentUsername={username} />
        </aside>

        <main className="chat-main">
          <div className="chat-header">
            <h2>#{currentRoom}</h2>
            <TypingIndicator typingUsers={typingUsers} />
          </div>

          <MessageList 
            messages={messages} 
            currentRoom={currentRoom}
            currentUsername={username} 
          />
          
          <MessageInput 
            onSendMessage={handleSendMessage}
            onTypingStart={handleTypingStart}
            onTypingStop={handleTypingStop}
            disabled={!currentRoom || !isConnected}
            placeholder={!isConnected ? "Connecting..." : `Message #${currentRoom}`}
          />
        </main>
      </div>

      {showNotifications && (
        <Notifications 
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onClear={clearNotifications}
        />
      )}
    </div>
  );
}

export default ChatRoom;