// pages/logout.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      router.push('/'); // هدایت به صفحه اصلی
    };

    handleLogout();
  }, [router]);

  return <p>Logging out...</p>;
};

export default Logout;
