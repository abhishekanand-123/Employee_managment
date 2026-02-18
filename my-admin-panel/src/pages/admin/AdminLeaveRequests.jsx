import React, { useState, useEffect } from "react";
import axios from "axios";

const LEAVE_TYPE_LABEL = { sick: "Sick Leave", "full-day": "Full Day", "half-day": "Half Day" };
const STATUS_CLASS = { pending: "warning", approved: "success", rejected: "danger" };

function AdminLeaveRequests() {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(""); // '' | 'pending' | 'approved' | 'rejected'
  const [rejectReason, setRejectReason] = useState({});
  const [actionLoading, setActionLoading] = useState({});

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = filter
        ? `http://localhost:5000/api/admin/leave/requests?status=${filter}`
        : "http://localhost:5000/api/admin/leave/requests";
      const res = await axios.get(url, {
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
  }, [filter]);

  const handleApprove = async (id) => {
    setActionLoading((p) => ({ ...p, [id]: true }));
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/admin/leave/${id}/approve`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Leave approved.");
      fetchLeaves();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to approve.");
    } finally {
      setActionLoading((p) => ({ ...p, [id]: false }));
    }
  };

  const handleReject = async (id) => {
    const reason = rejectReason[id] || "";
    if (!window.confirm("Reject this leave request?")) return;
    setActionLoading((p) => ({ ...p, [id]: true }));
    try {
      const token = localStorage.getItem("token");
      await axios.patch(
        `http://localhost:5000/api/admin/leave/${id}/reject`,
        { rejectionReason: reason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Leave rejected.");
      setRejectReason((p) => ({ ...p, [id]: "" }));
      fetchLeaves();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reject.");
    } finally {
      setActionLoading((p) => ({ ...p, [id]: false }));
    }
  };

  const formatDate = (d) => {
    if (!d) return "-";
    return new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  const getEmployeeName = (emp) => {
    if (!emp) return "-";
    return `${emp.firstName || ""} ${emp.lastName || ""}`.trim() || emp.email;
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
      <h4 className="card-title mb-4">Leave Requests</h4>
      <p className="card-description">Approve or reject employee leave requests.</p>

      <div className="row mb-4">
        <div className="col-md-4">
          <select
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light">
                <tr>
                  <th>Employee</th>
                  <th>ID</th>
                  <th>Leave Type</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="text-center text-muted py-4">
                      No leave requests.
                    </td>
                  </tr>
                ) : (
                  leaves.map((leave) => (
                    <tr key={leave._id}>
                      <td>{getEmployeeName(leave.employeeId)}</td>
                      <td>{leave.employeeId?.employeeId || "-"}</td>
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
                      <td>
                        {leave.status === "pending" && (
                          <div className="d-flex gap-1 flex-wrap align-items-center">
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => handleApprove(leave._id)}
                              disabled={actionLoading[leave._id]}
                            >
                              Approve
                            </button>
                            <input
                              type="text"
                              className="form-control form-control-sm"
                              style={{ width: "120px" }}
                              placeholder="Reject reason"
                              value={rejectReason[leave._id] || ""}
                              onChange={(e) =>
                                setRejectReason((p) => ({ ...p, [leave._id]: e.target.value }))
                              }
                            />
                            <button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleReject(leave._id)}
                              disabled={actionLoading[leave._id]}
                            >
                              Reject
                            </button>
                          </div>
                        )}
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

export default AdminLeaveRequests;
