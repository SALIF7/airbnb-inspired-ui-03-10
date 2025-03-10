
import { toast } from "sonner";

export interface UseImageHandlersParams {
  images: string[];
  setImages: (value: string[]) => void;
  setFeaturedImage: (value: string) => void;
  setIsUploading: (value: boolean) => void;
}

export const useImageHandlers = ({
  images,
  setImages,
  setFeaturedImage,
  setIsUploading
}: UseImageHandlersParams) => {
  
  // Simulate image upload
  const simulateImageUpload = (callback: (url: string) => void, isHousingOffer: boolean) => {
    setIsUploading(true);
    // Simulate delay for upload
    setTimeout(() => {
      // Generate a random image URL from Unsplash
      const imageUrl = `https://source.unsplash.com/random/800x600/?${isHousingOffer ? 'apartment,house' : 'office,work'}&${Date.now()}`;
      callback(imageUrl);
      setIsUploading(false);
    }, 1500);
  };

  // Handle featured image upload
  const handleFeaturedImageUpload = (isHousingOffer: boolean) => {
    simulateImageUpload((url) => {
      setFeaturedImage(url);
      toast.success("Image principale téléchargée avec succès");
    }, isHousingOffer);
  };

  // Fonctions pour gérer les images
  const handleAddImage = (isHousingOffer: boolean) => {
    simulateImageUpload((url) => {
      setImages([...images, url]);
      toast.success("Nouvelle image ajoutée");
    }, isHousingOffer);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
    toast.success("Image supprimée");
  };

  return {
    handleFeaturedImageUpload,
    handleAddImage,
    handleRemoveImage
  };
};
