import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export default function footer() {
  return (
    <footer className="w-full py-8 bg-blue-900 text-white mt-8">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        <div>
          <Link
  to="/"
  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
  className="flex items-center gap-4 font-bold text-2xl text-blue-700 h-full"
>
  <img
    src="/LOGO HIDROTEK.jpg"
    alt="Logo Hidrotek"
    className="h-[70px] w-auto object-contain"
  />
</Link>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Productos</h4>
          <ul className="space-y-2 text-blue-100 text-sm">
            <li>
              <Link to="/products?categoria=BOMBAS CENTRIFUGAS" className="hover:underline">
                Bombas Centrífugas
              </Link>
            </li>
            <li>
              <Link to="/products?categoria=BOMBAS PARA POZO" className="hover:underline">
                Bombas Sumergibles
              </Link>
            </li>
            <li>
              <Link to="/products?categoria=SISTEMAS HIDRONEUMATICOS" className="hover:underline">
                Sistemas de Presión
              </Link>
            </li>
            <li>
              <Link to="/products?categoria=ACCESORIOS DE HIDRONEUMATICO" className="hover:underline">
                Accesorios
              </Link>
            </li>
          </ul>
        </div>
       <div>
  <h4 className="font-semibold mb-4">Servicios</h4>
  <ul className="space-y-2 text-blue-100 text-sm">
    <li>
      <a
        href="https://wa.me/50765529555?text=Hola%2C%20estoy%20interesado%20en%20el%20servicio%20de%20Instalación"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Instalación
      </a>
    </li>
    <li>
      <a
        href="https://wa.me/50765529555?text=Hola%2C%20necesito%20información%20sobre%20Mantenimiento"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Mantenimiento
      </a>
    </li>
    <li>
      <a
        href="https://wa.me/50765529555?text=Hola%2C%20quisiera%20consultar%20por%20servicio%20de%20Reparación"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Reparación
      </a>
    </li>
    <li>
      <a
        href="https://wa.me/50765529555?text=Hola%2C%20estoy%20interesado%20en%20una%20Asesoría%20Técnica"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        Asesoría Técnica
      </a>
    </li>
  </ul>
</div>

        <div>
          <h4 className="font-semibold mb-4">Soporte</h4>
          <ul className="space-y-2 text-blue-100 text-sm">
            <li><a href="#" className="hover:underline">Preguntas Frecuentes</a></li>
            <Link
  to="/contact"
  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
  className="hover:underline"
>
  Contacto
</Link>

          </ul>
        </div>
      </div>
      <div className="pt-4 border-t border-blue-800 text-center">
  <p className="text-blue-200 text-sm">
    © 2025 HIDROTEK. Todos los derechos reservados.
  </p>
</div>

    </footer>
  );
}
