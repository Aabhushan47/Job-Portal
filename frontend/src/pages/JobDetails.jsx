import React, { useState } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState({});

  return (
    <>
      <h1>Hello</h1>
    </>
  );
};

export default JobDetails;
