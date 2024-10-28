import React, { useContext, useEffect, useState } from "react";
import JobCard from "../components/Jobcard";
import axios from "axios";
import { API } from "../../config";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

const JobListing = () => {
  const [jobs, setJobs] = useState([]);
  const navigate = useNavigate();
  const { isAuthorized } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${API}/joblist`, {
        withCredentials: true,
      })
      .then((res) => setJobs(res.data.job))
      .catch((err) => console.log(err));
  }, []);

  if (!isAuthorized) {
    return navigate("/login");
  }
  return (
    <div className="m-4 grid grid-cols-1 gap-4 md:grid-cols-3 ">
      {jobs &&
        jobs.map((job, i) => {
          return <JobCard key={i} data={job} />;
        })}
    </div>
  );
};

export default JobListing;
