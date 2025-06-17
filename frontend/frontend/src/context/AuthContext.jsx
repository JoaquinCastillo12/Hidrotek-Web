import React, { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() => localStorage.getItem('access'));
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('refresh'));
  const [user, setUser] = useState(() => localStorage.getItem('user'));
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Guarda tokens en localStorage
  useEffect(() => {
    if (authTokens) localStorage.setItem('access', authTokens);
    else localStorage.removeItem('access');
  }, [authTokens]);

  useEffect(() => {
    if (refreshToken) localStorage.setItem('refresh', refreshToken);
    else localStorage.removeItem('refresh');
  }, [refreshToken]);

  useEffect(() => {
    if (user) localStorage.setItem('user', user);
    else localStorage.removeItem('user');
  }, [user]);

  // Detectar actividad del usuario
  useEffect(() => {
    const updateActivity = () => setLastActivity(Date.now());
    window.addEventListener('click', updateActivity);
    window.addEventListener('keydown', updateActivity);
    window.addEventListener('mousemove', updateActivity);
    window.addEventListener('scroll', updateActivity);

    return () => {
      window.removeEventListener('click', updateActivity);
      window.removeEventListener('keydown', updateActivity);
      window.removeEventListener('mousemove', updateActivity);
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

  // Refrescar token si está por expirar y el usuario está activo
  useEffect(() => {
    const interval = setInterval(() => {
      if (!authTokens || !refreshToken) return;

      try {
        const { exp } = jwt_decode(authTokens);
        const now = Date.now() / 1000;

        const secondsToExpire = exp - now;
        const inactiveTime = (Date.now() - lastActivity) / 1000;

        // Si el token expira en menos de 60s y el usuario ha estado activo
        if (secondsToExpire < 60 && inactiveTime < 300) {
          api
            .post('token/refresh/', { refresh: refreshToken })
            .then((res) => {
              setAuthTokens(res.data.access);
            })
            .catch(() => {
              logoutUser();
            });
        } else if (inactiveTime >= 300) {
          // 5 minutos de inactividad
          logoutUser();
        }
      } catch (err) {
        logoutUser();
      }
    }, 30000); // cada 30 segundos

    return () => clearInterval(interval);
  }, [authTokens, refreshToken, lastActivity, logoutUser]);

  const loginUser = async (username, password) => {
    try {
      const response = await api.post('login/', { username, password });
      setAuthTokens(response.data.access);
      setRefreshToken(response.data.refresh);
      setUser(username);
      setLastActivity(Date.now());
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ authTokens, user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

