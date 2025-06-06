import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('access'));
  const [user, setUser] = useState(() => localStorage.getItem('user'));

  // Sincroniza el estado con localStorage cuando cambia el token
  useEffect(() => {
    if (authTokens) {
      localStorage.setItem('access', authTokens);
    } else {
      localStorage.removeItem('access');
    }
  }, [authTokens]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', user);
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const loginUser = async (username, password) => {
    try {
      const response = await api.post('login/', { username, password });
      setAuthTokens(response.data.access);
      setUser(username);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ authTokens, user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
