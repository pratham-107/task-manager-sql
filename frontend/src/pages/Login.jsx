import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await axios.post("http://localhost:5000/api/login", formData);
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mt-5" data-aos="fade-up">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>
          {message && <div className="alert alert-info">{message}</div>}
          <form onSubmit={handleSubmit} className="shadow p-4 rounded">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-success w-100">
              Login
            </button>
          </form>
          <p className="text-center mt-3">
            Don’t have an account? <a href="/">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
