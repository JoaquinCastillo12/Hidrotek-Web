import { Icon } from "@iconify/react";
import React, { useState } from "react";
import Header from '../components/Header';
import Footer from '../components/footer';

export default function Contact() {
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    mensaje: "",
  });
  const [enviado, setEnviado] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await fetch("https://hidrotek.onrender.com/api/contact-message/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setEnviado(true);
    setForm({ nombre: "", apellido: "", email: "", telefono: "", mensaje: "" });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <section className="w-full bg-white py-16 flex-1" id="contacto">
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
                  <a
  href="tel:+5077704700"
  className="text-gray-500 hover:underline"
>
  +507 770-4700
</a>

                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 p-2 rounded-full">
                  <Icon icon="lucide:mail" className="text-blue-600 text-xl" />
                </span>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <a
  href="mailto:ventashidrotek@gmail.com"
  className="text-gray-500 hover:underline"
>
  ventashidrotek@gmail.com
</a>

                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="bg-blue-100 p-2 rounded-full">
                  <Icon icon="lucide:clock" className="text-blue-600 text-xl" />
                </span>
                <div>
                  <h4 className="font-medium">Horario</h4>
                  <p className="text-gray-500">Lun - Vie: 8:00a.m. - 5:00p.m. <br />
                    Sab: 8:00a.m. - 3:30p.m.</p>
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
        {/* Mapa interactivo Google Maps */}
        <div className="max-w-7xl mx-auto px-6 mt-12">
          <h3 className="text-xl font-semibold mb-4 text-blue-800">Ubicación en el mapa</h3>
          <div className="rounded-xl overflow-hidden shadow-lg border border-blue-100">
            <iframe
              title="Ubicación AquaPump"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.8519456638446!2d-82.6191674!3d8.5137525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa5a3d07e618f5f%3A0x5118520908520152!2sHIDROTEK!5e0!3m2!1ses!2spa!4v1749325024369!5m2!1ses!2spa" 
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}