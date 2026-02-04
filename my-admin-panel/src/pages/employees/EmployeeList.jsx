import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmployeeList.css";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState({});
  const [todayDate, setTodayDate] = useState("");
  const navigate = useNavigate();

  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Admin not logged in!");
        navigate("/login");
        return;
      }
      const res = await axios.get("http://localhost:5000/api/admin/attendance/employees-attendance", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setEmployees(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch employees with attendance:", err);
      if (err.response?.status === 401) {
        alert("Session expired! Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      alert("Failed to fetch employee attendance. Please ensure you are logged in as admin.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const now = new Date();
    setTodayDate(now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));

    fetchEmployees();

    // Auto-refresh every 10 seconds
    const interval = setInterval(() => {
      fetchEmployees();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/employees/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert("Employee deleted successfully!");
      fetchEmployees();
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired! Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      alert(err.response?.data?.message || "Failed to delete employee!");
      console.error(err);
    }
  };

  const handleAdminMarkIn = async (employeeId) => {
    setActionLoading({ ...actionLoading, [`markin-${employeeId}`]: true });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/admin/attendance/mark-in/${employeeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert(`Employee marked in successfully at ${res.data.markInTime}!`);
      fetchEmployees();
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired! Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      alert(err.response?.data?.message || "Failed to mark in employee!");
      console.error(err);
    } finally {
      setActionLoading({ ...actionLoading, [`markin-${employeeId}`]: false });
    }
  };

  const handleAdminMarkOut = async (employeeId) => {
    setActionLoading({ ...actionLoading, [`markout-${employeeId}`]: true });
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `http://localhost:5000/api/admin/attendance/mark-out/${employeeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert(`Employee marked out successfully at ${res.data.markOutTime}! Total hours: ${res.data.totalHours}`);
      fetchEmployees();
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Session expired! Please login again.");
        localStorage.removeItem("token");
        navigate("/login");
        return;
      }
      alert(err.response?.data?.message || "Failed to mark out employee!");
      console.error(err);
    } finally {
      setActionLoading({ ...actionLoading, [`markout-${employeeId}`]: false });
    }
  };

  const filteredEmployees = employees.filter((emp) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      emp.firstName?.toLowerCase().includes(searchLower) ||
      emp.lastName?.toLowerCase().includes(searchLower) ||
      emp.email?.toLowerCase().includes(searchLower) ||
      emp.employeeId?.toLowerCase().includes(searchLower) ||
      emp.department?.toLowerCase().includes(searchLower)
    );
  });

  if (loading) {
    return (
      <div className="employee-list-container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="employee-list-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="page-title">Employee Management & Attendance</h3>
          <p className="text-muted mb-0">
            Total Employees: {employees.length} | Date: {todayDate} | Auto-refreshes every 10 seconds
          </p>
        </div>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            onClick={fetchEmployees}
            title="Refresh"
          >
            <i className="mdi mdi-refresh me-1"></i>
            Refresh
          </button>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/add-employee")}
          >
            <i className="mdi mdi-account-plus me-1"></i>
            Add Employee
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search employees by name, email, ID, or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Employee Table */}
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover table-striped">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>EMPLOYEE ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>PHONE</th>
                  <th>DEPARTMENT</th>
                  <th>MARK IN</th>
                  <th>MARK OUT</th>
                  <th>HOURS</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.length === 0 ? (
                  <tr>
                    <td colSpan="10" className="text-center py-4">
                      <p className="text-muted mb-0">No employees found</p>
                    </td>
                  </tr>
                ) : (
                  filteredEmployees.map((emp, index) => (
                    <tr key={emp._id}>
                      <td>{index + 1}</td>
                      <td>
                        <span className="badge bg-info">{emp.employeeId}</span>
                      </td>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="avatar-circle me-2">
                            {emp.firstName?.charAt(0)}
                            {emp.lastName?.charAt(0)}
                          </div>
                          <div>
                            {emp.firstName} {emp.lastName}
                          </div>
                        </div>
                      </td>
                      <td>{emp.email}</td>
                      <td>{emp.phone}</td>
                      <td>
                        <span className={`badge ${
                          emp.department === "Development" ? "bg-primary" :
                          emp.department === "Designer" ? "bg-success" :
                          emp.department === "Support" ? "bg-warning" :
                          "bg-secondary"
                        }`}>
                          {emp.department}
                        </span>
                      </td>
                      <td>
                        {emp.attendance?.markIn ? (
                          <div>
                            <span className="badge bg-success">
                              <i className="mdi mdi-check-circle me-1"></i>
                              {emp.attendance.markIn.time}
                            </span>
                            <small className="d-block text-muted mt-1" style={{ fontSize: '10px' }}>
                              ✓ Employee marked in
                            </small>
                            <button
                              className="btn btn-sm btn-outline-primary mt-1"
                              onClick={() => handleAdminMarkIn(emp._id)}
                              disabled={actionLoading[`markin-${emp._id}`]}
                              title="Re-mark In"
                            >
                              {actionLoading[`markin-${emp._id}`] ? (
                                <span className="spinner-border spinner-border-sm"></span>
                              ) : (
                                <><i className="mdi mdi-refresh me-1"></i>Re-mark In</>
                              )}
                            </button>
                          </div>
                        ) : (
                          <div>
                            <span className="badge bg-danger">
                              <i className="mdi mdi-close-circle-outline me-1"></i>
                              Not Marked
                            </span>
                            <small className="d-block text-muted mt-1" style={{ fontSize: '10px' }}>
                              ✗ Employee hasn't marked in
                            </small>
                            <button
                              className="btn btn-sm btn-success mt-1"
                              onClick={() => handleAdminMarkIn(emp._id)}
                              disabled={actionLoading[`markin-${emp._id}`]}
                            >
                              {actionLoading[`markin-${emp._id}`] ? (
                                <span className="spinner-border spinner-border-sm"></span>
                              ) : (
                                <><i className="mdi mdi-clock-in me-1"></i>Mark In</>
                              )}
                            </button>
                          </div>
                        )}
                      </td>
                      <td>
                        {emp.attendance?.markOut ? (
                          <div>
                            <span className="badge bg-success">
                              <i className="mdi mdi-check-circle me-1"></i>
                              {emp.attendance.markOut.time}
                            </span>
                            <small className="d-block text-muted mt-1" style={{ fontSize: '10px' }}>
                              ✓ Employee marked out
                            </small>
                            <button
                              className="btn btn-sm btn-outline-success mt-1"
                              onClick={() => handleAdminMarkOut(emp._id)}
                              disabled={actionLoading[`markout-${emp._id}`]}
                              title="Re-mark Out"
                            >
                              {actionLoading[`markout-${emp._id}`] ? (
                                <span className="spinner-border spinner-border-sm"></span>
                              ) : (
                                <><i className="mdi mdi-refresh me-1"></i>Re-mark Out</>
                              )}
                            </button>
                          </div>
                        ) : emp.attendance?.markIn ? (
                          <div>
                            <span className="badge bg-warning text-dark">
                              <i className="mdi mdi-clock-alert-outline me-1"></i>
                              Not Marked
                            </span>
                            <small className="d-block text-muted mt-1" style={{ fontSize: '10px' }}>
                              ✗ Employee hasn't marked out
                            </small>
                            <button
                              className="btn btn-sm btn-success mt-1"
                              onClick={() => handleAdminMarkOut(emp._id)}
                              disabled={actionLoading[`markout-${emp._id}`]}
                            >
                              {actionLoading[`markout-${emp._id}`] ? (
                                <span className="spinner-border spinner-border-sm"></span>
                              ) : (
                                <><i className="mdi mdi-clock-out me-1"></i>Mark Out</>
                              )}
                            </button>
                          </div>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                      <td>
                        {emp.attendance?.totalHours ? (
                          <span className="badge bg-info">{emp.attendance.totalHours} hrs</span>
                        ) : emp.attendance?.markIn ? (
                          <span className="text-muted small">In Progress</span>
                        ) : (
                          <span className="text-muted">-</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-1"
                          onClick={() => navigate(`/edit-employee/${emp._id}`)}
                          title="Edit Employee"
                        >
                          <i className="mdi mdi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(emp._id)}
                          title="Delete Employee"
                        >
                          <i className="mdi mdi-delete"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeList;

