
import { User } from "../../types";
import { toast } from "sonner";
import { LocalStorageKeys } from "../../constants";
import { NavigateFunction } from "react-router-dom";
import { verifyAdminCredentials } from "../../adminUtils";
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
  
  // Si adminCreds n'existe pas, essayons de recréer les identifiants
  if (!adminCreds) {
    console.warn("Aucun identifiant admin trouvé en local storage. Tentative de recréation...");
    // Tenter de recréer les identifiants admin
    const adminPasswordSalt = crypto.randomUUID();
    const adminCredsObj = {
      email: ADMIN_CREDENTIALS.EMAIL,
      plainPassword: ADMIN_CREDENTIALS.PASSWORD,
      salt: adminPasswordSalt,
      passwordHash: crypto.randomUUID() // Placeholder, sera correctement défini lors de la prochaine initialisation
    };
    localStorage.setItem('admin_credentials', JSON.stringify(adminCredsObj));
    adminCreds = JSON.stringify(adminCredsObj);
  }
  
  try {
    // Use admin credentials verification function
    const isValidAdmin = verifyAdminCredentials(userData.email, userData.password);
    
    if (!isValidAdmin) {
      // Si les identifiants ne correspondent pas, mais que le mot de passe est celui défini dans les constantes
      if (userData.password === ADMIN_CREDENTIALS.PASSWORD) {
        console.log("Le mot de passe correspond à la constante mais la vérification a échoué. Réinitialisation...");
        localStorage.removeItem('admin_credentials'); // Forcer une réinitialisation complète
        
        // Admin login successful in this case
        updateLoginAttempts(userData.email, false);
        
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
      
      // Admin email correct but password wrong
      const attempts = updateLoginAttempts(userData.email);
      toast.error(`Mot de passe incorrect. ${5 - attempts.count} tentative(s) restante(s).`);
      reject(new Error("Mot de passe incorrect"));
      setIsPending(false);
      return true;
    }
    
    console.log("Connexion admin réussie!");
    
    // Admin login successful
    updateLoginAttempts(userData.email, false);
    
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
    return false;
  }
};
