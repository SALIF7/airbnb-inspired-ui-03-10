
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export const FooterServices = ({ itemVariants }: { itemVariants: any }) => {
  return (
    <motion.div variants={itemVariants}>
      <h3 className="text-xl font-semibold mb-4">Nos Services</h3>
      <ul className="space-y-3">
        <li>
          <Link to="/about#gardiennage" className="text-gray-300 hover:text-white transition-colors">
            Gardiennage
          </Link>
        </li>
        <li>
          <Link to="/about#protection" className="text-gray-300 hover:text-white transition-colors">
            Protection rapprochée
          </Link>
        </li>
        <li>
          <Link to="/about#conseil" className="text-gray-300 hover:text-white transition-colors">
            Conseil en sécurité
          </Link>
        </li>
        <li>
          <Link to="/about#installation" className="text-gray-300 hover:text-white transition-colors">
            Installation de systèmes
          </Link>
        </li>
      </ul>
    </motion.div>
  );
};
