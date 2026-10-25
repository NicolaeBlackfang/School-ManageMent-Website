// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';
import { Spinner } from './ui.jsx';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-3">
          <Spinner className="h-10 w-10" />
          <p className="text-sm font-medium text-slate-400">Loading your workspace...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const home = user.role === 'parent' ? '/p/home' : user.role === 'admin' ? '/a/dashboard' : user.role === 'teacher' ? '/t/dashboard' : '/s/dashboard';

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={home} replace />;
  }

  return children;
};

export default ProtectedRoute;
