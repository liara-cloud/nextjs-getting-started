import connectDB from './db';
import User from '../../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();

    const { username, password } = req.body;

    try {
      const user = await User.findOne({ username });

      if (!user) {
        return res.status(401).json({ message: 'user not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'password invalid.' });
      }

      // ایجاد توکن با استفاده از JWT
      const token = jwt.sign({ userId: user._id, username: user.username }, 'your-secret-key', { expiresIn: '1h' });

      // ارسال توکن به کاربر به عنوان اطلاعیه ورود موفق
      return res.status(200).json({ message: 'success login.', token });
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'error in login.' });
    }
  }

  // ارسال درخواست غیر مجاز
  return res.status(405).json({ message: 'unexpected method bro' });
}
