import nodemailer from 'nodemailer';

// This function will handle the email sending process
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests are allowed' });
  }

  // Create reusable transporter object using the SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: false, // true for 465, false for 587 (we're using STARTTLS here)
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  // Email options
  const mailOptions = {
    from: `"My App" <${process.env.MAIL_FROM}>`, // sender address
    to: 'test@example.com', // list of receivers
    subject: 'Test Email', // Subject line
    text: 'This is a test email sent from a Next.js API route!', // plain text body
    html: '<b>This is a test email sent from a Next.js API route!</b>', // html body
    headers: {
        "x-liara-tag": "test_email", // Tags 
      },
  };

  // Try to send the email
  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent!', info });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error: error.message });
  }
}
