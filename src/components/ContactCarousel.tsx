'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './ContactCarousel.module.css';

interface Person {
  name: string;
  post: string;
  linkedin: string;
  photo: string;
  initials: string;
  gradient: string;
  glow: string;
}

const people: Person[] = [
  {
    name: 'Shivam Pandey',
    post: 'Tech Head',
    linkedin: 'https://www.linkedin.com/in/shivampandeyrj/',
    photo: '/team/shivam.jpeg',
    initials: 'SP',
    gradient: 'linear-gradient(135deg, #00c4b4, #00e6d3, #2563eb)',
    glow: 'rgba(0, 196, 180, 0.4)',
  },
  {
    name: 'Kiran Patil',
    post: 'Managing Head',
    linkedin: 'https://www.linkedin.com/in/basanagowda-patil-917a02315/',
    photo: '/team/kiran.jpeg',
    initials: 'KP',
    glow: 'rgba(126, 34, 206, 0.4)',
    gradient: 'linear-gradient(135deg, #7e22ce, #a855f7, #f59e0b)',
  },
  {
    name: 'Samim Mondal',
    post: 'Design Head',
    linkedin: 'https://www.linkedin.com/in/samim-mondal-8a8933374/',
    photo: '/team/samim.jpeg',
    initials: 'SM',
    gradient: 'linear-gradient(135deg, #2563eb, #06b6d4, #00c4b4)',
    glow: 'rgba(37, 99, 235, 0.4)',
  },
  {
    name: 'Kishan M Patil',
    post: 'Organising Head',
    linkedin: 'https://www.linkedin.com/in/kishan-m-patil-2955a9383/',
    photo: '/team/kishan.jpeg',
    initials: 'KM',
    gradient: 'linear-gradient(135deg, #f59e0b, #ef4444, #7e22ce)',
    glow: 'rgba(245, 158, 11, 0.4)',
  },
];

const TOTAL = people.length;
const RX = 220;
const RY = 40;

function getSlotProps(angle: number) {
  const x = Math.sin(angle) * RX;
  const y = -Math.cos(angle) * RY;
  const depth = (1 - Math.cos(angle)) / 2;
  const scale = 1 - depth * 0.48;
  const zIndex = Math.round((1 - depth) * 100);
  return { x, y, scale, zIndex, depth };
}

export default function ContactCarousel() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10%' });
  const hoveredRef = useRef(false);
  const angleRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef = useRef(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const linkedinRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  // Track front state to avoid unnecessary DOM classList thrashing
  const wasFrontRef = useRef<boolean[]>(people.map(() => false));

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current === 0) lastTimeRef.current = time;
      const dt = (time - lastTimeRef.current) / 1000;
      lastTimeRef.current = time;

      const speed = hoveredRef.current ? 0.15 : 0.4;
      angleRef.current += speed * dt;

      for (let i = 0; i < TOTAL; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;

        const baseAngle = (i / TOTAL) * Math.PI * 2;
        const currentAngle = baseAngle + angleRef.current;
        const { x, y, scale, zIndex, depth } = getSlotProps(currentAngle);

        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
        el.style.zIndex = String(zIndex);
        el.style.filter = depth > 0.3 ? `blur(${depth * 1.5}px)` : 'none';

        const isFront = depth < 0.5;
        const wasFront = wasFrontRef.current[i];

        if (isFront !== wasFront) {
          wasFrontRef.current[i] = isFront;
          const cardInner = el.firstElementChild as HTMLElement | null;
          if (cardInner) {
            if (isFront) {
              cardInner.classList.add(styles.cardFront);
            } else {
              cardInner.classList.remove(styles.cardFront);
            }
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <section className={styles.section} id="contact" ref={sectionRef}>
      <div className="container">
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={`heading-display ${styles.title}`}>
            Meet the <span className={styles.accent}>Team</span>
          </h2>
          <p className={styles.subtitle} >
            The people behind XINITY — reach out, connect, collaborate.
          </p>
        </motion.div>
      </div>

      <div
        className={styles.stage}
        onMouseEnter={() => { hoveredRef.current = true; }}
        onMouseLeave={() => { hoveredRef.current = false; }}
      >
        <div className={styles.stageInner}>
          {people.map((person, idx) => (
            <div
              key={person.name}
              className={styles.cardWrapper}
              ref={(el) => { cardRefs.current[idx] = el; }}
            >
              <div
                className={styles.card}
                style={{
                  '--card-glow': person.glow,
                  '--card-gradient': person.gradient,
                } as React.CSSProperties}
              >
                <div className={styles.cardBorderGlow} />

                <div className={styles.avatarRing}>
                  <div className={styles.avatarInner}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={person.photo}
                      alt={person.name}
                      className={styles.avatarImg}
                      draggable={false}
                    />
                  </div>
                </div>

                <h4 className={styles.cardName}>{person.name}</h4>
                <p className={styles.cardPost}>{person.post}</p>
                <p className={styles.cardCommunity}>Xinity Hackathon Community</p>

                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkedinBtn}
                  ref={(el) => { linkedinRefs.current[idx] = el; }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
