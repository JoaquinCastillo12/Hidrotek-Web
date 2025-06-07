import { useState, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Icon } from "@iconify/react";

// Simulación: reemplaza esto por tu contexto real de carrito si tienes uno
const useCart = () => {
  // Ejemplo: cambia esto por el hook real de tu app
  return { cartCount: 1 };
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const isAuthenticated = !!authTokens;
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart(); // Usa tu hook/contexto real de carrito aquí

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
            to="/about-us"
            className={
              (isActive("/about-us")
                ? "text-blue-700 font-semibold underline underline-offset-4 "
                : "text-gray-700 hover:text-blue-700 ") +
              "transition"
            }
          >
            Nosotros
          </Link>
          <Link
            to="/contact"
            className={
              (isActive("/contact")
                ? "text-blue-700 font-semibold underline underline-offset-4 "
                : "text-gray-700 hover:text-blue-700 ") +
              "transition"
            }
          >
            Contacto
          </Link>
        </nav>

        {/* Carrito y Botones de sesión a la derecha */}
        <div className="hidden md:flex gap-4 items-center ml-4">
          <Link to="/cart" className="relative flex items-center">
            <Icon icon="lucide:shopping-cart" className="text-2xl text-blue-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                {cartCount}
              </span>
            )}
          </Link>
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
          <Link to="/cart" className="flex items-center gap-2">
            <Icon icon="lucide:shopping-cart" className="text-xl" />
            {cartCount > 0 && (
              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">
                {cartCount}
              </span>
            )}
            Carrito
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
