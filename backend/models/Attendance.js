const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  date: {
    type: String,
    required: true,
    default: () => new Date().toISOString().split('T')[0] // YYYY-MM-DD format
  },
  markIn: {
    time: String,
    timestamp: Date
  },
  markOut: {
    time: String,
    timestamp: Date
  },
  totalHours: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ["present", "absent", "half-day"],
    default: "absent"
  }
}, {
  timestamps: true
});

// Ensure one attendance record per employee per day
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("Attendance", attendanceSchema);

