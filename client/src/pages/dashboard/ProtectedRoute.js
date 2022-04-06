import React from "react";
import { useAppContext } from "../../context/appContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAppContext();

  if (user) {
    return children;
  } else {
    return <Navigate to="/register" />;
  }
};

export default ProtectedRoute;
