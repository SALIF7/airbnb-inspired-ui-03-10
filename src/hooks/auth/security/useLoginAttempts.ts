
import { useState } from "react";
import { MAX_LOGIN_ATTEMPTS, LOCKOUT_DURATION } from "./securityConstants";

export const useLoginAttempts = () => {
  // Get login attempts for a specific email
  const getLoginAttempts = (email: string) => {
    const attemptsData = localStorage.getItem(`login_attempts_${email}`);
    if (attemptsData) {
      try {
        return JSON.parse(attemptsData);
      } catch (e) {
        return { count: 0, timestamp: Date.now() };
      }
    }
    return { count: 0, timestamp: Date.now() };
  };

  // Update login attempts for tracking failed logins
  const updateLoginAttempts = (email: string, increment = true) => {
    if (!email) return { count: 0, timestamp: Date.now() };
    
    const attempts = getLoginAttempts(email);
    const now = Date.now();
    
    // If the lockout period has passed, reset the counter
    if (attempts.lockUntil && attempts.lockUntil < now) {
      const newData = {
        count: increment ? 1 : 0,
        timestamp: now
      };
      localStorage.setItem(`login_attempts_${email}`, JSON.stringify(newData));
      console.log(`Réinitialisation des tentatives pour ${email} : `, newData);
      return newData;
    }
    
    // Otherwise, increment or reset the counter
    const newCount = increment ? (attempts.count + 1) : 0;
    const newData = { 
      count: newCount, 
      timestamp: now,
      lockUntil: newCount >= MAX_LOGIN_ATTEMPTS ? now + LOCKOUT_DURATION : undefined
    };
    
    localStorage.setItem(`login_attempts_${email}`, JSON.stringify(newData));
    console.log(`Mise à jour des tentatives pour ${email} : `, newData);
    return newData;
  };

  // Reset login attempts to zero and clear any lock
  const resetLoginAttempts = (email: string) => {
    if (!email) return;
    
    const newData = { 
      count: 0, 
      timestamp: Date.now(),
      lockUntil: undefined  // Explicitly remove any lock
    };
    
    localStorage.setItem(`login_attempts_${email}`, JSON.stringify(newData));
    console.log(`Réinitialisation complète des tentatives pour ${email}`, newData);
    return newData;
  };

  // Check if an account is locked
  const checkAccountLocked = (email: string) => {
    if (!email) return { locked: false, remainingMinutes: 0 };
    
    const attempts = getLoginAttempts(email);
    if (attempts.lockUntil && attempts.lockUntil > Date.now()) {
      const remainingTime = Math.ceil((attempts.lockUntil - Date.now()) / (60 * 1000));
      return {
        locked: true,
        remainingMinutes: remainingTime
      };
    }
    return { locked: false, remainingMinutes: 0 };
  };

  return {
    getLoginAttempts,
    updateLoginAttempts,
    resetLoginAttempts,
    checkAccountLocked
  };
};
