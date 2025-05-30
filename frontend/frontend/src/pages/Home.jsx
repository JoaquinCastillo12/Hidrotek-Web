import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Bienvenido</h1>
    <Link to="/login">Ingresar</Link> | <Link to="/register">Registrar</Link>
  </div>
);

export default Home;
