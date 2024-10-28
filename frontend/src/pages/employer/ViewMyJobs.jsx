import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../../config";
import axios from "axios";
import { UserContext } from "../../contexts/userContext";
import { toast, ToastContainer } from "react-toastify";

const ViewMyJobs = () => {
  const [myJob, setMyJob] = useState([]);
  const { isAuthorized, loggedUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${API}/myjob`, {
          withCredentials: true,
        });
        setMyJob(response.data.job);
      } catch (err) {
        console.log(err.response.data.error || "Something went wrong");
      }
    };
    fetchJob();
  }, []);

  const handleDelete = async (jobId) => {
    try {
      const confirmed = window.confirm("Are you Sure");
      if (confirmed) {
        const response = await axios.delete(`${API}/deletejob/${jobId}`, {
          withCredentials: true,
        });
        toast.success(response.data.message);
        setMyJob(myJob.filter((job) => job._id !== jobId));
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      {myJob &&
        myJob.map((job, i) => {
          return (
            <div className="p-4 md:p-6 lg:p-8" key={i}>
              <div className="mx-auto max-w-3xl">
                <div className="flex sm:flex-row items-center sm:items-center justify-between mb-6 gap-4 md:gap-8">
                  <h1 className="text-2xl md:text-3xl font-bold text-center md:text-left">
                    {job.title}
                  </h1>
                  <div className="flex gap-2">
                    <Link
                      className="inline-flex items-center px-4 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                      to={`/employer/updateproduct/${job._id}`}
                    >
                      Update
                    </Link>
                    <Link
                      className="inline-flex items-center px-4 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-red-900 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete
                    </Link>
                  </div>
                </div>
                <div className="grid gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="text-center md:text-left">
                      <h2 className="text-xl font-semibold mb-2">Category</h2>
                      <p className="text-muted-foreground">{job.category}</p>
                    </div>
                    <div className="text-center md:text-left">
                      <h2 className="text-xl font-semibold mb-2">Country</h2>
                      <p className="text-muted-foreground">{job.country}</p>
                    </div>
                    <div className="text-center md:text-left">
                      <h2 className="text-xl font-semibold mb-2">City</h2>
                      <p className="text-muted-foreground">{job.city}</p>
                    </div>
                    <div className="text-center md:text-left">
                      <h2 className="text-xl font-semibold mb-2">Location</h2>
                      <p className="text-muted-foreground">{job.location}</p>
                    </div>
                  </div>
                  <div className="text-center md:text-left">
                    <h2 className="text-xl font-semibold mb-2">Description</h2>
                    <p className="text-muted-foreground">{job.description}</p>
                  </div>
                  {job.salaryType === "fixedSalary" ? (
                    <div className="text-center md:text-left">
                      <h2 className="text-xl font-semibold mb-2">Salary</h2>
                      <p className="text-muted-foreground">
                        Nrs {job.fixedSalary}
                      </p>
                    </div>
                  ) : (
                    <div className="text-center md:text-left">
                      <h2 className="text-xl font-semibold mb-2">
                        Salary Range
                      </h2>
                      <p className="text-muted-foreground">
                        Nrs {`${job.salaryFrom} - ${job.salaryTo}`}
                      </p>
                    </div>
                  )}
                  <hr />
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default ViewMyJobs;
