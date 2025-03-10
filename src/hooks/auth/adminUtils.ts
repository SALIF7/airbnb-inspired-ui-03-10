
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
  
  // Note: In a real app, you would never store credentials in localStorage like this
  // This is only for demo purposes
  const adminPasswordSalt = uuidv4();
  // Utilisation du mot de passe exact de l'administrateur
  const hashedPassword = CryptoJS.SHA256(`${ADMIN_CREDENTIALS.PASSWORD}${adminPasswordSalt}`).toString();
  
  if (!existingAdminCreds) {
    // Stocker les identifiants admin
    localStorage.setItem('admin_credentials', JSON.stringify({
      email: ADMIN_CREDENTIALS.EMAIL,
      passwordHash: hashedPassword,
      salt: adminPasswordSalt,
      plainPassword: ADMIN_CREDENTIALS.PASSWORD // Pour la démo uniquement
    }));
    credentialsChanged = true;
    console.log("Identifiants admin créés avec succès");
  }
  
  // S'assurer que l'utilisateur admin existe
  const existingUser = localStorage.getItem('user_data');
  if (!existingUser || !existingUser.includes('"isAdmin":true')) {
    console.log("Aucun utilisateur admin trouvé. Réinitialisation des données admin...");
  }
  
  // Initialize security logs
  initializeSecurityLogs();
  
  console.log("Compte admin vérifié avec:", {
    email: ADMIN_CREDENTIALS.EMAIL,
    plainPassword: ADMIN_CREDENTIALS.PASSWORD.substring(0, 3) + "..."
  });
  
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
  console.log("Vérification et mise à jour des identifiants admin...");
  
  // Vérifier si les identifiants admin existent déjà
  const existingAdminCreds = localStorage.getItem('admin_credentials');
  
  if (!existingAdminCreds) {
    console.log("Aucun identifiant admin trouvé. Création des identifiants...");
    
    // Créer un nouveau sel
    const adminPasswordSalt = uuidv4();
    const hashedPassword = CryptoJS.SHA256(`${ADMIN_CREDENTIALS.PASSWORD}${adminPasswordSalt}`).toString();
    
    localStorage.setItem('admin_credentials', JSON.stringify({
      email: ADMIN_CREDENTIALS.EMAIL,
      passwordHash: hashedPassword,
      salt: adminPasswordSalt,
      plainPassword: ADMIN_CREDENTIALS.PASSWORD // Pour la démo uniquement
    }));
    
    console.log("Identifiants admin créés avec succès:", {
      email: ADMIN_CREDENTIALS.EMAIL,
      plainPassword: ADMIN_CREDENTIALS.PASSWORD.substring(0, 3) + "..."
    });
    
    return true;
  }
  
  let credentialsUpdated = false;
  
  // Si les identifiants existent, vérifier qu'ils sont corrects
  try {
    const parsedCreds = JSON.parse(existingAdminCreds);
    
    // Vérifier si les identifiants correspondent aux valeurs attendues
    if (parsedCreds.email !== ADMIN_CREDENTIALS.EMAIL || 
        parsedCreds.plainPassword !== ADMIN_CREDENTIALS.PASSWORD) {
      console.log("Identifiants admin incorrects. Mise à jour...");
      
      // Créer un nouveau sel
      const adminPasswordSalt = uuidv4();
      const hashedPassword = CryptoJS.SHA256(`${ADMIN_CREDENTIALS.PASSWORD}${adminPasswordSalt}`).toString();
      
      localStorage.setItem('admin_credentials', JSON.stringify({
        email: ADMIN_CREDENTIALS.EMAIL,
        passwordHash: hashedPassword,
        salt: adminPasswordSalt,
        plainPassword: ADMIN_CREDENTIALS.PASSWORD // Pour la démo uniquement
      }));
      
      console.log("Identifiants admin mis à jour avec succès:", {
        email: ADMIN_CREDENTIALS.EMAIL,
        plainPassword: ADMIN_CREDENTIALS.PASSWORD.substring(0, 3) + "..."
      });
      
      credentialsUpdated = true;
    } else {
      console.log("Identifiants admin existants et corrects.");
    }
  } catch (e) {
    console.error("Erreur lors de la vérification des identifiants admin:", e);
    
    // En cas d'erreur, recréer les identifiants
    const adminPasswordSalt = uuidv4();
    const hashedPassword = CryptoJS.SHA256(`${ADMIN_CREDENTIALS.PASSWORD}${adminPasswordSalt}`).toString();
    
    localStorage.setItem('admin_credentials', JSON.stringify({
      email: ADMIN_CREDENTIALS.EMAIL,
      passwordHash: hashedPassword,
      salt: adminPasswordSalt,
      plainPassword: ADMIN_CREDENTIALS.PASSWORD // Pour la démo uniquement
    }));
    
    console.log("Identifiants admin réinitialisés suite à une erreur:", {
      email: ADMIN_CREDENTIALS.EMAIL,
      plainPassword: ADMIN_CREDENTIALS.PASSWORD.substring(0, 3) + "..."
    });
    
    credentialsUpdated = true;
  }
  
  return credentialsUpdated;
};

// Vérification des identifiants admin
export const verifyAdminCredentials = (email: string, password: string): boolean => {
  try {
    const adminCredsStr = localStorage.getItem('admin_credentials');
    if (!adminCredsStr) {
      console.error("Aucun identifiant admin trouvé");
      return false;
    }
    
    const adminCreds = JSON.parse(adminCredsStr);
    const emailMatch = email.toLowerCase() === adminCreds.email.toLowerCase();
    
    // Pour la démo, vérifier le mot de passe en priorité avec la valeur exacte (plainPassword)
    let passwordMatch = false;
    
    if (adminCreds.plainPassword) {
      passwordMatch = password === adminCreds.plainPassword;
    }
    
    // Si le mot de passe en clair ne correspond pas, essayer avec le hash
    if (!passwordMatch && adminCreds.salt) {
      passwordMatch = CryptoJS.SHA256(`${password}${adminCreds.salt}`).toString() === adminCreds.passwordHash;
    }
    
    // Vérifier également si le mot de passe correspond à la constante directement (failsafe)
    if (!passwordMatch && password === ADMIN_CREDENTIALS.PASSWORD) {
      console.log("Mot de passe correspondant aux constantes mais pas aux credentials stockés. Mise à jour...");
      resetAdminCredentials();
      passwordMatch = true;
    }
    
    console.log("Vérification des identifiants admin:", {
      emailMatch,
      passwordMatch,
      providedEmail: email,
      expectedEmail: adminCreds.email,
      providedPassword: password.substring(0, 3) + "..."
    });
    
    return emailMatch && passwordMatch;
  } catch (error) {
    console.error("Erreur lors de la vérification des identifiants admin:", error);
    // En cas d'erreur, essayer avec les constantes directement
    return email.toLowerCase() === ADMIN_CREDENTIALS.EMAIL.toLowerCase() && 
           password === ADMIN_CREDENTIALS.PASSWORD;
  }
};
