// src/pages/ProductsPage.jsx
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Breadcrumbs from '../components/Breadcrumbs';
import SideBarFilter from '../components/SideBarFilter';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import Footer from '../components/footer';
import axios from 'axios';
import Cart from '../components/Cart';

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
  const [cartItems, setCartItems] = useState([]);

  // Actualiza el filtro si cambia la URL (por ejemplo, al navegar desde el footer)
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      categoria: categoriaParam
    }));
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

  // Cuando el usuario cambia el filtro, actualiza el estado y la URL
  const handleFilterChange = (key, value) => {
    setFilters(prev => {
      const newFilters = { ...prev, [key]: value };
      // Solo actualiza la URL si cambia la categoría
      if (key === 'categoria') {
        const params = new URLSearchParams(location.search);
        if (value) {
          params.set('categoria', value);
        } else {
          params.delete('categoria');
        }
        navigate({ search: params.toString() }, { replace: true });
      }
      return newFilters;
    });
  };

  const handleSearch = value => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const handleAddToCart = product => {
    setCartOpen(true);
    setCartItems(prev => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...product, cantidad: 1 }];
    });
  };

  const handleQuantityChange = (id, cantidad) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, cantidad } : item
      )
    );
  };

  const handleRemove = id => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleCotizar = async () => {
    const cotizacion = {
      detalles: cartItems.map(item => ({
        producto: item.id,
        cantidad: item.cantidad,
        precio_unitario: item.precio
      }))
    };

    const token = localStorage.getItem("access"); // <-- CORRECTO

    const res = await fetch("https://hidrotek.onrender.com/api/cotizacion-pdf/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(cotizacion)
    })
    .then(res => res.blob())
.then(blob => {
  const url = window.URL.createObjectURL(blob);
  window.open(url, '_blank');
});

    if (res.ok) {
      alert("¡Cotización enviada!");
      setCartOpen(false);
      setCartItems([]);
    } else {
      alert("Error al enviar la cotización");
    }
  };

  return (
    <div className="bg-blue-50 min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-2 sm:px-4 py-6">
        <div className="flex flex-col md:grid md:grid-cols-5 md:gap-6">
          {/* Sidebar: arriba en mobile, a la izquierda en desktop */}
          <div className="md:col-span-1 mb-6 md:mb-0">
          <SideBarFilter
  categorias={categorias}
  marcas={marcas}
  products={products}      // <-- aquí pasas la lista de productos
  filters={filters}        // <-- aquí pasas el estado de filtros
  onFilterChange={handleFilterChange}
/>
          </div>
          <div className="md:col-span-4">
            <Breadcrumbs items={["Inicio", "Productos"]} />
            <SearchBar onSearch={handleSearch} />
            <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
            {/* Botón flotante para abrir el carrito */}
            <button
              className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg z-40 hover:bg-blue-700 transition"
              onClick={() => setCartOpen(true)}
              title="Ver carrito"
            >
              🛒
            </button>
          </div>
        </div>
      </main>
      <Footer />
      <Cart
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onQuantityChange={handleQuantityChange}
        onRemove={handleRemove}
        onCotizar={handleCotizar}
      />
    </div>
  );
}
