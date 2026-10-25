import { useContext } from 'react';
import { AuthContext } from '../features/auth/AuthContext';

export const useAuth = () => useContext(AuthContext);
