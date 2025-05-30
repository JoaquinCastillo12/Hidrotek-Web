import React from "react";
import { Card, CardBody, Avatar } from "@heroui/react";
import { Icon } from "@iconify/react";

const testimonials = [
  {
    id: 1,
    name: "Carlos Mendoza",
    role: "Gerente de Operaciones, Industrias Acuáticas",
    content: "Las bombas centrífugas que adquirimos han superado nuestras expectativas. El rendimiento es excepcional y el consumo energético es menor al que teníamos con nuestros equipos anteriores.",
    avatar: "https://img.heroui.chat/image/avatar?w=150&h=150&u=test1",
    rating: 5
  },
  {
    id: 2,
    name: "María Fernández",
    role: "Propietaria, Hotel Costa Azul",
    content: "El sistema de bombeo que instalamos con AquaPump ha resuelto completamente nuestros problemas de presión de agua. El servicio técnico fue impecable y muy profesional.",
    avatar: "https://img.heroui.chat/image/avatar?w=150&h=150&u=test2",
    rating: 5
  },
  {
    id: 3,
    name: "Roberto Sánchez",
    role: "Ingeniero Agrónomo",
    content: "Las bombas solares que adquirí para mi sistema de riego han sido una inversión excelente. El ahorro en electricidad es notable y el rendimiento es constante incluso en días nublados.",
    avatar: "https://img.heroui.chat/image/avatar?w=150&h=150&u=test3",
    rating: 4
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-blue-50 to-blue-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-default-500 max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="border border-default-200">
              <CardBody className="p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Icon 
                      key={i} 
                      icon="lucide:star" 
                      className={i < testimonial.rating ? "text-warning" : "text-default-300"} 
                    />
                  ))}
                </div>
                <div className="mb-6">
                  <Icon icon="lucide:quote" className="text-primary/30 text-4xl mb-2" />
                  <p className="text-default-700 italic">"{testimonial.content}"</p>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar src={testimonial.avatar} size="lg" />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-default-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};