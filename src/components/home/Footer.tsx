
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Shield } from 'lucide-react';
import { useSiteSettings } from '@/hooks/useSiteSettings';
import { motion } from 'framer-motion';
import { ScrollAnimation } from '@/components/ui/scroll-animation';

export const Footer = () => {
  const { settings } = useSiteSettings();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
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
            <motion.div variants={itemVariants}>
              <div className="flex items-center mb-4">
                <img src="/lovable-uploads/94c4ec86-49e9-498e-8fd3-ecdc693ca9fd.png" alt="Logo" className="h-12 w-auto mr-3" />
                <h3 className="text-xl font-semibold">SHALOM SECURITY</h3>
              </div>
              <p className="text-gray-400 mb-4">Gardiennage et Protection - La sécurité, au centre de la vigilance.</p>
              <div className="flex space-x-2">
                <a href="#" className="bg-yellow-600 text-black p-2 rounded-full hover:bg-yellow-500 transition-colors">
                  <Shield className="h-5 w-5" />
                </a>
              </div>
            </motion.div>
            
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
          </motion.div>
          
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
        </div>
      </footer>
    </ScrollAnimation>
  );
};
