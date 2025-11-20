import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';

export function useSocket(url, options = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [reconnectAttempts, setReconnectAttempts] = useState(0);
  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io(url, {
      ...options,
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socketRef.current.on('connect', () => {
      setIsConnected(true);
      setReconnectAttempts(0);
    });

    socketRef.current.on('disconnect', () => {
      setIsConnected(false);
    });

    socketRef.current.on('reconnect_attempt', (attempt) => {
      setReconnectAttempts(attempt);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [url, options]);

  return {
    socket: socketRef.current,
    isConnected,
    reconnectAttempts
  };
}