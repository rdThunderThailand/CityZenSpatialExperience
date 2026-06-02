import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const role = useAuthStore((state) => state.role);

  if (role !== 'admin') {
    // If not admin, redirect to kiosk
    return <Navigate to="/kiosk/default" replace />;
  }

  return <>{children}</>;
};
