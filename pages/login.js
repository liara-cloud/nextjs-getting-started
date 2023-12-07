import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // ورود موفقیت‌آمیز
        router.push('/');
      } else {
        // نمایش خطا در صورت ورود خطا
        setError(data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('خطا در ارتباط با سرور.');
    }
  };

  return (
    <Layout>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
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
            <button type="submit">Login</button>
          </div>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </Layout>
  );
};

export default Login;
