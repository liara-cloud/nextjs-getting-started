import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed', message: 'Only POST requests are allowed' });
  }

  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: 'Bad Request', message: 'Missing required parameters' });
  }

  // Create a nodemailer transporter using your SMTP credentials
  const transporter = nodemailer.createTransport({
    host: 'smtp.c1.liara.email',
    port: 587,
    secure: false,
    auth: {
      user: 'xenodochial_ellis_6rrt96',
      pass: '9f6e2aed-2e10-436c-b367-d061ddfcc925',
    },
  });

  try {
    // Send email
    const info = await transporter.sendMail({
      from: 'info@alinajmabadi.ir',
      to,
      subject,
      text,
    });

    console.log('Email sent:', info.messageId);
    return res.status(200).json({ success: true, messageId: info.messageId });
  } catch (error) {
    console.error('Error sending email:', error.message);
    return res.status(500).json({ error: 'Internal Server Error', message: 'Failed to send email' });
  }
}
