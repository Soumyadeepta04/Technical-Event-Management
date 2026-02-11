import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const ProtectedRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="loading">Loading...</div>;

  if (!user) {
    /* Redirect to the role-appropriate login page */
    const loginPath = role === 'vendor' ? '/vendor/login'
      : role === 'user' ? '/user/login'
      : '/admin/login';
    return <Navigate to={loginPath} replace />;
  }

  if (role && user.role !== role) return <Navigate to={`/${user.role}/dashboard`} replace />;

  return children;
};

export default ProtectedRoute;
