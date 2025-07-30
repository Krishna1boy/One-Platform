import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  if (!token) return <Navigate to="/" />;

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <h2 style={{ color: "red" }}>Access Denied: You are not authorized</h2>;
  }

  return children;
};

export default ProtectedRoute;
