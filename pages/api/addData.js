// pages/api/addData.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    const dbPath = path.join(process.cwd(), 'db', 'mydatabase.db');
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database
    });

    try {
      await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
      res.status(200).json({ message: 'Data added successfully' });
    } catch (error) {
      console.error('Error adding data:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    } finally {
      await db.close();
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
