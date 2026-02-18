const jwt = require("jsonwebtoken");

// Middleware to verify admin token
const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided. Admin access required." });
  }

  try {
    const decoded = jwt.verify(token, "MY_SECRET_KEY");
    req.adminId = decoded.id;
    req.adminEmail = decoded.email;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token. Admin access required." });
  }
};

// Middleware to verify employee token
const verifyEmployee = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, "MY_SECRET_KEY");
    req.employeeId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = {
  verifyAdmin,
  verifyEmployee,
};

