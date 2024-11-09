import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../../config";
import axios from "axios";
import { UserContext } from "../../contexts/userContext";
import { countries } from "countries-list";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Fragment } from "react";
import DeleteModal from "../../components/DeleteModal";

const ViewMyJobs = () => {
  const countriesList = Object.values(countries);
  const [myJob, setMyJob] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [editingMode, setEditingMode] = useState(null);
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
        setMyJob([]);
      }
    };
    fetchJob();
  }, []);

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleUpdate = async (jobId) => {
    try {
      const updateJob = myJob.find((job) => job._id === jobId);
      const response = await axios.put(`${API}/updatejob/${jobId}`, updateJob, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setEditingMode(null);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const handleDelete = async (jobId) => {
    try {
      const response = await axios.delete(`${API}/deletejob/${jobId}`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setMyJob((prevJob) => prevJob.filter((job) => job._id !== jobId));
      setOpenDeleteModal(false);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const deleteModalOpen = (jobId) => {
    setJobToDelete(jobId);
    setOpenDeleteModal(true);
  };

  const deleteModalClose = () => {
    setJobToDelete(null);
    setOpenDeleteModal(false);
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJob((prevJob) =>
      prevJob.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <>
      {myJob && myJob.length > 0 ? (
        myJob.map((job, i) => {
          return (
            <Fragment key={job._id}>
              <div className="bg-white shadow-lg rounded-lg m-6 max-w-3xl mx-auto p-8 space-y-3 border border-gray-200">
                <input
                  className={`w-full text-2xl text-wrap font-semibold text-gray-900 mb-2 p-2 ${
                    editingMode === job._id
                      ? "border border-gray-300 rounded-lg focus:outline-none"
                      : "bg-transparent"
                  }`}
                  name="title"
                  disabled={editingMode !== job._id}
                  value={job.title}
                  onChange={(e) =>
                    handleInputChange(job._id, "title", e.target.value)
                  }
                  placeholder="Enter job title"
                />
                <div className="flex items-center mb-3 gap-1 px-3">
                  <label className="text-gray-700 text-lg font-semibold">
                    Category:
                  </label>
                  <input
                    type="text"
                    name="category"
                    className={`flex-1 w-1/2 text-lg text-gray-700 p-2 ${
                      editingMode === job._id
                        ? "border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        : "bg-transparent"
                    }`}
                    disabled={editingMode !== job._id}
                    value={job.category}
                    onChange={(e) =>
                      handleInputChange(job._id, "category", e.target.value)
                    }
                  />
                </div>

                <div className="mb-3">
                  <div className="grid grid-cols-2 gap-8 px-3 mb-1 text-lg font-semibold text-gray-700">
                    <label>City</label>
                    <label>Country</label>
                  </div>
                  <div className="grid grid-cols-2 gap-4 px-3">
                    <input
                      className={`text-lg text-gray-700 p-2 ${
                        editingMode === job._id
                          ? "border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          : "bg-transparent"
                      }`}
                      name="city"
                      disabled={editingMode !== job._id}
                      value={job.city}
                      onChange={(e) =>
                        handleInputChange(job._id, "city", e.target.value)
                      }
                      placeholder="Enter city"
                    />
                    <select
                      className={`text-lg text-gray-700 p-2 ${
                        editingMode === job._id
                          ? "border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          : "bg-transparent"
                      }`}
                      name="country"
                      disabled={editingMode !== job._id}
                      value={job.country}
                      onChange={(e) =>
                        handleInputChange(job._id, "country", e.target.value)
                      }
                    >
                      <option value="">Select a country</option>
                      {countriesList.map((country, i) => (
                        <option key={i} value={country.name}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center mb-3 gap-1 px-3">
                  <label className="text-gray-700 text-lg font-semibold">
                    Location:
                  </label>
                  <input
                    className={`flex-1 text-lg text-gray-900 p-2 ${
                      editingMode === job._id
                        ? "border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        : "bg-transparent"
                    }`}
                    name="location"
                    disabled={editingMode !== job._id}
                    value={job.location}
                    onChange={(e) =>
                      handleInputChange(job._id, "location", e.target.value)
                    }
                    placeholder="Enter location"
                  />
                </div>
                {job.salaryType === "fixedSalary" ? (
                  <div className="flex items-center mb-3 gap-1 px-3">
                    <label className="text-gray-700 text-lg font-semibold">
                      Salary:
                    </label>
                    <input
                      className={`w-full text-lg text-gray-700 p-2 ${
                        editingMode === job._id
                          ? "border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          : "bg-transparent"
                      }`}
                      name="fixedSalary"
                      disabled={editingMode !== job._id}
                      value={job.fixedSalary}
                      onChange={(e) =>
                        handleInputChange(
                          job._id,
                          "fixedSalary",
                          e.target.value
                        )
                      }
                    />
                  </div>
                ) : (
                  <div className="flex gap-4 mb-3 px-3">
                    <label className="text-gray-700 text-lg font-semibold">
                      Salary From:
                    </label>
                    <input
                      type="number"
                      className={`w-1/2 text-lg text-gray-700 p-2 ${
                        editingMode === job._id
                          ? "border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          : "bg-transparent"
                      }`}
                      name="salaryFrom"
                      disabled={editingMode !== job._id}
                      value={job.salaryFrom}
                      onChange={(e) =>
                        handleInputChange(job._id, "salaryFrom", e.target.value)
                      }
                    />

                    <label className="text-gray-700 text-lg font-semibold">
                      Salary To:
                    </label>
                    <input
                      type="number"
                      className={`w-1/2 text-lg text-gray-700 p-2 ${
                        editingMode === job._id
                          ? "border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                          : "bg-transparent"
                      }`}
                      name="salaryTo"
                      disabled={editingMode !== job._id}
                      value={job.salaryTo}
                      onChange={(e) =>
                        handleInputChange(job._id, "salaryTo", e.target.value)
                      }
                    />
                  </div>
                )}
                <label className=" block text-gray-700 text-lg font-semibold px-3">
                  Description:
                </label>
                <div className="px-3">
                  <input
                    type="text"
                    className={`w-full text-lg text-gray-700 p-2 ${
                      editingMode === job._id
                        ? "border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        : "bg-transparent"
                    }`}
                    name="description"
                    disabled={editingMode !== job._id}
                    value={job.description}
                    onChange={(e) =>
                      handleInputChange(job._id, "description", e.target.value)
                    }
                    rows="1"
                  ></input>
                </div>

                <div className="flex justify-end space-x-4 mt-6">
                  {editingMode === job._id ? (
                    <div className="flex gap-3">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
                        onClick={() => handleUpdate(job._id)}
                      >
                        <FontAwesomeIcon icon={faCheck} className="mr-1" /> Save
                      </button>
                      <button
                        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition"
                        onClick={handleDisableEdit}
                      >
                        <FontAwesomeIcon icon={faXmark} className="mr-1" />{" "}
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-3">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg transition"
                        onClick={() => handleEnableEdit(job._id)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transition"
                        onClick={() => deleteModalOpen(job._id)}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <hr className="mt-6 border-gray-200" />
              </div>
            </Fragment>
          );
        })
      ) : (
        <div className="text-center text-lg text-red-500 p-8">
          No job posted or job not found
        </div>
      )}
      {openDeleteModal && (
        <DeleteModal
          onClose={deleteModalClose}
          onDelete={() => handleDelete(jobToDelete)}
        />
      )}
    </>
  );
};

export default ViewMyJobs;
