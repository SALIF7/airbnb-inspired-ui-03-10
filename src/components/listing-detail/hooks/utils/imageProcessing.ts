
import { Listing } from "@/types/listing";
import { MagicBook } from "@/components/ui/magic-book";

/**
 * Process and validate listing images
 */
export const processListingImages = (listing: Listing | undefined): string[] => {
  if (!listing) return [];

  const fallbackImages = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
    "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    "https://images.unsplash.com/photo-1599809275671-b5942cabc7a2?w=800",
  ];

  const validateImage = (url: string, index: number): string => {
    if (!url || url.startsWith("blob:") || url.trim() === "") {
      return fallbackImages[index % fallbackImages.length];
    }
    return url;
  };

  // Process images array if available
  if (listing.images && listing.images.length > 0) {
    return listing.images.map((img, idx) => validateImage(img, idx)).filter(Boolean);
  }
  
  // Fall back to single image if available
  if (listing.image) {
    return [validateImage(listing.image, 0)];
  }
  
  // Last resort - use first fallback image
  return [fallbackImages[0]];
};

/**
 * Add the MagicBook component to a listing image container
 */
export const addMagicBookToListing = (container: HTMLElement | null): void => {
  if (!container) return;
  
  // Create MagicBook element if it doesn't exist yet
  const bookId = "listing-magic-book";
  if (!document.getElementById(bookId)) {
    const bookElement = document.createElement("div");
    bookElement.id = bookId;
    bookElement.className = "magic-book-container";
    container.appendChild(bookElement);
    
    // The element will be styled and positioned with CSS
  }
};
