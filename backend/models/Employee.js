const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  address: String,
  department: String,
  password: String,
  employeeId: { type: String, unique: true }
});

module.exports = mongoose.model("Employee", employeeSchema);
