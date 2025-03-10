
import { ADMIN_CREDENTIALS } from '../security/securityConstants';
import { logSecurityEvent } from '../securityUtils';

/**
 * Ensure an admin account exists for demo purposes
 */
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
    localStorage.setItem('admin_credentials', JSON.stringify({
      email: ADMIN_CREDENTIALS.EMAIL,
      password: ADMIN_CREDENTIALS.PASSWORD,
      plainPassword: ADMIN_CREDENTIALS.PASSWORD
    }));
    
    console.log("Identifiants admin créés avec succès");
    credentialsChanged = true;
  } else {
    try {
      const parsed = JSON.parse(existingAdminCreds);
      if (parsed.email !== ADMIN_CREDENTIALS.EMAIL || 
          parsed.password !== ADMIN_CREDENTIALS.PASSWORD || 
          !parsed.plainPassword) {
        
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
      localStorage.setItem('admin_credentials', JSON.stringify({
        email: ADMIN_CREDENTIALS.EMAIL,
        password: ADMIN_CREDENTIALS.PASSWORD,
        plainPassword: ADMIN_CREDENTIALS.PASSWORD
      }));
      credentialsChanged = true;
    }
  }
  
  return credentialsChanged;
};
