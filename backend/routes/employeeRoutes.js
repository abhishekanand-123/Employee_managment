const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");
const { sendEmployeeCredentials } = require("../utils/emailService");
const { verifyAdmin } = require("../middleware/authMiddleware");

// Add Employee API - Only Admin can add employees
router.post("/add", verifyAdmin, async (req, res) => {
  try {
    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email: req.body.email });
    if (existingEmployee) {
      return res.status(400).json({ 
        message: "Employee with this email already exists!",
        error: "DUPLICATE_EMAIL",
        email: req.body.email
      });
    }

    const count = await Employee.countDocuments();
    let employeeId = "EMP" + String(count + 1).padStart(3, "0");

    // Check if employeeId already exists (shouldn't happen, but just in case)
    const existingId = await Employee.findOne({ employeeId });
    if (existingId) {
      // If ID exists, find the next available ID
      let counter = count + 2;
      while (await Employee.findOne({ employeeId })) {
        employeeId = "EMP" + String(counter).padStart(3, "0");
        counter++;
      }
    }

    const employee = new Employee({ ...req.body, employeeId });
    await employee.save();

    // Prepare credentials message
    const credentialsMessage = {
      message: "Employee added successfully!",
      employee: employee,
      credentials: {
        employeeId: employee.employeeId,
        userId: employee._id,
        email: employee.email,
        password: req.body.password,
        message: `Your Employee ID is: ${employee.employeeId}, User ID is: ${employee._id}, and Password is: ${req.body.password}`
      }
    };

    // Send email to employee with credentials
    try {
      const emailResult = await sendEmployeeCredentials({
        email: employee.email,
        firstName: employee.firstName,
        lastName: employee.lastName,
        employeeId: employee.employeeId,
        userId: employee._id.toString(),
        password: req.body.password
      });

      if (emailResult.success) {
        credentialsMessage.emailSent = true;
        credentialsMessage.emailMessage = "Credentials email sent successfully to employee!";
      } else {
        credentialsMessage.emailSent = false;
        credentialsMessage.emailMessage = "Employee added but email could not be sent: " + emailResult.error;
        console.error("Email sending failed:", emailResult.error);
      }
    } catch (emailError) {
      credentialsMessage.emailSent = false;
      credentialsMessage.emailMessage = "Employee added but email could not be sent: " + emailError.message;
      console.error("Email sending error:", emailError);
    }

    res.json(credentialsMessage);
  } catch (err) {
    console.log(err);
    
    // Handle MongoDB duplicate key error
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern)[0];
      const value = err.keyValue[field];
      
      if (field === 'email') {
        return res.status(400).json({ 
          message: `Employee with email "${value}" already exists!`,
          error: "DUPLICATE_EMAIL",
          email: value
        });
      } else if (field === 'employeeId') {
        return res.status(400).json({ 
          message: `Employee ID "${value}" already exists!`,
          error: "DUPLICATE_EMPLOYEE_ID"
        });
      }
      
      return res.status(400).json({ 
        message: `Duplicate entry: ${field} "${value}" already exists!`,
        error: "DUPLICATE_KEY"
      });
    }
    
    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        message: "Validation error",
        errors: errors
      });
    }
    
    // Generic error
    res.status(500).json({ 
      message: "Failed to add employee!",
      error: err.message 
    });
  }
});

// Employee Login API
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email, password });

    if (!employee) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a token
    const token = jwt.sign(
      { id: employee._id, email: employee.email, role: "employee" },
      "MY_SECRET_KEY",
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful",
      token: token,
      employee: {
        _id: employee._id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        employeeId: employee.employeeId,
        department: employee.department
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed!" });
  }
});

// Get All Employees API
router.get("/all", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch employees!" });
  }
});

// Get Single Employee by ID
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found!" });
    }
    res.json(employee);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to fetch employee!" });
  }
});

// Update Employee API
router.put("/update/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!employee) {
      return res.status(404).json({ message: "Employee not found!" });
    }
    res.json({ message: "Employee updated successfully!", employee });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to update employee!" });
  }
});

// Delete Employee API
router.delete("/delete/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found!" });
    }
    res.json({ message: "Employee deleted successfully!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete employee!" });
  }
});

module.exports = router;
