
import React from 'react';
import { ScrollAnimation } from '@/components/ui/scroll-animation';
import { motion } from 'framer-motion';

// Import the sub-components
import { FooterBranding } from './footer/FooterLogo';
import { FooterServices } from './footer/FooterServices';
import { FooterLinks } from './footer/FooterLinks';
import { FooterContact } from './footer/FooterContact';
import { FooterCopyright } from './footer/FooterCopyright';
import { containerVariants, itemVariants } from './footer/footerAnimations';

export const Footer = () => {
  return (
    <ScrollAnimation direction="up" duration={0.8}>
      <footer className="bg-gray-900 text-white pt-16 pb-8 w-full">
        <div className="content-container">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <FooterBranding itemVariants={itemVariants} />
            <FooterServices itemVariants={itemVariants} />
            <FooterLinks itemVariants={itemVariants} />
            <FooterContact itemVariants={itemVariants} />
          </motion.div>
          
          <FooterCopyright />
        </div>
      </footer>
    </ScrollAnimation>
  );
};
