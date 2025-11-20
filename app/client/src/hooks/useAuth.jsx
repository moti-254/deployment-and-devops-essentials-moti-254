import { useState, useEffect, createContext, useContext } from 'react';

// Create Auth Context
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user session on app start
    const savedUser = localStorage.getItem('chat_user');
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('chat_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // Simple validation
      if (!username || !password) {
        return { success: false, error: 'Username and password are required' };
      }

      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate a successful login
      const userData = {
        username: username.trim(),
        userId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        token: `demo_token_${Date.now()}`
      };

      setUser(userData);
      localStorage.setItem('chat_user', JSON.stringify(userData));

      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: 'Login failed' };
    }
  };

  const register = async (username, password) => {
    try {
      // Simple validation
      if (!username || !password) {
        return { success: false, error: 'Username and password are required' };
      }

      if (username.length < 3) {
        return { success: false, error: 'Username must be at least 3 characters' };
      }

      if (password.length < 6) {
        return { success: false, error: 'Password must be at least 6 characters' };
      }

      // In a real app, you would make an API call here
      // For demo purposes, we'll simulate a successful registration
      const userData = {
        username: username.trim(),
        userId: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        token: `demo_token_${Date.now()}`
      };

      setUser(userData);
      localStorage.setItem('chat_user', JSON.stringify(userData));

      return { success: true, user: userData };
    } catch (error) {
      return { success: false, error: 'Registration failed' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('chat_user');
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}