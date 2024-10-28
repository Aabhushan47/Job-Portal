import React, { useState, useContext, useEffect } from "react";
import "../App.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../contexts/userContext";
import { API } from "../../config";
import axios from "axios";

const Login = () => {
  const { isAuthorized, setIsAuthorized } = useContext(UserContext);

  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = userData;

  const handleChange = (name) => (e) => {
    setUserData({ ...userData, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/login`,
        { email, password },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsAuthorized(true);
      navigate("/dashboard");
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.error || "Something went wrong");
      setIsAuthorized(false);
    }
  };
  useEffect(() => {
    if (isAuthorized) {
      navigate("/dashboard");
    }
  }, [isAuthorized, navigate]);
  return (
    <>
      <ToastContainer position="top-center" />
      <section className="main">
        <form className="form">
          <h1>Login Form</h1>
          <input
            type="email"
            className="inp"
            placeholder="Enter your Email"
            name="email"
            onChange={handleChange("email")}
            value={email}
          />
          <input
            type="password"
            className="inp"
            placeholder="Enter your Password"
            name="password"
            onChange={handleChange("password")}
            value={password}
          />
          <button className="btn" onClick={handleSubmit}>
            Login
          </button>
          <p>
            <Link to="/register"> Dont have a account? Register</Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Login;
