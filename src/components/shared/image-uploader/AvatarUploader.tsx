
import React from 'react';
import { Camera, Loader2, X } from "lucide-react";

interface AvatarUploaderProps {
  previewUrl?: string;
  handleFileSelect: () => void;
  handleRemove: () => void;
  isUploading: boolean;
  label: string;
  className?: string;
  previewClassName?: string;
  onImageRemove?: () => void;
}

export const AvatarUploader: React.FC<AvatarUploaderProps> = ({
  previewUrl,
  handleFileSelect,
  handleRemove,
  isUploading,
  label,
  className = '',
  previewClassName = 'h-24 w-24',
  onImageRemove
}) => {
  return (
    <div className={`relative ${className}`}>
      <div 
        className={`relative rounded-full overflow-hidden cursor-pointer ${previewClassName}`}
        onClick={handleFileSelect}
      >
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt={label} 
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200 text-gray-400">
            <Camera className="h-8 w-8" />
          </div>
        )}
        
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
            <Loader2 className="h-8 w-8 animate-spin text-white" />
          </div>
        )}
      </div>
      
      {previewUrl && onImageRemove && (
        <button
          type="button"
          className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full"
          onClick={handleRemove}
        >
          <X className="h-4 w-4" />
        </button>
      )}
      
      <div 
        className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
        onClick={handleFileSelect}
      >
        <Camera className="h-4 w-4" />
      </div>
    </div>
  );
};
