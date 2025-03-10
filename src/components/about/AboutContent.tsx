
import React from 'react';
import { motion } from 'framer-motion';
import AboutHero from './AboutHero';
import ServicesSection from './ServicesSection';
import SecurityTips from './SecurityTips';
import ImageShowcase from './ImageShowcase';
import { containerVariants } from './animationVariants';

const AboutContent = () => {
  return (
    <motion.div 
      className="max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <AboutHero />
      
      <div className="mb-10 bg-white/90 backdrop-blur-sm rounded-lg shadow-md p-6 md:p-8 border border-gray-100">
        <ServicesSection />
        <SecurityTips />
        <ImageShowcase />
      </div>
    </motion.div>
  );
};

export default AboutContent;
