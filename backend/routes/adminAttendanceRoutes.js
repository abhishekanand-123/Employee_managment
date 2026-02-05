const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");
const { verifyAdmin } = require("../middleware/authMiddleware");

// Get all employees with attendance (supports daily/monthly/yearly filter)
router.get("/employees-attendance", verifyAdmin, async (req, res) => {
  try {
    const { period, date } = req.query;
    
    // Default to daily if not specified
    const filterPeriod = period || "daily";
    let queryDate = date ? new Date(date) : new Date();
    
    // Validate date
    if (isNaN(queryDate.getTime())) {
      queryDate = new Date();
    }
    
    let dateFilter = {};
    
    if (filterPeriod === "daily") {
      // Get attendance for a specific day
      const dateString = queryDate.toISOString().split('T')[0];
      dateFilter = { date: dateString };
    } else if (filterPeriod === "monthly") {
      // Get attendance for the entire month
      const year = queryDate.getFullYear();
      const month = queryDate.getMonth();
      const startDate = `${year}-${String(month + 1).padStart(2, '0')}-01`;
      // Get last day of the month
      const lastDay = new Date(year, month + 1, 0).getDate();
      const endDate = `${year}-${String(month + 1).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`;
      
      // Find all dates in the month
      const employees = await Employee.find();
      const allAttendance = await Attendance.find({
        date: { $gte: startDate, $lte: endDate }
      });
      
      // Group by employee and calculate summary
      // Only include employees who have attendance records for this period
      const result = employees
        .map(emp => {
          const empAttendance = allAttendance.filter(
            att => att.employeeId.toString() === emp._id.toString()
          );
          
          // If no attendance records for this period, return null (will be filtered out)
          if (empAttendance.length === 0) {
            return null;
          }
          
          const presentDays = empAttendance.filter(att => att.markIn).length;
          const totalHours = empAttendance.reduce((sum, att) => sum + (att.totalHours || 0), 0);
          
          return {
            employee: {
              _id: emp._id,
              firstName: emp.firstName,
              lastName: emp.lastName,
              email: emp.email,
              phone: emp.phone,
              department: emp.department,
              employeeId: emp.employeeId
            },
            summary: {
              totalDays: empAttendance.length,
              presentDays: presentDays,
              absentDays: empAttendance.length - presentDays,
              totalHours: totalHours.toFixed(2)
            },
            attendance: empAttendance
          };
        })
        .filter(item => item !== null); // Remove employees with no attendance data
      
      return res.json({
        period: filterPeriod,
        date: queryDate.toISOString().split('T')[0],
        data: result
      });
    } else if (filterPeriod === "yearly") {
      // Get attendance for the entire year
      const year = queryDate.getFullYear();
      const startDate = `${year}-01-01`;
      const endDate = `${year}-12-31`;
      
      const employees = await Employee.find();
      const allAttendance = await Attendance.find({
        date: { $gte: startDate, $lte: endDate }
      });
      
      // Group by employee and calculate summary
      // Only include employees who have attendance records for this period
      const result = employees
        .map(emp => {
          const empAttendance = allAttendance.filter(
            att => att.employeeId.toString() === emp._id.toString()
          );
          
          // If no attendance records for this period, return null (will be filtered out)
          if (empAttendance.length === 0) {
            return null;
          }
          
          const presentDays = empAttendance.filter(att => att.markIn).length;
          const totalHours = empAttendance.reduce((sum, att) => sum + (att.totalHours || 0), 0);
          
          return {
            employee: {
              _id: emp._id,
              firstName: emp.firstName,
              lastName: emp.lastName,
              email: emp.email,
              phone: emp.phone,
              department: emp.department,
              employeeId: emp.employeeId
            },
            summary: {
              totalDays: empAttendance.length,
              presentDays: presentDays,
              absentDays: empAttendance.length - presentDays,
              totalHours: totalHours.toFixed(2)
            },
            attendance: empAttendance
          };
        })
        .filter(item => item !== null); // Remove employees with no attendance data
      
      return res.json({
        period: filterPeriod,
        date: queryDate.toISOString().split('T')[0],
        data: result
      });
    }
    
    // Daily view - return single day attendance
    const dateString = queryDate.toISOString().split('T')[0];
    const employees = await Employee.find();
    const attendanceRecords = await Attendance.find({ date: dateString });
    
    // Map attendance to employees
    const employeesWithAttendance = employees.map(emp => {
      const attendance = attendanceRecords.find(
        att => att.employeeId.toString() === emp._id.toString()
      );
      
      return {
        employee: {
          _id: emp._id,
          firstName: emp.firstName,
          lastName: emp.lastName,
          email: emp.email,
          phone: emp.phone,
          department: emp.department,
          employeeId: emp.employeeId
        },
        attendance: attendance || null
      };
    });
    
    res.json({
      period: filterPeriod,
      date: dateString,
      data: employeesWithAttendance
    });
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

