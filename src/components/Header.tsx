'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Header.module.css';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
    >
      <div className={styles.container}>
        <div className={styles.logo}>
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
              <Link href="/register" className={styles.navLink}>Register</Link>
            </li>
          </ul>
        </nav>

        <div className={styles.actions}>
          <Link href="/login" className="btn-secondary">
            Log In
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
