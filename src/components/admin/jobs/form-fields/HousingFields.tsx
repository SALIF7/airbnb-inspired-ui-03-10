
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ImagePlus, Loader2, X } from 'lucide-react';

interface HousingFieldsProps {
  bedrooms: number;
  setBedrooms: (value: number) => void;
  bathrooms: number;
  setBathrooms: (value: number) => void;
  images: string[];
  onAddImage?: () => void;
  onRemoveImage?: (index: number) => void;
  isUploading?: boolean;
}

export const HousingFields: React.FC<HousingFieldsProps> = ({
  bedrooms,
  setBedrooms,
  bathrooms,
  setBathrooms,
  images,
  onAddImage,
  onRemoveImage,
  isUploading = false
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="bedrooms" className="block text-sm font-medium mb-1">
            Nombre de chambres
          </Label>
          <Input
            id="bedrooms"
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(Number(e.target.value))}
            min="0"
            step="1"
          />
        </div>
        <div>
          <Label htmlFor="bathrooms" className="block text-sm font-medium mb-1">
            Nombre de salles de bain
          </Label>
          <Input
            id="bathrooms"
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(Number(e.target.value))}
            min="0"
            step="0.5"
          />
        </div>
      </div>

      <div>
        <Label className="block text-sm font-medium mb-1">
          Images du logement
        </Label>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Images du logement</label>
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
                    onClick={() => onRemoveImage && onRemoveImage(index)}
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
              {isUploading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin mb-1" />
                  <span className="text-xs">Téléchargement...</span>
                </>
              ) : (
                <>
                  <ImagePlus className="h-6 w-6 mb-1" />
                  <span className="text-xs">Ajouter une image</span>
                </>
              )}
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Ajoutez des URLs d'images pour votre logement. La première sera l'image principale.
        </p>
      </div>
    </div>
  );
};
