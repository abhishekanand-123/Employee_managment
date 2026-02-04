const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");

// REGISTER ADMIN – Only once allowed
router.post("/register", async (req, res) => {
  const existingAdmin = await Admin.findOne();

  if (existingAdmin) {
    return res.status(400).json({
      message: "Registration closed. Admin already exists!"
    });
  }

  const admin = new Admin(req.body);
  await admin.save();

  res.json({ message: "Admin registered successfully!" });
});

// LOGIN ADMIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email, password });

  if (!admin) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  // Generate a token
  const token = jwt.sign(
    { id: admin._id, email: admin.email },
    "MY_SECRET_KEY",
    { expiresIn: "1d" }
  );

  res.json({
    message: "Login successful",
    token: token,
    admin: admin,
  });
});

module.exports = router;
