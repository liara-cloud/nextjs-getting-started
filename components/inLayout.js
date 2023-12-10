// components/Layout.js
import Link from 'next/link';

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <Link href="/dashboard">
            Home
          </Link>{' '}
          |{' '}
          <Link href="/add-post">
            Add Post
          </Link>{' '}
          |{' '}
          <Link href="/logout">
            LogOut
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
