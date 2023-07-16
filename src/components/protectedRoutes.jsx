import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import authService from "../services/authService";

const ProtectedRoutes = (props) => {
  const location = useLocation();
  const user = authService.getCurrentUser();
  return user ? <Outlet /> : <Navigate to="/login" state={location} />;
};

export default ProtectedRoutes;
