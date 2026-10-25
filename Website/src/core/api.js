// src/core/api.js
// Single axios instance for the whole app.
//
//   • baseURL '/api'      → the API origin is hidden behind the Vite/Express proxy
//   • withCredentials     → HttpOnly session cookie travels with every request
//   • xsrfCookieName/…    → axios mirrors the double-submit `csrf` cookie into the
//                           X-CSRF-Token header automatically on state-changing calls
import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  xsrfCookieName: 'csrf',
  xsrfHeaderName: 'X-CSRF-Token',
  timeout: 25000,
});

// Normalize any failure into a safe, user-facing string (never expose internals).
export const errorMessage = (err, fallback = 'Something went wrong. Please try again.') => {
  if (!err?.response) return err?.message === 'Network Error' ? 'Network error. Please check your connection.' : fallback;
  return err.response.data?.message || fallback;
};

export default api;