import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ children }) => {
  const  user  = JSON.parse(localStorage.getItem('data'));

  console.log('protec', user)

  return user?.role ==="admin" ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
