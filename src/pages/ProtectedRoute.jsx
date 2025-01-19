// ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { auth } from '../utils/firebase'; // Adjust path as needed

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user); // Adjust according to your Redux store structure
  
  // Show loading state while auth state is being determined
  if (auth.currentUser === null && user === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }
  
  // Redirect to login if no user
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;