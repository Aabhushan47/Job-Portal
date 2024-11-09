import React, { useState, useContext, useEffect } from "react";
import "../App.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { UserContext } from "../contexts/userContext";
import { API } from "../../config";
import axios from "axios";

const Login = () => {
  const { isAuthorized, setIsAuthorized, setLoggedUser } =
    useContext(UserContext);

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
      setLoggedUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("isAuthorized", "true");
      navigate("/jobs");
      toast.success(response.data.message);
    } catch (err) {
      toast.error(err.response.data.error || "Something went wrong");
      setIsAuthorized(false);
    }
  };

  return (
    <>
      <section className="h-screen w-full flex items-center justify-center bg-gray-100">
        <form className="w-full sm:w-3/5 lg:w-1/3 flex flex-col gap-6 items-start bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Login Form
          </h1>

          <input
            type="email"
            className="w-full h-14 border border-gray-300 rounded-md px-4 text-black outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Email"
            name="email"
            onChange={handleChange("email")}
            value={email}
          />

          <input
            type="password"
            className="w-full h-14 border border-gray-300 rounded-md px-4 text-black outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Password"
            name="password"
            onChange={handleChange("password")}
            value={password}
          />

          <button
            className="w-full py-3 mt-4 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-md"
            onClick={handleSubmit}
          >
            Login
          </button>

          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <Link className="text-blue-600 hover:text-blue-800" to="/register">
              Register
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Login;
