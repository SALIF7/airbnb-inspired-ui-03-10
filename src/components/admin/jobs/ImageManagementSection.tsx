
import React from 'react';
import { Button } from "@/components/ui/button";
import { Upload, X } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { ImageUploader } from '@/components/shared/ImageUploader';

interface ImageManagementSectionProps {
  images: string[];
  featuredImage: string;
  isUploading: boolean;
  onAddImage: () => void;
  onRemoveImage: (index: number) => void;
  onFeaturedImageUpload: () => void;
  setFeaturedImage: (url: string) => void;
}

export const ImageManagementSection: React.FC<ImageManagementSectionProps> = ({
  images,
  featuredImage,
  isUploading,
  onAddImage,
  onRemoveImage,
  onFeaturedImageUpload,
  setFeaturedImage
}) => {
  return (
    <div className="space-y-6">
      {/* Section d'image principale */}
      <div className="mb-6">
        <ImageUploader
          currentImage={featuredImage}
          onImageUpload={() => onFeaturedImageUpload()}
          onImageRemove={() => setFeaturedImage('')}
          isUploading={isUploading}
          variant="featured"
          label="Image principale"
          previewClassName="h-48"
          buttonVariant="outline"
        />
      </div>

      {/* Section d'images supplémentaires */}
      <div>
        <Label className="block text-sm font-medium mb-2">Images supplémentaires</Label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative border rounded-md overflow-hidden">
              <img
                src={image}
                alt={`Image ${index + 1}`}
                className="w-full h-32 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="h-6 w-6 rounded-full"
                  onClick={() => onRemoveImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            className="h-32 border-dashed flex flex-col items-center justify-center"
            onClick={onAddImage}
            disabled={isUploading}
          >
            <ImageUploader
              onImageUpload={() => onAddImage()}
              isUploading={isUploading}
              variant="card"
              label="Ajouter une image"
              className="w-full h-full"
              previewClassName="h-32"
            />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Ajoutez des images pour illustrer cette offre. La première sera utilisée comme aperçu.
        </p>
      </div>
    </div>
  );
};
