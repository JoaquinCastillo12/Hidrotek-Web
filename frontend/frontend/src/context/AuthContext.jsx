import React, { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('access'));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refresh'));
  const [user, setUser] = useState(() => localStorage.getItem('user'));
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Guardar en localStorage
  useEffect(() => {
    authTokens ? localStorage.setItem('access', authTokens) : localStorage.removeItem('access');
  }, [authTokens]);

  useEffect(() => {
    refreshToken ? localStorage.setItem('refresh', refreshToken) : localStorage.removeItem('refresh');
  }, [refreshToken]);

  useEffect(() => {
    user ? localStorage.setItem('user', user) : localStorage.removeItem('user');
  }, [user]);

  // Detectar actividad del usuario
  useEffect(() => {
    const updateActivity = () => setLastActivity(Date.now());

    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('click', updateActivity);
    window.addEventListener('scroll', updateActivity);

    return () => {
      window.removeEventListener('mousemove', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('scroll', updateActivity);
    };
  }, []);

  const logoutUser = useCallback(() => {
    setAuthTokens(null);
    setRefreshToken(null);
    setUser(null);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
  }, []);

  // Refrescar el token automáticamente si está activo
  useEffect(() => {
    const interval = setInterval(() => {
      if (!authTokens || !refreshToken) return;

      try {
        const { exp } = jwtDecode(authTokens);
        const now = Date.now() / 1000;
        const expiresIn = exp - now;
        const inactiveSeconds = (Date.now() - lastActivity) / 1000;

        // Si lleva inactivo más de 5 minutos (300s)
        if (inactiveSeconds >= 300) {
          logoutUser();
        } else if (expiresIn < 60) {
          // Refrescar si faltan menos de 60s y está activo
          api
            .post('api/token/refresh/', { refresh: refreshToken })
            .then(res => {
              setAuthTokens(res.data.access);
            })
            .catch(() => {
              logoutUser();
            });
        }
      } catch (err) {
        logoutUser();
      }
    }, 30000); // cada 30 segundos

    return () => clearInterval(interval);
  }, [authTokens, refreshToken, lastActivity, logoutUser]);

  const loginUser = async (username, password) => {
    try {
      const res = await api.post('login/', { username, password });
      setAuthTokens(res.data.access);
      setRefreshToken(res.data.refresh);
      setUser(username);
      setLastActivity(Date.now());
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ authTokens, user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};


