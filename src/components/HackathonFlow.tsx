'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './HackathonFlow.module.css';
import { ClipboardList, Presentation, Globe, Mic, Trophy } from 'lucide-react';
import Link from 'next/link';

const steps = [
  {
    number: 1,
    title: 'Register',
    description: 'Form your team & sign up',
    icon: ClipboardList,
    color: '#00c4b4',
  },
  {
    number: 2,
    title: 'Round 1',
    description: 'Make your presentation',
    icon: Presentation,
    color: '#2563eb',
  },
  {
    number: 3,
    title: 'Build Webpage',
    description: 'If shortlisted, build it',
    icon: Globe,
    color: '#7e22ce',
  },
  {
    number: 4,
    title: 'Present / Pitch',
    description: 'Pitch in front of judges',
    icon: Mic,
    color: '#f59e0b',
  },
  {
    number: 5,
    title: 'Winners Declared',
    description: 'Results & prizes awarded',
    icon: Trophy,
    color: '#059669',
  },
];

export default function HackathonFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className={`section ${styles.flowSection}`} id="flow">
      <div className="container" ref={ref}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={`heading-display ${styles.title}`}>
            The <span className={styles.accent}>Journey</span>
          </h2>
          <p className={styles.subtitle}>
            Five steps from registration to victory. Here&apos;s how XINITY unfolds.
          </p>
        </motion.div>

        <div className={styles.flowContainer}>
          {steps.map((step, index) => (
            <div key={step.number} className={styles.stepGroup}>
              <motion.div
                className={styles.stepCard}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div
                  className={styles.iconCircle}
                  style={{ background: `${step.color}12`, border: `2px solid ${step.color}30` }}
                >
                  <step.icon size={24} color={step.color} strokeWidth={2} />
                </div>
                <div className={styles.stepNumber} style={{ color: step.color }}>
                  Step {step.number}
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.description}</p>
                <div className={styles.stepIndicator} style={{ background: step.color }} />
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  className={styles.arrowWrap}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.12 + 0.25,
                    ease: 'easeOut',
                  }}
                >
                  <svg
                    width="32"
                    height="24"
                    viewBox="0 0 32 24"
                    fill="none"
                    className={styles.arrowDesktop}
                  >
                    <path
                      d="M0 12H28M28 12L20 4M28 12L20 20"
                      stroke="var(--accent-color)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    width="24"
                    height="32"
                    viewBox="0 0 24 32"
                    fill="none"
                    className={styles.arrowMobile}
                  >
                    <path
                      d="M12 0V28M12 28L4 20M12 28L20 20"
                      stroke="var(--accent-color)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              )}
            </div>
          ))}
        </div>

        <motion.div
          className={styles.ctaWrap}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Link href="/hackathon-flow" className={styles.detailBtn}>
            View Detailed Flow
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
