import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API } from "../../config";
import axios from "axios";
import { UserContext } from "./../contexts/userContext";

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);

  const { loggedUser } = useContext(UserContext);

  useEffect(() => {
    axios
      .get(`${API}/jobdetail/${id}`, { withCredentials: true })
      .then((res) => setJob(res.data.job))
      .catch((err) => console.log(err));
  }, [id]);

  const {
    _id,
    title,
    description,
    category,
    country,
    city,
    location,
    salaryFrom,
    salaryTo,
    fixedSalary,
    jobPostedOn,
  } = job;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 sm:p-8">
          <h1 className="text-4xl font-bold text-black mb-4">{title}</h1>

          <h2 className="text-2xl font-semibold text-black mb-2">
            Job Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-4">
            <div>
              <p className="text-lg">
                <strong>Category:</strong> {category}
              </p>
              <p className="text-lg">
                <strong>Description:</strong> {description}
              </p>
            </div>
            <div>
              <p className="text-lg">
                <strong>Posted On:</strong>{" "}
                {new Date(jobPostedOn).toLocaleDateString()}
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-black mb-2">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 mb-4">
            <div>
              <p className="text-lg">
                <strong>Country:</strong> {country}
              </p>
              <p className="text-lg">
                <strong>City:</strong> {city}
              </p>
            </div>
            <div>
              <p className="text-lg">
                <strong>Location:</strong> {location}
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Salary</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
            {fixedSalary ? (
              <div>
                <p className="text-lg">
                  <strong>Fixed Salary:</strong> {fixedSalary}
                </p>
              </div>
            ) : (
              <div>
                <p className="text-lg">
                  <strong>Salary From:</strong> {salaryFrom}
                </p>
                <p className="text-lg">
                  <strong>Salary To:</strong> {salaryTo}
                </p>
              </div>
            )}
          </div>
        </div>
        {loggedUser.role === "employer" ? (
          <></>
        ) : (
          <div className="bg-gray-100 px-6 py-4">
            <div className="flex justify-end">
              <Link
                className="inline-flex items-center px-5 py-2.5 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                to={`/candidate/application/${_id}`}
              >
                Apply Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobDetail;
