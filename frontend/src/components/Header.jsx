// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { UserContext } from "../contexts/userContext";
// import { API } from "../../config";

// const Header = () => {
//   const navigate = useNavigate();
//   const { loggedUser, setLoggedUser, isAuthorized, setIsAuthorized } =
//     useContext(UserContext);

//   const handleLogout = async () => {
//     try {
//       const response = await axios.get(`${API}/logout`, {
//         withCredentials: true,
//       });
//       toast.success(response.data.message);
//       // Clear the localStorage to ensure the user data is fully removed
//       localStorage.removeItem("user");
//       localStorage.removeItem("isAuthorized");

//       // Reset the state variables
//       setLoggedUser(null);
//       setIsAuthorized(false);
//       navigate("/login");
//     } catch (error) {
//       toast.error(error.response?.data?.error || "Something went wrong");
//       setIsAuthorized(true);
//     }
//   };

//   const role = loggedUser ? loggedUser.role : null;

//   return (
//     <header className="bg-gray-700 text-white py-5 px-4 w-full sticky top-0">
//       <div className="flex justify-between items-center">
//         <div className="text-2xl font-bold">
//           <Link to="/" className="text-white no-underline">
//             JobPortal
//           </Link>
//         </div>
//         <div className="hidden md:flex gap-4">
//           {!isAuthorized ? (
//             <>
//               <Link to="/" className="nav-link">
//                 Home
//               </Link>
//               <Link to="/register" className="nav-link">
//                 Register
//               </Link>
//               <Link to="/login" className="nav-link">
//                 Login
//               </Link>
//             </>
//           ) : (
//             <>
//               {isAuthorized && role === "candidate" && (
//                 <>
//                   <Link to="/dashboard" className="nav-link">
//                     Profile
//                   </Link>
//                   <Link to="/jobs" className="nav-link">
//                     Jobs
//                   </Link>
//                   <Link to="/candidate/applications" className="nav-link">
//                     My Applications
//                   </Link>
//                 </>
//               )}
//               {isAuthorized && role === "employer" && (
//                 <>
//                   <Link to="/employer" className="nav-link">
//                     Home
//                   </Link>
//                   <Link to="/jobs" className="nav-link">
//                     View Jobs
//                   </Link>
//                   <Link to="/employer/myjobs" className="nav-link">
//                     My Jobs
//                   </Link>
//                   <Link to="/employer/postjob" className="nav-link">
//                     Post New Jobs
//                   </Link>
//                   <Link to="/employer/applications" className="nav-link">
//                     Applicant's Applications
//                   </Link>
//                   <Link to="/dashboard" className="nav-link">
//                     Profile
//                   </Link>
//                 </>
//               )}
//               <Link onClick={handleLogout} className="nav-link">
//                 Logout
//               </Link>
//             </>
//           )}
//         </div>
//         <button className="md:hidden text-white hover:text-amber-300 focus:outline-none">
//           &#9776;
//         </button>
//       </div>
//     </header>
//   );
// };

// export default Header;

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../contexts/userContext";
import { API } from "../../config";

const Header = () => {
  const navigate = useNavigate();
  const { loggedUser, setLoggedUser, isAuthorized, setIsAuthorized } =
    useContext(UserContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // State for mobile menu

  const handleLogout = async () => {
    try {
      const response = await axios.get(`${API}/logout`, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      // Clear the localStorage to ensure the user data is fully removed
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthorized");

      // Reset the state variables
      setLoggedUser(null);
      setIsAuthorized(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Something went wrong");
      setIsAuthorized(true);
    }
  };

  const role = loggedUser ? loggedUser.role : null;

  // Toggle mobile menu visibility
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="bg-gray-700 text-white py-5 px-4 w-full sticky top-0">
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
              {isAuthorized && role === "candidate" && (
                <>
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  <Link to="/jobs" className="nav-link">
                    Jobs
                  </Link>
                  <Link to="/candidate/applications" className="nav-link">
                    My Applications
                  </Link>
                </>
              )}
              {isAuthorized && role === "employer" && (
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
                </>
              )}
              <Link onClick={handleLogout} className="nav-link">
                Logout
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className="md:hidden text-white hover:text-amber-300 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          &#9776;
        </button>
      </div>
      {/* mobile menu */}
      <div
        className={`md:hidden fixed top-0 left-0 bg-gray-800 text-white p-4 w-64 h-full transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end mb-4">
          <button onClick={toggleMobileMenu} className="text-white text-2xl">
            &times;
          </button>
        </div>
        {!isAuthorized ? (
          <div className="flex flex-col">
            <Link to="/" onClick={closeMobileMenu} className="nav-link">
              Home
            </Link>
            <Link to="/register" onClick={closeMobileMenu} className="nav-link">
              Register
            </Link>
            <Link to="/login" onClick={closeMobileMenu} className="nav-link">
              Login
            </Link>
          </div>
        ) : (
          <>
            {isAuthorized && role === "candidate" && (
              <div className="flex flex-col">
                <Link to="/jobs" onClick={closeMobileMenu} className="nav-link">
                  Jobs
                </Link>
                <Link
                  to="/candidate/applications"
                  onClick={closeMobileMenu}
                  className="nav-link"
                >
                  My Applications
                </Link>
              </div>
            )}
            {isAuthorized && role === "employer" && (
              <div className="flex flex-col">
                <Link
                  to="/employer"
                  onClick={closeMobileMenu}
                  className="nav-link"
                >
                  Home
                </Link>
                <Link to="/jobs" onClick={closeMobileMenu} className="nav-link">
                  View Jobs
                </Link>
                <Link
                  to="/employer/myjobs"
                  onClick={closeMobileMenu}
                  className="nav-link"
                >
                  My Jobs
                </Link>
                <Link
                  to="/employer/postjob"
                  onClick={closeMobileMenu}
                  className="nav-link"
                >
                  Post New Jobs
                </Link>
                <Link
                  to="/employer/applications"
                  onClick={closeMobileMenu}
                  className="nav-link"
                >
                  Applicant's Applications
                </Link>
              </div>
            )}
            <Link
              onClick={() => {
                handleLogout();
                closeMobileMenu();
              }}
              className="nav-link"
            >
              Logout
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
