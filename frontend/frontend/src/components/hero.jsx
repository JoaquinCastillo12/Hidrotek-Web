import React from "react";
import { Button, Card } from "@heroui/react";
import { Icon } from "@iconify/react";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-blue-100 py-16 md:py-24">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/2 -translate-y-1/4 rounded-full bg-primary/30 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 h-[600px] w-[600px] -translate-x-1/2 translate-y-1/4 rounded-full bg-primary/30 blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Soluciones de bombeo profesionales para cada necesidad
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Ofrecemos la más amplia gama de bombas de agua de alta calidad para aplicaciones residenciales, comerciales e industriales.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                color="primary" 
                size="lg" 
                endContent={<Icon icon="lucide:arrow-right" />}
              >
                Ver Catálogo
              </Button>
              <Button 
                variant="bordered" 
                size="lg"
                startContent={<Icon icon="lucide:phone" />}
              >
                Contactar Asesor
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="flex items-center gap-2">
                <Icon icon="lucide:truck" className="text-primary text-xl" />
                <span className="text-sm font-medium">Envío Gratis</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="lucide:shield-check" className="text-primary text-xl" />
                <span className="text-sm font-medium">Garantía 2 Años</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon="lucide:headphones" className="text-primary text-xl" />
                <span className="text-sm font-medium">Soporte 24/7</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://img.heroui.chat/image/dashboard?w=600&h=500&u=waterpump1"
                alt="Bomba de agua industrial"
                className="rounded-lg shadow-lg w-full object-cover"
              />
            </div>
            <Card className="absolute -bottom-6 -left-6 z-20 max-w-[200px] shadow-lg">
              <div className="p-4 flex items-center gap-3">
                <div className="bg-success/10 rounded-full p-2">
                  <Icon icon="lucide:badge-check" className="text-success text-xl" />
                </div>
                <div>
                  <p className="text-sm font-medium">Certificación</p>
                  <p className="text-xs text-default-500">ISO 9001:2015</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};