
import { useState, useEffect } from "react";
import { User } from "./types";
import { useLoginAttempts } from "./security/useLoginAttempts";

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

  return {
    refreshSession,
    unlockUserAccount,
    updateUserSecurityLevel,
    getLoginAttempts,
    updateLoginAttempts,
    resetLoginAttempts, // Export the reset function
    checkAccountLocked
  };
};
