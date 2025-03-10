
import { LOME_NEIGHBORHOODS } from "@/constants/locations";
import { FALLBACK_IMAGES } from "@/constants/images";
import { useFetchListings } from "./fetchListings";
import { 
  useAddListing, 
  useUpdateListing, 
  useDeleteListing, 
  useAddReservation 
} from "./mutationHooks";
import { loadReservations } from "../useListingStorage";

// Re-export constants for backward compatibility
export { LOME_NEIGHBORHOODS } from "@/constants/locations";
export { FALLBACK_IMAGES } from "@/constants/images";

/**
 * Combined hook for all listing operations
 */
export const useListings = () => {
  const { data: listings = [], isLoading, error } = useFetchListings();
  const addListing = useAddListing();
  const updateListing = useUpdateListing();
  const deleteListing = useDeleteListing();
  const addReservation = useAddReservation();

  const getReservations = () => {
    return loadReservations();
  };

  return {
    listings,
    isLoading,
    error,
    addListing,
    updateListing,
    deleteListing,
    addReservation,
    getReservations
  };
};
