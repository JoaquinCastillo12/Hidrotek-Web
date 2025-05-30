import React from "react";
import { Link, Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

export const Footer = () => {
  return (
    <footer className="bg-content3 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <Icon icon="lucide:droplets" className="text-primary text-2xl" />
              <span className="font-bold text-xl ml-2">AquaPump</span>
            </div>
            <p className="text-default-500 mb-4">
              Soluciones de bombeo profesionales para aplicaciones residenciales, comerciales e industriales desde 1995.
            </p>
            <div className="flex gap-4">
              <Link href="#" aria-label="Facebook">
                <Icon icon="lucide:facebook" className="text-default-500 hover:text-primary text-xl" />
              </Link>
              <Link href="#" aria-label="Instagram">
                <Icon icon="lucide:instagram" className="text-default-500 hover:text-primary text-xl" />
              </Link>
              <Link href="#" aria-label="Twitter">
                <Icon icon="lucide:twitter" className="text-default-500 hover:text-primary text-xl" />
              </Link>
              <Link href="#" aria-label="LinkedIn">
                <Icon icon="lucide:linkedin" className="text-default-500 hover:text-primary text-xl" />
              </Link>
              <Link href="#" aria-label="YouTube">
                <Icon icon="lucide:youtube" className="text-default-500 hover:text-primary text-xl" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Productos</h3>
            <ul className="space-y-2">
              <li><Link color="foreground" href="#">Bombas Centrífugas</Link></li>
              <li><Link color="foreground" href="#">Bombas Sumergibles</Link></li>
              <li><Link color="foreground" href="#">Bombas Presurizadoras</Link></li>
              <li><Link color="foreground" href="#">Bombas Solares</Link></li>
              <li><Link color="foreground" href="#">Accesorios</Link></li>
              <li><Link color="foreground" href="#">Repuestos</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Servicios</h3>
            <ul className="space-y-2">
              <li><Link color="foreground" href="#">Asesoría Técnica</Link></li>
              <li><Link color="foreground" href="#">Instalación</Link></li>
              <li><Link color="foreground" href="#">Mantenimiento</Link></li>
              <li><Link color="foreground" href="#">Reparación</Link></li>
              <li><Link color="foreground" href="#">Proyectos Especiales</Link></li>
              <li><Link color="foreground" href="#">Capacitación</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Suscríbete</h3>
            <p className="text-default-500 mb-4">
              Recibe nuestras ofertas y novedades directamente en tu correo.
            </p>
            <div className="flex flex-col gap-2">
              <Input
                placeholder="Tu correo electrónico"
                type="email"
                size="sm"
              />
              <Button 
                color="primary" 
                size="sm"
                endContent={<Icon icon="lucide:send" />}
              >
                Suscribirse
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-default-200 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-default-500 text-sm">
              © 2024 AquaPump. Todos los derechos reservados.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="text-default-500 text-sm">Términos y Condiciones</Link>
              <Link href="#" className="text-default-500 text-sm">Política de Privacidad</Link>
              <Link href="#" className="text-default-500 text-sm">Política de Cookies</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};