
import React from 'react';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/home/Footer';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { motion } from 'framer-motion';
import { Shield, User, Award, CheckCircle } from 'lucide-react';

const AboutUs = () => {
  const { settings } = useSiteSettings();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">À propos de SHALOM SECURITY</h1>
          
          <div className="mb-10 bg-white rounded-lg shadow-md p-6 md:p-8">
            <div className="flex justify-center mb-8">
              <img 
                src="/lovable-uploads/94c4ec86-49e9-498e-8fd3-ecdc693ca9fd.png" 
                alt="Logo Shalom Security" 
                className="h-32 w-auto"
              />
            </div>
            
            <h2 className="text-2xl font-semibold mb-4" style={{ color: settings.primaryColor }}>Notre Mission</h2>
            <p className="text-gray-700 mb-6 leading-relaxed">
              SHALOM SECURITY est une entreprise de gardiennage et de protection spécialisée dans la sécurité des biens et des personnes au Togo.
              Notre mission est de garantir la sécurité de nos clients avec professionnalisme et vigilance, en offrant des services
              de gardiennage de qualité supérieure adaptés aux besoins spécifiques de chaque client.
            </p>
            
            <div className="flex justify-center my-8">
              <div className="text-center bg-yellow-50 p-4 rounded-lg border border-yellow-200 max-w-lg">
                <h3 className="text-xl font-bold text-yellow-800 mb-2">Notre devise</h3>
                <p className="text-yellow-900 text-lg italic">"La sécurité, au centre de la vigilance."</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4" style={{ color: settings.primaryColor }}>Nos Services</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Shield className="w-10 h-10 text-yellow-600 mb-2" />
                <h3 className="font-medium mb-2">Gardiennage</h3>
                <p className="text-gray-600">Protection de sites résidentiels, commerciaux et industriels par des agents professionnels.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <User className="w-10 h-10 text-yellow-600 mb-2" />
                <h3 className="font-medium mb-2">Protection Rapprochée</h3>
                <p className="text-gray-600">Services de protection pour les individus et les personnalités.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <Award className="w-10 h-10 text-yellow-600 mb-2" />
                <h3 className="font-medium mb-2">Conseil en Sécurité</h3>
                <p className="text-gray-600">Audit et recommandations pour sécuriser vos locaux contre les cambriolages et le vol.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <CheckCircle className="w-10 h-10 text-yellow-600 mb-2" />
                <h3 className="font-medium mb-2">Installation de Systèmes</h3>
                <p className="text-gray-600">Installation et maintenance de systèmes d'alarme et de surveillance.</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mb-4" style={{ color: settings.primaryColor }}>Conseils de Sécurité</h2>
            <ul className="list-decimal pl-6 mb-8 space-y-2 text-gray-700">
              <li>Engager un agent de sécurité professionnel</li>
              <li>Assurer un éclairage adéquat des zones extérieures</li>
              <li>Installer des coffres-forts sécurisés</li>
              <li>Mettre en place des mesures de sécurité et d'alarme</li>
              <li>Sécuriser les portes et fenêtres côté extérieur</li>
              <li>Prévoir des dispositifs de sécurité rapprochés pour lutter contre l'agression et le vol</li>
            </ul>
            
            <div className="flex justify-center mt-8">
              <motion.img 
                src="/lovable-uploads/0ff38471-c7cc-446c-99b2-391c850dbcdd.png" 
                alt="Logo Shalom Security" 
                className="rounded-lg shadow-md max-w-full h-auto"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
