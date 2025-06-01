export default function SearchBar({ onSearch }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        onChange={e => onSearch(e.target.value)}
        placeholder="Buscar productos..."
        className="w-full border border-blue-300 p-3 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}