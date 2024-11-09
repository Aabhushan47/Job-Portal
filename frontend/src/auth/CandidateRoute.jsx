import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Navigate, Outlet } from "react-router-dom";

const CandidateRoute = () => {
  const { loggedUser } = useContext(UserContext);

  return loggedUser && loggedUser.role === "candidate" ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default CandidateRoute;
