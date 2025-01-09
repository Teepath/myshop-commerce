import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRouteUser = ({ children }) => {
  const  user  = JSON.parse(localStorage.getItem('data'));

  console.log('protec', user)

  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRouteUser;
