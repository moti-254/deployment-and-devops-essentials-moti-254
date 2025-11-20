import { useEffect, useRef } from 'react';

export function useNotifications(socket, currentUser) {
  const audioRef = useRef(new Audio('/notification.mp3'));

  useEffect(() => {
    if (!socket || !currentUser) return;

    const handleNewMessage = (message) => {
      // Don't notify for own messages
      if (message.userId === currentUser.userId) return;

      // Check if browser supports notifications
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`New message from ${message.username}`, {
          body: message.content,
          icon: '/icon.png'
        });
      }

      // Play sound
      audioRef.current.play().catch(() => {
        // Ignore error if audio can't play
      });
    };

    const handleUserJoin = (username) => {
      console.log(`${username} joined the chat`);
    };

    const handleUserLeave = (username) => {
      console.log(`${username} left the chat`);
    };

    socket.on('receive_message', handleNewMessage);
    socket.on('user_joined', handleUserJoin);
    socket.on('user_left', handleUserLeave);

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      socket.off('receive_message', handleNewMessage);
      socket.off('user_joined', handleUserJoin);
      socket.off('user_left', handleUserLeave);
    };
  }, [socket, currentUser]);
}