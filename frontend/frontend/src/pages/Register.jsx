import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { Icon } from "@iconify/react";

function Register() {
  const { loginUser } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.password !== formData.password2) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await api.post('register/', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
      });

      const success = await loginUser(formData.username, formData.password);
      if (success) {
        navigate('/');
      } else {
        setError('Registro exitoso, pero error al iniciar sesión');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError('Error desconocido');
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 bg-dots">
      <div className="login-animation w-full max-w-md">
        <div className="login-card bg-white rounded-xl border-none shadow-lg">
          <div className="px-8 py-10 flex flex-col gap-6">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Icon icon="lucide:user-plus" className="text-blue-600 text-2xl" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Crear cuenta
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Regístrate para continuar
                </p>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-center mb-2">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-center mb-2">{success}</p>
            )}

            {/* Register Form */}
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre de usuario
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon icon="lucide:user" className="text-gray-400 text-lg" />
                  </span>
                  <input
                    type="text"
                    name="username"
                    className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tu usuario"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon icon="lucide:mail" className="text-gray-400 text-lg" />
                  </span>
                  <input
                    type="email"
                    name="email"
                    className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="correo@ejemplo.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon icon="lucide:key" className="text-gray-400 text-lg" />
                  </span>
                  <input
                    type="password"
                    name="password"
                    className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirmar contraseña
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <Icon icon="lucide:key-round" className="text-gray-400 text-lg" />
                  </span>
                  <input
                    type="password"
                    name="password2"
                    className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Repite la contraseña"
                    value={formData.password2}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <button
                type="submit"
                className="mt-2 font-medium w-full py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-60"
              >
                Registrarse
              </button>
            </form>

            {/* Link to login */}
            <div className="flex justify-center mt-4">
              <p className="text-gray-500 text-sm">
                ¿Ya tienes una cuenta?{" "}
                <span
                  className="text-blue-600 font-medium cursor-pointer hover:underline"
                  onClick={() => navigate("/login")}
                >
                  Inicia sesión
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
