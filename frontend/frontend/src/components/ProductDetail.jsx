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

  if (loading) return <p>Cargando producto...</p>;
  if (!producto) return <p>No se encontró el producto.</p>;

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 mt-6">
      <h2 className="text-2xl font-bold mb-4">{producto.nombre}</h2>

      {producto.imagen && (
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-auto object-cover rounded-md mb-4"
        />
      )}

      <div className="space-y-2 text-gray-700">
        <p><strong>Descripción:</strong> {producto.descripcion}</p>
        <p><strong>Precio:</strong> ${producto.precio}</p>
        <p><strong>Stock disponible:</strong> {producto.stock}</p>
        <p><strong>Marca:</strong> {producto.marca}</p>
        <p><strong>Categoría:</strong> {producto.categoria}</p>

        {producto.ficha_tecnica && (
          <div className="mt-4 space-y-2">
            <strong>Ficha técnica:</strong>
            <div className="space-x-2">
              <a
                href={producto.ficha_tecnica.replace('/fl_attachment/', '/')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
              >
                Ver ficha técnica
              </a>
              <a
                href={producto.ficha_tecnica.replace('/raw/upload/fl_attachment/', '/raw/upload/')}
                download
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md transition"
              >
                Descargar
              </a>
            </div>

            {/* IFRAME para ver el PDF en la página */}
              <div className="mt-4">
                <iframe
  src={`https://hidrotek.onrender.com/ficha/${producto.ficha_tecnica}/`}
  className="w-full h-[500px] border rounded-md"
  title="Ficha técnica"
/>


            </div>
          </div>
        )}

        {producto.caracteristicas && (
          <div className="mt-4">
            <strong>Características:</strong>
            {Array.isArray(producto.caracteristicas) ? (
              <ul className="list-disc list-inside">
                {producto.caracteristicas.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{producto.caracteristicas}</p>
            )}
          </div>
        )}
      </div>

      <button
        onClick={handleAddToCart}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition"
      >
        Agregar al carrito
      </button>

      {mensaje && (
        <p className="text-green-600 text-center mt-3">{mensaje}</p>
      )}
    </div>
  );
};

export default ProductDetail;




