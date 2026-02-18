import React, { useState, useEffect } from "react";
import axios from "axios";

const LEAVE_TYPE_LABEL = { sick: "Sick Leave", "full-day": "Full Day", "half-day": "Half Day" };
const STATUS_CLASS = { pending: "warning", approved: "success", rejected: "danger" };

function MyLeaveRequests() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem("employeeToken");
      const res = await axios.get("http://localhost:5000/api/leave/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLeaves(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setLeaves([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const formatDate = (d) => {
    if (!d) return "-";
    const date = new Date(d);
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h4 className="mb-4">My Leave Requests</h4>
      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Applied On</th>
                </tr>
              </thead>
              <tbody>
                {leaves.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center text-muted py-4">
                      No leave requests yet.
                    </td>
                  </tr>
                ) : (
                  leaves.map((leave) => (
                    <tr key={leave._id}>
                      <td>{LEAVE_TYPE_LABEL[leave.leaveType] || leave.leaveType}</td>
                      <td>{formatDate(leave.startDate)}</td>
                      <td>{formatDate(leave.endDate)}</td>
                      <td>{leave.reason || "-"}</td>
                      <td>
                        <span className={`badge bg-${STATUS_CLASS[leave.status] || "secondary"}`}>
                          {leave.status}
                        </span>
                        {leave.rejectionReason && (
                          <small className="d-block text-danger mt-1">{leave.rejectionReason}</small>
                        )}
                      </td>
                      <td>{formatDate(leave.createdAt)}</td>
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

export default MyLeaveRequests;
