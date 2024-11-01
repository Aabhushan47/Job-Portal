import React from "react";
import MyRoute from "../MyRoute";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Toaster position="top-center" />
      <MyRoute />
    </>
  );
};

export default App;
