import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart }) {
  const imagenSrc = product.imagen || product.imagen_url || "/no-image.png";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-blue-100 p-4 flex flex-col h-full">
      <div className="w-full h-40 bg-blue-50 flex items-center justify-center mb-4 rounded-lg">
        <img
          src={imagenSrc}
          alt={product.nombre}
          className="max-h-full max-w-full object-contain"
        />
      </div>

      {/* ✅ Nombre como enlace */}
      <Link to={`/products/${product.id}`}>
        <h3 className="text-blue-800 font-semibold text-lg mb-1 hover:underline cursor-pointer">
          {product.nombre}
        </h3>
      </Link>

      <p className="text-gray-500 text-sm mb-3">{product.descripcion}</p>
      <div className="flex items-center justify-between mt-auto">
        <span className="text-blue-600 font-bold text-lg">${product.precio}</span>
        <button
          onClick={() => onAddToCart(product)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 shadow transition flex items-center justify-center"
          title="Agregar al carrito"
        >
          <Icon icon="lucide:shopping-cart" className="text-xl" />
        </button>
      </div>
    </div>
  );
}


