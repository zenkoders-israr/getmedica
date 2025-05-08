import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/Auth/Selectors";
import MainLayout from "../layout/MainLayout"

const PrivateRoute = () => {
  const user = useSelector(selectUser)
  return user?.isAuthenticated ? <MainLayout /> : <Navigate to="/login" />;
};

export default PrivateRoute;
