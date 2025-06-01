export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-600 to-blue-400 text-white p-6 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; 2025 Tienda Online. Todos los derechos reservados.</p>
        <div className="space-x-4 mt-2 md:mt-0">
          <a href="#" className="hover:underline">Términos</a>
          <a href="#" className="hover:underline">Privacidad</a>
          <a href="#" className="hover:underline">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
