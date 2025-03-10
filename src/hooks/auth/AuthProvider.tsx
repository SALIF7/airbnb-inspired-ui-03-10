
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, User, LoginCredentials, RegisterData } from "./types";
import { LocalStorageKeys } from "./constants";
import { useSecurityFeatures } from "./useSecurityFeatures";
import { useAuthMutations } from "./useAuthMutations";

const initialContext: AuthContextType = {
  user: null,
  login: {
    mutateAsync: async () => {},
    isPending: false,
  },
  register: {
    mutateAsync: async () => {},
    isPending: false,
  },
  logout: () => {},
  isLoading: true,
  loading: false,
  isAuthenticated: false,
  isAdmin: false,
  updateUserProfile: () => undefined,
  updateUserAvatar: () => undefined,
  registerLoading: false,
  refreshSession: () => {},
  checkAccountLocked: () => ({ locked: false, remainingMinutes: 0 }),
  updateLoginAttempts: () => ({ count: 0, timestamp: 0 }),
  resetLoginAttempts: () => {},
  unlockUserAccount: () => false,
  checkDeviceTrusted: () => false,
  handleSecurityAlert: () => {},
  getAccountResetRequests: () => [],
  updateResetRequestStatus: () => false
};

const AuthContext = createContext<AuthContextType>(initialContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { 
    refreshSession: refreshSecuritySession,
    unlockUserAccount, 
    updateUserSecurityLevel, 
    checkAccountLocked, 
    getLoginAttempts, 
    updateLoginAttempts,
    resetLoginAttempts,
    getAccountResetRequests,
    updateResetRequestStatus
  } = useSecurityFeatures(user);

  // Define missing security functions
  const checkDeviceTrusted = (userId: string) => {
    const fingerprint = `${navigator.userAgent}-${navigator.language}-${screen.width}x${screen.height}`;
    const storedFingerprint = localStorage.getItem(`fingerprint_${userId}`);
    return storedFingerprint === fingerprint;
  };
  
  const handleSecurityAlert = (type: string, details: any) => {
    console.warn(`Security alert: ${type}`, details);
    // Record this in security logs
    const securityLogs = JSON.parse(localStorage.getItem('security_logs') || '[]');
    securityLogs.push({
      type: 'security_alert',
      alertType: type,
      details,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('security_logs', JSON.stringify(securityLogs));
  };

  const { 
    login, 
    register, 
    logout,
    updateUserProfile,
    updateUserAvatar,
    registerLoading
  } = useAuthMutations(user, setUser);

  // Refresh session function
  const refreshSession = () => {
    try {
      const storedUser = localStorage.getItem(LocalStorageKeys.USER);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      
      // Also refresh security session
      refreshSecuritySession();
    } catch (error) {
      console.error("Error refreshing session:", error);
    }
  };

  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem(LocalStorageKeys.USER);
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Error restoring auth state:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    isLoading,
    loading: isLoading,
    isAuthenticated: !!user,
    isAdmin: user?.isAdmin || false,
    updateUserProfile,
    updateUserAvatar,
    registerLoading,
    refreshSession,
    checkAccountLocked,
    updateLoginAttempts,
    resetLoginAttempts,
    unlockUserAccount,
    checkDeviceTrusted,
    handleSecurityAlert,
    getAccountResetRequests,
    updateResetRequestStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
