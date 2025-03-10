
import { useEffect } from 'react';
import { ensureAdminAccount, resetAdminCredentials } from '@/hooks/auth/adminUtils';

const AppInitializer = () => {
  useEffect(() => {
    // Initialiser les données nécessaires pour la démo
    console.log("Initialisation des données pour la démo...");
    
    // Garantir que le compte admin existe et a les bons identifiants
    ensureAdminAccount();
    
    // Pour les besoins de la démo, réinitialiser les identifiants admin
    // afin de garantir que le mot de passe correct est utilisé
    resetAdminCredentials();
    
    // Initialiser d'autres données si nécessaire
    if (!localStorage.getItem('all_users')) {
      localStorage.setItem('all_users', JSON.stringify([]));
    }
    
    if (!localStorage.getItem('login_logs')) {
      localStorage.setItem('login_logs', JSON.stringify([]));
    }
    
    // Tester les identifiants admin en début de session
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
      }
    } catch (error) {
      console.error("Erreur lors de la vérification des identifiants admin:", error);
    }
    
    console.log("Données pour la démo initialisées!");
  }, []);

  return null;
};

export default AppInitializer;
