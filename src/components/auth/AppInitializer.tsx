
import { useEffect } from 'react';
import { ensureAdminAccount, resetAdminCredentials } from '@/hooks/auth/adminUtils';
import { toast } from 'sonner';
import { ADMIN_CREDENTIALS } from '@/hooks/auth/security/securityConstants';

const AppInitializer = () => {
  useEffect(() => {
    // Initialiser les données nécessaires pour la démo
    console.log("Initialisation des données pour la démo...");
    
    // Force reset admin credentials to ensure they are correct
    const adminCredsReset = resetAdminCredentials();
    
    // Then ensure admin account exists with correct credentials
    const adminAccountCreated = ensureAdminAccount();
    
    if (adminAccountCreated || adminCredsReset) {
      console.log("Identifiants admin initialisés avec succès");
    }
    
    // Validate admin credentials are correctly stored
    const adminCreds = localStorage.getItem('admin_credentials');
    if (adminCreds) {
      try {
        const parsed = JSON.parse(adminCreds);
        if (parsed.email !== ADMIN_CREDENTIALS.EMAIL || 
            parsed.password !== ADMIN_CREDENTIALS.PASSWORD || 
            !parsed.plainPassword) {
          console.warn("Identifiants admin incorrects, réinitialisation...");
          resetAdminCredentials();
        } else {
          console.log("Identifiants admin vérifiés et valides");
        }
      } catch (e) {
        console.error("Erreur lors de la validation des identifiants admin:", e);
        resetAdminCredentials();
      }
    } else {
      console.warn("Aucun identifiant admin trouvé, initialisation...");
      resetAdminCredentials();
    }
    
    // Initialiser d'autres données si nécessaire
    if (!localStorage.getItem('all_users')) {
      localStorage.setItem('all_users', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('login_logs')) {
      localStorage.setItem('login_logs', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('security_logs')) {
      localStorage.setItem('security_logs', JSON.stringify([]));
    }
    
    console.log("Données pour la démo initialisées!");
  }, []);

  return null;
};

export default AppInitializer;
