import { api, errorMessage } from '../core/api';

const request = async (operation, fallback) => {
  try {
    const response = await operation();
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: errorMessage(error, fallback) };
  }
};

export const getCurrentUser = () => api.get('/auth/me');

export const signIn = (email, password) =>
  request(() => api.post('/auth/login', { email, password }), 'Login failed. Please check your credentials.');

export const signUp = (name, email, password) =>
  request(() => api.post('/auth/register', { name, email, password }), 'Registration failed.');

export const verifyLoginCode = (code) =>
  request(() => api.post('/auth/2fa/verify', { code }), 'Verification failed. Please check the code.');

export const signOut = () => api.post('/auth/logout');
