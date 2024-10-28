import React from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Navigate } from "react-router-dom";

const EmployerRoute = ({ Component }) => {
  const { loggedUser } = useContext(UserContext);

  return loggedUser !== null && loggedUser.role === "employer" ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

export default EmployerRoute;
