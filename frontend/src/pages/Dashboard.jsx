import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { loggedUser, isAuthorized } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
    }
  }, [isAuthorized, navigate]);

  return (
    <>
      <div>{loggedUser.name}</div>
    </>
  );
};

export default Dashboard;
