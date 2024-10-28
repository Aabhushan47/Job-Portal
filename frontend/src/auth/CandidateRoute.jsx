import React, { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../contexts/userContext";
import { Navigate } from "react-router-dom";

const CandidateRoute = ({ Component }) => {
  const { loggedUser } = useContext(UserContext);

  return loggedUser !== null && loggedUser.role === "candidate" ? (
    <Component />
  ) : (
    <Navigate to="/login" />
  );
};

export default CandidateRoute;
