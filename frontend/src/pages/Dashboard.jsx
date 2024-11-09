import React, { useContext } from "react";
import { UserContext } from "../contexts/userContext";

const Dashboard = () => {
  const { loggedUser } = useContext(UserContext);
  return (
    <>
      <div>{loggedUser.name}</div>
    </>
  );
};

export default Dashboard;
