import React from "react";

export default function Cart({ open, onClose, cartItems, onQuantityChange, onRemove, onCotizar }) {
  const total = cartItems.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
        open ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ maxWidth: 350 }}
    >
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-xl font-bold">Carrito de Cotización</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-blue-600 text-2xl">&times;</button>
      </div>
      <div className="p-4 flex-1 overflow-y-auto">
        {cartItems.length === 0 ? (
          <p className="text-gray-500 text-center mt-10">No hay productos en el carrito.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-3 mb-4 border-b pb-3">
              <img src={item.imagen} alt={item.nombre} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <div className="font-semibold">{item.nombre}</div>
                <div className="text-blue-700 font-bold">${(item.precio * item.cantidad).toFixed(2)}</div>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    className="px-2 py-1 bg-blue-100 rounded hover:bg-blue-200"
                    onClick={() => onQuantityChange(item.id, Math.max(1, item.cantidad - 1))}
                  >-</button>
                  <input
                    type="number"
                    min={1}
                    value={item.cantidad}
                    onChange={e => onQuantityChange(item.id, Math.max(1, Number(e.target.value)))}
                    className="w-10 text-center border rounded"
                  />
                  <button
                    className="px-2 py-1 bg-blue-100 rounded hover:bg-blue-200"
                    onClick={() => onQuantityChange(item.id, item.cantidad + 1)}
                  >+</button>
                  <button
                    className="ml-2 text-red-500 hover:text-red-700"
                    onClick={() => onRemove(item.id)}
                    title="Eliminar"
                  >🗑️</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="p-4 border-t">
        <div className="flex justify-between font-bold text-lg mb-3">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          disabled={cartItems.length === 0}
          onClick={onCotizar}
        >
          Cotizar
        </button>
      </div>
    </div>
  );
}