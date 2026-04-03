'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className={`${styles.container} glass-card`}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <Link href="/" className={styles.backLink}>
        <ArrowLeft size={16} /> Back to Home
      </Link>
      
      <div className={styles.header}>
        <h1 className="heading-display">Welcome Back</h1>
        <p className={styles.subtitle}>Enter the infinite.</p>
      </div>

      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <div className={styles.inputGroup}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="hacker@xinity.dev" required />
        </div>
        
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" placeholder="••••••••" required />
        </div>

        <div className={styles.options}>
          <label className={styles.checkbox}>
            <input type="checkbox" /> Remember me
          </label>
          <a href="#" className={styles.forgot}>Forgot password?</a>
        </div>

        <motion.button 
          className="btn-primary" 
          style={{ width: '100%', marginTop: '1rem', padding: '14px', fontSize: '1.1rem' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {isHovered ? 'Initiate Sequence' : 'Log In'}
        </motion.button>
      </form>

      <div className={styles.footer}>
        Don't have an account? <Link href="/#register">Register here</Link>
      </div>
    </motion.div>
  );
}
