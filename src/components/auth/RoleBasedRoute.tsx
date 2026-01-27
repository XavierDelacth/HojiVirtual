import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles: ('user' | 'seller')[];
  redirectTo?: string;
}

const RoleBasedRoute = ({ children, allowedRoles, redirectTo }: RoleBasedRouteProps) => {
  const { user, role, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">A verificar permissões...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!role || !allowedRoles.includes(role)) {
    // Redirect based on user's actual role
    if (role === 'seller') {
      return <Navigate to="/dashboard/vendedor" replace />;
    } else if (role === 'user') {
      return <Navigate to="/dashboard/utilizador" replace />;
    }
    // If no role, redirect to specified path or home
    return <Navigate to={redirectTo || "/"} replace />;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;
