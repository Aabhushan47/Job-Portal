import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const { loggedUser } = useContext(UserContext);

  return loggedUser ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthRoute;
