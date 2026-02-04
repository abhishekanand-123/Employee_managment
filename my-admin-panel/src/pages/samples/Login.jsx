import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", form);

      alert("Login Successful!");

      // Save token in localStorage
      localStorage.setItem("token", res.data.token);

      // Redirect to dashboard
      navigate("/");
    } catch (err) {
      alert("Invalid Email or Password!");
      console.error(err);
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

                <h4>Hello! let's get started</h4>
                <h6 className="fw-light">Sign in to continue.</h6>

                <form className="pt-3">

                  {/* Email */}
                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      onChange={handleChange}
                      value={form.email}
                    />
                  </div>

                  {/* Password */}
                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      onChange={handleChange}
                      value={form.password}
                    />
                  </div>

                  {/* Sign In Button */}
                  <div className="mt-3 d-grid gap-2">
                    <button
                      type="button"
                      onClick={handleLogin}
                      className="btn btn-primary btn-lg fw-medium auth-form-btn"
                    >
                      SIGN IN
                    </button>
                  </div>

                  {/* Forgot Password */}
                  <div className="my-2 d-flex justify-content-between align-items-center">
                    <div className="form-check">
                      <label className="form-check-label text-muted">
                        <input type="checkbox" className="form-check-input" />
                        Keep me signed in
                      </label>
                    </div>

                    <a href="#" className="auth-link text-black">
                      Forgot password?
                    </a>
                  </div>

                  {/* Facebook Button */}
                  <div className="mb-2 d-grid gap-2">
                    <button type="button" className="btn btn-facebook auth-form-btn">
                      <i className="typcn typcn-social-facebook me-2"></i>
                      Connect using Facebook
                    </button>
                  </div>

                  {/* Register Link */}
                  <div className="text-center mt-4 fw-light">
                    Don't have an account?{" "}
                    <a 
                      href="/register" 
                      className="text-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/register");
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      Create
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

export default Login;
