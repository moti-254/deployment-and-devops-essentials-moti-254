import React from 'react';
import './Notifications.css';

function Notifications({ notifications, onClose, onClear }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="notifications">
      <div className="notifications-header">
        <h3>Notifications</h3>
        <button className="clear-btn" onClick={onClear}>
          Clear All
        </button>
      </div>
      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="no-notifications">
            No notifications
          </div>
        ) : (
          notifications.map(notification => (
            <div key={notification.id} className="notification-item">
              <div className="notification-message">
                {notification.message}
              </div>
              <div className="notification-time">
                {formatTime(notification.timestamp)}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notifications;