const nodemailer = require("nodemailer");

// Create transporter - Configure based on your email service
let transporter;

if (process.env.EMAIL_USER && process.env.EMAIL_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
} else {
  console.warn("Email service is not configured. Set EMAIL_USER and EMAIL_PASSWORD in .env file");
}

// Function to send employee credentials
const sendEmployeeCredentials = async ({ email, firstName, lastName, employeeId, userId, password }) => {
  if (!transporter) {
    return {
      success: false,
      error: "Email service is not configured. Please set EMAIL_USER and EMAIL_PASSWORD in .env file"
    };
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your Employee Portal Credentials",
    text: `
Welcome to Employee Portal!

Hello ${firstName} ${lastName},

Your account has been successfully created. Below are your login credentials:

Employee ID: ${employeeId}
User ID: ${userId}
Email: ${email}
Password: ${password}

Important: Please keep these credentials secure and do not share them with anyone.

Login URL: http://localhost:3000/employee/login

Next Steps:
1. Use the credentials above to login to your employee dashboard
2. Mark your attendance daily
3. Complete your 9-hour shift and mark out

This is an automated message. Please do not reply to this email.
    `,
    html: `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .credentials { background: white; padding: 20px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #667eea; }
    .cred-item { margin: 10px 0; }
    .label { font-weight: bold; color: #667eea; }
    .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Welcome to Employee Portal!</h2>
    </div>
    <div class="content">
      <p>Hello <strong>${firstName} ${lastName}</strong>,</p>
      <p>Your account has been successfully created. Below are your login credentials:</p>
      
      <div class="credentials">
        <div class="cred-item"><span class="label">Employee ID:</span> ${employeeId}</div>
        <div class="cred-item"><span class="label">User ID:</span> ${userId}</div>
        <div class="cred-item"><span class="label">Email:</span> ${email}</div>
        <div class="cred-item"><span class="label">Password:</span> ${password}</div>
      </div>
      
      <p><strong>Important:</strong> Please keep these credentials secure and do not share them with anyone.</p>
      
      <div style="text-align: center;">
        <a href="http://localhost:3000/employee/login" class="button">Login to Dashboard</a>
      </div>
      
      <h3>Next Steps:</h3>
      <ul>
        <li>Use the credentials above to login to your employee dashboard</li>
        <li>Mark your attendance daily</li>
        <li>Complete your 9-hour shift and mark out</li>
      </ul>
      
      <div class="footer">
        <p>This is an automated message. Please do not reply to this email.</p>
      </div>
    </div>
  </div>
</body>
</html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      success: true,
      message: "Email sent successfully"
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      success: false,
      error: error.message
    };
  }
};

module.exports = {
  sendEmployeeCredentials
};

