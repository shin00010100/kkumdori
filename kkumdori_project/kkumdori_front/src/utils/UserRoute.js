// UserRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext"; 

const UserRoute = ({ children }) => {
  const { isAuth, user } = useAuth();

  if (!isAuth || user?.role !== "user") {
    return <Navigate to="/" />;
  }

  return children;
};

export default UserRoute;
