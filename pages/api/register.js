import connectDB from './db';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();

    const { username, password, email } = req.body;

    try {
      // چک کردن تکرار نام کاربری یا ایمیل
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        return res.status(400).json({ message: 'نام کاربری یا ایمیل قبلاً استفاده شده است.' });
      }

      // ایجاد یک رمز عبور هش‌شده با استفاده از bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // ثبت نام کاربر جدید
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
      });
      await newUser.save();

      // ارسال ایمیل خوشامدگویی
      await sendWelcomeEmail(email);

      // در اینجا می‌توانید توکن یا سشن را ایجاد کنید و به کاربر اعلام ثبت‌نام موفق
      return res.status(201).json({ message: 'ثبت‌نام موفقیت‌آمیز.' });
    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({ message: 'خطا در ثبت‌نام.' });
    }
  }

  // ارسال درخواست غیر مجاز
  return res.status(405).json({ message: 'متد غیر مجاز.' });
}

async function sendWelcomeEmail(userEmail) {
  // اطلاعات مربوط به ایمیل خود را وارد کنید
  const transporter = nodemailer.createTransport({
    host: 'smtp.c1.liara.email',
    port: 587,
    secure: false,
    auth: {
      user: 'relaxed_edison_ddmlfo',
      pass: '7eb29b13-375b-429c-949d-09a6c0affdcc',
    },
  });

  // محتوای ایمیل خوشامدگویی
  const mailOptions = {
    from: 'info@alinajmabadi.ir',
    to: userEmail,
    subject: 'خوش آمدگویی به وب‌سایت',
    text: 'به وب‌سایت خوش آمدید. امیدواریم که از خدمات ما لذت ببرید.',
  };

  // ارسال ایمیل
  await transporter.sendMail(mailOptions);
}
