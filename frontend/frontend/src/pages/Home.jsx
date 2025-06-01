import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import Footer from '../components/footer';
import Header from '../components/Header';

const carouselImages = [
  'https://via.placeholder.com/1200x400/3b82f6/ffffff?text=Promo+1',
  'https://via.placeholder.com/1200x400/2563eb/ffffff?text=Promo+2',
  'https://via.placeholder.com/1200x400/1e40af/ffffff?text=Promo+3',
];

const featuredProducts = [
  { id: 1, nombre: 'Bomba de Agua X', precio: 120, imagen: 'https://via.placeholder.com/200x150' },
  { id: 2, nombre: 'Tanque Y', precio: 90, imagen: 'https://via.placeholder.com/200x150' },
  { id: 3, nombre: 'Filtro Z', precio: 75, imagen: 'https://via.placeholder.com/200x150' },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 flex flex-col">
      <Header />
      {/* Carrusel */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-b-lg shadow-lg">
        {carouselImages.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Promo ${idx + 1}`}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
              idx === currentIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
      </div>

      {/* Productos Destacados */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold text-blue-800 mb-6">Productos Destacados</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={() => alert(`Agregado: ${product.nombre}`)} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
