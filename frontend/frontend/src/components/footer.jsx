import { Icon } from "@iconify/react";
export default function Footer() {
  return (
       <footer className="w-full py-8 bg-blue-900 text-white mt-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Icon icon="lucide:droplets" className="text-blue-300 text-2xl" />
              <span className="font-bold text-lg">AquaPump</span>
            </div>
            <p className="text-blue-100 text-sm">
              Soluciones de bombeo de agua residencial de alta calidad para su hogar.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Productos</h4>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li><a href="#" className="hover:underline">Bombas Centrífugas</a></li>
              <li><a href="#" className="hover:underline">Bombas Sumergibles</a></li>
              <li><a href="#" className="hover:underline">Sistemas de Presión</a></li>
              <li><a href="#" className="hover:underline">Accesorios</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Servicios</h4>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li><a href="#" className="hover:underline">Instalación</a></li>
              <li><a href="#" className="hover:underline">Mantenimiento</a></li>
              <li><a href="#" className="hover:underline">Reparación</a></li>
              <li><a href="#" className="hover:underline">Asesoría Técnica</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-blue-100 text-sm">
              <li><a href="#" className="hover:underline">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:underline">Garantía</a></li>
              <li><a href="#" className="hover:underline">Manuales</a></li>
              <li><a href="#" className="hover:underline">Contacto</a></li>
            </ul>
          </div>
        </div>
        <div className="pt-4 border-t border-blue-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-blue-200 text-sm">
            © 2024 AquaPump. Todos los derechos reservados.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-blue-200 text-sm hover:underline">Términos y Condiciones</a>
            <a href="#" className="text-blue-200 text-sm hover:underline">Política de Privacidad</a>
          </div>
        </div>
      </footer>
  );
}
