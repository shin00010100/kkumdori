// AdminRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext"; 

const AdminRoute = ({ children }) => {
  const { isAuth, user } = useAuth();

  if (!isAuth || user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
