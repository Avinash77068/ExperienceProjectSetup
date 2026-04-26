import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoginPage from './LoginPage';

const ProtectedRoute = ({ children, requiredPermission = null }) => {
  const { user, loading, hasPermission } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-secondary">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage />;
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="text-center p-8 bg-secondary rounded-lg shadow-custom-lg max-w-md">
          <div className="text-4xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold text-primary mb-2">Access Denied</h1>
          <p className="text-secondary mb-4">
            You don't have permission to access this page.
          </p>
          <p className="text-sm text-tertiary">
            Required permission: {requiredPermission}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
