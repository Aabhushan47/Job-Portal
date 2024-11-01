import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { countries } from "countries-list";
import { useParams } from "react-router-dom";
import { API } from "../../../config";
import axios from "axios";

const UpdateMyJob = () => {
  const { jobId } = useParams();
  const countriesList = Object.values(countries);
  const jobs = {
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
  };
  const [job, setJob] = useState(jobs);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`${API}/jobdetail/${jobId}`, {
          withCredentials: true,
        });
        const jobData = response.data.job;
        setJob({
          title: jobData.title || "",
          description: jobData.description || "",
          category: jobData.category || "",
          country: jobData.country || "",
          city: jobData.city || "",
          location: jobData.location || "",
          fixedSalary: jobData.fixedSalary || "",
          salaryFrom: jobData.salaryFrom || "",
          salaryTo: jobData.salaryTo || "",
          salaryType: jobData.salaryType || "",
        });
      } catch (err) {
        console.log(err.response.data.error);
      }
    };
    fetchJob();
  }, [jobId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

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
  } = job;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (salaryType === "fixedSalary") {
      job.salaryFrom = "";
      job.salaryTo = "";
    } else if (salaryType === "rangedSalary") {
      job.fixedSalary = "";
    } else {
      job.salaryFrom = "";
      job.salaryTo = "";
      job.fixedSalary = "";
    }

    try {
      const response = await axios.put(
        `${API}/updatejob/${jobId}`,
        {
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
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      setJob({
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
            onChange={handleChange}
            placeholder="Job Title"
          />
          {/* Description */}
          <textarea
            id="description"
            className="inp-post"
            value={description}
            name="description"
            onChange={handleChange}
            placeholder="Job Description"
          />
          {/* Category */}
          <input
            type="text"
            id="category"
            className="inp-post"
            value={category}
            name="category"
            onChange={handleChange}
            placeholder="Category"
          />
          {/* Country */}
          <select
            id="country"
            className="inp-post"
            value={country}
            name="country"
            onChange={handleChange}
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
            onChange={handleChange}
            placeholder="City"
          />
          {/* Location */}
          <input
            type="text"
            id="location"
            className="inp-post"
            value={location}
            name="location"
            onChange={handleChange}
            placeholder="Location"
          />
          {/* Salary Type */}
          <select
            name="salaryType"
            className="inp-post"
            id="salaryType"
            value={salaryType}
            onChange={handleChange}
          >
            <option value="">Select Salary Type</option>
            <option value="fixedSalary">Fixed Salary</option>
            <option value="rangedSalary">Ranged Salary</option>
          </select>
          {/* Fixed Salary */}
          {salaryType === "fixedSalary" && (
            <input
              type="number"
              id="fixedSalary"
              className="inp-post"
              value={job.fixedSalary}
              name="fixedSalary"
              onChange={handleChange}
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
                onChange={handleChange}
                placeholder="Salary From"
              />
              <input
                type="number"
                id="salaryTo"
                className="inp-post"
                value={salaryTo}
                name="salaryTo"
                onChange={handleChange}
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

export default UpdateMyJob;
