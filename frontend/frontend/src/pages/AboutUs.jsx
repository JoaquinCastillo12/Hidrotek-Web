import { Icon } from "@iconify/react";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      {/* Sección de Nuestros Servicios */}
      <section className="w-full bg-white py-16 flex-1" id="servicios">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-3">Nuestros Servicios</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Soluciones completas para la instalación y mantenimiento de sus sistemas de bombeo, así como venta de equipos de alta calidad.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Icon icon="lucide:settings" className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold">Instalación de Sistemas de Bombeo Residenciales</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Nuestro equipo de técnicos certificados realiza instalaciones precisas y seguras, garantizando el funcionamiento óptimo de su sistema de bombeo residencial.
              </p>
              <ul className="space-y-2 mb-4 text-blue-700">
                <li>✓ Evaluación del sitio</li>
                <li>✓ Dimensionamiento adecuado</li>
                <li>✓ Instalación certificada</li>
                <li>✓ Pruebas de funcionamiento</li>
              </ul>
              <button
  className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
  onClick={() => {
    const msg = encodeURIComponent("Hola, quiero solicitar una instalación de bomba de agua residencial.");
    window.open(`https://wa.me/65258464?text=${msg}`, "_blank");
  }}
>
                Solicitar Instalación
              </button>
            </div>
            <div className="bg-blue-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Icon icon="lucide:waves" className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold">Instalación de Bombas Sumergibles para Pozo</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Instalamos bombas sumergibles para pozos profundos, asegurando un suministro confiable y eficiente de agua subterránea para su hogar o negocio.
              </p>
              <ul className="space-y-2 mb-4 text-blue-700">
                <li>✓ Asesoría en selección de bomba</li>
                <li>✓ Instalación profesional</li>
                <li>✓ Mantenimiento y soporte</li>
              </ul>
              <button
  className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition"
  onClick={() => {
    const msg = encodeURIComponent("Hola, necesito agendar un servicio de mantenimiento o reparación.");
    window.open(`https://wa.me/65258464?text=${msg}`, "_blank");
  }}
>
                Agendar Servicio
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Galería de Ejemplo de Servicios */}
      <section className="w-full py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-3">Ejemplos de Nuestros Servicios</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conozca algunos de los servicios que ofrecemos a nuestros clientes.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
              <img
                src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                alt="Instalación de sistemas de bombeo residenciales"
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-blue-800 font-semibold text-lg mb-2">Instalación de sistemas de bombeo residenciales</h3>
                <p className="text-gray-500 text-sm">
                  Instalaciones profesionales para hogares, garantizando presión y suministro constante de agua.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
              <img
                src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80"
                alt="Instalación de bombas sumergibles para pozo"
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-blue-800 font-semibold text-lg mb-2">Instalación de bombas sumergibles para pozo</h3>
                <p className="text-gray-500 text-sm">
                  Soluciones para extracción de agua subterránea con equipos sumergibles de alta eficiencia.
                </p>
              </div>
            </div>
            <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col">
              <img
                src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80"
                alt="Venta de equipos de bombeo"
                className="w-full h-48 object-cover"
              />
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-blue-800 font-semibold text-lg mb-2">Venta de equipos de bombeo</h3>
                <p className="text-gray-500 text-sm">
                  Ofrecemos una amplia gama de bombas y accesorios para todo tipo de necesidades residenciales y comerciales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}