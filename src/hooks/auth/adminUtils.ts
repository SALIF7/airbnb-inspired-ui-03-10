
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';
import { logSecurityEvent } from './securityUtils';

// Constantes pour les identifiants de démonstration
const ADMIN_EMAIL = 'SHJob@Center.com';
const ADMIN_PASSWORD = 'SHJob@Center==12@';

// Ensure an admin account exists for demo purposes
export const ensureAdminAccount = () => {
  console.log("Initialisation du compte admin...");
  
  // Créer un compte admin par défaut
  const defaultAdmin = {
    id: 'admin-1',
    email: ADMIN_EMAIL,
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
  // Utilisation du mot de passe exact tel qu'affiché dans l'interface utilisateur
  const hashedPassword = CryptoJS.SHA256(`${ADMIN_PASSWORD}${adminPasswordSalt}`).toString();
  
  // Stocker les identifiants admin, toujours les écraser pour être sûr qu'ils sont corrects
  localStorage.setItem('admin_credentials', JSON.stringify({
    email: ADMIN_EMAIL,
    passwordHash: hashedPassword,
    salt: adminPasswordSalt,
    plainPassword: ADMIN_PASSWORD // Pour la démo uniquement
  }));
  
  // S'assurer que l'utilisateur admin existe
  const existingUser = localStorage.getItem('user_data');
  if (!existingUser || !existingUser.includes('"isAdmin":true')) {
    console.log("Aucun utilisateur admin trouvé. Réinitialisation des données admin...");
  }
  
  // Initialize security logs
  initializeSecurityLogs();
  
  console.log("Compte admin configuré avec:", {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    passwordHash: hashedPassword.substring(0, 10) + "..."
  });
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
  
  // Créer un nouveau sel mais s'assurer que le mot de passe reste inchangé
  const adminPasswordSalt = uuidv4();
  const hashedPassword = CryptoJS.SHA256(`${ADMIN_PASSWORD}${adminPasswordSalt}`).toString();
  
  localStorage.setItem('admin_credentials', JSON.stringify({
    email: ADMIN_EMAIL,
    passwordHash: hashedPassword,
    salt: adminPasswordSalt,
    plainPassword: ADMIN_PASSWORD // Pour la démo uniquement
  }));
  
  console.log("Identifiants admin réinitialisés avec succès:", {
    email: ADMIN_EMAIL,
    plainPassword: ADMIN_PASSWORD
  });
  
  return true;
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
    
    // Pour la démo, vérifier à la fois le hash et le mot de passe en clair
    const passwordMatch = 
      password === adminCreds.plainPassword || 
      CryptoJS.SHA256(`${password}${adminCreds.salt}`).toString() === adminCreds.passwordHash;
    
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
    return false;
  }
};
