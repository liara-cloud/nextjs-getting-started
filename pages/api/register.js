import connectDB from './db';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();

    const { username, password } = req.body;

    try {
      // چک کردن تکرار نام کاربری
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: 'نام کاربری قبلاً استفاده شده است.' });
      }

      // ایجاد یک رمز عبور هش‌شده با استفاده از bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);

      // ثبت نام کاربر جدید
      const newUser = new User({
        username,
        password: hashedPassword,
      });
      await newUser.save();

      // ایجاد توکن با استفاده از JWT
      const token = jwt.sign({ userId: newUser._id, username: newUser.username }, 'your-secret-key', { expiresIn: '1h' });

      // ارسال توکن به کاربر
      return res.status(201).json({ message: 'ثبت‌نام موفقیت‌آمیز.', token });
    } catch (error) {
      console.error('Error during registration:', error);
      return res.status(500).json({ message: 'خطا در ثبت‌نام.' });
    }
  }

  // ارسال درخواست غیر مجاز
  return res.status(405).json({ message: 'متد غیر مجاز.' });
}
