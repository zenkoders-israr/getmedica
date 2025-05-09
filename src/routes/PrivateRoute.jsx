import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "../redux/Auth/Selectors";
import MainLayout from "../layout/MainLayout";

const PrivateRoute = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  return isAuthenticated ? <MainLayout /> : <Navigate to="/login" />;
};

export default PrivateRoute;
