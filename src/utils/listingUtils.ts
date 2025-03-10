
import { Listing } from "@/types/listing";
import { LOME_NEIGHBORHOODS } from '@/constants/locations';
import { getValidImageUrl, normalizeImages } from './imageUtils';
import { FALLBACK_IMAGES } from '@/constants/images';

// Fonction pour normaliser un objet listing
export const normalizeListing = (listing: Listing): Listing => {
  // Normaliser les images
  const normalizedImages = normalizeImages(listing.images);
  
  // Assurer que l'image principale existe et est valide
  const mainImage = getValidImageUrl(listing.image || normalizedImages[0], 0);
  
  // Assurer que chaque listing a une propriété host
  const host = listing.host || { name: "Hôte", image: "/placeholder.svg" };
  
  // Assurer que c'est à Lomé avec un quartier spécifique
  const location = listing.location.includes("Lomé") 
    ? listing.location 
    : `${LOME_NEIGHBORHOODS[Math.floor(Math.random() * LOME_NEIGHBORHOODS.length)]}, Lomé, Togo`;
  
  return {
    ...listing,
    image: mainImage,
    images: normalizedImages,
    host,
    location
  };
};

