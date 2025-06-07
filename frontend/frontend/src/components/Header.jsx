import { useState, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Icon } from "@iconify/react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const isAuthenticated = !!authTokens;
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  // Helper para saber si la ruta está activa
  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-background border-b border-gray-200">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg text-blue-700">
          <Icon icon="lucide:droplets" className="text-blue-600 text-2xl" />
          Hidrotek
        </Link>

        {/* Menú central */}
        <nav className="hidden md:flex flex-1 justify-center gap-8 items-center font-medium">
          <Link
            to="/"
            className={
              (isActive("/")
                ? "text-blue-700 font-semibold underline underline-offset-4 "
                : "text-gray-700 hover:text-blue-700 ") +
              "transition"
            }
          >
            Inicio
          </Link>
          <Link
            to="/products"
            className={
              (isActive("/products")
                ? "text-blue-700 font-semibold underline underline-offset-4 "
                : "text-gray-700 hover:text-blue-700 ") +
              "transition"
            }
          >
            Productos
          </Link>
          <Link
            to="/nosotros"
            className={
              (isActive("/nosotros")
                ? "text-blue-700 font-semibold underline underline-offset-4 "
                : "text-gray-700 hover:text-blue-700 ") +
              "transition"
            }
          >
            Nosotros
          </Link>
          <Link
            to="/contacto"
            className={
              (isActive("/contacto")
                ? "text-blue-700 font-semibold underline underline-offset-4 "
                : "text-gray-700 hover:text-blue-700 ") +
              "transition"
            }
          >
            Contacto
          </Link>
        </nav>

        {/* Botones de sesión a la derecha */}
        <div className="hidden md:flex gap-2 items-center ml-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium shadow hover:bg-blue-50 transition">Iniciar Sesión</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium shadow hover:bg-blue-700 transition">Registrarse</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded-md font-medium shadow hover:bg-red-700 transition">
              Cerrar Sesión
            </button>
          )}
        </div>

        {/* Botón de menú hamburguesa */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-blue-700">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="md:hidden bg-white px-6 pb-4 space-y-4 text-blue-700 font-medium shadow">
          <Link
            to="/"
            className={
              (isActive("/")
                ? "text-blue-700 font-semibold underline underline-offset-4 "
                : "text-gray-700 hover:text-blue-700 ") +
              "block transition"
            }
          >
            Inicio
          </Link>
          <Link
            to="/products"
            className={
              (isActive("/products")
                ? "text-blue-700 font-semibold underline underline-offset-4 "
                : "text-gray-700 hover:text-blue-700 ") +
              "block transition"
            }
          >
            Productos
          </Link>
          <Link
            to="/nosotros"
            className={
              (isActive("/nosotros")
                ? "text-blue-700 font-semibold underline underline-offset-4 "
                : "text-gray-700 hover:text-blue-700 ") +
              "block transition"
            }
          >
            Nosotros
          </Link>
          <Link
            to="/contacto"
            className={
              (isActive("/contacto")
                ? "text-blue-700 font-semibold underline underline-offset-4 "
                : "text-gray-700 hover:text-blue-700 ") +
              "block transition"
            }
          >
            Contacto
          </Link>
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="block bg-blue-50 text-blue-700 px-4 py-2 rounded-md shadow">Iniciar Sesión</Link>
              <Link to="/register" className="block bg-blue-600 text-white px-4 py-2 rounded-md shadow">Registrarse</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="block w-full bg-red-600 text-white px-4 py-2 rounded-md shadow">
              Cerrar Sesión
            </button>
          )}
        </div>
      )}
    </header>
  );
}
