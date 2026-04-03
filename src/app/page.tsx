import Hero from '../components/Hero';
import EventCarousel from '../components/EventCarousel';
import InfoSection from '../components/InfoSection';
import ChallengeIllustration from '../components/ChallengeIllustration';

export const metadata = {
  title: 'XINITY Hackathon — Build. Pitch. Conquer.',
  description: 'Join XINITY, the ultimate student hackathon. 48 hours to build your vision. Register now.',
};

export default function Home() {
  return (
    <main>
      <Hero />

      <EventCarousel />

      <InfoSection
        id="rules"
        title="The Rules"
        description="Innovation knows no bounds, but a fair competition requires structure. Teams of up to 3 members will have 48 hours to build, pitch, and conquer the XINITY hackathon track. All code must be original, and third-party APIs are explicitly permitted."
        align="left"
      >
        <ul style={{ listStyle: 'none', padding: 0, color: 'var(--text-muted)', fontSize: '1rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--accent-color)', fontWeight: 700 }}>✓</span>
            Maximum 3 members per team.
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--accent-color)', fontWeight: 700 }}>✓</span>
            48-hour development window.
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--accent-color)', fontWeight: 700 }}>✓</span>
            Prototypes must be functional by the deadline.
          </li>
        </ul>
      </InfoSection>

      <InfoSection
        id="challenge"
        title="The Challenge"
        description="Select from three interstellar tracks: Build for the Future, Web3 Integrations, or the AI Frontier. Architect a full-stack solution that demonstrates high impact, flawless usability, and exceptional brand identity. Your code is just the beginning — the Pitch seals your legacy."
        align="right"
        illustration={<ChallengeIllustration />}
      />

      <section
        id="register"
        style={{
          padding: '120px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#fff',
          borderTop: '1px solid var(--border-color)',
        }}
      >
        <div style={{ maxWidth: '560px' }}>
          <h2
            className="heading-display"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '1.25rem', color: 'var(--text-color)', lineHeight: 1.1 }}
          >
            Ready to <span style={{ color: 'var(--accent-color)' }}>Build ?</span>
          </h2>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', maxWidth: '480px', margin: '0 auto 2.5rem auto', lineHeight: 1.65 }}>
            Secure your spot in the most cinematic hackathon of the year. The frontier is waiting.
          </p>
          <a href="/register" className="btn-register">
            Register Now
          </a>
        </div>
      </section>
    </main>
  );
}
