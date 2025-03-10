
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Don't show back button on home page
  if (location.pathname === '/' || location.pathname === '/index') {
    return null;
  }
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  return (
    <Button 
      variant="ghost" 
      onClick={handleGoBack} 
      className="fixed top-24 left-4 z-40 group"
      size="sm"
    >
      <ChevronLeft className="mr-1 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
      <span>Retour</span>
    </Button>
  );
};
