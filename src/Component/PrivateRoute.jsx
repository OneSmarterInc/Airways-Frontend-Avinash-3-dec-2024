import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  let isToken = JSON.parse(localStorage.getItem("token")) || null;
  const location = useLocation();
  // console.log((isToken,"pr"));

  if (isToken !== null) {
    return children; //<SingleBook />
  }
  return <Navigate to={"/adminlogin"} state={location.pathname} replace />;
};
