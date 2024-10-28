import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
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
      console.log(response.data.message);
      setUserData({ name: "", email: "", password: "", role: "" });
    } catch (err) {
      toast.error(err.response.data.error || "Something went wrong");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" />
      <section className="main">
        <form className="form" onSubmit={handleSubmit}>
          <h1>Registration Form</h1>

          <input
            type="text"
            required
            className="inp"
            placeholder="Enter your Name"
            onChange={handleChange("name")}
            value={name}
          />
          <input
            type="email"
            required
            className="inp"
            placeholder="Enter your Email"
            onChange={handleChange("email")}
            value={email}
          />
          <input
            type="password"
            className="inp"
            required
            placeholder="Enter your Password"
            onChange={handleChange("password")}
            value={password}
          />
          <select
            className="inp"
            name="role"
            id="role"
            onChange={handleChange("role")}
          >
            <option value="">Select Role</option>
            <option value="candidate">Candidate</option>
            <option value="employer">Employer</option>
          </select>
          <button className="btn" type="submit">
            Register
          </button>
          <p>
            Already Registered? <Link to="/login">Login</Link>
          </p>
        </form>
      </section>
    </>
  );
};

export default Register;
