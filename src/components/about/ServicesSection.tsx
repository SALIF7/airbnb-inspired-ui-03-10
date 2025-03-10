
import React from 'react';
import { motion } from 'framer-motion';
import { Shield, User, Award, CheckCircle } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { itemVariants } from './animationVariants';

const ServicesSection = () => {
  const { settings } = useSiteSettings();

  return (
    <motion.div variants={itemVariants}>
      <h2 id="services" className="text-2xl font-semibold mb-4" style={{ color: settings.primaryColor }}>Nos Services</h2>
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <motion.div 
          id="gardiennage" 
          className="bg-gray-50 p-4 rounded-lg hover-lift"
          whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        >
          <Shield className="w-10 h-10 text-yellow-600 mb-2" />
          <h3 className="font-medium mb-2">Gardiennage</h3>
          <p className="text-gray-600">Protection de sites résidentiels, commerciaux et industriels par des agents professionnels.</p>
        </motion.div>
        <motion.div 
          id="protection" 
          className="bg-gray-50 p-4 rounded-lg hover-lift"
          whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        >
          <User className="w-10 h-10 text-yellow-600 mb-2" />
          <h3 className="font-medium mb-2">Protection Rapprochée</h3>
          <p className="text-gray-600">Services de protection pour les individus et les personnalités.</p>
        </motion.div>
        <motion.div 
          id="conseil" 
          className="bg-gray-50 p-4 rounded-lg hover-lift"
          whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        >
          <Award className="w-10 h-10 text-yellow-600 mb-2" />
          <h3 className="font-medium mb-2">Conseil en Sécurité</h3>
          <p className="text-gray-600">Audit et recommandations pour sécuriser vos locaux contre les cambriolages et le vol.</p>
        </motion.div>
        <motion.div 
          id="installation" 
          className="bg-gray-50 p-4 rounded-lg hover-lift"
          whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
        >
          <CheckCircle className="w-10 h-10 text-yellow-600 mb-2" />
          <h3 className="font-medium mb-2">Installation de Systèmes</h3>
          <p className="text-gray-600">Installation et maintenance de systèmes d'alarme et de surveillance.</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServicesSection;
