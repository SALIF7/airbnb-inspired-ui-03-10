
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const FooterCopyright = () => {
  return (
    <motion.div 
      className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      viewport={{ once: true }}
    >
      <p className="text-gray-400 text-sm mb-4 md:mb-0">
        &copy; {new Date().getFullYear()} Shalom Security. Tous droits réservés.
      </p>
      <div className="flex gap-4">
        <Link to="/terms" className="text-blue-300 text-sm hover:text-blue-200 transition-colors underline">
          Conditions d'utilisation
        </Link>
        <span className="text-gray-600">|</span>
        <Link to="/privacy" className="text-blue-300 text-sm hover:text-blue-200 transition-colors underline">
          Politique de confidentialité
        </Link>
        <span className="text-gray-600">|</span>
        <Link to="/faq" className="text-gray-400 text-sm hover:text-white transition-colors">FAQ</Link>
      </div>
    </motion.div>
  );
};
