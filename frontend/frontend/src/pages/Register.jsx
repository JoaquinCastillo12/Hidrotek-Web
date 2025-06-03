import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
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
// Registro
console.log('Registro:', formData);
await axios.post('http://localhost:8000/api/register/', formData);

// Login automático
console.log('Login:', {
  username: formData.username,
  password: formData.password,
});
const loginRes = await axios.post('http://localhost:8000/api/login/', {
  username: formData.username,
  password: formData.password,
});
console.log('Respuesta login:', loginRes.data);



    // 3. Guardar tokens correctamente desde loginRes
    const { access, refresh } = loginRes.data;
    localStorage.setItem('access', access);
    localStorage.setItem('refresh', refresh);
    localStorage.setItem('username', formData.username);

    // Notificar al Header que el usuario ha iniciado sesión
    window.dispatchEvent(new Event('authChange'));

    navigate('/');
  } catch (err) {
    if (err.response && err.response.data) {
      setError(JSON.stringify(err.response.data));
    } else {
      setError('Error desconocido');
    }
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Registro</h2>

        {error && <div className="text-red-600 text-sm text-center">{error}</div>}
        {success && <div className="text-green-600 text-sm text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Usuario"
            value={formData.username}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            name="password2"
            placeholder="Confirmar contraseña"
            value={formData.password2}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
