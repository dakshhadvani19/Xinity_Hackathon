'use client';

import { AuthProvider } from '../components/AuthProvider';
import Header from '../components/Header';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <Header />
      {children}
    </AuthProvider>
  );
}
