export default function Breadcrumbs({ items }) {
  return (
    <nav className="text-sm text-blue-800 mb-4">
      {items.map((item, index) => (
        <span key={index}>
          {item}
          {index < items.length - 1 && ' / '}
        </span>
      ))}
    </nav>
  );
}