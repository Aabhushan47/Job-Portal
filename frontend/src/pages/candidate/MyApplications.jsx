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
import { UserContext } from "./../../contexts/userContext";
// useEffect(() => {
//   axios.get(`${API}/`);
// });

const MyApplications = () => {
  const [application, setApplication] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const { loggedUser, isAuthorized } = useContext(UserContext);

  return (
    <div className="flex flex-col gap-8 p-6 md:p-10">
      {applications.map((application, index) => (
        <div key={index} className="mb-8">
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
                  <p>{application.location}</p>
                </div>
              </div>
            </div>
            <div className="p-6 border rounded-lg shadow-lg bg-white">
              <h2 className="pb-2 text-lg font-bold text-gray-900 border-b">
                Application Details
              </h2>
              <div className="space-y-6 mt-4">
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    Job Applied For
                  </h3>
                  <p className="text-gray-700">{application.jobAppliedFor}</p>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    Application Date
                  </h3>
                  <p className="text-gray-700">{application.applicationDate}</p>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    Cover Letter
                  </h3>
                  <p className="text-gray-600 whitespace-pre-line break-all w-full">
                    {application.coverLetter}
                  </p>
                </div>
                <div>
                  <h3 className="text-md font-semibold text-gray-800">
                    Resume
                  </h3>
                  <div className="flex justify-center">
                    <div className="w-full h-[500px] bg-gray-200 flex items-center justify-center">
                      <p className="text-gray-500">Resume Placeholder</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyApplications;
