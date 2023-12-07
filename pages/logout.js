import { useEffect } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

const Logout = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const handleLogout = async () => {
      // اگر کاربر لاگین کرده باشد، خروج انجام می‌شود.
      if (session) {
        await signOut();
      }

      // هدایت کاربر به صفحه اصلی پس از خروج
      router.push('/');
    };

    handleLogout();
  }, [session, router]);

  return <p>Logging out...</p>;
};

export default Logout;
