
import React, { useState } from 'react';
import { getValidImageUrl } from '@/utils/imageUtils';

interface JobGalleryProps {
  images: string[];
  title: string;
  domain: string;
  getDomainImage: (domain: string) => string;
}

const JobGallery = ({ images, title, domain, getDomainImage }: JobGalleryProps) => {
  if (!images || images.length === 0) return null;

  // State for tracking image load errors
  const [failedImages, setFailedImages] = useState<Record<number, boolean>>({});

  // Handle image load error
  const handleImageError = (index: number) => {
    setFailedImages(prev => ({ ...prev, [index]: true }));
  };

  // Get appropriate image source
  const getImageSrc = (img: string, index: number) => {
    if (failedImages[index]) {
      return getDomainImage(domain);
    }
    return getValidImageUrl(img, index);
  };

  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4 text-sholom-dark">Galerie</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div key={index} className="rounded-lg overflow-hidden aspect-square">
            <img 
              src={getImageSrc(img, index)}
              alt={`${title} - Image ${index + 1}`}
              onError={() => handleImageError(index)}
              className="w-full h-full object-cover hover-scale transition-transform cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobGallery;
