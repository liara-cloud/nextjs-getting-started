// components/Layout.js
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <Link href="/">
            Home
          </Link>{' '}
          |{' '}
          <Link href="/login">
            Login
          </Link>{' '}
          |{' '}
          <Link href="/register">
            Register
          </Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <p>&copy; 2023 Liara Blog</p>
      </footer>
    </div>
  );
};

export default Layout;
