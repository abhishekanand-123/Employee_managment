const express = require("express");
const router = express.Router();
const Leave = require("../models/Leave");
const Employee = require("../models/Employee");
const { verifyAdmin } = require("../middleware/authMiddleware");

// Admin: Get all leave requests (for list and approval)
router.get("/requests", verifyAdmin, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};
    const leaves = await Leave.find(filter)
      .populate("employeeId", "firstName lastName email employeeId department")
      .sort({ createdAt: -1 })
      .lean();
    res.json(leaves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch leave requests." });
  }
});

// Admin: Approve leave
router.patch("/:id/approve", verifyAdmin, async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: "Leave request not found." });
    }
    if (leave.status !== "pending") {
      return res.status(400).json({ message: "Leave request is already processed." });
    }
    leave.status = "approved";
    leave.approvedBy = req.adminId;
    leave.approvedAt = new Date();
    await leave.save();
    const populated = await Leave.findById(leave._id)
      .populate("employeeId", "firstName lastName email employeeId");
    res.json({ message: "Leave approved.", leave: populated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to approve leave." });
  }
});

// Admin: Reject leave
router.patch("/:id/reject", verifyAdmin, async (req, res) => {
  try {
    const { rejectionReason } = req.body || {};
    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.status(404).json({ message: "Leave request not found." });
    }
    if (leave.status !== "pending") {
      return res.status(400).json({ message: "Leave request is already processed." });
    }
    leave.status = "rejected";
    leave.approvedBy = req.adminId;
    leave.approvedAt = new Date();
    leave.rejectionReason = rejectionReason || "";
    await leave.save();
    const populated = await Leave.findById(leave._id)
      .populate("employeeId", "firstName lastName email employeeId");
    res.json({ message: "Leave rejected.", leave: populated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to reject leave." });
  }
});

// Admin: Get all leaves for calendar (date range, all employees)
router.get("/calendar", verifyAdmin, async (req, res) => {
  try {
    const { start, end } = req.query;
    const filter = {};
    if (start && end) {
      filter.startDate = { $lte: new Date(end) };
      filter.endDate = { $gte: new Date(start) };
    }
    const leaves = await Leave.find(filter)
      .populate("employeeId", "firstName lastName employeeId")
      .sort({ startDate: 1 })
      .lean();
    res.json(leaves);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch calendar leaves." });
  }
});

module.exports = router;
