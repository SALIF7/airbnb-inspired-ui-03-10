
import { useEffect } from 'react';
import { ensureAdminAccount, resetAdminCredentials } from '@/hooks/auth/adminUtils';
import { toast } from 'sonner';

const AppInitializer = () => {
  useEffect(() => {
    // Initialiser les données nécessaires pour la démo
    console.log("Initialisation des données pour la démo...");
    
    // Garantir que le compte admin existe et a les bons identifiants
    const adminAccountCreated = ensureAdminAccount();
    
    // Pour les besoins de la démo, réinitialiser les identifiants admin
    // afin de garantir que le mot de passe correct est utilisé
    const adminCredsReset = resetAdminCredentials();
    
    if (adminAccountCreated || adminCredsReset) {
      console.log("Identifiants admin initialisés avec succès");
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
    
    // Vérifier les identifiants admin en début de session
    try {
      const adminCreds = localStorage.getItem('admin_credentials');
      if (adminCreds) {
        const parsed = JSON.parse(adminCreds);
        console.log("Identifiants admin disponibles:", {
          email: parsed.email,
          passwordStored: !!parsed.plainPassword
        });
      } else {
        console.warn("Aucun identifiant admin trouvé, ils seront initialisés.");
        ensureAdminAccount();
      }
    } catch (error) {
      console.error("Erreur lors de la vérification des identifiants admin:", error);
      // En cas d'erreur, recréer les identifiants
      ensureAdminAccount();
    }
    
    console.log("Données pour la démo initialisées!");
  }, []);

  return null;
};

export default AppInitializer;
