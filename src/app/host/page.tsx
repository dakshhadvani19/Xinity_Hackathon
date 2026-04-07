import HostForm from '@/components/HostForm';

export const metadata = {
  title: 'Host a Hackathon — XINITY',
};

export default function HostPage() {
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
      <HostForm />
    </main>
  );
}
