import {
  faGlobe,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const JobCard = (props) => {
  const { _id, title, country, location, description, category } = props.data;

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full">
      <div className="p-6 flex-1">
        <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
          <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tight">{title}</h3>
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faGlobe} />
                <span>{country}</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faLocationCrosshairs} />
                <span>{location}</span>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-600 overflow-hidden">
          {description}
        </p>
      </div>
      <div className="bg-gray-100 px-6 py-4">
        <Link
          to={`/jobs/${_id}`}
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          View Job
        </Link>
      </div>
    </div>
  );
};

export default JobCard;
