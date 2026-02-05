import React, { useState, useEffect } from "react";
import axios from "axios";

function Attendance() {
  const [period, setPeriod] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Automatically fetch data when period or date changes
    fetchAttendance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period, selectedDate]);

  const fetchAttendance = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please login to view attendance.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        `http://localhost:5000/api/admin/attendance/employees-attendance?period=${period}&date=${selectedDate}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("Attendance Response:", response.data);
      
      // Handle response data structure
      let data = [];
      if (response.data && response.data.data) {
        data = response.data.data;
      } else if (Array.isArray(response.data)) {
        data = response.data;
      }
      
      // Show message if future date is selected
      if (response.data && response.data.message) {
        setError(response.data.message);
      }
      
      // For monthly/yearly views, filter out employees with no attendance data (0 total days)
      if (period === "monthly" || period === "yearly") {
        data = data.filter(item => {
          const summary = item.summary;
          return summary && summary.totalDays > 0;
        });
      }
      
      setAttendanceData(data);
    } catch (err) {
      console.error("Error fetching attendance:", err);
      setError(err.response?.data?.message || "Failed to fetch attendance data. Please try again.");
      if (err.response?.status === 401) {
        setError("Unauthorized. Please login again.");
      }
      setAttendanceData([]);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkIn = async (employeeId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/admin/attendance/mark-in/${employeeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Employee marked in successfully!");
      fetchAttendance();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to mark in employee!");
    }
  };

  const handleMarkOut = async (employeeId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:5000/api/admin/attendance/mark-out/${employeeId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Employee marked out successfully!");
      fetchAttendance();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to mark out employee!");
    }
  };

  const handleReMarkIn = async (employeeId) => {
    if (window.confirm("Are you sure you want to re-mark in this employee?")) {
      await handleMarkIn(employeeId);
    }
  };

  const getInitials = (firstName, lastName) => {
    const first = firstName ? firstName.charAt(0).toUpperCase() : "";
    const last = lastName ? lastName.charAt(0).toUpperCase() : "";
    return first + last;
  };

  const getFullName = (firstName, lastName) => {
    return `${firstName || ""} ${lastName || ""}`.trim();
  };

  return (
    <>
      <div className="row">
        <div className="col-lg-12 grid-margin stretch-card">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Employee Attendance</h4>
              <p className="card-description">
                View attendance records for all employees
              </p>

              {/* Filters */}
              <div className="row mb-4">
                <div className="col-md-4">
                  <label className="form-label">Period</label>
                  <select
                    className="form-select"
                    value={period}
                    onChange={(e) => {
                      setPeriod(e.target.value);
                      // Data will be fetched automatically via useEffect
                    }}
                  >
                    <option value="daily">Daily</option>
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={selectedDate}
                    onChange={(e) => {
                      if (e.target.value) {
                        setSelectedDate(e.target.value);
                      }
                    }}
                    min="2020-01-01"
                    max={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div className="col-md-4 d-flex align-items-end">
                  <button
                    className="btn btn-primary"
                    onClick={fetchAttendance}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Refresh"}
                  </button>
                </div>
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {/* Attendance Table */}
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>EMPLOYEE ID</th>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>PHONE</th>
                      <th>DEPARTMENT</th>
                      {period === "daily" ? (
                        <>
                          <th>MARK IN</th>
                          <th>MARK OUT</th>
                          <th>HOURS</th>
                          <th>ACTIONS</th>
                        </>
                      ) : (
                        <>
                          <th>Total Days</th>
                          <th>Present Days</th>
                          <th>Absent Days</th>
                          <th>Total Hours</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={period === "daily" ? 10 : 10} className="text-center">
                          <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </td>
                      </tr>
                    ) : attendanceData.length === 0 ? (
                      <tr>
                        <td colSpan={period === "daily" ? 10 : 10} className="text-center">
                          <div className="py-4">
                            <p className="text-muted mb-0">No attendance records found</p>
                            <small className="text-muted">Please select a different date or period</small>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      attendanceData
                        .filter((item) => {
                          const employee = item.employee || item;
                          return employee && employee._id;
                        })
                        .map((item, index) => {
                          // Handle different data structures from backend
                          const employee = item.employee || item;
                          const attendance = item.attendance;
                          const summary = item.summary;

                          return (
                          <tr key={employee._id}>
                            <td>{index + 1}</td>
                            <td>
                              <span className="badge badge-info">
                                {employee.employeeId}
                              </span>
                            </td>
                            <td>
                              <div className="d-flex align-items-center">
                                <div
                                  className="rounded-circle d-flex align-items-center justify-content-center me-2"
                                  style={{
                                    width: "40px",
                                    height: "40px",
                                    backgroundColor: "#8e24aa",
                                    color: "white",
                                    fontSize: "14px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {getInitials(employee.firstName, employee.lastName)}
                                </div>
                                <span>{getFullName(employee.firstName, employee.lastName)}</span>
                              </div>
                            </td>
                            <td>{employee.email}</td>
                            <td>{employee.phone || "N/A"}</td>
                            <td>
                              <span className={`badge ${employee.department === "Designer" ? "badge-success" : "badge-primary"}`}>
                                {employee.department || "N/A"}
                              </span>
                            </td>
                            {period === "daily" ? (
                              <>
                                <td>
                                  {attendance?.markIn ? (
                                    <>
                                      <span className="badge badge-success">
                                        {attendance.markIn.time}
                                      </span>
                                      <br />
                                      <small className="text-success">
                                        ✓ Employee marked in
                                      </small>
                                      <br />
                                      <button
                                        className="btn btn-sm btn-outline-primary mt-1"
                                        onClick={() => handleReMarkIn(employee._id)}
                                      >
                                        Re-mark In
                                      </button>
                                    </>
                                  ) : (
                                    <>
                                      <span className="badge badge-warning">Not Marked</span>
                                      <br />
                                      <small className="text-danger">
                                        ✗ Employee hasn't marked in
                                      </small>
                                      <br />
                                      <button
                                        className="btn btn-sm btn-success mt-1"
                                        onClick={() => handleMarkIn(employee._id)}
                                      >
                                        Mark In
                                      </button>
                                    </>
                                  )}
                                </td>
                                <td>
                                  {attendance?.markOut ? (
                                    <>
                                      <span className="badge badge-success">
                                        {attendance.markOut.time}
                                      </span>
                                      <br />
                                      <small className="text-success">
                                        ✓ Employee marked out
                                      </small>
                                    </>
                                  ) : (
                                    <>
                                      <span className="badge badge-warning">Not Marked</span>
                                      <br />
                                      <small className="text-danger">
                                        ✗ Employee hasn't marked out
                                      </small>
                                      <br />
                                      {attendance?.markIn && (
                                        <button
                                          className="btn btn-sm btn-success mt-1"
                                          onClick={() => handleMarkOut(employee._id)}
                                        >
                                          Mark Out
                                        </button>
                                      )}
                                    </>
                                  )}
                                </td>
                                <td>
                                  {attendance?.totalHours > 0 ? (
                                    <span className="badge badge-info">
                                      {attendance.totalHours.toFixed(2)} hrs
                                    </span>
                                  ) : attendance?.markIn ? (
                                    <span className="text-muted">In Progress</span>
                                  ) : (
                                    <span className="text-muted">-</span>
                                  )}
                                </td>
                                <td>
                                  <div className="d-flex gap-1">
                                    <button
                                      className="btn btn-sm btn-primary"
                                      title="Edit"
                                      style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                    >
                                      <i className="typcn typcn-edit"></i>
                                    </button>
                                    <button
                                      className="btn btn-sm btn-danger"
                                      title="Delete"
                                      style={{ width: "30px", height: "30px", borderRadius: "50%" }}
                                    >
                                      <i className="typcn typcn-delete"></i>
                                    </button>
                                  </div>
                                </td>
                              </>
                            ) : (
                              <>
                                <td>{summary?.totalDays || 0}</td>
                                <td>
                                  <span className="badge badge-success">
                                    {summary?.presentDays || 0}
                                  </span>
                                </td>
                                <td>
                                  <span className="badge badge-danger">
                                    {summary?.absentDays || 0}
                                  </span>
                                </td>
                                <td>
                                  <span className="badge badge-info">
                                    {summary?.totalHours || "0.00"} hrs
                                  </span>
                                </td>
                              </>
                            )}
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Attendance;

