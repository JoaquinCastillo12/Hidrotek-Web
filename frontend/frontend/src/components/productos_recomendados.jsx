import React from "react";
import { Card, CardBody, CardFooter, Button, Badge } from "@heroui/react";
import { Icon } from "@iconify/react";

const products = [
  {
    id: 1,
    name: "Bomba Centrífuga XP-3000",
    price: 2499.99,
    rating: 4.8,
    reviews: 124,
    image: "https://img.heroui.chat/image/dashboard?w=400&h=400&u=waterpump6",
    isNew: true,
    discount: 15
  },
  {
    id: 2,
    name: "Bomba Sumergible Pro-Depth 200",
    price: 3899.99,
    rating: 4.9,
    reviews: 86,
    image: "https://img.heroui.chat/image/dashboard?w=400&h=400&u=waterpump7",
    isNew: false,
    discount: 0
  },
  {
    id: 3,
    name: "Bomba Presurizadora Silent-Force",
    price: 1899.99,
    rating: 4.7,
    reviews: 215,
    image: "https://img.heroui.chat/image/dashboard?w=400&h=400&u=waterpump8",
    isNew: false,
    discount: 10
  },
  {
    id: 4,
    name: "Bomba Solar EcoFlow 100W",
    price: 5299.99,
    rating: 4.6,
    reviews: 53,
    image: "https://img.heroui.chat/image/dashboard?w=400&h=400&u=waterpump9",
    isNew: true,
    discount: 0
  }
];

export const FeaturedProducts = () => {
  return (
    <section className="py-16 bg-content2">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Productos Destacados</h2>
            <p className="text-default-500">Nuestras bombas de agua más vendidas y recomendadas</p>
          </div>
          <Button 
            color="primary" 
            variant="flat" 
            endContent={<Icon icon="lucide:arrow-right" />}
            className="mt-4 md:mt-0"
          >
            Ver todos los productos
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="border border-default-200">
              <CardBody className="p-0">
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {product.isNew && (
                    <Badge color="primary" content="Nuevo" placement="top-right" className="m-2" />
                  )}
                  {product.discount > 0 && (
                    <div className="absolute top-2 left-2 bg-danger text-white text-xs font-bold px-2 py-1 rounded">
                      -{product.discount}%
                    </div>
                  )}
                </div>
              </CardBody>
              <CardFooter className="flex flex-col items-start">
                <div className="flex items-center gap-1 mb-1">
                  <Icon icon="lucide:star" className="text-warning text-sm" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-xs text-default-400">({product.reviews} reseñas)</span>
                </div>
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  {product.discount > 0 ? (
                    <>
                      <span className="text-lg font-bold text-danger">
                        ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                      </span>
                      <span className="text-sm text-default-400 line-through">
                        ${product.price.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex w-full justify-between items-center mt-4">
                  <Button 
                    color="primary" 
                    variant="solid"
                    size="sm"
                    startContent={<Icon icon="lucide:shopping-cart" />}
                  >
                    Agregar
                  </Button>
                  <Button 
                    isIconOnly
                    variant="light"
                    size="sm"
                    aria-label="Agregar a favoritos"
                  >
                    <Icon icon="lucide:heart" className="text-default-500" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};