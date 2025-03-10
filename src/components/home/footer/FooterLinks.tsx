
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const FooterLinks = ({ itemVariants }: { itemVariants: any }) => {
  return (
    <motion.div variants={itemVariants}>
      <h3 className="text-xl font-semibold mb-4">Liens utiles</h3>
      <ul className="space-y-3">
        <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">À propos</Link></li>
        <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
        <li><Link to="/faq" className="text-gray-300 hover:text-white transition-colors">FAQ</Link></li>
        <li>
          <Link to="/terms" className="text-blue-300 hover:text-blue-200 transition-colors underline">
            Conditions d'utilisation
          </Link>
        </li>
        <li>
          <Link to="/privacy" className="text-blue-300 hover:text-blue-200 transition-colors underline">
            Politique de confidentialité
          </Link>
        </li>
      </ul>
    </motion.div>
  );
};
