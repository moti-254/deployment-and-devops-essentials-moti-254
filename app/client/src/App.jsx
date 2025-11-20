import React from 'react';
import { AuthProvider, useAuth } from './hooks/useAuth';
import { useSocket } from './socket/socket';
import Login from './components/Login';
import ChatRoom from './components/ChatRoom';
import './App.css';

function ChatApp() {
  const { user, loading } = useAuth();
  const {
    isConnected,
    connect,
    disconnect
  } = useSocket();

  // Connect socket when user is authenticated
  React.useEffect(() => {
    if (user) {
      connect(user);
    } else {
      disconnect();
    }
  }, [user, connect, disconnect]);

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading Chat App...</p>
      </div>
    );
  }

  return (
    <div className="app">
      {user ? (
        <>
          <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            {isConnected ? '🟢 Connected' : '🔴 Disconnected'}
          </div>
          <ChatRoom 
            username={user.username} 
            userId={user.userId}
          />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ChatApp />
    </AuthProvider>
  );
}

export default App;