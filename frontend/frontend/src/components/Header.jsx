import { useState, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Icon } from "@iconify/react";
import { useCart } from '../context/CartContext';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { authTokens, logoutUser } = useContext(AuthContext);
  const isAuthenticated = !!authTokens;
  const navigate = useNavigate();
  const location = useLocation();

  const { cartItems, setCartOpen } = useCart();
  const cartCount = cartItems.length;

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-background border-b border-gray-200">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center min-h-[80px]">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-4 font-bold text-2xl text-blue-700 h-full">
          <img
            src="/LOGO HIDROTEK.jpg"
            alt="Logo Hidrotek"
            className="h-[80px] w-auto object-contain"
          />
        </Link>

        {/* Menú de navegación */}
        <nav className="hidden md:flex flex-1 justify-center gap-8 items-center font-medium">
          <Link to="/" className={`${isActive("/") ? "text-blue-700 font-semibold underline underline-offset-4" : "text-gray-700 hover:text-blue-700"} transition`}>
            Inicio
          </Link>
          <Link to="/products" className={`${isActive("/products") ? "text-blue-700 font-semibold underline underline-offset-4" : "text-gray-700 hover:text-blue-700"} transition`}>
            Productos
          </Link>
          <Link to="/about-us" className={`${isActive("/about-us") ? "text-blue-700 font-semibold underline underline-offset-4" : "text-gray-700 hover:text-blue-700"} transition`}>
            Nosotros
          </Link>
          <Link to="/contact" className={`${isActive("/contact") ? "text-blue-700 font-semibold underline underline-offset-4" : "text-gray-700 hover:text-blue-700"} transition`}>
            Contacto
          </Link>
        </nav>

        {/* Carrito y sesión */}
        <div className="hidden md:flex gap-4 items-center ml-4">
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center"
            title="Ver carrito"
          >
            <Icon icon="lucide:shopping-cart" className="text-2xl text-blue-700" />
            <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">
              {cartCount}
            </span>
          </button>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium shadow hover:bg-blue-50 transition">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium shadow hover:bg-blue-700 transition">
                Registrarse
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md font-medium shadow hover:bg-red-700 transition"
            >
              Cerrar Sesión
            </button>
          )}
        </div>

        {/* Menú móvil */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-blue-700">
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white px-6 pb-4 space-y-4 text-blue-700 font-medium shadow">
          <Link to="/" className={`${isActive("/") ? "text-blue-700 font-semibold underline underline-offset-4" : "text-gray-700 hover:text-blue-700"} block transition`}>
            Inicio
          </Link>
          <Link to="/products" className={`${isActive("/products") ? "text-blue-700 font-semibold underline underline-offset-4" : "text-gray-700 hover:text-blue-700"} block transition`}>
            Productos
          </Link>
          <Link to="/about-us" className={`${isActive("/about-us") ? "text-blue-700 font-semibold underline underline-offset-4" : "text-gray-700 hover:text-blue-700"} block transition`}>
            Nosotros
          </Link>
          <Link to="/contact" className={`${isActive("/contact") ? "text-blue-700 font-semibold underline underline-offset-4" : "text-gray-700 hover:text-blue-700"} block transition`}>
            Contacto
          </Link>

          <button
            onClick={() => setCartOpen(true)}
            className="flex items-center gap-2 relative"
            title="Ver carrito"
          >
            <Icon icon="lucide:shopping-cart" className="text-xl" />
            <span className="absolute -top-1 -right-4 bg-blue-600 text-white text-xs rounded-full px-2 py-0.5 font-bold">
              {cartCount}
            </span>
          </button>

          {!isAuthenticated ? (
            <>
              <Link to="/login" className="block bg-blue-50 text-blue-700 px-4 py-2 rounded-md shadow">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="block bg-blue-600 text-white px-4 py-2 rounded-md shadow">
                Registrarse
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="block w-full bg-red-600 text-white px-4 py-2 rounded-md shadow"
            >
              Cerrar Sesión
            </button>
          )}
        </div>
      )}
    </header>
  );
}

