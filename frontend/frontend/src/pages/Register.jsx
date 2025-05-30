import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

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
      const res = await axios.post('http://localhost:8000/api/users/register/', formData);
      setSuccess('Usuario registrado correctamente');
      setFormData({ username: '', email: '', password: '', password2: '' });
    } catch (err) {
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError('Error desconocido');
      }
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      {error && <div style={{color:'red'}}>{error}</div>}
      {success && <div style={{color:'green'}}>{success}</div>}
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username" 
          placeholder="Usuario" 
          value={formData.username} 
          onChange={handleChange} 
          required 
        />
        <br />
        <input 
          type="email" 
          name="email" 
          placeholder="Correo electrónico" 
          value={formData.email} 
          onChange={handleChange} 
          required 
        />
        <br />
        <input 
          type="password" 
          name="password" 
          placeholder="Contraseña" 
          value={formData.password} 
          onChange={handleChange} 
          required 
        />
        <br />
        <input 
          type="password" 
          name="password2" 
          placeholder="Confirmar contraseña" 
          value={formData.password2} 
          onChange={handleChange} 
          required 
        />
        <br />
        <button type="submit">Registrar</button>
      </form>
    </div>
  );
}

export default Register;
