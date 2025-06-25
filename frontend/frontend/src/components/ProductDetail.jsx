import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { pk } = useParams();
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");

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
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const yaExiste = carrito.find((item) => item.id === producto.id);
    if (!yaExiste) {
      carrito.push({ ...producto, cantidad: 1 });
      localStorage.setItem("carrito", JSON.stringify(carrito));
      setMensaje("Producto agregado al carrito");
    } else {
      setMensaje("Este producto ya está en el carrito");
    }

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
          {producto.ficha_tecnica && (
            <div>
              <a
                href={producto.ficha_tecnica.replace('/raw/upload/fl_attachment/', '/raw/upload/')}
                download
                className="inline-block bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition mt-4"
              >
                📄 Descargar ficha técnica (PDF)
              </a>
            </div>
          )}

          {/* Botón de Agregar al carrito */}
          <button
            onClick={handleAddToCart}
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition inline-flex justify-center items-center gap-2 text-lg"
          >
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;






