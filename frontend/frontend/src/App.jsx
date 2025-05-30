import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import { AuthContext } from './context/AuthContext';

const App = () => {
  const { authTokens } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/login"
        element={!authTokens ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/register"
        element={!authTokens ? <Register /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/dashboard"
        element={authTokens ? <Dashboard /> : <Navigate to="/login" />}
      />
    </Routes>
  );
};

export default App;
