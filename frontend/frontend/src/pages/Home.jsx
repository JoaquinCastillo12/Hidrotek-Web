import { useState, useEffect } from 'react';
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Header from '../components/Header';
import Footer from '../components/footer';
import { useNavigate } from "react-router-dom";



export default function Home() {
  const navigate = useNavigate();

  // Cambia este número por el tuyo real de WhatsApp
  const whatsappNumber = "65258464";
  const whatsappMessage = "Hola, quiero información sobre bombas de agua residenciales.";
  const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Navbar */}
      <Header />

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 bg-dots">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <motion.div 
            className="flex-1 mb-8 md:mb-0 md:pr-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Bombas de Agua <span className="text-blue-600">Residenciales</span> de Alta Calidad
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Soluciones confiables para el suministro de agua en su hogar. Eficiencia energética y durabilidad garantizada.
            </p>
            <div className="flex flex-wrap gap-3">
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-md font-medium flex items-center gap-2 hover:bg-blue-700 transition"
                onClick={() => navigate('/products')}
              >
                Ver Catálogo
                <Icon icon="lucide:arrow-right" />
              </button>
              <a
                href={whatsappURL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-md font-medium flex items-center gap-2 hover:bg-blue-50 transition"
              >
                <Icon icon="lucide:phone" />
                Contactar Asesor
              </a>
            </div>
          </motion.div>
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <img
              alt="Bomba de agua residencial"
              src="https://img.heroui.chat/image/dashboard?w=600&h=400&u=waterpump1"
              className="object-cover rounded-xl shadow-lg w-full max-w-lg"
              width={600}
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-gray-50" id="productos">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl font-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Nuestros Productos Destacados
            </motion.h2>
            <motion.p 
              className="text-gray-500 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Ofrecemos una amplia gama de bombas de agua para diferentes necesidades residenciales
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
  title: "Bombas Centrífugas",
  description: "Ideales para aumentar la presión del agua en toda la casa",
  icon: "lucide:gauge",
  image: "/IMAGEN DESTACADA 1.jpg",
  categoria: "BOMBAS CENTRIFUGAS"
},
{
  title: "Bombas Sumergibles",
  description: "Perfectas para pozos y extracción de agua subterránea",
  icon: "lucide:waves",
  image: "/IMAGEN DESTACADA 2.jpg",
  categoria: "BOMBAS PARA POZO"
},
{
  title: "Sistemas de Presión",
  description: "Mantienen la presión constante en toda la instalación",
  icon: "lucide:activity",
  image: "/IMAGEN DESTACADA 3.jpg",
  categoria: "SISTEMAS HIDRONEUMATICOS"
}
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                  <img
  alt={item.title}
  className="w-full h-60 md:h-56 lg:h-80 object-cover"
  src={item.image}
/>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="bg-blue-100 p-2 rounded-full">
                        <Icon icon={item.icon} className="text-blue-600 text-xl" />
                      </div>
                      <h3 className="text-xl font-semibold">{item.title}</h3>
                    </div>
                    <p className="text-gray-500">{item.description}</p>
                    <button className="mt-4 flex items-center gap-1 text-blue-600 hover:underline font-medium"onClick={() => navigate(`/products?categoria=${encodeURIComponent(item.categoria)}`)}>
                      Ver detalles
                      <Icon icon="lucide:chevron-right" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="w-full bg-white py-16" id="servicios">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-3">Nuestros Servicios</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Soluciones completas para la instalación y mantenimiento de sus sistemas de bombeo
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-50 p-8 rounded-xl shadow-md">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <i className="text-blue-600 text-2xl">
                    <svg width="24" height="24" fill="none"><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 9V7a5 5 0 1110 0v2M5 17h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </i>
                </div>
                <h3 className="text-xl font-semibold">Instalación Profesional</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Nuestro equipo de técnicos certificados realiza instalaciones precisas y seguras, garantizando el funcionamiento óptimo de su sistema de bombeo.
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
                  <i className="text-blue-600 text-2xl">
                    <svg width="24" height="24" fill="none"><path d="M12 8v4l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </i>
                </div>
                <h3 className="text-xl font-semibold">Mantenimiento y Reparación</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Servicio de mantenimiento preventivo y correctivo para extender la vida útil de sus equipos y garantizar su funcionamiento continuo.
              </p>
              <ul className="space-y-2 mb-4 text-blue-700">
                <li>✓ Diagnóstico completo</li>
                <li>✓ Reparación de emergencia</li>
                <li>✓ Mantenimiento programado</li>
                <li>✓ Repuestos originales</li>
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

      {/* Preguntas Frecuentes */}
      <section className="w-full bg-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-800 mb-3">Preguntas Frecuentes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Respuestas a las dudas más comunes sobre nuestros productos y servicios
            </p>
          </div>
          <div className="space-y-4">
            <details className="bg-white rounded-lg shadow p-4">
              <summary className="font-semibold cursor-pointer">¿Qué tipo de bomba necesito para mi casa?</summary>
              <p className="mt-2 text-gray-600">
                La elección de la bomba adecuada depende de varios factores como el tamaño de su hogar, la cantidad de personas, la presión de agua deseada y la fuente de agua. Nuestros asesores técnicos pueden realizar una evaluación personalizada para recomendarle la mejor opción.
              </p>
            </details>
            <details className="bg-white rounded-lg shadow p-4">
              <summary className="font-semibold cursor-pointer">¿Cuál es la vida útil de una bomba de agua?</summary>
              <p className="mt-2 text-gray-600">
                Con un mantenimiento adecuado, nuestras bombas de agua residenciales tienen una vida útil promedio de 8 a 12 años. Factores como la calidad del agua, frecuencia de uso y mantenimiento regular pueden afectar significativamente su durabilidad.
              </p>
            </details>
            <details className="bg-white rounded-lg shadow p-4">
              <summary className="font-semibold cursor-pointer">¿Ofrecen garantía en sus productos?</summary>
              <p className="mt-2 text-gray-600">
                Sí, todos nuestros productos cuentan con garantía de fábrica de 2 años contra defectos de fabricación. Además, ofrecemos garantía extendida opcional de hasta 5 años en modelos seleccionados.
              </p>
            </details>
            <details className="bg-white rounded-lg shadow p-4">
              <summary className="font-semibold cursor-pointer">¿Cuánto consume de electricidad una bomba de agua?</summary>
              <p className="mt-2 text-gray-600">
                El consumo eléctrico varía según el modelo y potencia de la bomba. Nuestras bombas residenciales más eficientes consumen entre 0.5 y 1.5 kWh por hora de funcionamiento. Ofrecemos modelos con certificación de eficiencia energética que pueden reducir significativamente el consumo.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="w-full bg-white py-16" id="contacto">
         <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-12">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-blue-800 mb-3">Contáctenos</h2>
            <p className="text-gray-700 mb-6">
              Estamos listos para ayudarle con todas sus necesidades de bombeo de agua residencial.
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 p-2 rounded-full">
                  <Icon icon="lucide:map-pin" className="text-blue-600 text-xl" />
                </span>
                <div>
                  <h4 className="font-medium">Dirección</h4>
                   <a
      href="https://maps.app.goo.gl/hqeKLbiRZSmM8UcE9"
      target="_blank"
      rel="noopener noreferrer"
      className="text-gray-500 hover:underline"
    >
      G97J+G84, La Concepción, Provincia de Chiriquí
    </a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 p-2 rounded-full">
                  <Icon icon="lucide:phone" className="text-blue-600 text-xl" />
                </span>
                <div>
                  <h4 className="font-medium">Teléfono</h4>
                  <p className="text-gray-500">+507 770-4700</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 p-2 rounded-full">
                  <Icon icon="lucide:mail" className="text-blue-600 text-xl" />
                </span>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-gray-500">ventashidrotek@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 p-2 rounded-full">
                  <Icon icon="lucide:clock" className="text-blue-600 text-xl" />
                </span>
                <div>
                  <h4 className="font-medium">Horario</h4>
                  <p className="text-gray-500">Lun - Vie: 8:00a.m. - 5:00p.m.</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <a href="https://www.facebook.com/profile.php?id=100040970053594&locale=nb_NO" className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition">
                <Icon icon="logos:facebook" className="text-xl" />
              </a>
              <a href="https://www.instagram.com/hidrotekpanama" className="bg-blue-100 p-2 rounded-full hover:bg-blue-200 transition">
                <Icon icon="lucide:instagram" className="text-xl" />
              </a>
             <a
    href="https://wa.me/65258464"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-100 p-2 rounded-full hover:bg-green-200 transition flex items-center"
    title="WhatsApp"
  >
    <Icon icon="logos:whatsapp-icon" className="text-xl text-green-600" />
  </a>
            </div>
          </div>
          <div className="flex-1 bg-blue-50 rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Envíenos un mensaje</h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input className="border border-gray-300 rounded-md px-4 py-2 w-full" placeholder="Su nombre" />
                <input className="border border-gray-300 rounded-md px-4 py-2 w-full" placeholder="Su apellido" />
              </div>
              <input className="border border-gray-300 rounded-md px-4 py-2 w-full" placeholder="correo@ejemplo.com" type="email" />
              <input className="border border-gray-300 rounded-md px-4 py-2 w-full" placeholder="Su número telefónico" />
              <textarea className="border border-gray-300 rounded-md px-4 py-2 w-full" placeholder="¿Cómo podemos ayudarle?" rows={4} />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium w-full hover:bg-blue-700 transition" type="submit">
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </section>
<Footer />
    
    </div>
  );
}