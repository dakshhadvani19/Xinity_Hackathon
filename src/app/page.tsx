import Hero from '../components/Hero';
import EventCarousel from '../components/EventCarousel';
import InfoSection from '../components/InfoSection';
import ChallengeIllustration from '../components/ChallengeIllustration';
import HackathonFlow from '../components/HackathonFlow';
import ContactCarousel from '../components/ContactCarousel';

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
        description="A fair competition requires structure. Read every rule — violations may lead to disqualification."
        align="left"
        wide
      >
        <div className="rules-grid">
          <div className="rule-card">
            <span className="rule-num">01</span>
            <p>Solo or teams of max 3 members.</p>
          </div>
          <div className="rule-card">
            <span className="rule-num">02</span>
            <p>Must be currently enrolled college students.</p>
          </div>
          <div className="rule-card">
            <span className="rule-num">03</span>
            <p>Inter-college &amp; inter-specialization teams allowed.</p>
          </div>
          <div className="rule-card">
            <span className="rule-num">04</span>
            <p>One member must be designated Team Lead.</p>
          </div>
          <div className="rule-card">
            <span className="rule-num">05</span>
            <p>Cannot register in more than one team.</p>
          </div>
          <div className="rule-card">
            <span className="rule-num">06</span>
            <p>Team composition locked after registration.</p>
          </div>
          <div className="rule-card">
            <span className="rule-num">07</span>
            <p>Round 1: Submit redesign via XINITY PPT Template (PDF).</p>
          </div>
          <div className="rule-card">
            <span className="rule-num">08</span>
            <p>Round 2: Present a fully functional webpage offline.</p>
          </div>
          <div className="rule-card">
            <span className="rule-num">09</span>
            <p>All members must be present on Round 2 day.</p>
          </div>
          <div className="rule-card">
            <span className="rule-num">10</span>
            <p>Late submissions will not be accepted.</p>
          </div>
          <div className="rule-card">
            <span className="rule-num">11</span>
            <p>AI tools allowed for design, ideation &amp; dev.</p>
          </div>
          <div className="rule-card">
            <span className="rule-num">12</span>
            <p>Work must be 100% original — plagiarism = DQ.</p>
          </div>
          <div className="rule-card">
            <span className="rule-num">13</span>
            <p>Judges&apos; decisions are final and binding.</p>
          </div>
          <div className="rule-card">
            <span className="rule-num">14</span>
            <p>Respectful behaviour is mandatory at all times.</p>
          </div>
        </div>
      </InfoSection>

      <InfoSection
        id="challenge"
        title="The Challenge"
        description="Select from three interstellar tracks: Build for the Future, Web3 Integrations, or the AI Frontier. Architect a full-stack solution that demonstrates high impact, flawless usability, and exceptional brand identity. Your code is just the beginning — the Pitch seals your legacy."
        align="right"
        illustration={<ChallengeIllustration />}
      />

      <HackathonFlow />

      <ContactCarousel />

      <section
        id="register"
        style={{
          padding: '120px 24px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          background: 'linear-gradient(to bottom, #ffffff 0%, #f8f9fa 10%, #f8f9fa 90%, #ffffff 100%)',
        }}
      >
        <div style={{ maxWidth: '560px' }}>
          <h2
            className="heading-display"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', marginBottom: '1.25rem', color: 'var(--text-color)', lineHeight: 1.1 }}
          >
            Ready to <span style={{ color: 'var(--accent-color)' }}>Build?</span>
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
