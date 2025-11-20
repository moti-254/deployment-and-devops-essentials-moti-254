import React, { useState, useRef } from 'react';
import './MessageInput.css';

function MessageInput({ onSendMessage, onTypingStart, onTypingStop, disabled = false, placeholder = "Type a message..." }) {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const typingTimeoutRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
      handleStopTyping();
    }
  };

  const handleChange = (e) => {
    if (disabled) return;
    setMessage(e.target.value);
    
    if (!isTyping) {
      setIsTyping(true);
      onTypingStart();
    }

    clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      handleStopTyping();
    }, 1000);
  };

  const handleStopTyping = () => {
    setIsTyping(false);
    onTypingStop();
    clearTimeout(typingTimeoutRef.current);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="message-input-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <textarea
          value={message}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          onBlur={handleStopTyping}
          placeholder={placeholder}
          rows="1"
          disabled={disabled}
        />
        <button type="submit" disabled={!message.trim() || disabled}>
          Send
        </button>
      </div>
    </form>
  );
}

export default MessageInput;