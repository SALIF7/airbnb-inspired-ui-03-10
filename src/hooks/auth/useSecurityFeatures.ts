
import { useState, useEffect } from "react";
import { User } from "./types";
import { useLoginAttempts } from "./security/useLoginAttempts";
import { toast } from "sonner";

export const useSecurityFeatures = (user: User | null) => {
  const { 
    getLoginAttempts, 
    updateLoginAttempts, 
    resetLoginAttempts,
    checkAccountLocked 
  } = useLoginAttempts();
  
  // Refresh security session - ensure user session is valid and not timed out
  const refreshSession = () => {
    // For demo, just log that session was refreshed
    console.log("Session de sécurité rafraîchie");
  };
  
  // Unlock a user account manually - admin functionality
  const unlockUserAccount = (email: string): boolean => {
    try {
      if (!user?.isAdmin) {
        toast.error("Seul un administrateur peut effectuer cette action");
        return false;
      }
      
      resetLoginAttempts(email); // Use the reset function
      
      // Log this action in security logs
      const securityLogs = JSON.parse(localStorage.getItem('security_logs') || '[]');
      securityLogs.push({
        type: 'account_unlocked',
        email: email,
        timestamp: new Date().toISOString(),
        unlockedBy: user?.email || 'system',
        userAgent: navigator.userAgent
      });
      localStorage.setItem('security_logs', JSON.stringify(securityLogs));
      
      return true;
    } catch (error) {
      console.error("Erreur lors du déverrouillage du compte:", error);
      return false;
    }
  };
  
  // Update user security level - admin functionality
  const updateUserSecurityLevel = (userId: string, level: 'low' | 'medium' | 'high'): boolean => {
    try {
      if (!user?.isAdmin) {
        toast.error("Seul un administrateur peut effectuer cette action");
        return false;
      }

      const allUsers = JSON.parse(localStorage.getItem('all_users') || '[]');
      const updated = allUsers.map((u: any) => {
        if (u.id === userId) {
          return { ...u, securityLevel: level };
        }
        return u;
      });
      
      localStorage.setItem('all_users', JSON.stringify(updated));
      
      // Log this action in security logs
      const securityLogs = JSON.parse(localStorage.getItem('security_logs') || '[]');
      securityLogs.push({
        type: 'security_level_update',
        userId: userId,
        level: level,
        timestamp: new Date().toISOString(),
        updatedBy: user?.email || 'system',
        userAgent: navigator.userAgent
      });
      localStorage.setItem('security_logs', JSON.stringify(securityLogs));
      
      return true;
    } catch (error) {
      console.error("Erreur lors de la mise à jour du niveau de sécurité:", error);
      return false;
    }
  };

  // Get account reset requests
  const getAccountResetRequests = () => {
    try {
      const requests = JSON.parse(localStorage.getItem('admin_contact_requests') || '[]');
      return requests.filter((req: any) => req.type === 'account_reset');
    } catch (error) {
      console.error("Erreur lors de la récupération des demandes de réinitialisation:", error);
      return [];
    }
  };

  // Update account reset request status
  const updateResetRequestStatus = (
    requestId: string, 
    status: 'approved' | 'rejected', 
    unlockAccount = false
  ) => {
    try {
      if (!user?.isAdmin) {
        toast.error("Seul un administrateur peut effectuer cette action");
        return false;
      }

      const requests = JSON.parse(localStorage.getItem('admin_contact_requests') || '[]');
      const request = requests.find((req: any) => req.id === requestId);
      
      if (!request) {
        toast.error("Demande non trouvée");
        return false;
      }
      
      // Update request status
      const updatedRequests = requests.map((req: any) => {
        if (req.id === requestId) {
          return {
            ...req,
            status,
            resolvedAt: new Date().toISOString(),
            resolvedBy: user.email
          };
        }
        return req;
      });
      
      localStorage.setItem('admin_contact_requests', JSON.stringify(updatedRequests));
      
      // If approved and unlockAccount is true, unlock the user's account
      if (status === 'approved' && unlockAccount) {
        resetLoginAttempts(request.email);
      }
      
      // Log the action
      const securityLogs = JSON.parse(localStorage.getItem('security_logs') || '[]');
      securityLogs.push({
        type: `reset_request_${status}`,
        requestId,
        email: request.email,
        adminEmail: user.email,
        timestamp: new Date().toISOString(),
        unlocked: status === 'approved' && unlockAccount
      });
      localStorage.setItem('security_logs', JSON.stringify(securityLogs));
      
      return true;
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la demande:", error);
      return false;
    }
  };

  return {
    refreshSession,
    unlockUserAccount,
    updateUserSecurityLevel,
    getLoginAttempts,
    updateLoginAttempts,
    resetLoginAttempts,
    checkAccountLocked,
    getAccountResetRequests,
    updateResetRequestStatus
  };
};
