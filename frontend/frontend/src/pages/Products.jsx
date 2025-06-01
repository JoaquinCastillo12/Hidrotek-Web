// src/pages/ProductsPage.jsx
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import Breadcrumbs from '../components/Breadcrumbs';
import SidebarFilter from '../components/SidebarFilter';
import SearchBar from '../components/SearchBar';
import ProductList from '../components/ProductList';
import Footer from '../components/footer';
import axios from 'axios';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({ categoria: '', marca: '', search: '' });
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/api/productos/')
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
        (!filters.search || p.nombre.toLowerCase().includes(filters.search.toLowerCase()))
      );
    });
    setFilteredProducts(result);
  }, [filters, products]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = value => {
    setFilters(prev => ({ ...prev, search: value }));
  };

  const handleAddToCart = product => {
    alert(`Agregado: ${product.nombre}`);
  };

  return (
    <div className="bg-blue-50 min-h-screen">
      <Header />
      <main className="grid grid-cols-5 gap-6 p-6">
        <div className="col-span-1">
          <SidebarFilter
            categorias={categorias}
            marcas={marcas}
            onFilterChange={handleFilterChange}
          />
        </div>
        <div className="col-span-4">
          <Breadcrumbs items={["Inicio", "Productos"]} />
          <SearchBar onSearch={handleSearch} />
          <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />
        </div>
      </main>
      <Footer />
    </div>
    
  );
}
