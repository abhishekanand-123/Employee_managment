const express = require("express");
const router = express.Router();
const Leave = require("../models/Leave");
const Employee = require("../models/Employee");
const { verifyEmployee } = require("../middleware/authMiddleware");

// Employee: Apply for leave
router.post("/apply", verifyEmployee, async (req, res) => {
  try {
    const { leaveType, startDate, endDate, reason } = req.body;

    if (!leaveType || !startDate || !endDate) {
      return res.status(400).json({
        message: "Leave type, start date and end date are required.",
      });
    }

    const validTypes = ["sick", "full-day", "half-day"];
    if (!validTypes.includes(leaveType)) {
      return res.status(400).json({
        message: "Leave type must be: sick, full-day, or half-day.",
      });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || end < start) {
      return res.status(400).json({
        message: "Invalid start or end date.",
      });
    }

    const leave = new Leave({
      employeeId: req.employeeId,
      leaveType,
      startDate: start,
      endDate: end,
      reason: reason || "",
      status: "pending",
    });
    await leave.save();
    const populated = await Leave.findById(leave._id).populate("employeeId", "firstName lastName email employeeId");
    res.status(201).json({
      message: "Leave request submitted successfully.",
      leave: populated,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit leave request." });
  }
});

// Employee: Get my leave requests
router.get("/my", verifyEmployee, async (req, res) => {
  try {
    const leaves = await Leave.find({ employeeId: req.employeeId })
      .sort({ createdAt: -1 })
      .lean();
    res.json(leaves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch leave requests." });
  }
});

// Employee: Get my leaves for calendar (date range)
router.get("/my/calendar", verifyEmployee, async (req, res) => {
  try {
    const { start, end } = req.query;
    const filter = { employeeId: req.employeeId };
    if (start && end) {
      filter.startDate = { $lte: new Date(end) };
      filter.endDate = { $gte: new Date(start) };
    }
    const leaves = await Leave.find(filter)
      .sort({ startDate: 1 })
      .lean();
    res.json(leaves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch calendar leaves." });
  }
});

module.exports = router;
