import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    country: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  // Check if admin already exists on page load
  useEffect(() => {
    const checkAdminExists = async () => {
      try {
        // Try to login with dummy credentials to check if admin exists
        // Or we can add a separate endpoint to check
        // For now, we'll just show the form and handle error on submit
      } catch (err) {
        // Ignore
      }
    };
    checkAdminExists();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    // Validate form
    if (!form.username || !form.email || !form.password || !form.country) {
      alert("Please fill all required fields!");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Register Admin (one-time only)
      const registerRes = await axios.post("http://localhost:5000/api/admin/register", form);

      if (registerRes.data.message === "Admin registered successfully!") {
        // Step 2: Automatically login after registration
        try {
          const loginRes = await axios.post("http://localhost:5000/api/admin/login", {
            email: form.email,
            password: form.password
          });

          // Step 3: Save token and redirect to dashboard 
          
          localStorage.setItem("token", loginRes.data.token);
          alert("Admin registered and logged in successfully!");
          
          // Redirect to dashboard
          navigate("/");
        } catch (loginErr) {
          // If auto-login fails, redirect to login page
          alert("Admin registered successfully! Please login now.");
          navigate("/login");
        }
      }
    } catch (err) {
      // Handle registration errors
      if (err.response?.status === 400 && err.response?.data?.message?.includes("already exists")) {
        alert("Admin already registered! Please use login page to sign in.");
        navigate("/login");
      } else {
        alert(err.response?.data?.message || "Registration failed! Please try again.");
        console.error(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-4 mx-auto">
              <div className="auth-form-light text-start py-5 px-4 px-sm-5">

                {/* Logo */}
                <div className="brand-logo">
                  <img src="/assets/images/logo-dark.svg" alt="logo" />
                </div>

                <h4>New here?</h4>
                <h6 className="fw-light">Signing up is easy. It only takes a few steps</h6>

                <form className="pt-3">

                  {/* Username */}
                  <div className="form-group">
                    <input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      value={form.username}
                      className="form-control form-control-lg"
                      placeholder="Username"
                    />
                  </div>

                  {/* Email */}
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      value={form.email}
                      className="form-control form-control-lg"
                      placeholder="Email"
                    />
                  </div>

                  {/* Country */}
                  <div className="form-group">
                    <select
                      name="country"
                      onChange={handleChange}
                      className="form-select form-select-lg"
                    >
                      <option value="">Country</option>
                      <option>United States of America</option>
                      <option>United Kingdom</option>
                      <option>India</option>
                      <option>Germany</option>
                      <option>Argentina</option>
                    </select>
                  </div>

                  {/* Password */}
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      value={form.password}
                      className="form-control form-control-lg"
                      placeholder="Password"
                    />
                  </div>

                  {/* T&C */}
                  <div className="mb-4">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        I agree to all Terms & Conditions
                      </label>
                    </div>
                  </div>

                  {/* Sign Up Button */}
                  <div className="mt-3 d-grid gap-2">
                    <button
                      type="button"
                      onClick={handleRegister}
                      className="btn btn-primary btn-lg fw-medium auth-form-btn"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Registering...
                        </>
                      ) : (
                        "SIGN UP"
                      )}
                    </button>
                  </div>

                  {/* Login Link */}
                  <div className="text-center mt-4 fw-light">
                    Already have an account?{" "}
                    <a 
                      href="/login" 
                      className="text-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/login");
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      Login
                    </a>
                  </div>

                </form>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
