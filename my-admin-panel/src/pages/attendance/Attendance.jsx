import React, { useState, useEffect } from "react";
import axios from "axios";
import YearFilter from "./YearFilter";
import MonthFilter from "./MonthFilter";
import DayFilter from "./DayFilter";

function Attendance() {
  // Get today's date as default using local timezone
  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [period, setPeriod] = useState("daily");
  const [selectedDate, setSelectedDate] = useState(getTodayDate());
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  // New filter states
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDay, setSelectedDay] = useState(getTodayDate());

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
      if (response.data && response.data.data) {
        setAttendanceData(response.data.data);
      } else if (Array.isArray(response.data)) {
        setAttendanceData(response.data);
      } else {
        setAttendanceData([]);
      }
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

  // Handler for year filter
  const handleYearChange = (year) => {
    setSelectedYear(year);
    setSelectedMonth(""); // Reset month when year changes
    setSelectedDay(""); // Reset day when year changes
    setPeriod("yearly");
    // Set date to January 1st of the selected year
    const newDate = `${year}-01-01`;
    setSelectedDate(newDate);
  };

  // Handler for month filter
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setSelectedDay(""); // Reset day when month changes
    setPeriod("monthly");
    // Use selected year or current year
    const currentYear = new Date().getFullYear();
    const year = selectedYear || currentYear;
    // Update selectedYear if it wasn't set
    if (!selectedYear) {
      setSelectedYear(currentYear);
    }
    // Set date to the 1st of the selected month
    const monthStr = String(month).padStart(2, "0");
    const newDate = `${year}-${monthStr}-01`;
    setSelectedDate(newDate);
  };

  // Handler for day filter
  const handleDayChange = (day) => {
    setSelectedDay(day);
    setPeriod("daily");
    setSelectedDate(day);
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

              {/* Filter Components */}
              <div className="row mb-4">
                <YearFilter 
                  selectedYear={selectedYear} 
                  onYearChange={handleYearChange} 
                />
                <MonthFilter 
                  selectedMonth={selectedMonth} 
                  onMonthChange={handleMonthChange} 
                />
                <DayFilter 
                  selectedDay={selectedDay} 
                  onDayChange={handleDayChange} 
                />
              </div>
              
              <div className="row mb-4">
                <div className="col-md-12 d-flex justify-content-end">
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

