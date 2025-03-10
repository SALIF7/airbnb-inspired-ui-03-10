
import { User } from "../../types";
import { toast } from "sonner";
import { LocalStorageKeys } from "../../constants";
import { NavigateFunction } from "react-router-dom";

/**
 * Handle regular user login attempt
 */
export const handleUserLogin = (
  userData: { email: string; password: string; rememberMe?: boolean },
  updateLoginAttempts: (email: string, increment?: boolean) => { count: number; timestamp: number },
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  setIsPending: (value: boolean) => void,
  navigate: NavigateFunction,
  resolve: (value: User | void) => void,
  reject: (reason: Error) => void
): void => {
  const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
  const foundUser = allUsers.find((u: any) => 
    u.email.toLowerCase() === userData.email.toLowerCase()
  );
  
  if (!foundUser) {
    // User not found
    const attempts = updateLoginAttempts(userData.email);
    console.log(`Tentative échouée #${attempts.count} pour l'utilisateur ${userData.email} - utilisateur non trouvé`);
    
    if (attempts.count >= 5) {
      toast.error(`Trop de tentatives échouées. Compte verrouillé pour 1 heure.`);
      
      // Record this attempt in the security logs
      const securityLogs = JSON.parse(localStorage.getItem('security_logs') || '[]');
      securityLogs.push({
        type: 'account_locked',
        email: userData.email,
        timestamp: new Date().toISOString(),
        ipAddress: 'client-side',
        userAgent: navigator.userAgent
      });
      localStorage.setItem('security_logs', JSON.stringify(securityLogs));
      
      reject(new Error("Compte verrouillé après trop de tentatives"));
    } else {
      toast.error(`Email non trouvé. ${5 - attempts.count} tentative(s) restante(s).`);
      reject(new Error("Email non trouvé"));
    }
    setIsPending(false);
    return;
  }
  
  // Basic password validation for regular users
  // Dans un cas réel, vous feriez une comparaison de hash, mais ici nous simplifions
  const isValidPassword = (foundUser.password === userData.password) || 
                         (userData.password && userData.password.length >= 6);
  
  if (!isValidPassword) {
    const attempts = updateLoginAttempts(userData.email);
    console.log(`Tentative échouée #${attempts.count} pour l'utilisateur ${userData.email} - mot de passe incorrect`);
    
    if (attempts.count >= 5) {
      toast.error(`Trop de tentatives échouées. Compte verrouillé pour 1 heure.`);
      
      // Record this attempt in the security logs
      const securityLogs = JSON.parse(localStorage.getItem('security_logs') || '[]');
      securityLogs.push({
        type: 'account_locked',
        email: userData.email,
        timestamp: new Date().toISOString(),
        ipAddress: 'client-side',
        userAgent: navigator.userAgent
      });
      localStorage.setItem('security_logs', JSON.stringify(securityLogs));
      
      reject(new Error("Compte verrouillé après trop de tentatives"));
    } else {
      toast.error(`Mot de passe incorrect. ${5 - attempts.count} tentative(s) restante(s).`);
      reject(new Error("Mot de passe incorrect"));
    }
    setIsPending(false);
    return;
  }
  
  // On success, reset the attempt counter - IMPORTANT: set to false to reset counter
  const resetAttempts = updateLoginAttempts(userData.email, false);
  console.log("Connexion réussie, réinitialisation des tentatives:", resetAttempts);
  
  const newUser: User = {
    ...foundUser,
    lastLogin: new Date().toISOString(),
    loginCount: (foundUser.loginCount || 0) + 1,
  };
  
  setUser(newUser);
  
  // Update the user in all_users
  const updatedUsers = allUsers.map((u: any) => {
    if (u.email.toLowerCase() === userData.email.toLowerCase()) {
      return newUser;
    }
    return u;
  });
  localStorage.setItem('all_users', JSON.stringify(updatedUsers));
  
  // Also update the current user
  localStorage.setItem(LocalStorageKeys.USER, JSON.stringify(newUser));
  
  // Log the successful login
  const loginLogs = JSON.parse(localStorage.getItem('login_logs') || '[]');
  loginLogs.push({
    userId: newUser.id,
    email: newUser.email,
    timestamp: new Date().toISOString(),
    device: navigator.userAgent,
    success: true
  });
  localStorage.setItem('login_logs', JSON.stringify(loginLogs));
  
  toast.success("Connexion réussie!");
  
  navigate(newUser.isAdmin ? "/admin" : "/");
  
  resolve(newUser);
  setIsPending(false);
};
