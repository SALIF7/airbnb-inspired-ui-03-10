
import React from "react";
import { Link } from "react-router-dom";
import { BriefcaseBusiness, Home, HelpCircle, Info, LogIn, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

interface NavbarMobileMenuProps {
  isOpen: boolean;
}

export const NavbarMobileMenu: React.FC<NavbarMobileMenuProps> = ({ isOpen }) => {
  if (!isOpen) return null;
  
  return (
    <motion.div 
      className="md:hidden fixed top-[60px] left-0 right-0 bg-white border-t border-gray-200 shadow-lg py-4 px-4 z-50 overflow-y-auto max-h-[calc(100vh-60px)]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <div className="space-y-4">
        <Link to="/" className="block px-4 py-3 hover:bg-gray-100 rounded-md touch-optimized">
          <div className="flex items-center">
            <Home className="mr-2 h-5 w-5 text-sholom-primary" />
            Accueil
          </div>
        </Link>
        <Link to="/emplois" className="block px-4 py-3 hover:bg-gray-100 rounded-md touch-optimized">
          <div className="flex items-center">
            <BriefcaseBusiness className="mr-2 h-5 w-5 text-sholom-primary" />
            Emplois
          </div>
        </Link>
        
        <div className="px-4 py-2">
          <div className="font-medium mb-2">Quartiers populaires</div>
          <div className="grid grid-cols-2 gap-2">
            {['Tokoin', 'Bè', 'Adidogomé', 'Agoè'].map(neighborhood => (
              <Link 
                key={neighborhood}
                to={`/?q=${neighborhood}`}
                className="text-sm px-3 py-2 bg-gray-100 rounded-md hover:bg-gray-200 touch-optimized"
              >
                {neighborhood}
              </Link>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <Link to="/about" className="block px-4 py-3 hover:bg-gray-100 rounded-md touch-optimized">
          <div className="flex items-center">
            <Info className="mr-2 h-5 w-5 text-sholom-primary" />
            À propos de nous
          </div>
        </Link>
        <Link to="/contact" className="block px-4 py-3 hover:bg-gray-100 rounded-md touch-optimized">
          <div className="flex items-center">
            <Mail className="mr-2 h-5 w-5 text-sholom-primary" />
            Nous contacter
          </div>
        </Link>
        <Link to="/support" className="block px-4 py-3 hover:bg-gray-100 rounded-md touch-optimized">
          <div className="flex items-center">
            <HelpCircle className="mr-2 h-5 w-5 text-sholom-primary" />
            Support
          </div>
        </Link>
        
        <Separator />
        
        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between">
            <Link to="/login" className="block w-full">
              <Button className="w-full bg-sholom-primary hover:bg-sholom-primary/90 touch-optimized h-11">
                <LogIn className="mr-2 h-4 w-4" />
                Connexion
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
