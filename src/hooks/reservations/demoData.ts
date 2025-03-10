
import { Reservation } from "./types";
import { loadReservations, saveReservations } from "./storage";

// Fonction pour créer des réservations de démonstration si aucune n'existe
export const createDemoReservationsIfEmpty = (): Reservation[] => {
  const currentReservations = loadReservations();
  if (currentReservations.length === 0) {
    const demoReservations: Reservation[] = [
      {
        id: "demo1",
        listingId: "listing1",
        listingTitle: "Villa de luxe avec piscine",
        listingLocation: "Dakar, Sénégal",
        listingImage: "/placeholder.svg",
        guestName: "Sophie Martin",
        guestEmail: "sophie.martin@example.com",
        checkIn: new Date().toISOString(),
        checkOut: new Date(Date.now() + 5 * 86400000).toISOString(),
        guests: 3,
        totalPrice: 1500,
        status: 'confirmed',
        createdAt: new Date(Date.now() - 10 * 86400000).toISOString()
      },
      {
        id: "demo2",
        listingId: "listing2",
        listingTitle: "Appartement au centre-ville",
        listingLocation: "Abidjan, Côte d'Ivoire",
        listingImage: "/placeholder.svg",
        guestName: "Thomas Dubois",
        guestEmail: "thomas.dubois@example.com",
        checkIn: new Date(Date.now() + 15 * 86400000).toISOString(),
        checkOut: new Date(Date.now() + 22 * 86400000).toISOString(),
        guests: 2,
        totalPrice: 800,
        status: 'pending',
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
      },
      {
        id: "demo3",
        listingId: "listing3",
        listingTitle: "Maison traditionnelle",
        listingLocation: "Cotonou, Bénin",
        listingImage: "/placeholder.svg",
        guestName: "Marie Koné",
        guestEmail: "marie.kone@example.com",
        checkIn: new Date(Date.now() - 8 * 86400000).toISOString(),
        checkOut: new Date(Date.now() - 2 * 86400000).toISOString(),
        guests: 4,
        totalPrice: 600,
        status: 'cancelled',
        createdAt: new Date(Date.now() - 20 * 86400000).toISOString(),
        notes: "Annulation pour problème personnel."
      }
    ];
    saveReservations(demoReservations);
    return demoReservations;
  }
  return currentReservations;
};
