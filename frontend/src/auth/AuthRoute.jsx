import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ Component }) => {
  const { loggedUser } = useContext(UserContext);

  return loggedUser !== null ? <Component /> : <Navigate to="/login" />;
};

export default AuthRoute;
