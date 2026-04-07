'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from './AuthProvider';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { user, loading, logout } = useAuth();

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
          <div className={styles.logoGroup}>
            <div className={styles.logoTextWrap}>
              <span className={styles.logoX}>X</span>
              <span className={styles.logoIni}>INITY</span>
            </div>
            <span className={styles.logoSub}>Hackathon Community</span>
          </div>
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
              <Link href="/host" className={styles.navLink}>Host</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          {!loading && (
            user ? (
              <button onClick={logout} className="btn-secondary">
                Log Out
              </button>
            ) : (
              <Link href="/login" className="btn-secondary">
                Log In
              </Link>
            )
          )}
          <Link href="/register" className="btn-primary">
            Register →
          </Link>
        </div>
      </div>
    </header>
  );
}
