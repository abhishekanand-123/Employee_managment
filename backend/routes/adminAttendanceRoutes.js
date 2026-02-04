const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");
const { verifyAdmin } = require("../middleware/authMiddleware");

// Get all employees with today's attendance
router.get("/employees-attendance", verifyAdmin, async (req, res) => {
  try {
    const today = new Date().toISOString().split('T')[0];
    
    const employees = await Employee.find();
    const attendanceRecords = await Attendance.find({ date: today });
    
    // Map attendance to employees
    const employeesWithAttendance = employees.map(emp => {
      const attendance = attendanceRecords.find(
        att => att.employeeId.toString() === emp._id.toString()
      );
      
      return {
        ...emp.toObject(),
        attendance: attendance || null
      };
    });
    
    res.json(employeesWithAttendance);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch employees attendance!" });
  }
});

// Admin manually mark in employee
router.post("/mark-in/:employeeId", verifyAdmin, async (req, res) => {
  try {
    const { employeeId } = req.params;
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found!" });
    }

    const existingAttendance = await Attendance.findOne({
      employeeId: employeeId,
      date: today
    });

    if (existingAttendance && existingAttendance.markIn) {
      return res.status(400).json({
        message: "Employee already marked in today!",
        markInTime: existingAttendance.markIn.time
      });
    }

    let attendance;
    if (existingAttendance) {
      attendance = existingAttendance;
      attendance.markIn = {
        time: currentTime,
        timestamp: now
      };
      attendance.status = "present";
      await attendance.save();
    } else {
      attendance = new Attendance({
        employeeId: employeeId,
        date: today,
        markIn: {
          time: currentTime,
          timestamp: now
        },
        status: "present"
      });
      await attendance.save();
    }

    res.json({
      message: "Employee marked in successfully by admin!",
      attendance: attendance,
      markInTime: currentTime,
      employee: {
        name: `${employee.firstName} ${employee.lastName}`,
        employeeId: employee.employeeId
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to mark in employee!" });
  }
});

// Admin manually mark out employee
router.post("/mark-out/:employeeId", verifyAdmin, async (req, res) => {
  try {
    const { employeeId } = req.params;
    const today = new Date().toISOString().split('T')[0];
    const now = new Date();
    const currentTime = now.toTimeString().split(' ')[0].substring(0, 5);

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found!" });
    }

    const attendance = await Attendance.findOne({
      employeeId: employeeId,
      date: today
    });

    if (!attendance || !attendance.markIn) {
      return res.status(400).json({
        message: "Employee has not marked in today. Please mark in first!"
      });
    }

    if (attendance.markOut) {
      return res.status(400).json({
        message: "Employee already marked out today!",
        markOutTime: attendance.markOut.time
      });
    }

    // Calculate hours worked
    const markInTime = new Date(attendance.markIn.timestamp);
    const hoursWorked = (now - markInTime) / (1000 * 60 * 60);

    // Check if 9 hours have been completed
    const hasWorked9Hours = hoursWorked >= 9;
    
    if (!hasWorked9Hours) {
      const remainingHours = (9 - hoursWorked).toFixed(2);
      return res.status(400).json({
        message: `Employee needs to complete 9 hours shift. Currently worked: ${hoursWorked.toFixed(2)} hours. Remaining: ${remainingHours} hours.`,
        hoursWorked: hoursWorked.toFixed(2),
        remainingHours: remainingHours,
        markInTime: attendance.markIn.time
      });
    }

    attendance.markOut = {
      time: currentTime,
      timestamp: now
    };
    attendance.totalHours = parseFloat(hoursWorked.toFixed(2));
    await attendance.save();

    res.json({
      message: "Employee marked out successfully by admin!",
      attendance: attendance,
      markOutTime: currentTime,
      totalHours: attendance.totalHours,
      employee: {
        name: `${employee.firstName} ${employee.lastName}`,
        employeeId: employee.employeeId
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to mark out employee!" });
  }
});

module.exports = router;

