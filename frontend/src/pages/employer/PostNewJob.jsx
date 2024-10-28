import React, { useContext, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { API } from "../../../config";
import "react-toastify/dist/ReactToastify.css";
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
      <ToastContainer position="top-center" />
      <div className="main" style={{ color: "black" }}>
        <form className="form">
          {/* Title */}
          <input
            type="text"
            id="title"
            className="inp-post"
            value={title}
            name="title"
            onChange={handleChange("title")}
            placeholder="Job Title"
          />
          {/* Description */}
          <textarea
            id="description"
            className="inp-post"
            value={description}
            name="description"
            onChange={handleChange("description")}
            placeholder="Job Description"
          />
          {/* Category */}
          <input
            type="text"
            id="category"
            className="inp-post"
            value={category}
            name="category"
            onChange={handleChange("category")}
            placeholder="Category"
          />
          {/* Country */}
          <select
            type="text"
            id="country"
            className="inp-post"
            value={country}
            name="country"
            onChange={handleChange("country")}
          >
            <option value="">Select a country</option>
            {countriesList.map((e, i) => (
              <option key={i} value={e.name}>
                {e.name}
              </option>
            ))}
          </select>
          {/* City */}
          <input
            type="text"
            id="city"
            className="inp-post"
            value={city}
            name="city"
            onChange={handleChange("city")}
            placeholder="City"
          />
          {/* Location */}
          <input
            type="text"
            id="location"
            className="inp-post"
            value={location}
            name="location"
            onChange={handleChange("location")}
            placeholder="Location"
          />
          {/* Salary Type */}
          <select
            name="salaryType"
            className="inp-post"
            id="salaryType"
            value={salaryType}
            onChange={handleChange("salaryType")}
          >
            <option>Select Salary Type</option>
            <option value="fixedSalary">Fixed Salary</option>
            <option value="rangedSalary">Ranged Salary</option>
          </select>
          {/* Fixed Salary */}
          {salaryType === "fixedSalary" && (
            <input
              type="number"
              id="fixedSalary"
              className="inp-post"
              value={fixedSalary}
              name="fixedSalary"
              onChange={handleChange("fixedSalary")}
              placeholder="Fixed Salary"
            />
          )}
          {/* Ranged Salary */}
          {salaryType === "rangedSalary" && (
            <>
              <input
                type="number"
                id="salaryFrom"
                className="inp-post"
                value={salaryFrom}
                name="salaryFrom"
                onChange={handleChange("salaryFrom")}
                placeholder="Salary From"
              />
              <input
                type="number"
                id="salaryTo"
                className="inp-post"
                value={salaryTo}
                name="salaryTo"
                onChange={handleChange("salaryTo")}
                placeholder="Salary To"
              />
            </>
          )}
          <button onClick={handleSubmit}>Submit</button>
        </form>
      </div>
    </>
  );
};

export default PostNewJob;
