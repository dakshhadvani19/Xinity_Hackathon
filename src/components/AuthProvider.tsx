'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { User } from 'firebase/auth';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  user: null,
  loading: true,
  logout: async () => { },
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    (async () => {
      try {
        const { getAuth, onAuthStateChanged } = await import('firebase/auth');
        const { app } = await import('../lib/firebase');
        const auth = getAuth(app);
        unsubscribe = onAuthStateChanged(auth, (u) => {
          setUser(u);
          setLoading(false);
        });
      } catch {
        // Firebase failed to init — still show the UI (unauthenticated)
        setLoading(false);
      }
    })();

    return () => unsubscribe?.();
  }, []);

  const logout = async () => {
    try {
      const { getAuth, signOut } = await import('firebase/auth');
      const { app } = await import('../lib/firebase');
      const auth = getAuth(app);
      await signOut(auth);
    } catch {
      // silently fail — user stays on the page
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
