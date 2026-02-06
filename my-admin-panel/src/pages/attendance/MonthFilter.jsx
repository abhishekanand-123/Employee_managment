import React from "react";

function MonthFilter({ selectedMonth, onMonthChange }) {
  const months = [
    { value: 1, label: "January" },
    { value: 2, label: "February" },
    { value: 3, label: "March" },
    { value: 4, label: "April" },
    { value: 5, label: "May" },
    { value: 6, label: "June" },
    { value: 7, label: "July" },
    { value: 8, label: "August" },
    { value: 9, label: "September" },
    { value: 10, label: "October" },
    { value: 11, label: "November" },
    { value: 12, label: "December" },
  ];

  return (
    <div className="col-md-4 mb-3">
      <label className="form-label">Monthly Filter</label>
      <select
        className="form-select"
        value={selectedMonth}
        onChange={(e) => {
          const month = parseInt(e.target.value);
          if (month && onMonthChange) {
            onMonthChange(month);
          }
        }}
      >
        <option value="">Select Month</option>
        {months.map((month) => (
          <option key={month.value} value={month.value}>
            {month.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MonthFilter;

