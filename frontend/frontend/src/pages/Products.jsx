import React from 'react';

const products = [
  {
    id: 1,
    name: 'Bomba de agua X200',
    description: 'Bomba de alta presión ideal para uso doméstico.',
    price: 120.99,
    image: 'https://via.placeholder.com/150', // Cambia por URL real
  },
  {
    id: 2,
    name: 'Tanque de agua 500L',
    description: 'Tanque resistente y durable para almacenamiento de agua.',
    price: 250.0,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Filtro de agua doméstico',
    description: 'Filtro compacto para mejorar la calidad del agua potable.',
    price: 35.5,
    image: 'https://via.placeholder.com/150',
  },
];

const Products = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Nuestros Productos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map(({ id, name, description, price, image }) => (
          <div key={id} className="border rounded-lg shadow-md p-4 flex flex-col">
            <img src={image} alt={name} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="text-gray-600 mb-4 flex-grow">{description}</p>
            <div className="flex items-center justify-between">
              <span className="font-bold text-lg">${price.toFixed(2)}</span>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
                Agregar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
