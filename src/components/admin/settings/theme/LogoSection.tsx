
import React, { useState, useEffect } from 'react';
import { ImageUploadField } from '../ImageUploadField';
import { toast } from "sonner";

interface LogoSectionProps {
  logoUrl: string;
  logoUploading: boolean;
  handleLogoUpload: (file: File) => void;
}

export const LogoSection: React.FC<LogoSectionProps> = ({
  logoUrl,
  logoUploading,
  handleLogoUpload
}) => {
  const [logoError, setLogoError] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  
  // Reset error when URL changes
  useEffect(() => {
    setLogoError(false);
    setLogoLoaded(false);
  }, [logoUrl]);
  
  return (
    <div>
      <div className="flex items-center space-x-4 mt-1">
        <div className="h-16 w-16 flex items-center justify-center overflow-hidden bg-gray-50 rounded-full border">
          {!logoError ? (
            <img 
              key={`logo-${logoUrl}`} 
              src={logoUrl || "/placeholder.svg"} 
              alt="Logo" 
              className="h-full w-auto object-contain" 
              onLoad={() => setLogoLoaded(true)}
              onError={() => {
                setLogoError(true);
                toast.error("Erreur de chargement du logo");
              }}
              style={{ display: logoLoaded ? 'block' : 'none' }}
            />
          ) : (
            <span className="text-sm text-gray-400">Logo</span>
          )}
          
          {(!logoLoaded && !logoError) && (
            <div className="animate-pulse bg-gray-200 h-8 w-8 rounded-full"></div>
          )}
        </div>
        <ImageUploadField
          label=""
          imageUrl={logoUrl}
          onUpload={handleLogoUpload}
          isUploading={logoUploading}
        />
      </div>
    </div>
  );
};
