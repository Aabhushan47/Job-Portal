import React, { useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLocation,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { API } from "../../../config";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import { UserContext } from "../../contexts/userContext";

const Applications = () => {
  const [application, setApplication] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { loggedUser, isAuthorized } = useContext(UserContext);

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        if (loggedUser && loggedUser.role === "candidate") {
          const response = await axios.get(`${API}/candidate/application`, {
            withCredentials: true,
          });
          console.log(response.data.application);
          setApplication(response.data.application);
        } else {
          const response = await axios.get(`${API}/employer/application`, {
            withCredentials: true,
          });
          console.log(response.data.application);
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
      const confirmed = window.confirm("Are you Sure");
      if (confirmed) {
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
      }
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  const openModal = (imageUrl) => {
    setImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-8 p-6 md:p-10">
      {application.map((application, index) => (
        <div key={application._id} className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {application.name}
                </h1>
                <p className="text-gray-600">{application.jobTitle}</p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8">
            <div className="p-6 border rounded-lg shadow-lg bg-white">
              <h2 className="pb-2 text-lg font-bold text-gray-900 border-b">
                Contact Information
              </h2>
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
                  <p>{application.email}</p>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FontAwesomeIcon icon={faPhone} className="text-xl" />
                  <p>{application.phone}</p>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <FontAwesomeIcon icon={faLocation} className="text-xl" />
                  <p>{application.address}</p>
                </div>
              </div>
            </div>
            <div className="p-6 border rounded-lg shadow-lg bg-white">
              <div className="flex justify-between items-center border-b">
                <h2 className="pb-2 text-lg font-bold text-gray-900 ">
                  Application Details
                </h2>
                {isAuthorized && loggedUser.role === "employer" ? (
                  <></>
                ) : (
                  <button
                    className="bg-red-500 text-white font-bold p-2 my-2 rounded hover:bg-red-600"
                    onClick={() => handleDelete(application._id)}
                  >
                    Delete
                  </button>
                )}
              </div>

              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    Job Applied For
                  </h3>
                  <p className="text-gray-700">{application.jobAppliedFor}</p>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    Status
                  </h3>
                  <p className="text-gray-700">{application.status}</p>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    Cover Letter
                  </h3>
                  <p className="text-gray-600 whitespace-pre-line break-all w-full">
                    {application.coverLetter}
                  </p>
                  <div>{application._id}</div>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    Resume
                  </h3>
                  <div
                    className="flex justify-center"
                    onClick={() => openModal(application.resume.secure_url)}
                  >
                    <div className="w-full h-[300px] bg-gray-200 flex items-center justify-center overflow-hidden">
                      <img
                        className="w-full"
                        src={application.resume.secure_url}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {modalOpen && (
            <ResumeModal imageUrl={imageUrl} onClose={closeModal} />
          )}
        </div>
      ))}
    </div>
  );
};

export default Applications;
