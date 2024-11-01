import React from 'react';
import { Navigate } from 'react-router-dom'; 

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  // If token exists, render the child components (e.g., TaskDashboard)
  if (token) {
    return children;
  } else {
    // Redirect to login page if the user is not authenticated
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
