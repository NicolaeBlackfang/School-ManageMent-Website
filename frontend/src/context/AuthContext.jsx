// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if a user session is already saved when the app opens
  useEffect(() => {
    const storedUser = localStorage.getItem('schoolUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login Function
  const login = async (email, password) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      setUser(res.data);
      localStorage.setItem('schoolUser', JSON.stringify(res.data));
      return { success: true, role: res.data.role };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Login failed. Please check your network.' 
      };
    }
  };

  // Register Function
  const register = async (name, email, password, role) => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', { name, email, password, role });
      setUser(res.data);
      localStorage.setItem('schoolUser', JSON.stringify(res.data));
      return { success: true, role: res.data.role };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Registration failed.' 
      };
    }
  };

  // Logout Function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('schoolUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
