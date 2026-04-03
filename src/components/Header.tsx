'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <div className={styles.logoMark}>X</div>
          <Link href="/">
            <span className={styles.logoText}>XINITY</span>
          </Link>
        </div>

        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link href="/#rules" className={styles.navLink}>Rules</Link>
            </li>
            <li>
              <Link href="/#challenge" className={styles.navLink}>Challenge</Link>
            </li>
            <li>
              <Link href="/#contact" className={styles.navLink}>Contact</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="/login" className="btn-secondary">
            Log In
          </Link>
          <Link href="/register" className="btn-primary">
            Register →
          </Link>
        </div>
      </div>
    </header>
  );
}
