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
  const [loading, setLoading] = useState(false); //  loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true); //  start loader

    try {
      const res = await axios.post(
        "https://task-manager-backend-i346.onrender.com/api/login",
        formData
      );
      localStorage.setItem("token", res.data.token);
      setMessage("Login successful! Redirecting...");
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Login failed");
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5" data-aos="fade-up">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4 border-0 rounded-4">
            <h2 className="text-center mb-4 fw-bold">Welcome Back</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control rounded-3"
                  name="email"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control rounded-3"
                  name="password"
                  onChange={handleChange}
                  required
                />
              </div>

              {/* ✅ Login Button with Spinner */}
              <button
                type="submit"
                className="btn btn-success w-100 rounded-3 fw-semibold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>
            <p className="text-center mt-3 mb-0">
              Don’t have an account? <a href="/">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
