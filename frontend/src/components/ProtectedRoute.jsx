// src/components/ProtectedRoute.jsx
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Spinner } from './ui.jsx';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  // If the global state is still verifying the user session, show a loading spinner
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

  // If no user is logged in, redirect them immediately to the login form
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If a user is logged in but their role isn't allowed to view this page, kick them back to their home turf
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={`/${user.role}/dashboard`} replace />;
  }

  // Otherwise, render the requested page component seamlessly
  return children;
};

export default ProtectedRoute;