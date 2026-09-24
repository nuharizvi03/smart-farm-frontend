import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('farmwise_user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem('farmwise_token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      if (token) {
        try {
          const response = await api.get('/user');
          if (response.data && response.data.user) {
            setUser(response.data.user);
            localStorage.setItem('farmwise_user', JSON.stringify(response.data.user));
          }
        } catch {
          // Token expired or invalid
          setUser(null);
          setToken(null);
          localStorage.removeItem('farmwise_token');
          localStorage.removeItem('farmwise_user');
        }
      }
      setLoading(false);
    };

    verifyUser();
  }, [token]);

  const login = async (credentials) => {
    const response = await api.post('/login', credentials);
    const { token: receivedToken, user: receivedUser } = response.data;
    if (receivedToken) {
      setToken(receivedToken);
      localStorage.setItem('farmwise_token', receivedToken);
    }
    if (receivedUser) {
      setUser(receivedUser);
      localStorage.setItem('farmwise_user', JSON.stringify(receivedUser));
    }
    return response.data;
  };

  const register = async (userData) => {
    const response = await api.post('/register', userData);
    const { token: receivedToken, user: receivedUser } = response.data;
    if (receivedToken) {
      setToken(receivedToken);
      localStorage.setItem('farmwise_token', receivedToken);
    }
    if (receivedUser) {
      setUser(receivedUser);
      localStorage.setItem('farmwise_user', JSON.stringify(receivedUser));
    }
    return response.data;
  };

  const logout = async () => {
    try {
      if (token) {
        await api.post('/logout');
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem('farmwise_token');
      localStorage.removeItem('farmwise_user');
    }
  };

  const role = user?.role || null;
  const isAuthenticated = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role,
        isAuthenticated,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

