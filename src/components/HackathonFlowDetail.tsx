'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './HackathonFlowDetail.module.css';
import {
  ClipboardList,
  Presentation,
  Globe,
  Mic,
  Trophy,
  Users,
  FileText,
  CheckCircle,
  ArrowLeft,
  Lightbulb,
  Clock,
  Star,
  Target,
  Rocket,
  Award,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

const phases = [
  {
    step: 1,
    title: 'Register Your Team',
    tagline: 'The adventure begins here',
    icon: ClipboardList,
    color: '#00c4b4',
    gradient: 'linear-gradient(135deg, #00c4b4 0%, #00e6d3 100%)',
    timeline: 'Week 1',
    description:
      'Assemble your dream team of up to 3 members and register on the XINITY platform. Choose a creative team name, upload your logo, and get ready to innovate.',
    checklist: [
      'Form a team (1–3 members)',
      'Register on the XINITY portal',
      'Choose your problem statement / track',
      'Join the official communication channels',
    ],
    tips: [
      { icon: Users, text: 'Pick teammates with complementary skills — design, dev, and strategy.' },
      { icon: Lightbulb, text: 'Start brainstorming ideas early, even before the official start.' },
    ],
  },
  {
    step: 2,
    title: 'Round 1 — Presentation',
    tagline: 'Pitch your idea on paper',
    icon: Presentation,
    color: '#2563eb',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)',
    timeline: 'Week 2',
    description:
      'Create a compelling presentation that outlines your problem statement, proposed solution, tech stack, and expected impact. This is your first impression — make it count.',
    checklist: [
      'Define the problem clearly',
      'Outline your proposed solution',
      'Specify your tech stack and architecture',
      'Highlight expected impact and feasibility',
      'Submit presentation before the deadline',
    ],
    tips: [
      { icon: FileText, text: 'Keep slides concise — max 10 slides with clear visuals.' },
      { icon: Target, text: 'Focus on the "why" — judges love real-world impact stories.' },
    ],
  },
  {
    step: 3,
    title: 'Build Your Webpage',
    tagline: 'If shortlisted — bring it to life',
    icon: Globe,
    color: '#7e22ce',
    gradient: 'linear-gradient(135deg, #7e22ce 0%, #a855f7 100%)',
    timeline: 'Week 3–4',
    description:
      'Congratulations on being shortlisted! Now it\'s time to code. Build a functional, visually stunning webpage that demonstrates your solution. Focus on usability, performance, and polish.',
    checklist: [
      'Set up your development environment',
      'Build core features and functionality',
      'Ensure responsive design across devices',
      'Optimize performance and accessibility',
      'Deploy your project to a live URL',
    ],
    tips: [
      { icon: Rocket, text: 'Ship early, iterate fast — a working MVP beats a perfect wireframe.' },
      { icon: Zap, text: 'Use modern frameworks and tools — they speed up development significantly.' },
    ],
  },
  {
    step: 4,
    title: 'Present & Pitch',
    tagline: 'Convince the judges',
    icon: Mic,
    color: '#f59e0b',
    gradient: 'linear-gradient(135deg, #d97706 0%, #fbbf24 100%)',
    timeline: 'Final Day',
    description:
      'This is your moment. Present your working project to a panel of industry judges. Demonstrate the product, explain your technical decisions, and showcase the impact of your solution.',
    checklist: [
      'Prepare a 5-minute live demo',
      'Practice Q&A scenarios with your team',
      'Have a backup plan if live demo fails',
      'Highlight unique selling points',
      'Show real metrics or user feedback if possible',
    ],
    tips: [
      { icon: Clock, text: 'Rehearse your timing — going over time is an instant red flag.' },
      { icon: Star, text: 'Start with the demo, not the slides. Show, don\'t just tell.' },
    ],
  },
  {
    step: 5,
    title: 'Winners Declared',
    tagline: 'The moment of truth',
    icon: Trophy,
    color: '#059669',
    gradient: 'linear-gradient(135deg, #047857 0%, #10b981 100%)',
    timeline: 'Final Day',
    description:
      'After all pitches are complete, the judging panel deliberates. Winners are announced across categories — Best Innovation, Best Design, Best Technical Execution, and the Grand Prize.',
    checklist: [
      'Grand Prize — Overall best project',
      'Best Innovation — Most creative solution',
      'Best Design — Outstanding UI/UX',
      'Best Technical Execution — Cleanest code & architecture',
    ],
    tips: [
      { icon: Award, text: 'Even if you don\'t win, the experience and connections are invaluable.' },
      { icon: Users, text: 'Network with judges and other teams — opportunities come from everywhere.' },
    ],
  },
];

function PhaseCard({ phase, index }: { phase: typeof phases[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-8%' });
  const isEven = index % 2 === 0;

  return (
    <div className={styles.phaseRow} ref={ref}>
      {/* Timeline connector */}
      <div className={styles.timelineCol}>
        <motion.div
          className={styles.timelineDot}
          style={{ background: phase.gradient, boxShadow: `0 0 16px ${phase.color}40` }}
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.4, delay: 0.1, type: 'spring', stiffness: 200 }}
        >
          <span className={styles.timelineDotNum}>{phase.step}</span>
        </motion.div>
        {index < phases.length - 1 && (
          <motion.div
            className={styles.timelineLine}
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          />
        )}
      </div>

      {/* Card */}
      <motion.div
        className={`${styles.phaseCard} ${isEven ? styles.cardLeft : styles.cardRight}`}
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Card header */}
        <div className={styles.cardHeader}>
          <div className={styles.cardIcon} style={{ background: `${phase.color}14`, border: `2px solid ${phase.color}30` }}>
            <phase.icon size={28} color={phase.color} strokeWidth={1.8} />
          </div>
          <div>
            <div className={styles.cardTimeline} style={{ color: phase.color }}>{phase.timeline}</div>
            <h3 className={styles.cardTitle}>{phase.title}</h3>
            <p className={styles.cardTagline}>{phase.tagline}</p>
          </div>
        </div>

        {/* Description */}
        <p className={styles.cardDesc}>{phase.description}</p>

        {/* Checklist */}
        <div className={styles.cardChecklist}>
          <h4 className={styles.checklistTitle}>
            {phase.step === 5 ? 'Award Categories' : 'What You Need To Do'}
          </h4>
          <ul className={styles.checklistItems}>
            {phase.checklist.map((item, i) => (
              <motion.li
                key={i}
                className={styles.checkItem}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
              >
                <CheckCircle size={16} color={phase.color} strokeWidth={2.5} />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Pro tips */}
        <div className={styles.tipsSection}>
          <h4 className={styles.tipsTitle}>Pro Tips</h4>
          {phase.tips.map((tip, i) => (
            <div key={i} className={styles.tipRow}>
              <div className={styles.tipIcon} style={{ background: `${phase.color}10` }}>
                <tip.icon size={16} color={phase.color} strokeWidth={2} />
              </div>
              <p className={styles.tipText}>{tip.text}</p>
            </div>
          ))}
        </div>

        {/* Accent bar */}
        <div className={styles.accentBar} style={{ background: phase.gradient }} />
      </motion.div>
    </div>
  );
}

export default function HackathonFlowDetail() {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <div className={styles.page}>
      {/* Back nav */}
      <div className={styles.backNav}>
        <Link href="/#flow" className={styles.backLink}>
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </div>

      {/* Hero */}
      <header className={styles.hero} ref={heroRef}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={styles.heroContent}
        >
          <div className={styles.heroBadge}>Complete Guide</div>
          <h1 className={`heading-display ${styles.heroTitle}`}>
            Hackathon <span className={styles.heroAccent}>Flow</span>
          </h1>
          <p className={styles.heroSubtitle}>
            A step-by-step walkthrough of the entire XINITY Hackathon journey — from registration to the winner&apos;s podium.
          </p>
        </motion.div>

        {/* Progress overview */}
        <motion.div
          className={styles.progressBar}
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {phases.map((p, i) => (
            <div key={i} className={styles.progressStep}>
              <div className={styles.progressDot} style={{ background: p.color }} />
              <span className={styles.progressLabel}>{p.title.split('—')[0].trim()}</span>
            </div>
          ))}
        </motion.div>
      </header>

      {/* Timeline */}
      <div className={styles.timelineSection}>
        <div className={styles.timeline}>
          {phases.map((phase, index) => (
            <PhaseCard key={phase.step} phase={phase} index={index} />
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <section className={styles.bottomCta}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.ctaContent}
        >
          <h2 className={`heading-display ${styles.ctaTitle}`}>
            Ready to Start Your <span className={styles.heroAccent}>Journey?</span>
          </h2>
          <p className={styles.ctaDesc}>
            Don&apos;t just spectate — participate. Register your team now and take the first step.
          </p>
          <Link href="/register" className="btn-register">
            Register Now
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
