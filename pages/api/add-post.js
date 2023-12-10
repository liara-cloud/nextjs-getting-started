// api/add-post.js
import connectDB from './db';
import Post from '../../models/Post';
import multer from 'multer';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const upload = multer({ dest: 'public/uploads/' });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    await connectDB();

    try {
      const uploadMiddleware = (req, res) => {
        return new Promise((resolve, reject) => {
          upload.single('image')(req, res, (err) => {
            if (err) reject(err);
            resolve(req.file);
          });
        });
      };

      const result = await uploadMiddleware(req, res);

      if (!result) {
        return res.status(400).json({ message: 'تصویری انتخاب نشده است.' });
      }


      const imageFileName = `${uuidv4()}-${result.originalname}`;      
      await fs.rename(result.path, absoluteImagePath);
      
      const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        image: imageFileName
      });
      
      await newPost.save();

      return res.status(201).json({ message: 'پست با موفقیت ارسال شد.' });
    } catch (error) {
      console.error('Error during post creation:', error);
      return res.status(500).json({ message: 'خطا در ایجاد پست.' });
    }
  }

  return res.status(405).json({ message: 'متد غیر مجاز.' });
}
