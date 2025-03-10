
import { useState, useEffect, createContext, useContext } from 'react';
import useLocalStorage from './useLocalStorage';
import { useSiteSettings } from './settings';

type LanguageContextType = {
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
  t: (key: string) => string;
};

// Créer le contexte
export const LanguageContext = createContext<LanguageContextType>({
  language: 'fr',
  setLanguage: () => {},
  t: (key: string) => key,
});

// Créer un hook pour utiliser le contexte
export const useLanguage = () => useContext(LanguageContext);

// Créer un provider pour le contexte
export const useLanguageProvider = () => {
  const { settings, updateSettings } = useSiteSettings();
  const { setItem, getItem } = useLocalStorage();
  const [language, setLanguageState] = useState<'fr' | 'en'>(settings.language || 'fr');
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});

  // Charger les traductions
  useEffect(() => {
    // Traductions pour les textes courants
    const defaultTranslations = {
      // Navigation
      'home': {
        fr: 'Accueil',
        en: 'Home'
      },
      'jobs': {
        fr: 'Emplois',
        en: 'Jobs'
      },
      'about': {
        fr: 'À propos',
        en: 'About'
      },
      'contact': {
        fr: 'Contact',
        en: 'Contact'
      },
      'support': {
        fr: 'Support',
        en: 'Support'
      },
      'login': {
        fr: 'Connexion',
        en: 'Login'
      },
      'logout': {
        fr: 'Se déconnecter',
        en: 'Logout'
      },
      'register': {
        fr: 'S\'inscrire',
        en: 'Register'
      },
      'profile': {
        fr: 'Profil',
        en: 'Profile'
      },
      'settings': {
        fr: 'Paramètres',
        en: 'Settings'
      },
      'favorites': {
        fr: 'Favoris',
        en: 'Favorites'
      },
      'reservations': {
        fr: 'Réservations',
        en: 'Reservations'
      },
      'messages': {
        fr: 'Messages',
        en: 'Messages'
      },
      'notifications': {
        fr: 'Notifications',
        en: 'Notifications'
      },
      'search': {
        fr: 'Rechercher',
        en: 'Search'
      },
      
      // Home Page
      'discover_home': {
        fr: 'Découvrez votre nouveau',
        en: 'Discover your new'
      },
      'home_subtitle': {
        fr: 'Chez vous, partout',
        en: 'Home, everywhere'
      },
      'premium_housing': {
        fr: 'Des logements premium et des opportunités d\'emploi exclusives dans les meilleurs quartiers de Lomé pour une expérience de vie supérieure.',
        en: 'Premium accommodations and exclusive job opportunities in the best neighborhoods of Lomé for a superior living experience.'
      },
      'find_housing': {
        fr: 'Trouver un logement',
        en: 'Find housing'
      },
      'job_offers': {
        fr: 'Offres d\'emploi',
        en: 'Job offers'
      },
      'popular_neighborhoods': {
        fr: 'Quartiers populaires:',
        en: 'Popular neighborhoods:'
      },
      'verified_housing': {
        fr: 'Logements vérifiés',
        en: 'Verified housing'
      },
      'secure_payments': {
        fr: 'Paiements sécurisés',
        en: 'Secure payments'
      },
      'local_support': {
        fr: 'Support local 24/7',
        en: 'Local support 24/7'
      },
      'premium_villa': {
        fr: 'Villa Premium à Lomé',
        en: 'Premium Villa in Lomé'
      },
      'housing_in_africa': {
        fr: 'Logements en Afrique et partout dans le monde',
        en: 'Housing in Africa and around the world'
      },
      'stay_at': {
        fr: 'Séjournez chez',
        en: 'Stay at'
      },
      'per_month': {
        fr: 'mois',
        en: 'month'
      },
      'per_night': {
        fr: 'par nuit',
        en: 'per night'
      },
      'today': {
        fr: 'Aujourd\'hui',
        en: 'Today'
      },
      'yesterday': {
        fr: 'Hier',
        en: 'Yesterday'
      },
      'days_ago': {
        fr: 'Il y a {days} jours',
        en: '{days} days ago'
      },
      'recommended_places': {
        fr: 'Lieux recommandés',
        en: 'Recommended places'
      },
      'exceptional_stays': {
        fr: 'Séjours exceptionnels',
        en: 'Exceptional stays'
      },
      
      // Jobs Page
      'security_jobs': {
        fr: 'Emplois dans la sécurité',
        en: 'Security Jobs'
      },
      'apply_now': {
        fr: 'Postuler maintenant',
        en: 'Apply Now'
      },
      'job_location': {
        fr: 'Lieu',
        en: 'Location'
      },
      'contract_type': {
        fr: 'Type de contrat',
        en: 'Contract Type'
      },
      'salary': {
        fr: 'Salaire',
        en: 'Salary'
      },
      'housing_included': {
        fr: 'Logement inclus',
        en: 'Housing Included'
      },
      'job_description': {
        fr: 'Description du poste',
        en: 'Job Description'
      },
      'requirements': {
        fr: 'Prérequis',
        en: 'Requirements'
      },
      'benefits': {
        fr: 'Avantages',
        en: 'Benefits'
      },
      
      // Listing Details
      'entire_house': {
        fr: 'Maison entière',
        en: 'Entire house'
      },
      'bedrooms': {
        fr: 'Chambres',
        en: 'Bedrooms'
      },
      'bathrooms': {
        fr: 'Salles de bain',
        en: 'Bathrooms'
      },
      'guests': {
        fr: 'Voyageurs',
        en: 'Guests'
      },
      'availability': {
        fr: 'Disponibilité',
        en: 'Availability'
      },
      'book_now': {
        fr: 'Réserver maintenant',
        en: 'Book Now'
      },
      'contact_host': {
        fr: 'Contacter l\'hôte',
        en: 'Contact Host'
      },
      'amenities': {
        fr: 'Équipements',
        en: 'Amenities'
      },
      'reviews': {
        fr: 'Avis',
        en: 'Reviews'
      },
      'description': {
        fr: 'Description',
        en: 'Description'
      },
      'location': {
        fr: 'Emplacement',
        en: 'Location'
      },
      'check_in': {
        fr: 'Arrivée',
        en: 'Check-in'
      },
      'check_out': {
        fr: 'Départ',
        en: 'Check-out'
      },
      'total': {
        fr: 'Total',
        en: 'Total'
      },
      
      // User Settings and Preferences
      'personal_info': {
        fr: 'Informations personnelles',
        en: 'Personal Information'
      },
      'email_notifications': {
        fr: 'Notifications par email',
        en: 'Email Notifications'
      },
      'push_notifications': {
        fr: 'Notifications push',
        en: 'Push Notifications'
      },
      'dark_mode': {
        fr: 'Mode sombre',
        en: 'Dark Mode'
      },
      'language_preference': {
        fr: 'Langue',
        en: 'Language'
      },
      'save_preferences': {
        fr: 'Enregistrer les préférences',
        en: 'Save Preferences'
      },
      'security': {
        fr: 'Sécurité',
        en: 'Security'
      },
      'password': {
        fr: 'Mot de passe',
        en: 'Password'
      },
      'current_password': {
        fr: 'Mot de passe actuel',
        en: 'Current Password'
      },
      'new_password': {
        fr: 'Nouveau mot de passe',
        en: 'New Password'
      },
      'confirm_password': {
        fr: 'Confirmer le mot de passe',
        en: 'Confirm Password'
      },
      'save': {
        fr: 'Enregistrer',
        en: 'Save'
      },
      'cancel': {
        fr: 'Annuler',
        en: 'Cancel'
      },
      
      // Admin
      'dashboard': {
        fr: 'Tableau de bord',
        en: 'Dashboard'
      },
      'listings': {
        fr: 'Logements',
        en: 'Listings'
      },
      'users': {
        fr: 'Utilisateurs',
        en: 'Users'
      },
      'payments': {
        fr: 'Paiements',
        en: 'Payments'
      },
      'analytics': {
        fr: 'Analytiques',
        en: 'Analytics'
      },
      'site_settings': {
        fr: 'Paramètres du site',
        en: 'Site Settings'
      },
      
      // Footer
      'terms_of_service': {
        fr: 'Conditions d\'utilisation',
        en: 'Terms of Service'
      },
      'privacy_policy': {
        fr: 'Politique de confidentialité',
        en: 'Privacy Policy'
      },
      'all_rights_reserved': {
        fr: 'Tous droits réservés',
        en: 'All Rights Reserved'
      },
      'follow_us': {
        fr: 'Suivez-nous',
        en: 'Follow Us'
      }
    };

    setTranslations(defaultTranslations);
  }, []);

  // Fonction pour changer la langue
  const setLanguage = (lang: 'fr' | 'en') => {
    setLanguageState(lang);
    setItem('userLanguage', lang);
    updateSettings({ language: lang });
  };

  // Fonction pour traduire un texte
  const t = (key: string): string => {
    if (!translations[key]) {
      // Pour le développement, log les clés manquantes
      console.log(`Missing translation for key: ${key}`);
      return key;
    }
    
    return translations[key][language] || translations[key]['fr'] || key;
  };

  // Charger la langue sauvegardée
  useEffect(() => {
    const savedLanguage = getItem<'fr' | 'en'>('userLanguage', settings.language || 'fr');
    setLanguageState(savedLanguage);
  }, [settings.language]);

  return {
    language,
    setLanguage,
    t,
  };
};
