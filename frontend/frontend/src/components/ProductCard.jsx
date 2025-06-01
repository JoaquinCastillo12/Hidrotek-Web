export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white border border-blue-100 rounded-lg p-4 shadow hover:shadow-xl transition">
      <div className="w-full h-40 bg-white flex items-center justify-center mb-3">
        <img
          src={product.imagen}
          alt={product.nombre}
          className="max-h-full max-w-full object-contain"
        />
      </div>
      <h3 className="text-blue-800 font-semibold text-lg mb-1">{product.nombre}</h3>
      <p className="text-blue-600 font-bold text-md mb-2">${product.precio}</p>
      <button
        onClick={() => onAddToCart(product)}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded shadow"
      >
        Agregar al carrito
      </button>
    </div>
  );
}

