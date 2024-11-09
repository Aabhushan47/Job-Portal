import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { API } from "../../../config";
import { countries } from "countries-list";
import { useNavigate } from "react-router-dom";

const PostNewJob = () => {
  const navigate = useNavigate();
  const countriesList = Object.values(countries);
  const [newJob, setNewJob] = useState({
    title: "",
    description: "",
    category: "",
    country: "",
    city: "",
    location: "",
    fixedSalary: "",
    salaryFrom: "",
    salaryTo: "",
    salaryType: "",
  });

  const {
    title,
    description,
    category,
    country,
    city,
    location,
    fixedSalary,
    salaryFrom,
    salaryTo,
    salaryType,
  } = newJob;

  const handleChange = (name) => (e) => {
    setNewJob({ ...newJob, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const jobData = { ...newJob };

    if (salaryType === "fixedSalary") {
      jobData.salaryFrom = "";
      jobData.salaryTo = "";
    } else if (salaryType === "rangedSalary") {
      jobData.fixedSalary = "";
    } else {
      jobData.salaryFrom = "";
      jobData.salaryTo = "";
      jobData.fixedSalary = "";
    }

    try {
      const response = await axios.post(`${API}/addjob`, jobData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(response.data.message);
      setNewJob({
        title: "",
        description: "",
        category: "",
        country: "",
        city: "",
        location: "",
        fixedSalary: "",
        salaryFrom: "",
        salaryTo: "",
        salaryType: "",
      });
    } catch (err) {
      toast.error(err.response.data.error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-6 px-4 flex flex-col justify-center sm:py-12">
        <div className="py-3 sm:max-w-xl sm:mx-auto">
          <div className="px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
            <div className="max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-5">
                <div className="block pl-2 font-semibold text-2xl text-gray-700 ">
                  <h2>Add New Job</h2>
                </div>
              </div>
              <form className="divide-y divide-gray-200">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                  <div className="flex flex-col">
                    <label className="leading-loose">Job Title</label>
                    <input
                      type="text"
                      name="title"
                      value={title}
                      onChange={handleChange("title")}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Job title"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Category</label>
                    <input
                      type="text"
                      name="category"
                      value={category}
                      onChange={handleChange("category")}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Job category"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-5">
                    <div className="flex flex-col w-full">
                      <label className="leading-loose">Country</label>
                      <select
                        type="text"
                        name="country"
                        value={country}
                        onChange={handleChange("country")}
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="Country"
                      >
                        <option value="">Select a country</option>
                        {countriesList.map((e, i) => (
                          <option key={i} value={e.name}>
                            {e.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex flex-col w-full">
                      <label className="leading-loose">City</label>
                      <input
                        type="text"
                        name="city"
                        value={city}
                        onChange={handleChange("city")}
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        placeholder="City"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={location}
                      onChange={handleChange("location")}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Specific location"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="leading-loose">Job Description</label>
                    <textarea
                      name="description"
                      value={description}
                      onChange={handleChange("description")}
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      placeholder="Job description"
                      rows="4"
                    ></textarea>
                  </div>
                  <div className="flex flex-col space-y-4">
                    <label className="leading-loose text-gray-700">
                      Salary
                    </label>

                    {/* Salary Type Select */}
                    <select
                      name="salaryType"
                      className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                      id="salaryType"
                      value={salaryType}
                      onChange={handleChange("salaryType")}
                    >
                      <option value="">Select Salary Type</option>
                      <option value="fixedSalary">Fixed Salary</option>
                      <option value="rangedSalary">Ranged Salary</option>
                    </select>

                    {/* Fixed Salary Input */}
                    {salaryType === "fixedSalary" && (
                      <input
                        type="number"
                        id="fixedSalary"
                        className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                        value={fixedSalary}
                        name="fixedSalary"
                        onChange={handleChange("fixedSalary")}
                        placeholder="Fixed Salary"
                      />
                    )}

                    {/* Ranged Salary Inputs */}
                    {salaryType === "rangedSalary" && (
                      <div className="flex flex-col space-y-4">
                        <input
                          type="number"
                          id="salaryFrom"
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          value={salaryFrom}
                          name="salaryFrom"
                          onChange={handleChange("salaryFrom")}
                          placeholder="Salary From"
                        />
                        <input
                          type="number"
                          id="salaryTo"
                          className="px-4 py-2 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                          value={salaryTo}
                          name="salaryTo"
                          onChange={handleChange("salaryTo")}
                          placeholder="Salary To"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="pt-4 flex items-center space-x-4">
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="bg-blue-500 flex justify-center items-center w-full text-white px-4 py-3 rounded-md focus:outline-none hover:bg-blue-600 transition duration-200"
                  >
                    Save Job Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostNewJob;
