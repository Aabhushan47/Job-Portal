import {
  faGlobe,
  faLocationCrosshairs,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

const JobCard = (props) => {
  const { _id, title, country, location, description, category } = props.data;
  const { loggedUser } = useContext(UserContext);
  const role = loggedUser.role;

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-md">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold">{title}</h3>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <FontAwesomeIcon icon={faGlobe} />
                <span>{country}</span>
                <FontAwesomeIcon icon={faLocationCrosshairs} />
                <span>{location}</span>
                <span>{category}</span>
              </div>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">{description}</p>
        </div>
        <div className="bg-gray-200 px-6 py-4 rounded-b-lg">
          <Link
            className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            to={`/jobs/${_id}`}
          >
            View Job
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
