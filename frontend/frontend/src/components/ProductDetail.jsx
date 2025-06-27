import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // ✅ Importa el contexto

const ProductDetail = () => {
  const { pk } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const { addToCart } = useCart(); // ✅ Usa el método del contexto

  useEffect(() => {
    fetch(`https://hidrotek.onrender.com/api/productos/${pk}/`)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener el producto');
        return res.json();
      })
      .then((data) => {
        try {
          if (typeof data.caracteristicas === 'string') {
            data.caracteristicas = JSON.parse(data.caracteristicas);
          }
        } catch (error) {
          console.warn("No se pudo parsear características:", error);
        }

        setProducto(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar el producto:", error);
        setLoading(false);
      });
  }, [pk]);

  const handleAddToCart = () => {
    addToCart(producto);
    setMensaje("Producto agregado al carrito");
    setTimeout(() => setMensaje(""), 3000);
  };

  if (loading) return <p className="text-center mt-10">Cargando producto...</p>;
  if (!producto) return <p className="text-center mt-10">No se encontró el producto.</p>;

  return (
    <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Imagen */}
        <div className="md:w-3/4 flex justify-center items-start">
          {producto.imagen && (
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-90 h-auto object-cover rounded-md"
            />
          )}
        </div>

        {/* Detalles */}
        <div className="md:w-1/2 space-y-4 text-gray-700">
          <h2 className="text-3xl font-bold text-gray-900">{producto.nombre}</h2>
          <p className="text-xl text-blue-600 font-semibold">${producto.precio}</p>
          <p><strong>Marca:</strong> {producto.marca}</p>
          <p><strong>Categoría:</strong> {producto.categoria}</p>

          <div>
            <strong>Descripción:</strong>
            <p>{producto.descripcion}</p>
          </div>

          {producto.caracteristicas && (
            <div>
              <strong>Características:</strong>
              {Array.isArray(producto.caracteristicas) ? (
                <ul className="list-disc list-inside mt-1">
                  {producto.caracteristicas.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              ) : (
                <p>{producto.caracteristicas}</p>
              )}
            </div>
          )}

        {/* Botón de Ficha Técnica */}
{/* Botón de Ficha Técnica */}
{producto.ficha_tecnica_url && (
  <a
    href={`https://hidrotek.onrender.com/api${producto.ficha_tecnica_url}`}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition mt-4"
  >
    📄 Ver ficha técnica (PDF)
  </a>
)}








          {/* Botón de Agregar al carrito */}
          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition inline-flex justify-center items-center gap-2 text-lg"
          >
            🛒 Agregar al carrito
          </button>

          {mensaje && (
            <p className="mt-2 text-green-600 font-medium text-center">{mensaje}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;





