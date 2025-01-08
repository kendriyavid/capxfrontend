import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from './features/authSlice'; 

const ProtectedRoute = ({ children }) => {
  const token = useSelector(selectCurrentToken); 

  return token ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
