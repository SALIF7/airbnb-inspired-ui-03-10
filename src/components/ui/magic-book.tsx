import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface MagicBookProps {
  className?: string;
  title?: string;
  onClick?: () => void;
  position?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  isOpen?: boolean;
}

export const MagicBook: React.FC<MagicBookProps> = ({ 
  className = "",
  title,
  onClick,
  position = "bottom-left",
  isOpen = false
}) => {
  const [localIsOpen, setLocalIsOpen] = useState(isOpen);
  const { t } = useLanguage();
  
  const bookTitle = title || t('housing_in_africa');
  
  useEffect(() => {
    setLocalIsOpen(isOpen);
  }, [isOpen]);

  const getPositionClasses = () => {
    switch (position) {
      case "bottom-left":
        return "left-4 bottom-4";
      case "bottom-right":
        return "right-4 bottom-4";
      case "top-left":
        return "left-4 top-4";
      case "top-right":
        return "right-4 top-4";
      default:
        return "left-4 bottom-4";
    }
  };
  
  return (
    <motion.div 
      className={`absolute ${getPositionClasses()} z-10 cursor-pointer ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      onClick={() => {
        setLocalIsOpen((prev) => !prev);
        if (onClick) onClick();
      }}
      onMouseEnter={() => setLocalIsOpen(true)}
      onMouseLeave={() => !isOpen && setLocalIsOpen(false)}
    >
      <motion.div
        className="relative w-16 h-24 md:w-20 md:h-28 bg-white rounded-md shadow-xl overflow-hidden"
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="absolute inset-0 bg-white rounded-md shadow-lg flex flex-col">
          <div className="bg-white py-1 px-2 flex items-center gap-1 shadow-sm rounded-t-md">
            <motion.div
              animate={{ scale: localIsOpen ? [1, 1.1, 1] : 1 }}
              transition={{ duration: 2, repeat: localIsOpen ? Infinity : 0, ease: "easeInOut" }}
            >
              <BookOpen className="h-3 w-3 md:h-4 md:w-4 text-amber-500" />
            </motion.div>
            <div className="text-black text-[6px] md:text-[7px] font-medium overflow-hidden whitespace-nowrap text-ellipsis">
              {bookTitle}
            </div>
          </div>
          
          <div className="flex-grow flex items-center justify-center p-2">
            <motion.div 
              className="w-8 h-8 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-gray-200"
              animate={{ scale: localIsOpen ? [1, 1.05, 1] : 1 }}
              transition={{ duration: 2, repeat: localIsOpen ? Infinity : 0, ease: "easeInOut" }}
            >
              <img 
                src="/lovable-uploads/e3037485-6218-4d0a-a5ec-734b9943c37d.png" 
                alt="Host" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = getRandomFallbackImage();
                }}
              />
            </motion.div>
          </div>
        </div>
        
        {localIsOpen && (
          <>
            {/* Book opening animation - left side */}
            <motion.div
              className="absolute top-6 left-0 right-1/2 bottom-2 bg-white rounded-l-sm shadow-md"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: -60 }}
              transition={{ duration: 0.5 }}
              style={{ transformOrigin: "right center", zIndex: 5 }}
            >
              <div className="h-full w-full bg-amber-50 p-1">
                <div className="text-[5px] md:text-[6px] font-serif text-gray-800">
                  Lieux recommandés
                </div>
              </div>
            </motion.div>
            
            {/* Book opening animation - right side */}
            <motion.div
              className="absolute top-6 left-1/2 right-0 bottom-2 bg-white rounded-r-sm shadow-md"
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 60 }}
              transition={{ duration: 0.5 }}
              style={{ transformOrigin: "left center", zIndex: 5 }}
            >
              <div className="h-full w-full bg-amber-50 p-1">
                <div className="text-[5px] md:text-[6px] font-serif text-gray-800">
                  Séjours exceptionnels
                </div>
              </div>
            </motion.div>
            
            {/* Book center/spine */}
            <div className="absolute top-6 left-1/2 bottom-2 w-[1px] bg-amber-200" style={{ transform: "translateX(-50%)" }} />
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

const getRandomFallbackImage = () => {
  const fallbacks = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800"
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
};
