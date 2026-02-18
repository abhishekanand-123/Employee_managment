import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LEAVE_TYPES = [
  { value: "sick", label: "Sick Leave" },
  { value: "full-day", label: "Full Day Leave" },
  { value: "half-day", label: "Half Day Leave" },
];

function AddLeave() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    leaveType: "sick",
    startDate: "",
    endDate: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "startDate" && value && (!form.endDate || form.endDate < value)) {
      setForm((prev) => ({ ...prev, endDate: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.startDate || !form.endDate) {
      alert("Please select start and end date.");
      return;
    }
    const token = localStorage.getItem("employeeToken");
    if (!token) {
      alert("You are not logged in as employee. Please log in from the Employee Login page.");
      navigate("/employee/login");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/leave/apply",
        {
          leaveType: form.leaveType,
          startDate: form.startDate,
          endDate: form.endDate,
          reason: form.reason,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Leave request submitted successfully!");
      setForm({ leaveType: "sick", startDate: "", endDate: "", reason: "" });
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("employeeToken");
        localStorage.removeItem("employeeData");
        alert("Session expired or invalid. Please log in again as employee.");
        navigate("/employee/login");
        return;
      }
      alert(err.response?.data?.message || "Failed to submit leave request.");
    } finally {
      setLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div>
      <h4 className="mb-4">Apply for Leave</h4>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Leave Type</label>
              <select
                name="leaveType"
                className="form-select"
                value={form.leaveType}
                onChange={handleChange}
                required
              >
                {LEAVE_TYPES.map((t) => (
                  <option key={t.value} value={t.value}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Start Date</label>
                <input
                  type="date"
                  name="startDate"
                  className="form-control"
                  value={form.startDate}
                  onChange={handleChange}
                  min={today}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">End Date</label>
                <input
                  type="date"
                  name="endDate"
                  className="form-control"
                  value={form.endDate}
                  onChange={handleChange}
                  min={form.startDate || today}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Reason (optional)</label>
              <textarea
                name="reason"
                className="form-control"
                rows={3}
                value={form.reason}
                onChange={handleChange}
                placeholder="Brief reason for leave"
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Submitting..." : "Submit Leave Request"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddLeave;
