// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { api, errorMessage } from '../core/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Bootstrap the session from the HttpOnly cookie on first paint.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await api.get('/auth/me');
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
    try {
      const res = await api.post('/auth/login', { email, password });
      if (res.data?.twoFactorRequired) {
        // Password accepted — finish with a TOTP code.
        return { success: false, twoFactorRequired: true, user: res.data.user };
      }
      if (res.data?.user) setUser(res.data.user);
      return { success: true, user: res.data.user };
    } catch (err) {
      return { success: false, message: errorMessage(err, 'Login failed. Please check your credentials.') };
    }
  };

  // Completes a 2FA-gated login (preauth cookie already issued server-side).
  const verify2FA = async (code) => {
    try {
      const res = await api.post('/auth/2fa/verify', { code });
      if (res.data?.user) setUser(res.data.user);
      return { success: true, user: res.data.user };
    } catch (err) {
      return { success: false, message: errorMessage(err, 'Verification failed. Please check the code.') };
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await api.post('/auth/register', { name, email, password });
      if (res.data?.user) setUser(res.data.user);
      return { success: true, user: res.data.user };
    } catch (err) {
      return { success: false, message: errorMessage(err, 'Registration failed.') };
    }
  };

  const updateUser = (patch) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  };

  const logout = async () => {
    try {
      await api.post('/auth/logout');
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

export const useAuth = () => useContext(AuthContext);