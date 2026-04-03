import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import RegistrationForm from '@/components/RegistrationForm';

export default function RegisterPage() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      position: 'relative',
      padding: '4rem 0'
    }}>
      <div className="star-layer"></div>
      
      <RegistrationForm />
    </main>
  );
}
