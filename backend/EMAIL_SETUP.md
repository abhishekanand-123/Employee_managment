# Email Setup Instructions

## Overview
The system automatically sends credentials to employees when they are added. To enable email functionality, you need to configure email settings.

## Setup Steps

### For Gmail Users:

1. **Enable 2-Step Verification**
   - Go to your Google Account settings
   - Navigate to Security
   - Enable 2-Step Verification

2. **Generate App Password**
   - Go to Google Account > Security
   - Under "2-Step Verification", click "App passwords"
   - Select "Mail" and "Other (Custom name)"
   - Enter "Employee Management System" as the name
   - Click "Generate"
   - Copy the 16-character password

3. **Configure Environment Variables**
   - Create a `.env` file in the `backend` folder (if it doesn't exist)
   - Add the following:
     ```
     EMAIL_USER=your-email@gmail.com
     EMAIL_PASSWORD=your-16-character-app-password
     ```

### For Other Email Services:

1. **Outlook/Hotmail**
   - Use the same setup as Gmail
   - Service will be automatically detected

2. **Yahoo**
   - Use the same setup as Gmail
   - Service will be automatically detected

3. **Custom SMTP**
   - Modify `backend/utils/emailService.js` to use custom SMTP settings

## Testing Email

1. Install dependencies (if not already installed):
   ```bash
   cd backend
   npm install nodemailer dotenv
   ```

2. Add an employee through the admin panel
3. Check the console for email status
4. Check the employee's email inbox

## Troubleshooting

- **"Email service is not configured"**: Set EMAIL_USER and EMAIL_PASSWORD in .env file
- **"Invalid login"**: Check your email and password are correct
- **"Less secure app access"**: For Gmail, use App Password instead of regular password
- **Email not received**: Check spam folder, verify email address is correct

## Note

If email is not configured, the system will still add employees successfully but will show a warning that email could not be sent. The admin can still manually send credentials to employees.

