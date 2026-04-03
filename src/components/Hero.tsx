'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

const PLAIN_PART = 'Experience liftoff with the ';
const ACCENT_PART = 'next-generation hackathon';
const FULL_TYPE_TEXT = PLAIN_PART + ACCENT_PART;

const SECOND_LINE =
  'XINITY is our student-led hackathon platform, evolving the builder mindset into the agent-first era.';

const SPEED_LINE1 = 120; // ms per character — first line (slower)
const SPEED_LINE2 = 45; // ms per character — second line

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [charIndex1, setCharIndex1] = useState(0);
  const [charIndex2, setCharIndex2] = useState(0);
  const [typingPhase, setTypingPhase] = useState<'line1' | 'line2' | 'done'>('line1');
  const [cursorVisible, setCursorVisible] = useState(true);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  // ── Line 1 typewriter ──────────────────────────────────────────────────────
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < FULL_TYPE_TEXT.length) {
          i++;
          setCharIndex1(i);
        } else {
          clearInterval(interval);
          setTimeout(() => setTypingPhase('line2'), 400);
        }
      }, SPEED_LINE1);
      return () => clearInterval(interval);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  // ── Line 2 typewriter — starts once phase flips to 'line2' ────────────────
  useEffect(() => {
    if (typingPhase !== 'line2') return;
    let i = 0;
    const interval = setInterval(() => {
      if (i < SECOND_LINE.length) {
        i++;
        setCharIndex2(i);
      } else {
        clearInterval(interval);
        setTypingPhase('done');
      }
    }, SPEED_LINE2);
    return () => clearInterval(interval);
  }, [typingPhase]);

  // ── Blinking cursor — disappears when both lines are done ─────────────────
  useEffect(() => {
    if (typingPhase === 'done') { setCursorVisible(false); return; }
    const blink = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(blink);
  }, [typingPhase]);

  // ── Mouse-tracking floating particle dots ──────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;

    const PARTICLE_COUNT = 160;
    interface Particle {
      x: number; y: number;
      vx: number; vy: number;
      radius: number;
      color: string;
      alpha: number;
    }

    const COLORS = [
      'rgba(0, 196, 180,',
      'rgba(0, 210, 195,',
      'rgba(0, 178, 164,',
      'rgba(0, 196, 180,',
      'rgba(0, 168, 155,',
      'rgba(0, 150, 136,',
      'rgba(0, 220, 205,',
      'rgba(0, 140, 128,',
      'rgba(20, 200, 185,',
      'rgba(0, 190, 175,',
    ];

    let particles: Particle[] = [];

    const resize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    const initParticles = () => {
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: Math.random() * 2.5 + 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        alpha: Math.random() * 0.5 + 0.15,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      const mouse = mouseRef.current;

      particles.forEach(p => {
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && dist > 0) {
          const force = (120 - dist) / 120 * 0.5;
          p.vx -= (dx / dist) * force;
          p.vy -= (dy / dist) * force;
        }

        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.fill();
      });

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 80) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 196, 180, ${0.08 * (1 - dist / 80)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onMouseLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };

    window.addEventListener('resize', () => { resize(); initParticles(); });
    canvas.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);

    resize();
    initParticles();
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section className={styles.heroSection}>
      {/* Floating particle canvas */}
      <canvas ref={canvasRef} className={styles.particleCanvas} />

      {/* Top brand label */}
      {/* <div className={styles.brandLabel}>
        <span className={styles.brandX}>X</span>
        <span className={styles.brandName}>XINITY</span>
      </div> */}

      {/* Hero headline — typed character by character */}
      <div className={styles.heroContent}>
        <h1 className={styles.heroHeadline}>
          {FULL_TYPE_TEXT.slice(0, Math.min(charIndex1, PLAIN_PART.length))}
          {charIndex1 >= PLAIN_PART.length && <br />}
          {charIndex1 > PLAIN_PART.length && (
            <em className={styles.headlineAccent}>
              {ACCENT_PART.slice(0, charIndex1 - PLAIN_PART.length)}
            </em>
          )}
          {typingPhase === 'line1' && (
            <span className={styles.cursor} style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
          )}
        </h1>
      </div>

      {/* Second line — also typed, cursor follows here during line2 phase */}
      <div className={styles.pixelSection}>
        <p className={styles.pixelText}>
          {SECOND_LINE.slice(0, charIndex2)}
          {typingPhase === 'line2' && (
            <span className={styles.cursor} style={{ opacity: cursorVisible ? 1 : 0 }}>|</span>
          )}
        </p>
      </div>

      {/* Scroll hint */}
      <div className={styles.scrollHint}>
        <div className={styles.scrollDot} />
      </div>
    </section>
  );
}
