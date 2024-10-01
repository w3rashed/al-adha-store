// PrivateRoute.js

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage

  // If there's no token, redirect to the login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, render the children components (i.e., Dashboard)
  return children;
};

export default PrivateRoute;
