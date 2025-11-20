import React from 'react';
import './TypingIndicator.css';

function TypingIndicator({ typingUsers }) {
  if (typingUsers.length === 0) {
    return <div className="typing-indicator"></div>;
  }

  return (
    <div className="typing-indicator">
      <div className="typing-text">
        {typingUsers.join(', ')} {typingUsers.length === 1 ? 'is' : 'are'} typing
        <span className="typing-dots">
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
          <span className="typing-dot"></span>
        </span>
      </div>
    </div>
  );
}

export default TypingIndicator;