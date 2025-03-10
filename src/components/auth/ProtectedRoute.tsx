
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { toast } from 'sonner';
import useLocalStorage from '@/hooks/useLocalStorage';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  requireAdmin = false 
}) => {
  const { user, isLoading, isAuthenticated, isAdmin, refreshSession } = useAuth();
  const location = useLocation();
  const { getItem } = useLocalStorage();

  useEffect(() => {
    // Vérifier régulièrement la validité du jeton d'authentification
    if (isAuthenticated) {
      refreshSession();
    }
    
    // Enregistrer la tentative d'accès à une route protégée
    if (requireAdmin) {
      const accessLog = {
        path: location.pathname,
        timestamp: new Date().toISOString(),
        userId: user?.id || 'non-authentifié',
        userAgent: navigator.userAgent,
      };
      
      const adminAccessLogs = getItem<any[]>('admin_access_logs', []);
      adminAccessLogs.push(accessLog);
      localStorage.setItem('admin_access_logs', JSON.stringify(adminAccessLogs));
    }
  }, [location.pathname, isAuthenticated, requireAdmin]);

  // Si on est en train de charger l'utilisateur, on affiche un écran de chargement
  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">
      <div className="animate-spin h-10 w-10 border-4 border-indigo-600 rounded-full border-t-transparent"></div>
    </div>;
  }

  // Si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
  if (!isAuthenticated) {
    toast.error("Veuillez vous connecter pour accéder à cette page");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si la route nécessite un rôle admin et que l'utilisateur n'est pas admin
  if (requireAdmin && !isAdmin) {
    toast.error("Vous n'avez pas les droits pour accéder à cette page");
    // Journaliser la tentative d'accès non autorisée
    const suspiciousActivity = {
      userId: user.id,
      email: user.email,
      attemptedPage: location.pathname,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      ipAddress: "client-side" // Côté client, on ne peut pas avoir l'IP réelle
    };
    const suspiciousActivities = JSON.parse(localStorage.getItem('suspicious_activities') || '[]');
    suspiciousActivities.push(suspiciousActivity);
    localStorage.setItem('suspicious_activities', JSON.stringify(suspiciousActivities));
    
    return <Navigate to="/" replace />;
  }

  // Si tout est bon, on affiche le contenu protégé
  return <>{children}</>;
};
