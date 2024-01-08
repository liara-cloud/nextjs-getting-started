import connectDB from './db';
import User from '../../models/User';
import bcrypt from 'bcrypt';
<<<<<<< HEAD
import jwt from 'jsonwebtoken';
=======
import nodemailer from 'nodemailer';
>>>>>>> upload-using-s3

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();

    const { username, password, email } = req.body;

    try {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'this username or email already exists' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        password: hashedPassword,
        email,
      });
      await newUser.save();

<<<<<<< HEAD
      // ایجاد توکن با استفاده از JWT
      const token = jwt.sign({ userId: newUser._id, username: newUser.username }, 'your-secret-key', { expiresIn: '1h' });

      // ارسال توکن به کاربر
      return res.status(201).json({ message: 'ثبت‌نام موفقیت‌آمیز.', token });
=======
      await sendWelcomeEmail(email);

      return res.status(201).json({ message: 'signup successfull' });
>>>>>>> upload-using-s3
    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({ message: 'error in signup.' });
    }
  }

  return res.status(405).json({ message: 'forbidden method' });
}

async function sendWelcomeEmail(userEmail) {
  
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: 'Welcome to Liara Blog',
    text: 'Thank you for joining in our blog. to contact us, just reply this email.',
  };

  
  await transporter.sendMail(mailOptions);
}
