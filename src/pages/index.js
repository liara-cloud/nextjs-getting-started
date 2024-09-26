import { useState } from 'react';
import styles from '@/styles/Home.module.css'; // Importing CSS module for styling

export default function Home() {
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendTestEmail = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
      });

      if (res.status === 200) {
        setEmailSent(true);
      } else {
        console.error('Failed to send email');
      }
    } catch (err) {
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Send Test Email</h1>
      <p className={styles.description}>
        Click the button below to send a test email using SMTP.
      </p>
      <button
        className={`${styles.button} ${loading ? styles.loading : ''}`}
        onClick={sendTestEmail}
        disabled={loading}
      >
        {loading ? 'Sending...' : 'Send Email'}
      </button>
      {emailSent && <p className={styles.successMessage}>Email successfully sent!</p>}
    </div>
  );
}
