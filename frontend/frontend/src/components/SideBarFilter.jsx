// src/components/SidebarFilter.jsx
export default function SidebarFilter({ categorias, marcas, onFilterChange }) {
  return (
    <aside className="bg-blue-50 p-4 rounded-lg space-y-6 shadow">
      <h2 className="text-blue-700 font-semibold text-lg border-b pb-2">Filtrar por</h2>
      <div>
        <label className="block text-blue-600 font-medium mb-1">Categoría</label>
        <select onChange={e => onFilterChange('categoria', e.target.value)} className="w-full border border-blue-300 rounded p-2">
          <option value="">Todas</option>
          {categorias.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-blue-600 font-medium mb-1">Marca</label>
        <select onChange={e => onFilterChange('marca', e.target.value)} className="w-full border border-blue-300 rounded p-2">
          <option value="">Todas</option>
          {marcas.map((marca, i) => (
            <option key={i} value={marca}>{marca}</option>
          ))}
        </select>
      </div>
    </aside>
  );
}
