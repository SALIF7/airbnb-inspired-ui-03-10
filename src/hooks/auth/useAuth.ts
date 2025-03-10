
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { User, LoginCredentials, RegisterData } from "./types";
import { MOCK_USERS, createWelcomeMessages } from "./authUtils";
import { useUserAvatar } from "./useUserAvatar";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import CryptoJS from 'crypto-js';

const useAuth = () => {
  const queryClient = useQueryClient();
  const { updateUserAvatar: avatarUpdater } = useUserAvatar();
  const navigate = useNavigate();

  const generateToken = (user: Omit<User, "password">) => {
    const header = { alg: "HS256", typ: "JWT" };
    const payload = {
      ...user,
      iat: new Date().getTime(),
      exp: new Date().getTime() + (24 * 60 * 60 * 1000),
      jti: uuidv4(),
    };
    
    const headerStr = btoa(JSON.stringify(header));
    const payloadStr = btoa(JSON.stringify(payload));
    
    const secret = localStorage.getItem("auth_secret") || uuidv4();
    localStorage.setItem("auth_secret", secret);
    
    const signature = CryptoJS.HmacSHA256(
      `${headerStr}.${payloadStr}`,
      secret
    ).toString(CryptoJS.enc.Base64);
    
    return `${headerStr}.${payloadStr}.${signature}`;
  };

  const verifyToken = (token: string): boolean => {
    try {
      const [headerStr, payloadStr, signature] = token.split('.');
      
      const secret = localStorage.getItem("auth_secret");
      if (!secret) return false;
      
      const computedSignature = CryptoJS.HmacSHA256(
        `${headerStr}.${payloadStr}`,
        secret
      ).toString(CryptoJS.enc.Base64);
      
      if (computedSignature !== signature) return false;
      
      const payload = JSON.parse(atob(payloadStr));
      if (payload.exp < new Date().getTime()) return false;
      
      return true;
    } catch (error) {
      console.error("Erreur de vérification du token:", error);
      return false;
    }
  };

  const refreshSession = () => {
    const savedToken = localStorage.getItem("auth_token");
    if (savedToken && !verifyToken(savedToken)) {
      console.log("Session expirée, déconnexion automatique");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("auth_token");
      queryClient.setQueryData(["auth-user"], null);
      toast.error("Votre session a expiré. Veuillez vous reconnecter.");
      navigate("/login");
    }
  };

  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const savedUser = localStorage.getItem("currentUser");
      const savedToken = localStorage.getItem("auth_token");
      
      if (savedUser && savedToken) {
        try {
          if (verifyToken(savedToken)) {
            const user = JSON.parse(savedUser) as User;
            console.log("Utilisateur chargé depuis localStorage:", user);
            return user;
          } else {
            console.log("Token invalide, déconnexion automatique");
            localStorage.removeItem("currentUser");
            localStorage.removeItem("auth_token");
            return null;
          }
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("currentUser");
          localStorage.removeItem("auth_token");
          return null;
        }
      }
      return null;
    },
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const isIpSuspicious = (ipData: any[]): boolean => {
    const lastHour = new Date().getTime() - (60 * 60 * 1000);
    const recentAttempts = ipData.filter(
      attempt => new Date(attempt.timestamp).getTime() > lastHour
    );
    
    return recentAttempts.length >= 10;
  };

  const login = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const loginAttempts = JSON.parse(localStorage.getItem("login_attempts") || "[]");
      
      const userAttempts = loginAttempts.filter(
        (attempt: any) => attempt.email === credentials.email
      );
      
      const recentUserAttempts = userAttempts.filter(
        (attempt: any) => new Date(attempt.timestamp).getTime() > 
          new Date().getTime() - (30 * 60 * 1000)
      );
      
      if (recentUserAttempts.length >= 5) {
        throw new Error("Trop de tentatives de connexion. Veuillez réessayer plus tard.");
      }
      
      const storedUsers = localStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : MOCK_USERS;
      
      if (!storedUsers) {
        localStorage.setItem("users", JSON.stringify(MOCK_USERS));
      }
      
      const user = users.find(
        (u: any) => u.email === credentials.email && u.password === credentials.password
      );
      
      if (!user) {
        loginAttempts.push({
          email: credentials.email,
          timestamp: new Date().toISOString(),
          success: false,
          userAgent: navigator.userAgent
        });
        localStorage.setItem("login_history", JSON.stringify(loginAttempts));
        throw new Error("Identifiants invalides");
      }
      
      loginAttempts.push({
        userId: user.id,
        email: user.email,
        timestamp: new Date().toISOString(),
        success: true,
        userAgent: navigator.userAgent
      });
      localStorage.setItem("login_history", JSON.stringify(loginAttempts));
      
      const { password, ...userWithoutPassword } = user;
      const token = generateToken(userWithoutPassword);
      localStorage.setItem("auth_token", token);
      
      localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));
      console.log("Utilisateur connecté:", userWithoutPassword);
      return userWithoutPassword;
    },
    onSuccess: (user) => {
      queryClient.setQueryData(["auth-user"], user);
      toast.success("Connexion réussie");
      
      if (user.role === "admin") {
        navigate("/admin"); // Changed from "/admin/dashboard" to "/admin"
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      toast.error(error.message || "Échec de la connexion");
    },
  });

  const register = useMutation({
    mutationFn: async (data: RegisterData) => {
      const storedUsers = localStorage.getItem("users");
      const users = storedUsers ? JSON.parse(storedUsers) : MOCK_USERS;
      
      if (!storedUsers) {
        localStorage.setItem("users", JSON.stringify(MOCK_USERS));
      }
      
      const existingUser = users.find((u: any) => u.email === data.email);
      if (existingUser) {
        throw new Error("Cet email est déjà utilisé");
      }
      
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        ...data,
        role: "user" as const,
      };
      
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
      const { password, ...userWithoutPassword } = newUser;
      
      createWelcomeMessages(userWithoutPassword);
      
      console.log("Nouvel utilisateur enregistré:", userWithoutPassword);
      return userWithoutPassword;
    },
    onSuccess: (user) => {
      toast.success("Inscription réussie");
      localStorage.setItem("currentUser", JSON.stringify(user));
      queryClient.setQueryData(["auth-user"], user);
    },
    onError: () => {
      toast.error("Échec de l'inscription");
    },
  });

  const logout = useMutation({
    mutationFn: async () => {
      localStorage.removeItem("currentUser");
      localStorage.removeItem("auth_token");
      console.log("Utilisateur déconnecté");
      return null;
    },
    onSuccess: () => {
      queryClient.setQueryData(["auth-user"], null);
      toast.success("Déconnexion réussie");
      navigate("/login");
    },
  });

  const updateUserAvatar = (avatarUrl: string) => {
    if (currentUser) {
      return avatarUpdater(currentUser, avatarUrl);
    }
  };

  const isAdmin = currentUser?.role === "admin";

  const isAuthenticated = !!currentUser;

  return {
    user: currentUser,
    isLoading,
    login,
    register,
    logout,
    updateUserAvatar,
    isAdmin,
    isAuthenticated,
    refreshSession
  };
};

export default useAuth;
