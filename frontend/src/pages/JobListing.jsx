import React, { useContext, useEffect, useState } from "react";
import JobCard from "../components/Jobcard";
import axios from "axios";
import { API } from "../../config";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

const JobListing = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios
      .get(`${API}/joblist`, {
        withCredentials: true,
      })
      .then((res) => setJobs(res.data.job))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-3 p-2">
      {jobs && jobs.length === 0 ? (
        <div>No jobs available</div>
      ) : (
        jobs.map((job) => <JobCard key={job._id} data={job} />)
      )}
    </div>
  );
};

export default JobListing;
