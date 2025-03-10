
import { Listing } from "@/types/listing";
import { LOME_NEIGHBORHOODS } from '@/constants/locations';
import { normalizeListing } from '@/utils/listingUtils';
import { MOCK_LISTINGS } from "@/data/mockData";

// Fonction pour charger les listings depuis le localStorage ou utiliser les données mock par défaut
export const loadListings = (): Listing[] => {
  try {
    const savedListings = localStorage.getItem('listings');
    if (savedListings) {
      const parsedListings = JSON.parse(savedListings);
      // S'assurer que chaque listing a les propriétés requises
      return parsedListings.map(normalizeListing);
    }
    
    // Si aucune donnée n'existe dans le localStorage, adapter les données mock pour Lomé
    const loméListings = MOCK_LISTINGS.map(listing => {
      // Prix adapté au marché de Lomé
      const price = Math.round((listing.price / 2) * 655.957) / 655.957; // Prix en euros divisé par 2 pour être plus réaliste
      
      const baseListing = {
        ...listing,
        location: `${LOME_NEIGHBORHOODS[Math.floor(Math.random() * LOME_NEIGHBORHOODS.length)]}, Lomé, Togo`,
        price
      };
      
      return normalizeListing(baseListing);
    });
    
    // Sauvegarder immédiatement dans localStorage
    localStorage.setItem('listings', JSON.stringify(loméListings));
    return loméListings;
  } catch (error) {
    console.error("Erreur lors du chargement des listings:", error);
    
    // En cas d'erreur, utiliser les données mock
    const defaultListings = MOCK_LISTINGS.map(listing => normalizeListing({
      ...listing,
      location: `${LOME_NEIGHBORHOODS[0]}, Lomé, Togo`,
    }));
    
    // Essayer de sauvegarder les données par défaut
    try {
      localStorage.setItem('listings', JSON.stringify(defaultListings));
    } catch (storageError) {
      console.error("Impossible de sauvegarder les listings par défaut:", storageError);
    }
    
    return defaultListings;
  }
};

// Fonction pour sauvegarder les listings dans le localStorage
export const saveListings = (listings: Listing[]) => {
  try {
    localStorage.setItem('listings', JSON.stringify(listings));
    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des listings:", error);
    return false;
  }
};

// Fonction pour charger les réservations
export const loadReservations = () => {
  try {
    const savedReservations = localStorage.getItem('reservations');
    if (savedReservations) {
      return JSON.parse(savedReservations);
    }
    return [];
  } catch (error) {
    console.error("Erreur lors du chargement des réservations:", error);
    return [];
  }
};

// Fonction pour sauvegarder les réservations
export const saveReservations = (reservations: any[]) => {
  try {
    localStorage.setItem('reservations', JSON.stringify(reservations));
    return true;
  } catch (error) {
    console.error("Erreur lors de la sauvegarde des réservations:", error);
    return false;
  }
};
