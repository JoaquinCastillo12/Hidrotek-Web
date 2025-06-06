import { useState, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const isAuthenticated = !!authTokens;
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-wide flex items-center gap-2">
          <img src="/logo.png" alt="Logo" className="h-8 w-8" />
          <span>Tienda de Agua</span>
        </Link>

        {/* Menú grande (desktop) */}
        <nav className="hidden md:flex gap-6 items-center font-medium">
          <Link to="/products" className="hover:text-blue-100 transition">Productos</Link>
          <Link to="/cotizaciones" className="hover:text-blue-100 transition">Cotizaciones</Link>
          <Link to="/contacto" className="hover:text-blue-100 transition">Contacto</Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-100 transition">Iniciar Sesión</Link>
              <Link to="/register" className="bg-blue-800 text-white px-4 py-2 rounded shadow hover:bg-blue-900 transition">Registrarse</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded shadow hover:bg-red-700 transition">
              Cerrar Sesión
            </button>
          )}
        </nav>

        {/* Botón de menú hamburguesa */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden bg-blue-500 px-6 pb-4 space-y-4 text-white font-medium">
          <Link to="/products" className="block">Productos</Link>
          <Link to="/cotizaciones" className="block">Cotizaciones</Link>
          <Link to="/contacto" className="block">Contacto</Link>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="block bg-white text-blue-600 px-4 py-2 rounded shadow">Iniciar Sesión</Link>
              <Link to="/register" className="block bg-blue-800 text-white px-4 py-2 rounded shadow">Registrarse</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="block w-full bg-red-600 text-white px-4 py-2 rounded shadow">
              Cerrar Sesión
            </button>
          )}
        </div>
      )}
    </header>
  );
}
