
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStatusMessages } from './useStatusMessages';
import { StatusContent } from './StatusContent';
import { BannerBackground } from './BannerBackground';
import { CloseButton } from './CloseButton';

export const StatusBanner: React.FC = () => {
  const { 
    activeMessages, 
    currentIndex, 
    isDismissed, 
    setIsDismissed 
  } = useStatusMessages();
  
  // If no active messages, don't render anything
  if (activeMessages.length === 0 || isDismissed) {
    return null;
  }

  const currentMessage = activeMessages[currentIndex];
  
  return (
    <AnimatePresence>
      <motion.div 
        className="w-full overflow-hidden rounded-lg shadow-md max-w-7xl mx-auto h-28 sm:h-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        <div 
          className="relative flex items-center h-full overflow-hidden bg-white"
          style={{ 
            boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
            borderRadius: '10px',
            border: '1px solid #f0f0f0'
          }}
        >
          {/* Background abstract elements */}
          <BannerBackground />
          
          {/* Scrolling content */}
          <div className="relative flex items-center justify-center w-full h-full px-4">
            <StatusContent message={currentMessage.text} />
          </div>
          
          {/* Close button */}
          <CloseButton onClose={() => setIsDismissed(true)} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
