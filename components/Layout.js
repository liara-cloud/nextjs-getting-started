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
        <p><Link href="https://liara.ir">&copy;</Link> 2023 Liara Blog</p>
      </footer>
    </div>
  );
};

export default Layout;
