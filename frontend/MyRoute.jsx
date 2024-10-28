import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./src/pages/HomePage";
import JobListing from "./src/pages/JobListing";
import Register from "./src/pages/Register";
import Login from "./src/pages/Login";
import Dashboard from "./src/pages/Dashboard";
import NotFoundPage from "./src/pages/NotFoundPage";
import { UserContext } from "./src/contexts/userContext";
import PrivateRoute from "./src/auth/CandidateRoute";
import EmployerRoute from "./src/auth/EmployerRoute";
import JobDetail from "./src/pages/JobDetail";
import Layout from "./src/components/Layout";
import AuthRoute from "./src/auth/AuthRoute";
import PostNewJob from "./src/pages/employer/PostNewJob";
import { API } from "./config";
import axios from "axios";
import ViewMyJobs from "./src/pages/employer/ViewMyJobs";
import UpdateMyJob from "./src/pages/employer/UpdateMyJob";
import MyApplications from "./src/pages/candidate/MyApplications";

const MyRoute = () => {
  const [loggedUser, setLoggedUser] = useState({});
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API}/getUser`, {
          withCredentials: true,
        });
        setLoggedUser(response.data.user);
        setIsAuthorized(true);
      } catch (err) {
        setIsAuthorized(false);
      }
    };

    fetchUser();
  }, [isAuthorized]);

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/" element={<PrivateRoute Component={HomePage} />} />
            <Route
              path="/candidate"
              element={<PrivateRoute Component={HomePage} />}
            />
            <Route
              path="/candidate/applications"
              element={<PrivateRoute Component={MyApplications} />}
            />
            <Route
              path="/jobs"
              element={<AuthRoute Component={JobListing} />}
            />
            <Route
              path="/jobs/:id"
              element={<AuthRoute Component={JobDetail} />}
            />
            <Route
              path="/employer"
              element={<EmployerRoute Component={HomePage} />}
            />
            <Route
              path="/employer/postjob"
              element={<EmployerRoute Component={PostNewJob} />}
            />
            <Route
              path="employer/myjobs"
              element={<EmployerRoute Component={ViewMyJobs} />}
            />
            <Route
              path="/employer/updateproduct/:jobId"
              element={<EmployerRoute Component={UpdateMyJob} />}
            />
          </Route>
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default MyRoute;
