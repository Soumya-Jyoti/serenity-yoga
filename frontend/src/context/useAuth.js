/**
 * useAuth — accessor hook for AuthContext.
 *
 * Lives in its own file (not alongside AuthProvider) because Vite's Fast
 * Refresh only preserves component state when a module exports components
 * and nothing else. Shipping this hook from AuthContext.jsx would make
 * every edit to that file do a full remount instead of a hot swap.
 */

import { useContext } from 'react';
import AuthContext from './AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
