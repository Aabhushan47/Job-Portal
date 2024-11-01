import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ Component }) => {
  const { loggedUser, isAuthorized } = useContext(UserContext);

  return loggedUser ? <Component /> : <Navigate to="/login" />;
};

export default AuthRoute;
