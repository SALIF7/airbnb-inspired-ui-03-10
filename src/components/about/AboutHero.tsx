
import React from 'react';
import { motion } from 'framer-motion';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { highlightVariants, imageVariants, itemVariants } from './animationVariants';

const AboutHero = () => {
  const { settings } = useSiteSettings();

  return (
    <>
      <motion.h1 
        className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-8 text-center text-sholom-dark leading-tight"
        variants={itemVariants}
      >
        À propos de <span className="text-sholom-primary italic">SHALOM SECURITY</span>
      </motion.h1>
      
      <div className="mb-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 md:p-8 border border-gray-100">
        <motion.div 
          className="flex justify-center mb-8"
          variants={imageVariants}
        >
          <img 
            src="/lovable-uploads/94c4ec86-49e9-498e-8fd3-ecdc693ca9fd.png" 
            alt="Logo Shalom Security" 
            className="h-32 w-auto hover-scale"
          />
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: settings.primaryColor }}>Notre Mission</h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            SHALOM SECURITY est une entreprise de gardiennage et de protection spécialisée dans la sécurité des biens et des personnes au Togo.
            Notre mission est de garantir la sécurité de nos clients avec professionnalisme et vigilance, en offrant des services
            de gardiennage de qualité supérieure adaptés aux besoins spécifiques de chaque client.
          </p>
        </motion.div>
        
        <motion.div 
          className="flex justify-center my-8"
          variants={highlightVariants}
        >
          <div className="text-center bg-yellow-50 p-4 rounded-lg border border-yellow-200 max-w-lg hover-lift">
            <h3 className="text-xl font-bold text-yellow-800 mb-2">Notre devise</h3>
            <p className="text-yellow-900 text-lg italic">"La sécurité, au centre de la vigilance."</p>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default AboutHero;
