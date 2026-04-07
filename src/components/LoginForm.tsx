'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from './AuthProvider';
import styles from './LoginForm.module.css';

export default function LoginForm() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [redirectPending, setRedirectPending] = useState(false);

  // Handle the result of a signInWithRedirect fallback flow.
  // Only runs if the user was sent through the redirect path (flagged in sessionStorage).
  useEffect(() => {
    const flag = sessionStorage.getItem('google_redirect_pending');
    if (!flag) return;

    (async () => {
      setRedirectPending(true);
      try {
        const { getAuth, getRedirectResult } = await import('firebase/auth');
        const { app } = await import('../lib/firebase');
        const auth = getAuth(app);
        const result = await getRedirectResult(auth);
        if (result?.user) {
          sessionStorage.removeItem('google_redirect_pending');
          router.replace('/');
          return;
        }
      } catch (err: unknown) {
        const code = (err as { code?: string }).code;
        setError(mapAuthError(code, err));
      } finally {
        sessionStorage.removeItem('google_redirect_pending');
        setRedirectPending(false);
      }
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Redirect to home if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.replace('/');
    }
  }, [authLoading, user, router]);

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      const {
        getAuth,
        GoogleAuthProvider,
        signInWithPopup,
        signInWithRedirect,
        browserPopupRedirectResolver,
      } = await import('firebase/auth');
      const { app } = await import('../lib/firebase');
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });

      try {
        // Primary path: popup (fast, works when domain is authorized)
        await signInWithPopup(auth, provider, browserPopupRedirectResolver);
        router.replace('/');
        return;
      } catch (popupErr: unknown) {
        const code = (popupErr as { code?: string }).code;
        // Only fall back to redirect if the popup was genuinely blocked
        if (
          code === 'auth/popup-blocked' ||
          code === 'auth/popup-closed-by-user' ||
          code === 'auth/cancelled-popup-request'
        ) {
          if (code === 'auth/popup-blocked') {
            // Popup was blocked — fall back to redirect
            sessionStorage.setItem('google_redirect_pending', 'true');
            await signInWithRedirect(auth, provider);
            // Page navigates away here; component unmounts
            return;
          }
          // User closed the popup — not an error
          setLoading(false);
          return;
        }
        // Any other error (unauthorized-domain, network, etc.) — surface it
        throw popupErr;
      }
    } catch (err: unknown) {
      console.error('Google sign-in error:', err);
      sessionStorage.removeItem('google_redirect_pending');
      const code = (err as { code?: string }).code;
      setError(mapAuthError(code, err));
      setLoading(false);
    }
  };

  const isBusy = loading || redirectPending;

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

      {error && <p className={styles.error}>{error}</p>}

      <motion.button
        className={styles.googleBtn}
        onClick={handleGoogleLogin}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={isBusy}
      >
        <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M47.5 24.5c0-1.6-.1-3.2-.4-4.7H24v9h13.2c-.6 3-2.3 5.5-4.9 7.2v6h7.9c4.6-4.3 7.3-10.6 7.3-17.5z" fill="#4285F4" />
          <path d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.9-6c-2.2 1.5-5 2.3-8 2.3-6.1 0-11.3-4.1-13.2-9.7H2.7v6.2C6.6 42.6 14.8 48 24 48z" fill="#34A853" />
          <path d="M10.8 28.8A14.8 14.8 0 0 1 10 24c0-1.7.3-3.3.8-4.8v-6.2H2.7A23.9 23.9 0 0 0 0 24c0 3.9.9 7.5 2.7 10.8l8.1-6z" fill="#FBBC05" />
          <path d="M24 9.5c3.4 0 6.5 1.2 8.9 3.5l6.6-6.6C35.9 2.4 30.4 0 24 0 14.8 0 6.6 5.4 2.7 13.2l8.1 6.2C12.7 13.6 17.9 9.5 24 9.5z" fill="#EA4335" />
        </svg>
        {redirectPending
          ? 'Completing sign-in...'
          : loading
          ? 'Opening Google...'
          : 'Continue with Google'}
      </motion.button>
    </motion.div>
  );
}

function mapAuthError(code?: string, originalError?: any): string {
  switch (code) {
    case 'auth/unauthorized-domain':
      return 'This domain is not authorized. Please contact the site administrator.';
    case 'auth/operation-not-allowed':
      return 'Google sign-in is not enabled. Please contact support.';
    case 'auth/account-exists-with-different-credential':
      return 'An account already exists with this email using a different sign-in method.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your connection and try again.';
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.';
    case 'auth/user-disabled':
      return 'This account has been disabled. Please contact support.';
    default: {
      const msg = originalError?.message ? ` (${originalError.message})` : '';
      return `Sign-in failed. Please try again.${msg}`;
    }
  }
}
