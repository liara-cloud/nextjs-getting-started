import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('passwords are not match');
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ثبت‌نام موفقیت‌آمیز
        router.push('/login');
      } else {
        // نمایش خطا در صورت ثبت‌نام ناموفق
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('خطا در ارتباط با سرور.');
    }
  };

  return (
    <Layout>
      <div>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmPassword">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </Layout>
  );
};

export default Register;
