// UniteRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext"; 

const UniteRoute = ({ children }) => {
  const { isAuth, user } = useAuth();

  // Allow "user" or "admin" role to pass through
  if (!isAuth || (user?.role !== "admin" && user?.role !== "user")) {
    return <Navigate to="/" />;
  }

  return children;
};

export default UniteRoute;
