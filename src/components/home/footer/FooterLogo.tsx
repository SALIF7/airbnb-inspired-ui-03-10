
import React from 'react';
import { Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const FooterLogo = () => {
  return (
    <div className="flex items-center mb-4">
      <img src="/lovable-uploads/94c4ec86-49e9-498e-8fd3-ecdc693ca9fd.png" alt="Logo" className="h-12 w-auto mr-3" />
      <h3 className="text-xl font-semibold">SHALOM SECURITY</h3>
    </div>
  );
};

export const FooterBranding = ({ itemVariants }: { itemVariants: any }) => {
  return (
    <motion.div variants={itemVariants}>
      <FooterLogo />
      <p className="text-gray-400 mb-4">Gardiennage et Protection - La sécurité, au centre de la vigilance.</p>
      <div className="flex space-x-2">
        <a href="#" className="bg-yellow-600 text-black p-2 rounded-full hover:bg-yellow-500 transition-colors">
          <Shield className="h-5 w-5" />
        </a>
      </div>
    </motion.div>
  );
};
