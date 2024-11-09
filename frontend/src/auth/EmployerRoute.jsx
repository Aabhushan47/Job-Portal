import React from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Navigate, Outlet } from "react-router-dom";

const EmployerRoute = () => {
  const { loggedUser } = useContext(UserContext);

  return loggedUser && loggedUser.role === "employer" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default EmployerRoute;
