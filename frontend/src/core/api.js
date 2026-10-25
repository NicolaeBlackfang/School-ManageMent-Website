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
  if (!err?.response) {
    if (err?.code === 'ECONNABORTED' || err?.code === 'ETIMEDOUT') return 'This is taking longer than expected. Please try again.';
    return err?.message === 'Network Error' ? 'Connection problem. Check your internet and try again.' : fallback;
  }
  const { status, data } = err.response;
  if (status === 413) return 'That upload is too large. Choose a smaller file and try again.';
  if (status === 429) return data?.message || 'Too many attempts. Please wait a moment and try again.';
  if (status >= 500) return 'The school service is having trouble. Please try again in a few minutes.';
  if ((status === 400 || status === 422) && data?.message === 'Invalid request payload.') {
    return 'Some information is missing or needs attention. Review the form and try again.';
  }
  if (typeof data?.message === 'string' && data.message.trim()) return data.message;
  if (status === 401) return 'Your session may have expired. Please log in again.';
  if (status === 403) return 'You do not have permission to make this change.';
  if (status === 404) return 'We could not find that record. Refresh and try again.';
  if (status === 400 || status === 422) return 'Some information needs attention. Review the form and try again.';
  return fallback;
};

export default api;
