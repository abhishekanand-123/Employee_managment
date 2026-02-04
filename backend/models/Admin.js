const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  country: String
});

module.exports = mongoose.model("Admin", AdminSchema);
