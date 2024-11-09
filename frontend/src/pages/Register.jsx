import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../contexts/userContext";
import { API } from "../../config";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const { name, email, password, role } = userData;

  const handleChange = (name) => (e) => {
    setUserData({ ...userData, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${API}/register`,
        { name, email, password, role },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      setUserData({ name: "", email: "", password: "", role: "" });
    } catch (err) {
      toast.error(err.response.data.error || "Something went wrong");
    }
  };

  return (
    <>
      <section className="h-screen w-full flex items-center justify-center bg-gray-100">
        <form
          className="w-full sm:w-3/5 lg:w-1/3 flex flex-col gap-4 items-start bg-white p-8 rounded-lg shadow-lg"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-semibold mb-6">Registration Form</h1>

          <input
            type="text"
            required
            className="w-full h-14 border border-gray-300 rounded-md px-4 text-black outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Name"
            onChange={handleChange("name")}
            value={name}
          />

          <input
            type="email"
            required
            className="w-full h-14 border border-gray-300 rounded-md px-4 text-black outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Email"
            onChange={handleChange("email")}
            value={email}
          />

          <input
            type="password"
            required
            className="w-full h-14 border border-gray-300 rounded-md px-4 text-black outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your Password"
            onChange={handleChange("password")}
            value={password}
          />

          <select
            className="w-full h-14 border border-gray-300 rounded-md px-4 text-black outline-none focus:ring-2 focus:ring-blue-500"
            name="role"
            id="role"
            onChange={handleChange("role")}
          >
            <option value="">Select Role</option>
            <option value="candidate">Candidate</option>
            <option value="employer">Employer</option>
          </select>

          <button
            className="w-full py-3 mt-4 text-white bg-blue-600 hover:bg-blue-700 font-semibold rounded-md"
            type="submit"
          >
            Register
          </button>

          <p className="mt-4 text-sm">
            Already Registered?{" "}
            <Link className="text-blue-600 hover:text-blue-800" to="/login">
              Login
            </Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Register;
