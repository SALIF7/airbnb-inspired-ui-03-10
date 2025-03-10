
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "./auth/AuthProvider";
import { verifyAdminCredentials } from "./auth/adminUtils";

export function useLoginForm() {
  const { login, checkAccountLocked } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showTwoFactorInput, setShowTwoFactorInput] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [loginAttempt, setLoginAttempt] = useState(0);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setFormData({ ...formData, email: newEmail });
    
    // Check account lock status when email changes
    if (newEmail && checkAccountLocked) {
      checkAccountLocked(newEmail);
      // Status is handled by parent component
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, password: e.target.value });
  };

  const handleTwoFactorCodeChange = (value: string) => {
    setTwoFactorCode(value);
  };

  const handleBackToLogin = () => {
    setShowTwoFactorInput(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginAttempt(prev => prev + 1);
    
    console.log("Tentative de connexion avec:", {
      email: formData.email,
      passwordProvided: !!formData.password
    });
    
    // Add a subtle delay to prevent timing attacks
    const randomDelay = Math.floor(Math.random() * 300) + 200;
    await new Promise(resolve => setTimeout(resolve, randomDelay));
    
    // Check if account is locked before attempting to login
    if (checkAccountLocked && formData.email) {
      const lockStatus = checkAccountLocked(formData.email);
      if (lockStatus.locked) {
        toast.error(`Compte verrouillé. Réessayez dans ${lockStatus.remainingMinutes} minutes ou contactez l'administrateur.`);
        return;
      }
    }
    
    // If showing 2FA input, validate the code
    if (showTwoFactorInput) {
      if (!/^\d{6}$/.test(twoFactorCode)) {
        toast.error("Veuillez entrer un code à 6 chiffres valide");
        return;
      }
      
      // In a real app, we would validate the 2FA code here
      // For demo purposes, we'll accept any 6-digit code
      
      // Simulate 2FA validation
      try {
        // Add twoFactorCode to the credentials
        const result = await login.mutateAsync({
          ...formData,
          twoFactorCode
        });
        
        // Log successful 2FA login
        const securityLogs = JSON.parse(localStorage.getItem('security_logs') || '[]');
        securityLogs.push({
          type: '2fa_login_success',
          email: formData.email,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        });
        localStorage.setItem('security_logs', JSON.stringify(securityLogs));
      } catch (error) {
        console.error("Erreur de connexion avec 2FA:", error);
      }
      return;
    }
    
    // Pour l'admin, vérifions d'abord si les identifiants correspondent
    // avant même d'appeler login.mutateAsync pour avoir plus de contrôle
    if (formData.email.toLowerCase() === 'shjob@center.com') {
      const isAdmin = verifyAdminCredentials(formData.email, formData.password);
      console.log("Vérification préliminaire admin:", isAdmin);
    }
    
    try {
      // First authentication step
      const result = await login.mutateAsync(formData);
      
      // Check if user has 2FA enabled and if we got a result back
      if (result && result.id) {
        const userData = localStorage.getItem(`2fa_${result.id}`);
        if (userData) {
          try {
            const parsedData = JSON.parse(userData);
            if (parsedData.enabled) {
              // Show 2FA input
              setShowTwoFactorInput(true);
              return;
            }
          } catch (e) {
            console.error("Error parsing 2FA data", e);
          }
        }
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      
      // If we've had multiple failed attempts, track suspicious activity
      if (loginAttempt >= 2) {
        const counterStr = sessionStorage.getItem('suspicious_activity_counter');
        const currentCount = counterStr ? parseInt(counterStr) : 0;
        sessionStorage.setItem('suspicious_activity_counter', (currentCount + 2).toString());
      }
    }
  };

  return {
    formData,
    twoFactorCode,
    showTwoFactorInput,
    handleEmailChange,
    handlePasswordChange,
    handleTwoFactorCodeChange,
    handleBackToLogin,
    handleSubmit,
    loginAttempt
  };
}
