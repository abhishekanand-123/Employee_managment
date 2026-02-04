const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const jwt = require("jsonwebtoken");

// Middleware to verify employee token
const verifyEmployee = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, "MY_SECRET_KEY");
    req.employeeId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Mark In - Employee can mark in at any time (stored in attendance collection with employee ID)
router.post("/mark-in", verifyEmployee, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5); // HH:MM format

    // Check if already marked in today
    const existingAttendance = await Attendance.findOne({
      employeeId: req.employeeId,
      date: today
    });

    if (existingAttendance && existingAttendance.markIn) {
      return res.status(400).json({
        message: "You have already marked in today!",
        markInTime: existingAttendance.markIn.time
      });
    }

    // Employee can mark in at any time - Store in attendance collection with employee ID
    let attendance;
    
    if (existingAttendance) {
      attendance = existingAttendance;
      attendance.markIn = {
        time: currentTime,
        timestamp: now
      };
      attendance.status = "present";
      await attendance.save(); // Store in database
    } else {
      attendance = new Attendance({
        employeeId: req.employeeId, // Store with employee ID
        date: today,
        markIn: {
          time: currentTime,
          timestamp: now
        },
        status: "present"
      });
      await attendance.save(); // Store in attendance collection
    }

    res.json({
      message: "Marked in successfully!",
      attendance: attendance,
      markInTime: currentTime,
      employeeId: req.employeeId
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to mark in!" });
  }
});

// Mark Out - Employee can mark out after 9 hours
router.post("/mark-out", verifyEmployee, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);

    const attendance = await Attendance.findOne({
      employeeId: req.employeeId,
      date: today
    });

    if (!attendance || !attendance.markIn) {
      return res.status(400).json({
        message: "Please mark in first before marking out!"
      });
    }

    if (attendance.markOut) {
      return res.status(400).json({
        message: "You have already marked out today!",
        markOutTime: attendance.markOut.time
      });
    }

    // Calculate hours worked
    const markInTime = new Date(attendance.markIn.timestamp);
    const hoursWorked = (now - markInTime) / (1000 * 60 * 60); // Convert to hours

    // Check if 9 hours have passed
    const hasWorked9Hours = hoursWorked >= 9;

    if (hasWorked9Hours) {
      attendance.markOut = {
        time: currentTime,
        timestamp: now
      };
      attendance.totalHours = parseFloat(hoursWorked.toFixed(2));
      await attendance.save();

      res.json({
        message: "Marked out successfully!",
        attendance: attendance,
        markOutTime: currentTime,
        totalHours: attendance.totalHours
      });
    } else {
      const remainingHours = (9 - hoursWorked).toFixed(2);
      return res.status(400).json({
        message: `You need to complete 9 hours shift. Remaining: ${remainingHours} hours. Current time: ${currentTime}`,
        hoursWorked: hoursWorked.toFixed(2),
        remainingHours: remainingHours
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to mark out!" });
  }
});

// Get Today's Attendance Status
router.get("/today", verifyEmployee, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];

    const attendance = await Attendance.findOne({
      employeeId: req.employeeId,
      date: today
    });

    if (!attendance) {
      return res.json({
        markedIn: false,
        markedOut: false,
        attendance: null
      });
    }

    res.json({
      markedIn: !!attendance.markIn,
      markedOut: !!attendance.markOut,
      attendance: attendance
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch attendance!" });
  }
});

module.exports = router;

