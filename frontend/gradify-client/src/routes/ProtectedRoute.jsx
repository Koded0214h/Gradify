import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function ProtectedRoute({ allowedRoles }) {
  const location = useLocation();
  const { token, role } = useAuth();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Redirect to correct dashboard if role is not allowed
    return <Navigate to={`/${role}`} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute; 