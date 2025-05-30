import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, Card, CardBody, CardFooter, Image, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { HeroSection } from "./components/hero";
import { FeaturedProducts } from "./components/productos_recomendados";
import { CategorySection } from "./components/categorias";
import { BenefitsSection } from "./components/beneficios";
import { TestimonialsSection } from "./components/testimonios";
import { Footer } from "./components/footer";
import "tailwindcss";

export default function App() {
  return (
    
    <div className="min-h-screen flex flex-col">
      <Navbar maxWidth="xl" isBordered>
        <NavbarBrand>
          <Icon icon="lucide:droplets" className="text-primary text-2xl" />
          <p className="font-bold text-inherit ml-2">AquaPump</p>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
            <Link color="foreground" href="#">
              Productos
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Categorías
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Soluciones
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="#">
              Soporte
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden sm:flex">
            <div className="flex items-center gap-2">
              <Input
                classNames={{
                  base: "max-w-full sm:max-w-[15rem] h-10",
                  mainWrapper: "h-full",
                  input: "text-small",
                  inputWrapper: "h-full font-normal text-default-500 bg-default-100",
                }}
                placeholder="Buscar productos..."
                size="sm"
                startContent={<Icon icon="lucide:search" className="text-default-400" />}
                type="search"
              />
            </div>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat" startContent={<Icon icon="lucide:user" />}>
              Iniciar Sesión
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button isIconOnly variant="light" aria-label="Carrito de compras">
              <Icon icon="lucide:shopping-cart" className="text-default-500" />
            </Button>
          </NavbarItem>
          <NavbarItem className="hidden sm:flex">
            <Dropdown>
              <DropdownTrigger>
                <Button variant="light" isIconOnly>
                  <Icon icon="lucide:globe" className="text-default-500" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Idiomas">
                <DropdownItem key="es">Español</DropdownItem>
                <DropdownItem key="en">English</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <main className="flex-grow">
        <HeroSection />
        <CategorySection />
        <FeaturedProducts />
        <BenefitsSection />
        <TestimonialsSection />
      </main>

      <Footer />
    </div>
  );
}