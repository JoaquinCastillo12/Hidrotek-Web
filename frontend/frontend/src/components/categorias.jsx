import React from "react";
import { Card, CardBody, CardFooter, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

const categories = [
  {
    id: 1,
    title: "Bombas Centrífugas",
    icon: "lucide:circle",
    description: "Ideales para transferencia de agua limpia en aplicaciones residenciales y comerciales",
    image: "https://img.heroui.chat/image/dashboard?w=400&h=300&u=waterpump2"
  },
  {
    id: 2,
    title: "Bombas Sumergibles",
    icon: "lucide:droplets",
    description: "Perfectas para pozos profundos, drenaje y aplicaciones subacuáticas",
    image: "https://img.heroui.chat/image/dashboard?w=400&h=300&u=waterpump3"
  },
  {
    id: 3,
    title: "Bombas Presurizadoras",
    icon: "lucide:gauge",
    description: "Aumentan la presión del agua en sistemas residenciales y comerciales",
    image: "https://img.heroui.chat/image/dashboard?w=400&h=300&u=waterpump4"
  },
  {
    id: 4,
    title: "Bombas Solares",
    icon: "lucide:sun",
    description: "Soluciones ecológicas alimentadas por energía solar para zonas remotas",
    image: "https://img.heroui.chat/image/dashboard?w=400&h=300&u=waterpump5"
  }
];

export const CategorySection = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Categorías de Productos</h2>
          <p className="text-default-500 max-w-2xl mx-auto">
            Explore nuestra amplia gama de bombas de agua para diferentes aplicaciones y necesidades específicas
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card key={category.id} className="border border-default-200 hover:border-primary transition-all duration-300">
              <CardBody className="p-0">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-background/80 backdrop-blur-sm p-2 rounded-full">
                    <Icon icon={category.icon} className="text-primary text-xl" />
                  </div>
                </div>
              </CardBody>
              <CardFooter className="flex flex-col items-start">
                <h3 className="text-lg font-semibold">{category.title}</h3>
                <p className="text-default-500 text-sm my-2">{category.description}</p>
                <Button 
                  color="primary" 
                  variant="light" 
                  endContent={<Icon icon="lucide:chevron-right" />}
                  className="p-0"
                >
                  Ver productos
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};