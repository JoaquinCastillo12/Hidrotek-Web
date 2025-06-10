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
    alert(`Agregado: ${product.nombre}`);
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
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
