export default function SearchBar({ onSearch }) {
  return (
    <div className="mb-8 flex justify-start">
      <input
        type="text"
        onChange={e => onSearch(e.target.value)}
        placeholder="Buscar productos..."
        className="w-full max-w-md border border-blue-200 bg-blue-50 px-5 py-3 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-800 placeholder-blue-400 transition"
      />
    </div>
  );
}