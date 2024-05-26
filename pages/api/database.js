// pages/api/database.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';

export default async function handler(req, res) {
  const dbPath = path.join(process.cwd(), 'db', 'mydatabase.db');
  const dbExists = await checkDatabaseExists(dbPath);

  if (!dbExists && req.method !== 'POST') {
    return res.status(200).json({ message: 'Database not created yet', users: [] });
  }

  if (req.method === 'POST' && !dbExists) {
    await createDatabase(dbPath);
  }

  if (req.method === 'GET') {
    const users = await getUsersFromDatabase(dbPath);
    res.status(200).json({ users });
  } else if (req.method === 'POST') {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: 'Name and email are required' });
    }

    try {
      const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
      });
      await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          email TEXT NOT NULL
        )
      `);
      await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
      await db.close();
      res.status(200).json({ message: 'Data added successfully' });
    } catch (error) {
      console.error('Error adding data:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}

async function checkDatabaseExists(dbPath) {
  const fs = require('fs');
  return fs.existsSync(dbPath);
}

async function createDatabase(dbPath) {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  try {
    await db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL
      )
    `);
  } catch (error) {
    console.error('Error creating database:', error.message);
  } finally {
    await db.close();
  }
}

async function getUsersFromDatabase(dbPath) {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  try {
    const users = await db.all('SELECT * FROM users');
    return users;
  } catch (error) {
    console.error('Error fetching users:', error.message);
    return [];
  } finally {
    await db.close();
  }
}
