import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { UserContext } from "../contexts/userContext";
import { API } from "../../config";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const { loggedUser, isAuthorized, setIsAuthorized } = useContext(UserContext);

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${API}/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setIsAuthorized(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
      setIsAuthorized(true);
    }
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  return (
    <header className="bg-gray-700 text-white py-5 px-4 max-w-full">
      <ToastContainer position="top-center" />
      <div className="flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className="text-white no-underline">
            JobPortal
          </Link>
        </div>
        <div className="hidden md:flex gap-4">
          {!isAuthorized ? (
            <>
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </>
          ) : (
            <>
              {isAuthorized && loggedUser.role === "candidate" && (
                <>
                  <Link to="/dashboard" className="nav-link">
                    Profile
                  </Link>
                  <Link to="/jobs" className="nav-link">
                    Jobs
                  </Link>
                  <Link to="/candidate/applications" className="nav-link">
                    My Applications
                  </Link>
                </>
              )}
              {isAuthorized && loggedUser.role === "employer" && (
                <>
                  <Link to="/employer" className="nav-link">
                    Home
                  </Link>
                  <Link to="/jobs" className="nav-link">
                    View Jobs
                  </Link>
                  <Link to="/employer/myjobs" className="nav-link">
                    My Jobs
                  </Link>
                  <Link to="/employer/postjob" className="nav-link">
                    Post New Jobs
                  </Link>
                  <Link to="/employer/applications" className="nav-link">
                    Applicant's Applications
                  </Link>
                  <Link to="/dashboard" className="nav-link">
                    Profile
                  </Link>
                </>
              )}
              <Link onClick={handleLogout} className="nav-link">
                Logout
              </Link>
            </>
          )}
        </div>
        <button
          onClick={toggleDropdown}
          className="md:hidden text-white hover:text-amber-300 focus:outline-none"
        >
          &#9776;
        </button>
      </div>
      {showDropdown && (
        <nav className="flex flex-col mt-3 md:hidden">
          {!isAuthorized ? (
            <>
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/register" className="nav-link">
                Register
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </>
          ) : (
            <>
              {isAuthorized && loggedUser.role === "candidate" && (
                <>
                  <Link to="/candidate/profile" className="nav-link">
                    Profile
                  </Link>
                  <Link to="/jobs" className="nav-link">
                    Jobs
                  </Link>
                  <Link to="/candidate/applications" className="nav-link">
                    My Applications
                  </Link>
                </>
              )}
              {isAuthorized && loggedUser.role === "employer" && (
                <>
                  <Link to="/employer" className="nav-link">
                    Home
                  </Link>
                  <Link to="/jobs" className="nav-link">
                    View Jobs
                  </Link>
                  <Link to="/employer/myjobs" className="nav-link">
                    My Jobs
                  </Link>
                  <Link to="/employer/postjob" className="nav-link">
                    Post New Jobs
                  </Link>
                  <Link to="/employer/applications" className="nav-link">
                    Applicant's Applications
                  </Link>
                  <Link to="/employer/profile" className="nav-link">
                    Profile
                  </Link>
                </>
              )}
              <Link onClick={handleLogout} className="nav-link">
                Logout
              </Link>
            </>
          )}
        </nav>
      )}
    </header>
  );
};

export default Header;
