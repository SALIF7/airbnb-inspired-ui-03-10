
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import { imageVariants } from './animationVariants';

const ImageShowcase = () => {
  return (
    <motion.div 
      className="flex justify-center mt-8"
      variants={imageVariants}
    >
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <img 
          src="/lovable-uploads/0ff38471-c7cc-446c-99b2-391c850dbcdd.png" 
          alt="Logo Shalom Security" 
          className="hover-scale max-w-full h-auto transition-transform duration-300"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
          <div className="flex items-center text-white gap-4">
            <div>
              <p className="text-lg font-medium">Protection de qualité</p>
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Tokoin, Lomé</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ImageShowcase;
