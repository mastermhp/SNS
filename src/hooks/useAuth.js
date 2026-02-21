'use client';

import { useContext } from 'react';
import { AuthContext } from '../app/context/AuthContext';

/**
 * Custom hook to access authentication context.
 * Re-exports the useAuth from AuthContext for convenience.
 * 
 * Usage: const { user, loginSendOTP, loginVerifyOTP, logout, isAuthenticated } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export default useAuth;
