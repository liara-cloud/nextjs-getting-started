// pages/index.js

import { useState } from 'react';

export default function Home() {
  const [emailData, setEmailData] = useState({
    to: '',
    subject: '',
    text: '',
  });

  const [successMessage, setSuccessMessage] = useState(null);

  const handleInputChange = (e) => {
    setEmailData({ ...emailData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      if (response.ok) {
        setSuccessMessage('Email sent successfully!');
      } else {
        console.error('Failed to send email:', await response.json());
      }
    } catch (error) {
      console.error('Error sending email:', error.message);
    }
  };

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Send Email</h1>
      <form onSubmit={handleSubmit}>
        <label>
          To:
          <input type="email" name="to" value={emailData.to} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Subject:
          <input type="text" name="subject" value={emailData.subject} onChange={handleInputChange} required />
        </label>
        <br />
        <label>
          Message:
          <textarea name="text" value={emailData.text} onChange={handleInputChange} required />
        </label>
        <br />
        <button type="submit">Send Email</button>
      </form>

      {successMessage && <p style={{ color: 'green', textAlign: 'center', marginTop: '10px' }}>{successMessage}</p>}
    </div>
  );
}
