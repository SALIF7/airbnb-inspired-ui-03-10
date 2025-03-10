
import { ADMIN_CREDENTIALS } from '../security/securityConstants';

/**
 * Fonction pour réinitialiser les identifiants de l'administrateur
 */
export const resetAdminCredentials = () => {
  console.log("Réinitialisation des identifiants admin...");
  
  localStorage.setItem('admin_credentials', JSON.stringify({
    email: ADMIN_CREDENTIALS.EMAIL,
    password: ADMIN_CREDENTIALS.PASSWORD,
    plainPassword: ADMIN_CREDENTIALS.PASSWORD
  }));
  
  console.log("Identifiants admin réinitialisés avec succès");
  return true;
};

/**
 * Vérification des identifiants admin - simplifiée et plus fiable
 */
export const verifyAdminCredentials = (email: string, password: string): boolean => {
  try {
    // Direct comparison with constants as primary check
    if (email.toLowerCase() === ADMIN_CREDENTIALS.EMAIL.toLowerCase() && 
        password === ADMIN_CREDENTIALS.PASSWORD) {
      console.log("Identifiants admin vérifiés avec succès via constantes directes");
      
      // Ensure localStorage is synced
      resetAdminCredentials();
      return true;
    }
    
    // Fallback to localStorage check
    const adminCredsStr = localStorage.getItem('admin_credentials');
    if (!adminCredsStr) {
      console.warn("Aucun identifiant admin trouvé en localStorage, vérification via constantes");
      return email.toLowerCase() === ADMIN_CREDENTIALS.EMAIL.toLowerCase() && 
             password === ADMIN_CREDENTIALS.PASSWORD;
    }
    
    const adminCreds = JSON.parse(adminCredsStr);
    const emailMatch = email.toLowerCase() === (adminCreds.email || ADMIN_CREDENTIALS.EMAIL).toLowerCase();
    const passwordMatch = password === (adminCreds.plainPassword || adminCreds.password || ADMIN_CREDENTIALS.PASSWORD);
    
    if (emailMatch && passwordMatch) {
      // Ensure credentials are up to date
      resetAdminCredentials();
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Erreur lors de la vérification des identifiants admin:", error);
    // Fallback to direct constant check
    return email.toLowerCase() === ADMIN_CREDENTIALS.EMAIL.toLowerCase() && 
           password === ADMIN_CREDENTIALS.PASSWORD;
  }
};

