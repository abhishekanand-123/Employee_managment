import React, { useState, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import EmployeeSidebar from "./EmployeeSidebar";
import "./EmployeeLayout.css";

function EmployeeLayout() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const token = localStorage.getItem("employeeToken");
    const employeeData = localStorage.getItem("employeeData");
    if (!token || !employeeData) {
      navigate("/employee/login");
      return;
    }
    setEmployee(JSON.parse(employeeData));
  }, [navigate]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("employeeToken");
    localStorage.removeItem("employeeData");
    navigate("/employee/login");
  };

  const formatTime = (d) =>
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true });
  const formatDate = (d) =>
    d.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" });

  if (!employee) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-app-wrapper">
      <header className="employee-header">
        <div className="d-flex justify-content-between align-items-center w-100">
          <div>
            <h5 className="mb-0">Welcome, {employee.firstName} {employee.lastName}</h5>
            <small className="text-white-50">
              {formatTime(currentTime)} • {formatDate(currentTime)}
            </small>
          </div>
          <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
            <i className="mdi mdi-logout me-1"></i> Logout
          </button>
        </div>
      </header>

      <div className="employee-body">
        <aside className="employee-sidebar-wrap">
          <EmployeeSidebar />
        </aside>
        <main className="employee-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default EmployeeLayout;
