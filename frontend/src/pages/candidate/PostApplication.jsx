import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "../../../config";
import axios from "axios";
import { toast } from "react-hot-toast";

const PostApplication = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();

  const [application, setApplication] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
    address: "",
    resume: null,
  });

  const { name, email, phone, coverLetter, address, resume } = application;

  const handleResume = (e) => {
    setApplication({ ...application, resume: e.target.files[0] });
  };

  const handleChange = (name) => (e) => {
    setApplication({
      ...application,
      [name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("coverLetter", coverLetter);
    formData.append("address", address);
    formData.append("file", resume);
    formData.append("jobId", jobId);

    try {
      const { data } = await axios.post(
        `${API}/candidate/postapplication`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setApplication({
        name: "",
        email: "",
        phone: "",
        coverLetter: "",
        address: "",
        resume: null,
      });
      toast.success(data.message);
      navigate("/jobs");
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-5">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow-md w-full max-w-xl"
        >
          <h2 className="text-2xl font-bold mb-6">Application Form</h2>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleChange("name")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              id="email"
              onChange={handleChange("email")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone No
            </label>
            <input
              type="number"
              value={phone}
              id="phone"
              onChange={handleChange("phone")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={handleChange("address")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="coverLetter"
              className="block text-sm font-medium text-gray-700"
            >
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              value={coverLetter}
              onChange={handleChange("coverLetter")}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-500"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="resume"
              className="block text-sm font-medium text-gray-700"
            >
              Resume
            </label>
            <input
              type="file"
              id="resume"
              onChange={handleResume}
              className="mt-1 block w-full  border-gray-300 rounded-md p-2 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default PostApplication;
