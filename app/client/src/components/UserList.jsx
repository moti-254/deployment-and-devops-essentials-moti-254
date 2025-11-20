import React from 'react';
import './UserList.css';

function UserList({ users, currentUsername }) {
  const onlineUsers = users.filter(user => user.isOnline !== false);

  return (
    <div className="user-list">
      <h3>Online Users ({onlineUsers.length})</h3>
      <div className="users">
        {onlineUsers.map(user => (
          <div 
            key={user.id} 
            className={`user-item ${user.username === currentUsername ? 'current-user' : ''}`}
          >
            <span className="user-status"></span>
            <span className="username">{user.username}</span>
            {user.username === currentUsername && <span className="you-badge">You</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
