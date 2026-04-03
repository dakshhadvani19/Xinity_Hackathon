import LoginForm from '../../components/LoginForm';

export const metadata = {
  title: 'Log In — XINITY Hackathon',
};

export default function LoginPage() {
  return (
    <main style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-subtle)',
      position: 'relative',
    }}>
      <LoginForm />
    </main>
  );
}
