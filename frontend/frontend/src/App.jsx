// App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';      
import Register from './pages/Register';
import Products from './pages/Products';
import Contact from './pages/Contact';
import AboutUs from './pages/AboutUs';
import DetailPage from './pages/DetailPage';
import Dashboard from './pages/Dashboard';
import Cart from './components/Cart';

function App() {
  return (
    <>
      <Cart />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products" element={<Products />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/products/:pk" element={<DetailPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* Puedes agregar más rutas según sea necesario */}
    </Routes>
     </>
  );
}

export default App;
