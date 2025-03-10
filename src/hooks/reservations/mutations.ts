
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Reservation } from "./types";
import { loadReservations, saveReservations } from "./storage";

export const useReservationMutations = () => {
  const queryClient = useQueryClient();

  const addReservation = useMutation({
    mutationFn: async (newReservation: Omit<Reservation, "id" | "createdAt" | "status">) => {
      try {
        const currentReservations = loadReservations();
        const reservation = {
          ...newReservation,
          id: Math.random().toString(36).substr(2, 9),
          createdAt: new Date().toISOString(),
          status: 'pending' as const
        };
        
        const updatedReservations = [...currentReservations, reservation];
        const saved = saveReservations(updatedReservations);
        if (!saved) {
          throw new Error("Échec de la sauvegarde de la réservation");
        }
        console.log("Nouvelle réservation ajoutée:", reservation);
        return reservation;
      } catch (error) {
        console.error("Erreur lors de l'ajout de la réservation:", error);
        throw error;
      }
    },
    onSuccess: (newReservation) => {
      // Mettre à jour le cache pour éviter de perdre les données au rechargement
      queryClient.setQueryData(["reservations"], (old: Reservation[] = []) => {
        const updatedReservations = [...old, newReservation];
        return updatedReservations;
      });
      
      // Invalider la requête pour forcer un rechargement des données
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      toast.success("Réservation ajoutée avec succès");
    },
    onError: () => {
      toast.error("Erreur lors de l'ajout de la réservation");
    },
  });

  const updateReservationStatus = useMutation({
    mutationFn: async ({ reservationId, status }: { reservationId: string; status: 'confirmed' | 'pending' | 'cancelled' }) => {
      try {
        const currentReservations = loadReservations();
        const index = currentReservations.findIndex(reservation => reservation.id === reservationId);
        
        if (index !== -1) {
          const updatedReservations = [...currentReservations];
          updatedReservations[index] = {
            ...updatedReservations[index],
            status
          };
          
          const saved = saveReservations(updatedReservations);
          if (!saved) {
            throw new Error("Échec de la mise à jour du statut de réservation");
          }
          console.log("Statut de réservation mis à jour:", { reservationId, status });
          return { reservationId, status, updatedReservation: updatedReservations[index] };
        } else {
          throw new Error(`Réservation avec ID ${reservationId} non trouvée`);
        }
      } catch (error) {
        console.error("Erreur lors de la mise à jour du statut:", error);
        throw error;
      }
    },
    onSuccess: ({ reservationId, status, updatedReservation }) => {
      // Mettre à jour le cache pour éviter de perdre les données au rechargement
      queryClient.setQueryData(["reservations"], (old: Reservation[] = []) => {
        return old.map((reservation) =>
          reservation.id === reservationId ? { ...reservation, status } : reservation
        );
      });
      
      // Invalider la requête pour forcer un rechargement des données
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      
      const statusMessages = {
        confirmed: "Réservation confirmée",
        pending: "Réservation mise en attente",
        cancelled: "Réservation annulée"
      };
      
      toast.success(statusMessages[status]);
    },
    onError: () => {
      toast.error("Erreur lors de la mise à jour du statut de la réservation");
    },
  });

  return {
    addReservation,
    updateReservationStatus
  };
};
