// src/components/SidebarFilter.jsx
export default function SideBarFilter({ categorias, marcas, onFilterChange, products, filters }) {
  // Filtrar categorías que tengan al menos un producto con la marca seleccionada (si hay marca seleccionada)
  const categoriasDisponibles = filters.marca
    ? categorias.filter(cat =>
        products.some(
          p =>
            p.categoria.toLowerCase() === cat.toLowerCase() &&
            p.marca.toLowerCase() === filters.marca.toLowerCase()
        )
      )
    : categorias;

  // Filtrar marcas que tengan al menos un producto con la categoría seleccionada (si hay categoría seleccionada)
  const marcasDisponibles = filters.categoria
    ? marcas.filter(marca =>
        products.some(
          p =>
            p.marca.toLowerCase() === marca.toLowerCase() &&
            p.categoria.toLowerCase() === filters.categoria.toLowerCase()
        )
      )
    : marcas;

  return (
    <aside className="bg-blue-50 p-6 rounded-xl shadow-md space-y-8 border border-blue-100">
      <h2 className="text-blue-800 font-bold text-xl border-b pb-3">Filtrar por</h2>
      <div>
        <label className="block text-blue-700 font-medium mb-2">Categoría</label>
        <select
          onChange={e => onFilterChange('categoria', e.target.value)}
          value={filters.categoria}
          className="w-full border border-blue-300 bg-white rounded-md px-4 py-2 text-blue-800 focus:ring-2 focus:ring-blue-400 shadow transition"
        >
          <option value="">Todas</option>
          {categoriasDisponibles.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-blue-700 font-medium mb-2">Marca</label>
        <select
          onChange={e => onFilterChange('marca', e.target.value)}
          value={filters.marca}
          className="w-full border border-blue-300 bg-white rounded-md px-4 py-2 text-blue-800 focus:ring-2 focus:ring-blue-400 shadow transition"
        >
          <option value="">Todas</option>
          {marcasDisponibles.map((marca, i) => (
            <option key={i} value={marca}>{marca}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}
