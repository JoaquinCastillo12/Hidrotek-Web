export default function Breadcrumbs({ items }) {
  return (
    <nav className="block text-blue-700 font-medium mb-2">
      {items.map((item, index) => (
        <span key={index}>
          {item}
          {index < items.length - 1 && ' / '}
        </span>
      ))}
    </nav>
  );
}