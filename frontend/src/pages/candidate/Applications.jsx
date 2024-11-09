import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { API } from "../../../config";
import { toast } from "react-hot-toast";
import { UserContext } from "../../contexts/userContext";
import Modal from "../../components/Modal";
import DeleteModal from "../../components/DeleteModal";
import { useNavigate } from "react-router-dom";

const Applications = () => {
  const [application, setApplication] = useState([]);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [applicationToDelete, setApplicationToDelete] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { loggedUser, isAuthorized } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        if (loggedUser && loggedUser.role === "candidate") {
          const response = await axios.get(`${API}/candidate/application`, {
            withCredentials: true,
          });
          setApplication(response.data.application);
        } else if (loggedUser && loggedUser.role === "employer") {
          const response = await axios.get(`${API}/employer/application`, {
            withCredentials: true,
          });
          setApplication(response.data.application);
        }
      } catch (err) {
        console.log(err.response.data.error || "Something went wrong");
        setApplication([]);
      }
    };
    fetchApplication();
  }, [isAuthorized]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${API}/candidate/deleteapplication/${id}`,
        {
          withCredentials: "true",
        }
      );
      toast.success(response.data.message);
      setApplication((prevApplication) =>
        prevApplication.filter((application) => application._id !== id)
      );
      setDeleteModalOpen(false);
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const updateStatus = async (status, id) => {
    try {
      const response = await axios.put(
        `${API}/updatestatus/${id}`,
        { status },
        {
          withCredentials: true,
        }
      );
      setApplication((prevApplication) =>
        prevApplication.map((application) =>
          application._id === id ? { ...application, status } : application
        )
      );
      if (status === "accepted") {
        toast.success(response.data.message);
        navigate("/employer/applications");
      } else if (status === "rejected") {
        toast.error(response.data.message);
        navigate("/employer/applications");
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const openModal = (imageUrl) => {
    setImageUrl(imageUrl);
    setResumeModalOpen(true);
  };

  const closeModal = () => {
    setResumeModalOpen(false);
  };

  const openDeleteModal = (applicationId) => {
    setApplicationToDelete(applicationId);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setApplicationToDelete(null);
    setDeleteModalOpen(false);
  };

  return (
    <>
      {application && application.length > 0 ? (
        application.map((application, index) => {
          return (
            <div
              key={application._id}
              className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg my-5"
            >
              <h1 className="text-2xl font-bold mb-6">Application Details</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <p className="mt-1 text-lg">{application.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <p className="mt-1 text-lg">{application.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <p className="mt-1 text-lg">{application.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address
                  </label>
                  <p className="mt-1 text-lg">{application.address}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Cover Letter
                </label>
                <div className="mt-1 p-4 bg-gray-50 rounded-md h-48 whitespace-break-spaces break-words overflow-y-auto">
                  <p className="mt-1 text-lg ">{application.coverLetter}</p>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Resume
                </label>
                <div
                  className="flex justify-center"
                  onClick={() => openModal(application.resume.secure_url)}
                >
                  <div className="w-1/3 h-[200px] bg-gray-200/20 flex items-center justify-center overflow-hidden">
                    <img
                      className="w-full"
                      src={application.resume.secure_url}
                      alt="resume"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <span
                  className={`mt-1 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium 
    ${application.status === "pending" ? "bg-yellow-100 text-yellow-800" : ""}
    ${application.status === "accepted" ? "bg-green-100 text-green-800" : ""}
    ${application.status === "rejected" ? "bg-red-100 text-red-800" : ""}`}
                >
                  {application.status}
                </span>
              </div>
              {loggedUser.role === "candidate" ? (
                <div className="flex justify-between">
                  <button
                    onClick={() => openDeleteModal(application._id)}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Delete Application
                  </button>
                </div>
              ) : application.status === "pending" ? (
                <div className="flex justify-start space-x-2">
                  <button
                    onClick={() => updateStatus("accepted", application._id)}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => updateStatus("rejected", application._id)}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Reject
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          );
        })
      ) : (
        <div className="text-center text-lg text-red-500 p-8">
          No Applications posted
        </div>
      )}

      {resumeModalOpen && (
        <Modal onClose={() => setResumeModalOpen(false)}>
          <div className="relative w-1/2 h-full p-10">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-black text-3xl font-bold hover:text-gray-300"
            >
              &times;
            </button>
            <img
              src={imageUrl}
              alt="resume"
              className="w-full h-full object-contain"
            />
          </div>
        </Modal>
      )}

      {deleteModalOpen && (
        <DeleteModal
          onClose={closeDeleteModal}
          onDelete={() => handleDelete(applicationToDelete)}
        />
      )}
    </>
  );
};

export default Applications;
