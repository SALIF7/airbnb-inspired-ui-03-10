
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

export const FooterContact = ({ itemVariants }: { itemVariants: any }) => {
  return (
    <motion.div variants={itemVariants}>
      <h3 className="text-xl font-semibold mb-4">Contact</h3>
      <ul className="space-y-3">
        <li className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-yellow-500" />
          <span className="text-gray-300">+228 90-19-03-41</span>
        </li>
        <li className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-yellow-500" />
          <span className="text-gray-300">+228 98-89-41-23</span>
        </li>
        <li className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-yellow-500" />
          <a href="mailto:Shalomjob@gmail.com" className="text-gray-300 hover:text-white transition-colors">Shalomjob@gmail.com</a>
        </li>
        <li className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-yellow-500 mt-1" />
          <span className="text-gray-300">Tokoin Trésor, ancien immeuble Udecto, Lomé, Togo</span>
        </li>
      </ul>
      
      <div className="flex gap-4 mt-6">
        <a href="#" className="text-gray-300 hover:text-white transition-colors">
          <Facebook className="w-6 h-6" />
        </a>
        <a href="#" className="text-gray-300 hover:text-white transition-colors">
          <Twitter className="w-6 h-6" />
        </a>
        <a href="#" className="text-gray-300 hover:text-white transition-colors">
          <Instagram className="w-6 h-6" />
        </a>
        <a href="#" className="text-gray-300 hover:text-white transition-colors">
          <Youtube className="w-6 h-6" />
        </a>
      </div>
    </motion.div>
  );
};
