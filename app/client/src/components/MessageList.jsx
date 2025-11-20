import React, { useEffect, useRef } from 'react';
import './MessageList.css';

function MessageList({ messages, currentRoom, currentUsername }) {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Filter messages by current room and non-private messages
  const roomMessages = messages.filter(message => 
    !message.isPrivate && message.room === currentRoom
  );

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const isOwnMessage = (message) => {
    return message.sender === currentUsername;
  };

  return (
    <div className="message-list">
      {roomMessages.length === 0 ? (
        <div className="empty-state">
          <p>No messages yet in #{currentRoom}</p>
          <p>Be the first to start the conversation!</p>
        </div>
      ) : (
        roomMessages.map(message => (
          <div
            key={message.id}
            className={`message ${isOwnMessage(message) ? 'own-message' : ''}`}
          >
            <div className="message-header">
              <span className="username">{message.sender}</span>
              <span className="timestamp">{formatTime(message.timestamp)}</span>
            </div>
            <div className="message-content">
              {message.message}
            </div>
            {message.reactions && Object.keys(message.reactions).length > 0 && (
              <div className="message-reactions">
                {Object.entries(message.reactions).map(([userId, reaction]) => (
                  <span key={userId} className="reaction">{reaction}</span>
                ))}
              </div>
            )}
          </div>
        ))
      )}
      <div ref={messagesEndRef} />
    </div>
  );
}

export default MessageList;