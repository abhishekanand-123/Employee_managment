import React from "react";

function YearFilter({ selectedYear, onYearChange }) {
  // Generate years from 2025 to 3000
  const years = [];
  for (let year = 2025; year <= 3000; year++) {
    years.push(year);
  }

  return (
    <div className="col-md-4 mb-3">
      <label className="form-label">Yearly Filter</label>
      <select
        className="form-select"
        value={selectedYear}
        onChange={(e) => {
          const year = parseInt(e.target.value);
          if (year && onYearChange) {
            onYearChange(year);
          }
        }}
      >
        <option value="">Select Year</option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </div>
  );
}

export default YearFilter;

