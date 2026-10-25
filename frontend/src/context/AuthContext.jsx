// src/context/AuthContext.jsx
import { useState, useEffect } from 'react';
import { AuthContext } from '../features/auth/AuthContext';
import { getCurrentUser, signIn, signOut, signUp, verifyLoginCode } from '../services/authService';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Bootstrap the session from the HttpOnly cookie on first paint.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await getCurrentUser();
        if (!cancelled && res.data?.user) setUser(res.data.user);
      } catch {
        /* no valid session — stay signed out */
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const login = async (email, password) => {
    const result = await signIn(email, password);
    if (!result.success) return result;
    if (result.data?.twoFactorRequired) {
      // Password accepted — finish with a TOTP code.
      return { success: false, twoFactorRequired: true, user: result.data.user };
    }
    if (result.data?.user) setUser(result.data.user);
    return { success: true, user: result.data.user };
  };

  // Completes a 2FA-gated login (preauth cookie already issued server-side).
  const verify2FA = async (code) => {
    const result = await verifyLoginCode(code);
    if (!result.success) return result;
    if (result.data?.user) setUser(result.data.user);
    return { success: true, user: result.data.user };
  };

  const register = async (name, email, password) => {
    const result = await signUp(name, email, password);
    if (!result.success) return result;
    if (result.data?.user) setUser(result.data.user);
    return { success: true, user: result.data.user };
  };

  const updateUser = (patch) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const logout = async () => {
    try {
      await signOut();
    } catch {
      /* session cookie already gone — clear local state regardless */
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, verify2FA, logout, updateUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
