// pages/index.js
import { useState, useEffect } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await fetch('/api/database');
    const data = await response.json();
    setUsers(data.users);
  };

  const handleAddData = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/database', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email }),
    });
    const data = await response.json();
    setMessage(data.message);
    fetchUsers();
    setName('');
    setEmail('');
  };

  return (
    <div>
      <h1>SQLite Database Operations</h1>
      <form onSubmit={handleAddData}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit">Add Data</button>
      </form>
      {message && <p>{message}</p>}
      <h2>Users</h2>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <strong>Name:</strong> {user.name}, <strong>Email:</strong> {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
