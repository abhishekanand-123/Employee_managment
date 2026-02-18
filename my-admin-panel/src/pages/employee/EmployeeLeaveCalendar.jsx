import React, { useState, useEffect } from "react";
import axios from "axios";

const LEAVE_TYPE_LABEL = { sick: "Sick", "full-day": "Full Day", "half-day": "Half Day" };
const STATUS_COLOR = { pending: "#ffc107", approved: "#28a745", rejected: "#dc3545" };

function EmployeeLeaveCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  useEffect(() => {
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
    const fetchLeaves = async () => {
      try {
        const token = localStorage.getItem("employeeToken");
        const res = await axios.get(
          `http://localhost:5000/api/leave/my/calendar?start=${start.toISOString()}&end=${end.toISOString()}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setLeaves(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setLeaves([]);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchLeaves();
  }, [year, month]);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startPadding = firstDay === 0 ? 6 : firstDay - 1; // Monday = 0
  const totalCells = Math.ceil((startPadding + daysInMonth) / 7) * 7;

  const getLeaveForDay = (day) => {
    const d = new Date(year, month, day);
    const dateStr = d.toISOString().split("T")[0];
    return leaves.filter((l) => {
      const start = new Date(l.startDate).toISOString().split("T")[0];
      const end = new Date(l.endDate).toISOString().split("T")[0];
      return dateStr >= start && dateStr <= end;
    });
  };

  const prevMonth = () => setCurrentMonth(new Date(year, month - 1));
  const nextMonth = () => setCurrentMonth(new Date(year, month + 1));

  const monthName = currentMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" });

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
      <h4 className="mb-4">Leave Calendar</h4>
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={prevMonth}>
              ← Previous
            </button>
            <h5 className="mb-0">{monthName}</h5>
            <button type="button" className="btn btn-outline-primary btn-sm" onClick={nextMonth}>
              Next →
            </button>
          </div>

          <div className="employee-calendar">
            <div className="calendar-weekdays">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
                <div key={d} className="calendar-weekday">
                  {d}
                </div>
              ))}
            </div>
            <div className="calendar-grid">
              {Array.from({ length: totalCells }, (_, i) => {
                const dayNum = i - startPadding + 1;
                const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth;
                const dayLeaves = isCurrentMonth ? getLeaveForDay(dayNum) : [];
                return (
                  <div
                    key={i}
                    className={`calendar-cell ${isCurrentMonth ? "" : "other-month"}`}
                  >
                    {isCurrentMonth && <span className="calendar-day-num">{dayNum}</span>}
                    {dayLeaves.length > 0 && (
                      <div className="calendar-day-leaves">
                        {dayLeaves.map((l) => (
                          <span
                            key={l._id}
                            className="calendar-leave-dot"
                            style={{
                              backgroundColor: STATUS_COLOR[l.status] || "#6c757d",
                            }}
                            title={`${LEAVE_TYPE_LABEL[l.leaveType]} - ${l.status}`}
                          >
                            {LEAVE_TYPE_LABEL[l.leaveType]}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-3 d-flex flex-wrap gap-3">
            <span>
              <span className="badge me-1" style={{ backgroundColor: STATUS_COLOR.pending }}> </span>
              Pending
            </span>
            <span>
              <span className="badge me-1" style={{ backgroundColor: STATUS_COLOR.approved }}> </span>
              Approved
            </span>
            <span>
              <span className="badge me-1" style={{ backgroundColor: STATUS_COLOR.rejected }}> </span>
              Rejected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeLeaveCalendar;

