const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Admin Routes
app.use("/api/admin", require("./routes/adminAuth"));

// Employee Routes
app.use("/api/employees", require("./routes/employeeRoutes"));

// Attendance Routes (for employees)
app.use("/api/attendance", require("./routes/attendanceRoutes"));

// Admin Attendance Routes (for admin to manage attendance)
app.use("/api/admin/attendance", require("./routes/adminAttendanceRoutes"));

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/admin_portal")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
