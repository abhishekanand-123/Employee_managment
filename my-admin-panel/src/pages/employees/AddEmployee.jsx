import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddEmployee.css";  // <-- IMPORT CSS

function AddEmployee() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    department: "",
    password: "",
  });

  // Check if admin is logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login as admin first!");
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Admin not logged in!");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/employees/add",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // Show credentials if email was sent
      if (res.data.credentials) {
        const creds = res.data.credentials;
        alert(
          `Employee Added Successfully!\n\n` +
          `Employee ID: ${creds.employeeId}\n` +
          `User ID: ${creds.userId}\n` +
          `Email: ${creds.email}\n` +
          `Password: ${creds.password}\n\n` +
          (res.data.emailSent ? "Credentials email sent to employee!" : "Email could not be sent.")
        );
      } else {
        alert("Employee Added Successfully!");
      }

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        department: "",
        password: "",
      });
    } catch (err) {
      // Handle authentication errors
      if (err.response?.status === 401) {
        alert("Session expired! Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      
      if (err.response?.data?.error === "DUPLICATE_EMAIL") {
        alert(`Error: ${err.response.data.message}\n\nEmail "${err.response.data.email}" is already registered.`);
      } else {
        alert(err.response?.data?.message || "Failed to add employee!");
      }
      console.error(err);
    }
  };

  return (
    <div className="container-scroller">
      <div className="container-fluid page-body-wrapper full-page-wrapper">
        <div className="content-wrapper d-flex align-items-center auth px-0">
          <div className="row w-100 mx-0">
            <div className="col-lg-5 mx-auto">

              <div className="auth-form-light-custom text-start py-5 px-4 px-sm-5">

                <div className="brand-logo text-center mb-3">
                  <img src="/assets/images/logo-dark.svg" alt="logo" />
                </div>

                <h4>Add New Employee</h4>
                <h6 className="fw-light mb-4">Fill employee details below</h6>

                <form className="pt-3">

                  <div className="form-group">
                    <input
                      type="text"
                      name="firstName"
                      className="form-control form-control-lg"
                      placeholder="First Name"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="lastName"
                      className="form-control form-control-lg"
                      placeholder="Last Name"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="phone"
                      className="form-control form-control-lg"
                      placeholder="Phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <input
                      type="text"
                      name="address"
                      className="form-control form-control-lg"
                      placeholder="Address"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <select
                      name="department"
                      className="form-select form-select-lg"
                      value={form.department}
                      onChange={handleChange}
                    >
                      <option value="">Select Department</option>
                        <option>Designer</option>
                      <option>Development</option>
                      <option>Marketing</option>
                      <option>Finance</option>
                      <option>Support</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <input
                      type="password"
                      name="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      value={form.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mt-3 d-grid gap-2">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg fw-medium auth-form-btn"
                      onClick={handleSubmit}
                    >
                      Add Employee
                    </button>
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

export default AddEmployee;
