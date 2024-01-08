<<<<<<< HEAD
import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Logout = () => {
  const { data: session } = useSession();
=======
// pages/logout.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

const Logout = () => {
>>>>>>> upload-using-s3
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
<<<<<<< HEAD
      // اگر کاربر لاگین کرده باشد، خروج انجام می‌شود.
      if (session) {
        await signOut();
      }

      // هدایت کاربر به صفحه اصلی پس از خروج
      router.push('/');
    };

    handleLogout();
  }, [session, router]);
=======
      router.push('/'); // هدایت به صفحه اصلی
    };

    handleLogout();
  }, [router]);
>>>>>>> upload-using-s3

  return <p>Logging out...</p>;
};

export default Logout;
