
import { User } from "../../types";
import { toast } from "sonner";
import { LocalStorageKeys } from "../../constants";
import { NavigateFunction } from "react-router-dom";
import { verifyAdminCredentials, resetAdminCredentials } from "../../adminUtils";
import { ADMIN_CREDENTIALS } from "../../security/securityConstants";

/**
 * Handle admin login attempt
 */
export const handleAdminLogin = (
  userData: { email: string; password: string },
  adminCreds: string | null,
  updateLoginAttempts: (email: string, increment?: boolean) => { count: number; timestamp: number },
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsPending: (value: boolean) => void,
  navigate: NavigateFunction,
  resolve: (value: User | void) => void,
  reject: (reason: Error) => void
): boolean => {
  // D'abord vérifier si l'email correspond à l'admin
  if (userData.email.toLowerCase() !== ADMIN_CREDENTIALS.EMAIL.toLowerCase()) {
    return false; // Ce n'est pas une tentative de connexion admin
  }
  
  console.log("Tentative de connexion admin détectée avec:", {
    email: userData.email,
    password: userData.password.substring(0, 3) + "..." // Logging partially for security
  });
  
  // Si adminCreds n'existe pas, recréer les identifiants
  if (!adminCreds) {
    console.warn("Aucun identifiant admin trouvé. Réinitialisation...");
    resetAdminCredentials();
    adminCreds = localStorage.getItem('admin_credentials');
  }
  
  try {
    // Direct check against constants first
    if (userData.email.toLowerCase() === ADMIN_CREDENTIALS.EMAIL.toLowerCase() && 
        userData.password === ADMIN_CREDENTIALS.PASSWORD) {
      
      console.log("Connexion admin réussie via vérification directe!");
      
      // Ensure credentials are up to date
      resetAdminCredentials();
      
      // Admin login successful - IMPORTANT: reset login attempts counter to 0
      // Reset login attempts using localStorage directly to ensure it works
      localStorage.setItem(`login_attempts_${userData.email}`, JSON.stringify({
        count: 0,
        timestamp: Date.now(),
        lockUntil: undefined
      }));
      console.log("Tentatives de connexion admin réinitialisées complètement");
      
      const newUser: User = {
        id: 'admin-1',
        email: ADMIN_CREDENTIALS.EMAIL,
        name: 'Administrateur',
        role: 'admin',
        isAdmin: true,
        lastLogin: new Date().toISOString(),
        loginCount: 1,
        securityLevel: 'high'
      };
      
      setUser(newUser);
      localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(newUser));
      
      // Log the successful admin login
      const loginLogs = JSON.parse(localStorage.getItem('login_logs') || '[]');
      loginLogs.push({
        userId: newUser.id,
        email: newUser.email,
        timestamp: new Date().toISOString(),
        device: navigator.userAgent,
        success: true,
        isAdmin: true
      });
      localStorage.setItem('login_logs', JSON.stringify(loginLogs));
      
      toast.success("Connexion administrateur réussie!");
      navigate("/admin");
      
      resolve(newUser);
      setIsPending(false);
      return true;
    }
    
    // Use admin credentials verification function as fallback
    const isValidAdmin = verifyAdminCredentials(userData.email, userData.password);
    
    if (!isValidAdmin) {
      // Admin email correct but password wrong
      const attempts = updateLoginAttempts(userData.email);
      console.log(`Tentative échouée #${attempts.count} pour l'admin`);
      
      if (attempts.count >= 5) {
        toast.error("Trop de tentatives de connexion échouées. Compte verrouillé temporairement.");
      } else {
        toast.error(`Mot de passe incorrect. ${5 - attempts.count} tentative(s) restante(s).`);
      }
      
      reject(new Error("Mot de passe incorrect"));
      setIsPending(false);
      return true;
    }
    
    console.log("Connexion admin réussie!");
    
    // Admin login successful - IMPORTANT: reset login attempts counter to 0 explicitly
    // Reset login attempts using localStorage directly to ensure it works
    localStorage.setItem(`login_attempts_${userData.email}`, JSON.stringify({
      count: 0,
      timestamp: Date.now(),
      lockUntil: undefined
    }));
    console.log("Tentatives de connexion admin réinitialisées complètement");
    
    const newUser: User = {
      id: 'admin-1',
      email: ADMIN_CREDENTIALS.EMAIL,
      name: 'Administrateur',
      role: 'admin',
      isAdmin: true,
      lastLogin: new Date().toISOString(),
      loginCount: 1,
      securityLevel: 'high'
    };
    
    setUser(newUser);
    localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(newUser));
    
    // Log the successful admin login
    const loginLogs = JSON.parse(localStorage.getItem('login_logs') || '[]');
    loginLogs.push({
      userId: newUser.id,
      email: newUser.email,
      timestamp: new Date().toISOString(),
      device: navigator.userAgent,
      success: true,
      isAdmin: true
    });
    localStorage.setItem('login_logs', JSON.stringify(loginLogs));
    
    toast.success("Connexion administrateur réussie!");
    navigate("/admin");
    
    resolve(newUser);
    setIsPending(false);
    return true;
  } catch (e) {
    console.error("Error during admin login process", e);
    
    // Try direct check with ADMIN_CREDENTIALS as last resort
    if (userData.email.toLowerCase() === ADMIN_CREDENTIALS.EMAIL.toLowerCase() && 
        userData.password === ADMIN_CREDENTIALS.PASSWORD) {
      
      console.log("Connexion admin réussie via constantes après erreur!");
      
      // Admin login successful - reset attempts
      // Reset login attempts using localStorage directly to ensure it works
      localStorage.setItem(`login_attempts_${userData.email}`, JSON.stringify({
        count: 0,
        timestamp: Date.now(),
        lockUntil: undefined
      }));
      console.log("Tentatives de connexion admin réinitialisées complètement");
      
      const newUser: User = {
        id: 'admin-1',
        email: ADMIN_CREDENTIALS.EMAIL,
        name: 'Administrateur',
        role: 'admin',
        isAdmin: true,
        lastLogin: new Date().toISOString(),
        loginCount: 1,
        securityLevel: 'high'
      };
      
      setUser(newUser);
      localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(newUser));
      resetAdminCredentials();
      
      toast.success("Connexion administrateur réussie!");
      navigate("/admin");
      
      resolve(newUser);
      setIsPending(false);
      return true;
    }
    
    return false;
  }
};
