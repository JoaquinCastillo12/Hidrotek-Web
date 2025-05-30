import React from "react";
import { Card, CardBody } from "@heroui/react";
import { Icon } from "@iconify/react";

const benefits = [
  {
    id: 1,
    title: "Asesoría Técnica Especializada",
    description: "Nuestro equipo de ingenieros te ayudará a seleccionar la bomba ideal para tu aplicación específica.",
    icon: "lucide:users"
  },
  {
    id: 2,
    title: "Garantía Extendida",
    description: "Todas nuestras bombas incluyen 2 años de garantía con posibilidad de extensión.",
    icon: "lucide:shield"
  },
  {
    id: 3,
    title: "Servicio Post-Venta",
    description: "Mantenimiento preventivo y correctivo para asegurar el óptimo funcionamiento de tu equipo.",
    icon: "lucide:wrench"
  },
  {
    id: 4,
    title: "Repuestos Originales",
    description: "Amplio stock de repuestos originales para todas las marcas que comercializamos.",
    icon: "lucide:cog"
  },
  {
    id: 5,
    title: "Instalación Profesional",
    description: "Servicio de instalación por técnicos certificados en todo el país.",
    icon: "lucide:hard-hat"
  },
  {
    id: 6,
    title: "Financiamiento Flexible",
    description: "Opciones de pago y financiamiento adaptadas a tus necesidades.",
    icon: "lucide:credit-card"
  }
];

export const BenefitsSection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">¿Por qué elegirnos?</h2>
          <p className="text-default-500 max-w-2xl mx-auto">
            En AquaPump no solo vendemos bombas de agua, ofrecemos soluciones integrales con el mejor servicio
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit) => (
            <Card key={benefit.id} className="border border-default-200">
              <CardBody className="flex flex-col items-center text-center p-6">
                <div className="bg-primary/10 rounded-full p-4 mb-4">
                  <Icon icon={benefit.icon} className="text-primary text-2xl" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-default-500">{benefit.description}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};