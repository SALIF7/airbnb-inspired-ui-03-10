
import React, { useRef, useState } from "react";
import { MagicBook } from "@/components/ui/magic-book";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImageGalleryProps {
  images: string[];
  alt: string;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images, alt }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const hasMultipleImages = images.length > 1;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isBookHovered, setIsBookHovered] = useState(false);

  const handleImageClick = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div 
        ref={galleryRef}
        className="relative rounded-xl overflow-hidden aspect-[16/9] md:aspect-[2/1] w-full mx-auto mb-8 bg-gray-200"
      >
        {images.length > 0 ? (
          hasMultipleImages ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-full">
              {/* Main image */}
              <div 
                className="relative col-span-1 row-span-1 md:row-span-2 h-full cursor-pointer"
                onClick={() => handleImageClick(0)}
              >
                <img
                  src={images[0]}
                  alt={`${alt} - Image principale`}
                  className="w-full h-full object-cover transition-all duration-300 hover:brightness-90"
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800";
                  }}
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                  <span className="text-white bg-black/50 px-3 py-1 rounded-full text-sm">Voir l'image</span>
                </div>
              </div>

              {/* Secondary images - only show on larger screens */}
              <div className="hidden md:grid md:grid-rows-2 gap-2 h-full">
                {images.slice(1, 3).map((image, index) => (
                  <div 
                    key={index} 
                    className="relative w-full h-full cursor-pointer"
                    onClick={() => handleImageClick(index + 1)}
                  >
                    <img
                      src={image}
                      alt={`${alt} - Image ${index + 2}`}
                      className="w-full h-full object-cover transition-all duration-300 hover:brightness-90"
                      onError={(e) => {
                        e.currentTarget.src = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800";
                      }}
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                      <span className="text-white bg-black/50 px-3 py-1 rounded-full text-sm">Voir l'image</span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Mobile navigation indicators for images */}
              <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center gap-1">
                {images.slice(0, 5).map((_, index) => (
                  <div 
                    key={index}
                    className={`h-1.5 w-1.5 rounded-full transition-all ${index === 0 ? 'bg-white w-3' : 'bg-white/60'}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            // Single image
            <div 
              className="cursor-pointer h-full"
              onClick={() => handleImageClick(0)}
            >
              <img
                src={images[0]}
                alt={alt}
                className="w-full h-full object-cover transition-all duration-300 hover:brightness-90"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800";
                }}
              />
              <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                <span className="text-white bg-black/50 px-3 py-1 rounded-full text-sm">Voir l'image</span>
              </div>
            </div>
          )
        ) : (
          // Fallback if no images
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-400">Aucune image disponible</span>
          </div>
        )}
        
        {/* Book positioned in bottom right of the image gallery with smaller size */}
        <div 
          className="absolute right-3 bottom-3 z-10"
          onMouseEnter={() => setIsBookHovered(true)}
          onMouseLeave={() => setIsBookHovered(false)}
        >
          <MagicBook 
            position="bottom-right" 
            className={`transition-all duration-300 ${isBookHovered ? 'scale-105' : 'scale-90'}`}
            title="Logements en Afrique et partout dans le monde"
            isOpen={isBookHovered}
          />
        </div>
      </div>

      {/* Lightbox for viewing images */}
      {lightboxOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <div className="relative w-full max-w-6xl h-[80vh] px-4">
            <Button 
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white bg-black/20 hover:bg-black/40"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>
            
            <div className="relative h-full flex items-center justify-center">
              <img 
                src={images[currentImageIndex]} 
                alt={`${alt} - Image ${currentImageIndex + 1}`} 
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800";
                }}
              />
              
              {hasMultipleImages && (
                <>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/40" 
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-white bg-black/20 hover:bg-black/40" 
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </>
              )}
            </div>
            
            {/* Image counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white bg-black/50 px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
