// src/app/components/Header.tsx
import Link from "next/link";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <h1 className="header-logo">My App</h1>
        <nav>
          <ul className="header-nav-links">
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
            <li>
              <Link href="/products">Products</Link>
            </li>
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
