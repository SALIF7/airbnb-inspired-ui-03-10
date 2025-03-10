
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { NavbarLogo } from "./NavbarLogo";
import { NavbarDesktopMenu } from "./NavbarDesktopMenu";
import { NavbarSearchBar } from "./NavbarSearchBar";
import { NavbarUserMenu } from "./NavbarUserMenu";
import { NavbarMobileMenu } from "./NavbarMobileMenu";
import { BackButton } from "@/components/shared/BackButton";

export const Navbar = () => {
  const location = useLocation();
  const { settings } = useSiteSettings();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Vérifiez si nous sommes sur la page d'accueil
  const isHomePage = location.pathname === "/" || location.pathname === "/index";

  // Détection du scroll pour modifier l'apparence de la navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Appliquer les paramètres du site au chargement
  useEffect(() => {
    document.documentElement.style.setProperty('--primary', settings.primaryColor);
    document.documentElement.style.setProperty('--secondary', settings.secondaryColor);
    
    // Ajouter une variable CSS pour la couleur du texte de la navbar en fonction de l'état de défilement
    document.documentElement.style.setProperty(
      '--navbar-text-color', 
      scrolled ? settings.primaryColor : "#111827"
    );
  }, [settings.primaryColor, settings.secondaryColor, scrolled]);

  return (
    <>
      <div
        className={`w-full fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "py-2 shadow-md bg-white/95 backdrop-blur-sm" : "py-4 bg-transparent"
        }`}
      >
        <div className="navbar-container mx-auto flex items-center justify-between">
          {/* Logo et Nom du site */}
          <NavbarLogo />

          {/* Navigation principale - Desktop */}
          <NavbarDesktopMenu />

          {/* Barre de recherche */}
          <NavbarSearchBar />

          {/* Actions utilisateur */}
          <NavbarUserMenu 
            mobileMenuOpen={mobileMenuOpen} 
            setMobileMenuOpen={setMobileMenuOpen} 
          />
        </div>

        {/* Menu mobile */}
        <NavbarMobileMenu isOpen={mobileMenuOpen} />
      </div>
    </>
  );
};
