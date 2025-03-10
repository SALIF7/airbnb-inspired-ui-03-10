
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Reservation } from "./types";
import { createDemoReservationsIfEmpty } from "./demoData";
import { useReservationMutations } from "./mutations";
import { loadReservations, saveReservations } from "./storage";

export type { Reservation } from "./types";
export { loadReservations, saveReservations } from "./storage";

export const useReservations = () => {
  const queryClient = useQueryClient();
  const { addReservation, updateReservationStatus } = useReservationMutations();

  const { data: reservations = [], isLoading, error, refetch } = useQuery({
    queryKey: ["reservations"],
    queryFn: async () => {
      // D'abord, essayer de charger les réservations existantes
      let existingReservations = loadReservations();
      
      // Si aucune réservation n'existe, créer des données de démo
      if (existingReservations.length === 0) {
        existingReservations = createDemoReservationsIfEmpty();
        
        // Enregistrer immédiatement ces données pour les futures visites
        saveReservations(existingReservations);
      }
      
      console.log("Chargement des réservations:", existingReservations);
      return existingReservations;
    },
    staleTime: 0, // Toujours recharger au montage
    gcTime: 0, // Ne pas mettre en cache
  });

  return {
    reservations,
    isLoading,
    error,
    addReservation,
    updateReservationStatus,
    refetch
  };
};
