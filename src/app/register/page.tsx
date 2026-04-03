import RegistrationForm from '@/components/RegistrationForm';

export const metadata = {
  title: 'Register — XINITY Hackathon',
};

export default function RegisterPage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-subtle)',
      position: 'relative',
      padding: '6rem 0 4rem',
    }}>
      <RegistrationForm />
    </main>
  );
}
