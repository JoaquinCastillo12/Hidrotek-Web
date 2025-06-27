import React, { createContext, useState, useEffect, useCallback } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Función para validar si el token aún es válido
  const isTokenValid = (token) => {
    try {
      const { exp } = jwtDecode(token);
      return Date.now() < exp * 1000; // compara en milisegundos
    } catch {
      return false;
    }
  };

  // Inicialización del estado validando los tokens
  const [authTokens, setAuthTokens] = useState(() => {
    const token = localStorage.getItem('access');
    return token && isTokenValid(token) ? token : null;
  });

  const [refreshToken, setRefreshToken] = useState(() => {
    const token = localStorage.getItem('refresh');
    return token && isTokenValid(token) ? token : null;
  });

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('access');
    if (token && isTokenValid(token)) {
      return localStorage.getItem('user');
    }
    return null;
  });

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

  // Verificar al inicio si el token es inválido (refuerzo)
  useEffect(() => {
    if (!authTokens || !isTokenValid(authTokens)) {
      logoutUser();
    }
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

        if (inactiveSeconds >= 300) {
          logoutUser(); // inactivo más de 5 minutos
        } else if (expiresIn < 60) {
          // Refrescar token si faltan menos de 60 segundos
          api
            .post('api/token/refresh/', { refresh: refreshToken })
            .then(res => {
              setAuthTokens(res.data.access);
            })
            .catch(() => {
              logoutUser();
            });
        }
      } catch {
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

