import React, { useState } from 'react';
import MessageInput from './MessageInput';
import './PrivateChat.css';

function PrivateChat({ socket, onlineUsers, currentUser }) {
  const [activeChats, setActiveChats] = useState(new Map());
  const [selectedUser, setSelectedUser] = useState(null);

  const startPrivateChat = (username) => {
    if (!activeChats.has(username)) {
      activeChats.set(username, []);
    }
    setSelectedUser(username);
  };

  const sendPrivateMessage = (content) => {
    if (selectedUser) {
      socket.emit('private_message', {
        to: selectedUser,
        content
      });

      setActiveChats(prevActiveChats => {
        const updatedMessages = [...(prevActiveChats.get(selectedUser) || []), {
          from: currentUser.username,
          content,
          timestamp: new Date(),
          isOwn: true
        }];

        const newActiveChats = new Map(prevActiveChats);
        newActiveChats.set(selectedUser, updatedMessages);
        return newActiveChats;
      });
    }
  };

  // Listen for private messages
  React.useEffect(() => {
    if (!socket) return;

    const handlePrivateMessage = (data) => {
      const { from, content, timestamp } = data;
      
      setActiveChats(prevActiveChats => {
        const updatedMessages = [...(prevActiveChats.get(from) || []), {
          from,
          content,
          timestamp,
          isOwn: false
        }];

        const newActiveChats = new Map(prevActiveChats);
        newActiveChats.set(from, updatedMessages);
        return newActiveChats;
      });
    };

    socket.on('private_message', handlePrivateMessage);

    return () => {
      socket.off('private_message', handlePrivateMessage);
    };
  }, [socket]);

  return (
    <div className="private-chat">
      <div className="user-list">
        <h3>Private Messages</h3>
        {onlineUsers
          .filter(userId => userId !== currentUser.userId)
          .map(userId => (
            <div
              key={userId}
              className={`user-item ${selectedUser === userId ? 'active' : ''}`}
              onClick={() => startPrivateChat(userId)}
            >
              {userId}
            </div>
          ))
        }
      </div>

      {selectedUser && (
        <div className="private-chat-window">
          <div className="chat-header">
            <h4>Chat with {selectedUser}</h4>
          </div>
          <div className="private-messages">
            {(activeChats.get(selectedUser) || []).map((msg, index) => (
              <div
                key={index}
                className={`private-message ${msg.isOwn ? 'own-message' : ''}`}
              >
                <div className="message-content">{msg.content}</div>
                <div className="message-time">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
          <MessageInput onSendMessage={sendPrivateMessage} />
        </div>
      )}
    </div>
  );
}

export default PrivateChat;