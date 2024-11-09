import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./src/pages/HomePage";
import JobListing from "./src/pages/JobListing";
import Register from "./src/pages/Register";
import Login from "./src/pages/Login";
import NotFoundPage from "./src/pages/NotFoundPage";
import { UserContext } from "./src/contexts/userContext";
import CandidateRoute from "./src/auth/CandidateRoute";
import EmployerRoute from "./src/auth/EmployerRoute";
import JobDetail from "./src/pages/JobDetail";
import Layout from "./src/components/Layout";
import AuthRoute from "./src/auth/AuthRoute";
import PostNewJob from "./src/pages/employer/PostNewJob";
import { API } from "./config";
import axios from "axios";
import ViewMyJobs from "./src/pages/employer/ViewMyJobs";
import Applications from "./src/pages/candidate/Applications";
import PostApplication from "./src/pages/candidate/PostApplication";

const MyRoute = () => {
  const [loggedUser, setLoggedUser] = useState(() => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  });
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return !!localStorage.getItem("isAuthorized");
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API}/getUser`, {
          withCredentials: true,
        });
        const user = response.data.user;

        setLoggedUser(user);
        setIsAuthorized(true);

        // Save to localStorage
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("isAuthorized", "true");
      } catch (err) {
        setIsAuthorized(false);
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthorized");
      }
    };

    if (!loggedUser) {
      fetchUser();
    }
  }, [loggedUser]);

  return (
    // UserContext using context API
    <UserContext.Provider
      value={{ loggedUser, setLoggedUser, isAuthorized, setIsAuthorized }}
    >
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route element={<CandidateRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/candidate" element={<HomePage />} />
              <Route
                path="/candidate/applications"
                element={<Applications />}
              />
              <Route
                path="/candidate/application/:jobId"
                element={<PostApplication />}
              />
            </Route>
            <Route element={<AuthRoute />}>
              <Route path="/jobs" element={<JobListing />} />
              <Route path="/jobs/:id" element={<JobDetail />} />
            </Route>

            <Route element={<EmployerRoute />}>
              <Route path="/employer" element={<HomePage />} />
              <Route path="/employer/postjob" element={<PostNewJob />} />
              <Route path="employer/myjobs" element={<ViewMyJobs />} />
              <Route path="/employer/applications" element={<Applications />} />
            </Route>
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default MyRoute;
