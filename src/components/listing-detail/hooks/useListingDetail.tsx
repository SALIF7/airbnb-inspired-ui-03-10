
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useListings } from "@/hooks/useListings";
import { useSiteSettings } from "@/hooks/settings/useSiteSettings";
import { useReviews } from "@/hooks/useReviews";
import { useReservations } from "@/hooks/reservations";
import useAuth from "@/hooks/useAuth";
import { toast } from "sonner";

// Import our utility functions
import { processListingImages } from "./utils/imageProcessing";
import { checkIsFavorite, toggleFavoriteStatus } from "./utils/favoritesManager";
import { 
  calculateAverageRating, 
  processListingReviews 
} from "./utils/reviewsManager";
import {
  formatPriceFCFA,
  validateReservationDates,
  createReservationObject
} from "./utils/reservationManager";

export const useListingDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { listings, isLoading } = useListings();
  const { settings } = useSiteSettings();
  const { reviews, addReview } = useReviews();
  const { user } = useAuth();
  const { addReservation } = useReservations();
  
  // State management
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [guestCount, setGuestCount] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [listingReviews, setListingReviews] = useState<any[]>([]);
  const [processedImages, setProcessedImages] = useState<string[]>([]);

  // Get current listing
  const listing = listings?.find((listing) => listing.id === id);

  // Process images
  useEffect(() => {
    if (listing) {
      setProcessedImages(processListingImages(listing));
    }
  }, [listing]);

  // Check if listing is in favorites
  useEffect(() => {
    if (id) {
      setIsFavorite(checkIsFavorite(id));
    }
  }, [id]);

  // Load reviews for this listing
  useEffect(() => {
    if (id && reviews) {
      const processedReviews = processListingReviews(id, reviews);
      setListingReviews(processedReviews);
    }
  }, [id, reviews]);

  // Handle reservation
  const handleReservation = () => {
    if (!user) {
      toast.error("Vous devez être connecté pour réserver");
      return;
    }

    const validation = validateReservationDates(startDate, endDate);
    if (!validation.isValid) {
      toast.error(validation.message);
      return;
    }

    if (!listing) return;

    // Create and submit reservation
    const reservation = createReservationObject(
      listing,
      user.id,
      user.name,
      user.email || "utilisateur@example.com",
      startDate,
      endDate,
      guestCount
    );

    // Submit reservation
    addReservation.mutate(reservation, {
      onSuccess: () => {
        toast.success("Réservation effectuée avec succès !");
        // Rediriger vers la page des réservations après une réservation réussie
        setTimeout(() => {
          navigate("/reservations");
        }, 1500);
      },
      onError: () => {
        toast.error("Erreur lors de la réservation");
      },
    });
  };

  // Submit review
  const handleSubmitReview = () => {
    if (!user) {
      toast.error("Vous devez être connecté pour laisser un avis");
      return;
    }

    if (reviewText.trim() === "") {
      toast.error("Veuillez écrire un commentaire");
      return;
    }

    if (!id) return;

    const newReview = {
      listingId: id,
      author: user.name,
      rating: reviewRating,
      comment: reviewText,
    };

    addReview.mutate(newReview, {
      onSuccess: () => {
        toast.success("Votre avis a été soumis pour modération");
        setReviewText("");

        // Add review temporarily to local list
        setListingReviews((prev) => [
          {
            id: Math.random().toString(36).substring(7),
            author: user.name,
            avatar: user.avatar || "/placeholder.svg",
            rating: reviewRating,
            date: new Date().toLocaleDateString("fr-FR", {
              month: "long",
              year: "numeric",
            }),
            comment: reviewText,
            status: "pending",
          },
          ...prev,
        ]);
      },
    });
  };

  // Toggle favorite
  const toggleFavorite = () => {
    if (!id) return;
    const newStatus = toggleFavoriteStatus(id, isFavorite);
    setIsFavorite(newStatus);
  };

  // Calculate average rating
  const averageRating = calculateAverageRating(listingReviews);

  return {
    listing,
    processedImages,
    listings,
    isLoading,
    averageRating,
    listingReviews,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    guestCount,
    setGuestCount,
    handleReservation,
    isFavorite,
    toggleFavorite,
    primaryColor: settings.primaryColor,
    reviewText,
    setReviewText,
    reviewRating,
    setReviewRating,
    isAuthenticated: !!user,
    handleSubmitReview,
    formatPriceFCFA,
  };
};
