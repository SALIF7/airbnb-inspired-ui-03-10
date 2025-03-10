
import React from 'react';
import { motion } from 'framer-motion';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { itemVariants } from './animationVariants';

const SecurityTips = () => {
  const { settings } = useSiteSettings();

  return (
    <motion.div variants={itemVariants}>
      <h2 className="text-2xl font-semibold mb-4" style={{ color: settings.primaryColor }}>Conseils de Sécurité</h2>
      <ul className="list-decimal pl-6 mb-8 space-y-2 text-gray-700">
        <motion.li 
          className="hover:translate-x-1 transition-transform duration-200"
          whileHover={{ x: 5 }}
        >Engager un agent de sécurité professionnel</motion.li>
        <motion.li 
          className="hover:translate-x-1 transition-transform duration-200"
          whileHover={{ x: 5 }}
        >Assurer un éclairage adéquat des zones extérieures</motion.li>
        <motion.li 
          className="hover:translate-x-1 transition-transform duration-200"
          whileHover={{ x: 5 }}
        >Installer des coffres-forts sécurisés</motion.li>
        <motion.li 
          className="hover:translate-x-1 transition-transform duration-200"
          whileHover={{ x: 5 }}
        >Mettre en place des mesures de sécurité et d'alarme</motion.li>
        <motion.li 
          className="hover:translate-x-1 transition-transform duration-200"
          whileHover={{ x: 5 }}
        >Sécuriser les portes et fenêtres côté extérieur</motion.li>
        <motion.li 
          className="hover:translate-x-1 transition-transform duration-200"
          whileHover={{ x: 5 }}
        >Prévoir des dispositifs de sécurité rapprochés pour lutter contre l'agression et le vol</motion.li>
      </ul>
    </motion.div>
  );
};

export default SecurityTips;
