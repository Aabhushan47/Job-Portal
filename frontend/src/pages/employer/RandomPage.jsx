import React, { useState } from "react";

const JobCard = ({
  id,
  title = "Software Engineer",
  category = "Technology",
  country = "United States",
  city = "San Francisco",
  location = "Remote",
  description = "We are seeking a talented Software Engineer to join our dynamic team...",
  salary = "$100,000 - $150,000",
  companyName = "Tech Innovators Inc.",
  postedDate = "2023-05-15",
  onDelete,
  onEdit,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedJob, setEditedJob] = useState({
    title,
    category,
    country,
    city,
    location,
    description,
    salary,
    companyName,
  });

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(id, editedJob);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedJob((prev) => ({ ...prev, [name]: value }));
  };

  const handleDelete = () => {
    onDelete(id);
  };

  if (!isEditing) {
    return (
      <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-lg mx-auto p-6">
        <input
          className="w-full text-2xl font-bold text-gray-800 mb-2 p-2 border rounded"
          name="title"
          disabled={editingMode !== job._id ? true : false}
          value={job.title}
          onChange={(e) => handleInputChange(job._id, "title", e.target.value)}
        />
        <input
          type="text"
          name="category"
          className="text-sm text-gray-600 p-2 border rounded"
          disabled={editingMode !== job._id ? true : false}
          value={job.category}
          onChange={(e) =>
            handleInputChange(job._id, "category", e.target.value)
          }
        />
        <div className="grid grid-cols-2 gap-2 mb-2">
          <input
            className="text-sm text-gray-600 p-2 border rounded"
            name="city"
            disabled={editingMode !== job._id ? true : false}
            value={job.city}
            onChange={(e) => handleInputChange(job._id, "city", e.target.value)}
          />
          <select
            className="text-sm text-gray-600 p-2 border rounded"
            name="country"
            disabled={editingMode !== job._id ? true : false}
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

        <input
          className="w-full text-sm text-gray-600 mb-2 p-2 border rounded"
          name="location"
          disabled={editingMode !== job._id ? true : false}
          value={job.location}
          onChange={(e) =>
            handleInputChange(job._id, "location", e.target.value)
          }
        />
        <textarea
          className="w-full text-gray-700 mb-2 p-2 border rounded"
          name="description"
          disabled={editingMode !== job._id ? true : false}
          value={job.description}
          onChange={(e) =>
            handleInputChange(job._id, "description", e.target.value)
          }
          rows="3"
        />
        {/* <input
          className="w-full text-sm text-gray-800 font-semibold mb-2 p-2 border rounded"
          name="salary"
          value={editedJob.salary}
          onChange={handleChange}
        /> */}
        <div className="flex justify-end mt-4">
          <button
            onClick={() => handleUpdate(job._id)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Save
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto hover:shadow-xl transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {location}
          </span>
        </div>
        <div className="text-sm text-gray-600 mb-6">{companyName}</div>
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <span className="mr-2" aria-hidden="true">
            📍
          </span>
          <span>
            {city}, {country}
          </span>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <span className="mr-2" aria-hidden="true">
            💼
          </span>
          <span>{category}</span>
        </div>
        <p className="text-gray-700 mb-6">{description}</p>
        <div className="flex items-center text-sm text-gray-800 font-semibold mb-6">
          <span className="mr-2" aria-hidden="true">
            💰
          </span>
          <span>{salary}</span>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-500">
          <span>Posted on: {formatDate(postedDate)}</span>
          <div>
            <button
              onClick={handleEdit}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 transition duration-300"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
