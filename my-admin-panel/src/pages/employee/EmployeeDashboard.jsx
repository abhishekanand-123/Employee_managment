import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EmployeeDashboard.css";

function EmployeeDashboard() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    // Check if employee is logged in
    const token = localStorage.getItem("employeeToken");
    const employeeData = localStorage.getItem("employeeData");

    if (!token || !employeeData) {
      navigate("/employee/login");
      return;
    }

    setEmployee(JSON.parse(employeeData));
    fetchTodayAttendance(token);
    
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Auto-refresh attendance every 30 seconds to update hours
    const attendanceTimer = setInterval(() => {
      if (token) {
        fetchTodayAttendance(token);
      }
    }, 30000);

    return () => {
      clearInterval(timer);
      clearInterval(attendanceTimer);
    };
  }, [navigate]);

  const fetchTodayAttendance = async (token) => {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance/today", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAttendance(res.data.attendance);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleMarkIn = async () => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem("employeeToken");
      const res = await axios.post(
        "http://localhost:5000/api/attendance/mark-in",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert("Marked in successfully at " + res.data.markInTime);
      fetchTodayAttendance(token);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to mark in!");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleMarkOut = async () => {
    setActionLoading(true);
    try {
      const token = localStorage.getItem("employeeToken");
      const res = await axios.post(
        "http://localhost:5000/api/attendance/mark-out",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      alert(`Marked out successfully at ${res.data.markOutTime}! Total hours: ${res.data.totalHours}`);
      fetchTodayAttendance(token);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to mark out!");
      console.error(err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("employeeToken");
    localStorage.removeItem("employeeData");
    navigate("/employee/login");
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="employee-dashboard-container">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // Allow button to be clicked - backend will validate the time
  const canMarkIn = !attendance?.markIn; // Only disable if already marked in
  const canMarkOut = attendance?.markIn && !attendance?.markOut;
  
  // Calculate hours worked in real-time
  const hoursWorked = attendance?.markIn && !attendance?.markOut
    ? Math.max(0, ((new Date() - new Date(attendance.markIn.timestamp)) / (1000 * 60 * 60))).toFixed(2)
    : attendance?.markOut 
      ? attendance.totalHours 
      : 0;

  return (
    <div className="employee-dashboard-container">
      {/* Simple Header */}
      <div className="dashboard-header mb-4">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h4 className="mb-1">Welcome, {employee?.firstName} {employee?.lastName}</h4>
            <p className="text-muted mb-0">
              <i className="mdi mdi-clock me-1"></i>
              {formatTime(currentTime)} • {formatDate(currentTime)}
            </p>
          </div>
          <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
            <i className="mdi mdi-logout me-1"></i>
            Logout
          </button>
        </div>
      </div>

      {/* Mark In and Mark Out Section - Centered */}
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card attendance-main-card">
            <div className="card-body">
              <h5 className="card-title text-center mb-5">
                <i className="mdi mdi-clock-in mdi-24px me-2"></i>
                Mark Your Attendance
              </h5>

              <div className="row">
                {/* Mark In */}
                <div className="col-md-6 mb-4">
                  <div className="attendance-action-card mark-in-card">
                    <div className="text-center mb-3">
                      <h6 className="mb-2">Mark In</h6>
                      {attendance?.markIn ? (
                        <span className="badge bg-success">
                          <i className="mdi mdi-check me-1"></i>
                          Marked at {attendance.markIn.time}
                        </span>
                      ) : (
                        <small className="text-muted d-block">Click to mark in (Any time)</small>
                      )}
                    </div>
                    <button
                      className="btn btn-primary btn-lg w-100"
                      onClick={handleMarkIn}
                      disabled={!canMarkIn || actionLoading}
                      style={{ minHeight: '80px', fontSize: '18px' }}
                    >
                      {actionLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Processing...
                        </>
                      ) : attendance?.markIn ? (
                        <>
                          <i className="mdi mdi-check-circle me-2"></i>
                          Already Marked In
                        </>
                      ) : (
                        <>
                          <i className="mdi mdi-clock-in me-2"></i>
                          Mark In
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Mark Out */}
                <div className="col-md-6 mb-4">
                  <div className="attendance-action-card mark-out-card">
                    <div className="text-center mb-3">
                      <h6 className="mb-2">Mark Out</h6>
                      {attendance?.markOut ? (
                        <span className="badge bg-success">
                          <i className="mdi mdi-check me-1"></i>
                          Marked at {attendance.markOut.time}
                        </span>
                      ) : attendance?.markIn ? (
                        <small className="text-muted d-block">After 9 hours from mark-in</small>
                      ) : (
                        <small className="text-muted d-block">Mark in first</small>
                      )}
                    </div>
                    <button
                      className="btn btn-success btn-lg w-100"
                      onClick={handleMarkOut}
                      disabled={!canMarkOut || actionLoading}
                      style={{ minHeight: '80px', fontSize: '18px' }}
                    >
                      {actionLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Processing...
                        </>
                      ) : attendance?.markOut ? (
                        <>
                          <i className="mdi mdi-check-circle me-2"></i>
                          Already Marked Out
                        </>
                      ) : !attendance?.markIn ? (
                        <>
                          <i className="mdi mdi-alert-circle me-2"></i>
                          Mark In First
                        </>
                      ) : (
                        <>
                          <i className="mdi mdi-clock-out me-2"></i>
                          Mark Out
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Today's Status - Simple */}
              {attendance && (
                <div className="mt-4 pt-4 border-top">
                  <div className="row text-center">
                    <div className="col-md-4">
                      <div className="status-box">
                        <small className="text-muted d-block mb-1">Status</small>
                        <span className={`badge ${attendance.status === 'present' ? 'bg-success' : 'bg-warning'}`} style={{ fontSize: '14px' }}>
                          {attendance.status === 'present' ? 'Present' : 'Absent'}
                        </span>
                      </div>
                    </div>
                    {attendance.markIn && (
                      <div className="col-md-4">
                        <div className="status-box">
                          <small className="text-muted d-block mb-1">Mark In</small>
                          <strong>{attendance.markIn.time}</strong>
                        </div>
                      </div>
                    )}
                    {attendance.markOut ? (
                      <div className="col-md-4">
                        <div className="status-box">
                          <small className="text-muted d-block mb-1">Total Hours</small>
                          <strong className="text-primary">{attendance.totalHours} hrs</strong>
                        </div>
                      </div>
                    ) : attendance.markIn && (
                      <div className="col-md-4">
                        <div className="status-box">
                          <small className="text-muted d-block mb-1">Hours Worked</small>
                          <strong className="text-info">{hoursWorked} hrs</strong>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;

