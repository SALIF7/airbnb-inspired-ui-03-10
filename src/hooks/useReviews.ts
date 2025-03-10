
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import useLocalStorage from "./useLocalStorage";

export interface Review {
  id: string;
  listingId: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
  status: 'pending' | 'approved' | 'rejected';
}

// Données initiales pour les avis
const INITIAL_REVIEWS: Review[] = [
  {
    id: "1",
    listingId: "1",
    author: "Michel Dupont",
    rating: 4,
    comment: "Très bon séjour, appartement propre et bien situé",
    date: "2024-02-15",
    status: "approved"
  },
  {
    id: "2",
    listingId: "1",
    author: "Sophie Martin",
    rating: 5,
    comment: "Excellent accueil, je recommande vivement",
    date: "2024-02-16",
    status: "approved"
  },
];

export const useReviews = () => {
  const { loadData, saveData } = useLocalStorage();
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading, error } = useQuery({
    queryKey: ['reviews'],
    queryFn: async (): Promise<Review[]> => {
      return loadData('reviews', INITIAL_REVIEWS);
    },
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true
  });

  const updateReviewStatus = useMutation({
    mutationFn: async ({ reviewId, status }: { reviewId: string; status: Review['status'] }) => {
      const currentReviews = loadData('reviews', INITIAL_REVIEWS);
      const updatedReviews = currentReviews.map(review =>
        review.id === reviewId ? { ...review, status } : review
      );
      saveData('reviews', updatedReviews);
      return { reviewId, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success("Statut de l'avis mis à jour avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour du statut de l'avis");
    },
  });

  const updateReviewContent = useMutation({
    mutationFn: async (updatedReview: Review) => {
      const currentReviews = loadData('reviews', INITIAL_REVIEWS);
      const updatedReviews = currentReviews.map(review =>
        review.id === updatedReview.id ? updatedReview : review
      );
      saveData('reviews', updatedReviews);
      return updatedReview;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success("Avis mis à jour avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour de l'avis");
    },
  });

  const addReview = useMutation({
    mutationFn: async (newReview: Omit<Review, "id" | "status" | "date">) => {
      const currentReviews = loadData('reviews', INITIAL_REVIEWS);
      const review = {
        ...newReview,
        id: Math.random().toString(36).substring(7),
        date: new Date().toISOString().split('T')[0],
        status: 'pending' as const
      };
      const updatedReviews = [...currentReviews, review];
      saveData('reviews', updatedReviews);
      return review;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success("Avis ajouté avec succès et en attente de modération");
    },
    onError: () => {
      toast.error("Erreur lors de l'ajout de l'avis");
    },
  });

  const deleteReview = useMutation({
    mutationFn: async (reviewId: string) => {
      const currentReviews = loadData('reviews', INITIAL_REVIEWS);
      const updatedReviews = currentReviews.filter(review => review.id !== reviewId);
      saveData('reviews', updatedReviews);
      return reviewId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews'] });
      toast.success("Avis supprimé avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de la suppression de l'avis");
    },
  });

  return {
    reviews,
    isLoading,
    error,
    updateReviewStatus,
    updateReviewContent,
    addReview,
    deleteReview,
  };
};
