// src/pages/ProductsPage.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Breadcrumbs from '../components/Breadcrumbs';
import SideBarFilter from '../components/SideBarFilter';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import Footer from '../components/footer';
import Cart from '../components/Cart';
import axios from 'axios';
import { useCart } from '../context/CartContext'; // ✅ Importar el contexto

export default function ProductsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const categoriaParam = params.get("categoria") || "";

  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ categoria: categoriaParam, marca: '', search: '' });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);

  const { cartItems, addToCart, updateQuantity, removeFromCart, clearCart } = useCart(); // ✅

  useEffect(() => {
    setFilters(prev => ({ ...prev, categoria: categoriaParam }));
    // eslint-disable-next-line
  }, [categoriaParam]);

  useEffect(() => {
    axios.get('https://hidrotek.onrender.com/api/productos/')
      .then(response => {
        setProducts(response.data);
        const uniqueCategorias = [...new Set(response.data.map(p => p.categoria))];
        const uniqueMarcas = [...new Set(response.data.map(p => p.marca))];
        setCategorias(uniqueCategorias);
        setMarcas(uniqueMarcas);
      })
      .catch(error => console.error('Error al obtener productos:', error));
  }, []);

  useEffect(() => {
    const result = products.filter(p => {
      return (
        (!filters.categoria || p.categoria.toLowerCase() === filters.categoria.toLowerCase()) &&
        (!filters.marca || p.marca.toLowerCase() === filters.marca.toLowerCase()) &&
        (
          !filters.search ||
          p.nombre.toLowerCase().includes(filters.search.toLowerCase()) ||
          (p.descripcion && p.descripcion.toLowerCase().includes(filters.search.toLowerCase()))
        )
      );
    });
    setFilteredProducts(result);
  }, [filters, products]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      if (key === 'categoria') {
        const params = new URLSearchParams(location.search);
        value ? params.set('categoria', value) : params.delete('categoria');
        navigate({ search: params.toString() }, { replace: true });
      }
      return newFilters;
    });
  };

  const handleSearch = value => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const handleAddToCart = (product) => {
    setCartOpen(true); // ✅ abrir el modal
    addToCart(product); // ✅ usar el contexto
  };

  const handleCotizar = async () => {
    const cotizacion = {
      detalles: cartItems.map(item => ({
        producto: item.id,
        cantidad: item.quantity,
        precio_unitario: item.precio
      }))
    };

    const token = localStorage.getItem("access");

    try {
      const res = await fetch("https://hidrotek.onrender.com/api/cotizacion-pdf/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(cotizacion)
      });

      if (res.status === 401) {
        alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        setCartOpen(false);
        clearCart();
        return;
      }

      if (res.ok) {
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        alert("¡Cotización enviada!");
        setCartOpen(false);
        clearCart();
      } else {
        alert("Error al enviar la cotización");
      }
    } catch (error) {
      alert("Error de red al enviar la cotización");
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 py-6">
        <div className="flex flex-col md:grid md:grid-cols-5 md:gap-6">
          <div className="md:col-span-1 mb-6 md:mb-0">
            <SideBarFilter
              categorias={categorias}
              marcas={marcas}
              products={products}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="md:col-span-4">
            <Breadcrumbs items={["Inicio", "Productos"]} />
            <SearchBar onSearch={handleSearch} />
            <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
            {/* ❌ Botón flotante eliminado */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
