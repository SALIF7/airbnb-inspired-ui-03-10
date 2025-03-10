
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import { logSecurityEvent } from './securityUtils';
import { ADMIN_CREDENTIALS } from './security/securityConstants';

// Ensure an admin account exists for demo purposes
export const ensureAdminAccount = () => {
  console.log("Initialisation du compte admin...");
  
  // Vérifier si les identifiants admin existent déjà
  const existingAdminCreds = localStorage.getItem('admin_credentials');
  let credentialsChanged = false;
  
  // Créer un compte admin par défaut
  const defaultAdmin = {
    id: 'admin-1',
    email: ADMIN_CREDENTIALS.EMAIL,
    name: 'Admin User',
    role: 'admin',
    isAdmin: true,
    securityLevel: 'high',
    created: new Date().toISOString(),
    lastLogin: null,
    passwordLastChanged: new Date().toISOString(),
    requiresPasswordChange: false,
    loginCount: 0
  };
  
  // Générer un fingerprint pour l'admin
  const fingerprint = `${navigator.userAgent}-${navigator.language}-${screen.width}x${screen.height}`;
  localStorage.setItem(`fingerprint_admin-1`, fingerprint);
  
  // Store the admin credentials exactly as defined in constants
  if (!existingAdminCreds) {
    // Store plaintext for persistent verification
    localStorage.setItem('admin_credentials', JSON.stringify({
      email: ADMIN_CREDENTIALS.EMAIL,
      password: ADMIN_CREDENTIALS.PASSWORD,
      plainPassword: ADMIN_CREDENTIALS.PASSWORD // Ensure this is always set
    }));
    
    console.log("Identifiants admin créés avec succès:", {
      email: ADMIN_CREDENTIALS.EMAIL,
      password: "***MASQUÉ***"
    });
    
    credentialsChanged = true;
  } else {
    // Verify existing credentials match constants
    try {
      const parsed = JSON.parse(existingAdminCreds);
      if (parsed.email !== ADMIN_CREDENTIALS.EMAIL || 
          parsed.password !== ADMIN_CREDENTIALS.PASSWORD || 
          !parsed.plainPassword) {
        
        // Update to match constants
        localStorage.setItem('admin_credentials', JSON.stringify({
          email: ADMIN_CREDENTIALS.EMAIL,
          password: ADMIN_CREDENTIALS.PASSWORD,
          plainPassword: ADMIN_CREDENTIALS.PASSWORD
        }));
        
        console.log("Identifiants admin mis à jour pour correspondre aux constantes");
        credentialsChanged = true;
      }
    } catch (e) {
      console.error("Erreur lors de la vérification des identifiants admin existants:", e);
      // Recreate on error
      localStorage.setItem('admin_credentials', JSON.stringify({
        email: ADMIN_CREDENTIALS.EMAIL,
        password: ADMIN_CREDENTIALS.PASSWORD,
        plainPassword: ADMIN_CREDENTIALS.PASSWORD
      }));
      credentialsChanged = true;
    }
  }
  
  // Initialize security logs
  initializeSecurityLogs();
  
  return credentialsChanged;
};

// Initialize security logs structure
const initializeSecurityLogs = () => {
  if (!localStorage.getItem('security_logs')) {
    localStorage.setItem('security_logs', JSON.stringify([]));
  }
  
  if (!localStorage.getItem('admin_access_logs')) {
    localStorage.setItem('admin_access_logs', JSON.stringify([]));
  }
  
  if (!localStorage.getItem('suspicious_activities')) {
    localStorage.setItem('suspicious_activities', JSON.stringify([]));
  }
};

// Fonction pour réinitialiser les identifiants de l'administrateur
export const resetAdminCredentials = () => {
  console.log("Réinitialisation des identifiants admin...");
  
  // Always set the admin credentials directly from constants
  localStorage.setItem('admin_credentials', JSON.stringify({
    email: ADMIN_CREDENTIALS.EMAIL,
    password: ADMIN_CREDENTIALS.PASSWORD,
    plainPassword: ADMIN_CREDENTIALS.PASSWORD
  }));
  
  console.log("Identifiants admin réinitialisés avec succès:", {
    email: ADMIN_CREDENTIALS.EMAIL,
    password: "***MASQUÉ***"
  });
  
  return true;
};

// Vérification des identifiants admin - simplifiée et plus fiable
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
    
    // Log verification details
    console.log("Vérification des identifiants admin:", {
      emailMatch,
      passwordMatch,
      providedEmail: email,
      expectedEmail: adminCreds.email || ADMIN_CREDENTIALS.EMAIL,
      providedPassword: password.substring(0, 3) + "..."
    });
    
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
