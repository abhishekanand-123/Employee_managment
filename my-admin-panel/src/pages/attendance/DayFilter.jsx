import React from "react";

function DayFilter({ selectedDay, onDayChange }) {
  // Get today's date in YYYY-MM-DD format using local timezone
  const getTodayString = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const todayString = getTodayString();

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    if (selectedDate) {
      // Allow dates up to today (including today)
      if (selectedDate <= todayString) {
        if (onDayChange) {
          onDayChange(selectedDate);
        }
      } else {
        // If user tries to select future date, show alert and don't update
        alert("Please select a date up to today. Future dates are not available.");
        e.target.value = selectedDay || "";
      }
    }
  };

  return (
    <div className="col-md-4 mb-3">
      <label className="form-label">Daily Filter</label>
      <input
        type="date"
        className="form-control"
        value={selectedDay}
        onChange={handleDateChange}
        max={todayString}
        min="2025-01-01"
      />
      <small className="form-text text-muted">
        Only dates up to today are available (Today: {todayString})
      </small>
    </div>
  );
}

export default DayFilter;

