import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductoList = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:8000/api/productos/')
      .then(response => {
        setProductos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error al obtener los productos:', error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Cargando productos...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Lista de Productos</h1>
      <ul className="space-y-2">
        {productos.map(producto => (
          <li key={producto.id} className="border p-3 rounded shadow">
            {producto.imagen && (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-40 object-cover mb-2 rounded"
              />
            )}
            <p>Precio: ${producto.precio}</p>
            <p>Marca: {producto.marca}</p>
            <p>Descripción: {producto.descripcion}</p>
            <p>Categoría: {producto.categoria}</p>
            {/* Puedes agregar más campos dependiendo de tu serializer */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductoList;

