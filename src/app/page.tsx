import Hero from '../components/Hero';
import EventCarousel from '../components/EventCarousel';
import InfoSection from '../components/InfoSection';

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
        <ul style={{ listStyle: 'none', padding: 0, color: '#c0c0c0', fontSize: '1.1rem', marginTop: '1rem' }}>
          <li style={{ marginBottom: '10px' }}>✓ Maximum 3 members per team.</li>
          <li style={{ marginBottom: '10px' }}>✓ 48-hour development window.</li>
          <li style={{ marginBottom: '10px' }}>✓ Prototypes must be functional by the deadline.</li>
        </ul>
      </InfoSection>

      <InfoSection 
        id="challenge" 
        title="The Challenge" 
        description="Select from three interstellar tracks: Build for the Future, Web3 Integrations, or the AI Frontier. Architect a full-stack solution that demonstrates high impact, flawless usability, and exceptional brand identity. Your code is just the beginning; the Pitch seals your legacy."
        align="right"
      />

      <section id="register" className="section" style={{ textAlign: 'center', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div className="container">
          <h2 className="heading-display" style={{ fontSize: '4rem', marginBottom: '1.5rem', color: '#fff' }}>
            Ready to Build?
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#a0a0a0', maxWidth: '600px', margin: '0 auto 3rem auto' }}>
            Secure your spot in the most cinematic hackathon of the year. The frontier is waiting.
          </p>
          <a href="#" className="btn-register">
            Register Now
          </a>
        </div>
      </section>
    </main>
  );
}
