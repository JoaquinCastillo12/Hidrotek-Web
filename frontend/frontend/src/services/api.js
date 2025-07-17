import axios from 'axios';

const api = axios.create({
  baseURL: 'http://45.67.217.187:8000/api', // Cambia esto según tu configuración
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para manejar expiración de token SIN recargar la página
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      window.dispatchEvent(new Event('forceLogout'));
    }
    return Promise.reject(error);
  }
);

export default api;
