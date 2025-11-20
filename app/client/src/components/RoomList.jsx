import React from 'react';
import './RoomList.css';

function RoomList({ rooms, currentRoom, onRoomChange }) {
  return (
    <div className="room-list">
      <h3>Chat Rooms</h3>
      <div className="rooms">
        {rooms.map(room => (
          <button
            key={room}
            className={`room-btn ${currentRoom === room ? 'active' : ''}`}
            onClick={() => onRoomChange(room)}
          >
            # {room}
            {currentRoom === room && <span className="active-indicator">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}

export default RoomList;