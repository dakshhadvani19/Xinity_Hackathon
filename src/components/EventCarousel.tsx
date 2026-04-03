'use client';

import { motion } from 'framer-motion';
import {
  Code, Mic, Trophy,
  Rocket, Globe, Users, Award,
  Palette, Sparkles, Target, Zap,
} from 'lucide-react';
import styles from './EventCarousel.module.css';

const CARDS = [
  {
    id: 1,
    title: 'The Build',
    subtitle: 'Architect scalable solutions in 48 hours.',
    icon: Code,
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%)',
    flexGrow: 1.2,
    points: [
      { icon: Palette,  text: 'Full freedom to leverage any UI framework or design system' },
      { icon: Sparkles, text: 'Deliver a polished, visually compelling final product' },
    ],
  },
  {
    id: 2,
    title: 'The Reward',
    subtitle: 'Everything you earn when you conquer.',
    icon: Trophy,
    gradient: 'linear-gradient(135deg, #047857 0%, #059669 60%, #10b981 100%)',
    flexGrow: 1.7,
    points: [
      { icon: Rocket, text: 'Official spot on the XINITY Community Tech Team' },
      { icon: Globe,  text: 'Get opportunity to showcase your project live on the XINITY platform' },
      { icon: Users,  text: 'Recognition across the entire XINITY community' },
      { icon: Award,  text: 'A certificate of achievement in your name' },
    ],
  },
  {
    id: 3,
    title: 'The Pitch',
    subtitle: 'Present your vision to the judges.',
    icon: Mic,
    gradient: 'linear-gradient(135deg, #7e22ce 0%, #a855f7 60%, #d946ef 100%)',
    flexGrow: 1.2,
    points: [
      { icon: Target, text: 'Present your solution directly before a live judging panel' },
      { icon: Zap,    text: 'Drive maximum impact through confident, concise delivery' },
    ],
  },
];

// Unique, non-matching float paths per position
const FLOAT_PATHS = [
  { y: [0, -18, -5, 14,  4, -11,  0], x: [0,  6, -3, -7,  4,  2, 0], yDur: 7.2, xDur: 9.4  },
  { y: [0, -10,  9, -7, 16,  -8,  0], x: [0, -5,  7,  2, -6,  4, 0], yDur: 9.5, xDur: 11.8 },
  { y: [0,  12, -16, 6,  -4, 11,  0], x: [0,  5, -2, -7,  6, -4, 0], yDur: 6.3, xDur: 8.1  },
];

export default function EventCarousel() {
  return (
    <section className={`section ${styles.carouselSection}`}>
      <div className={styles.sectionInner}>
        <h2 className={`heading-display ${styles.sectionTitle}`}>Event Showcase</h2>

        <div className={styles.cardsWrapper}>
          {CARDS.map((card, idx) => {
            const float = FLOAT_PATHS[idx];
            const isCenter = idx === 1;
            return (
              <motion.div
                key={card.id}
                className={`${styles.card} ${isCenter ? styles.cardCenter : ''}`}
                animate={{ y: float.y, x: float.x }}
                transition={{
                  y: { duration: float.yDur, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' },
                  x: { duration: float.xDur, repeat: Infinity, ease: 'easeInOut', repeatType: 'loop' },
                }}
                style={{ backgroundImage: card.gradient, flexGrow: card.flexGrow }}
              >
                {/* Watermark icon */}
                <div className={styles.bgIconWrap}>
                  <card.icon size={180} className={styles.bgIcon} />
                </div>

                {/* Ambient glow */}
                <motion.div
                  className={styles.glow}
                  animate={{ opacity: [0.35, 0.75, 0.35] }}
                  transition={{ duration: 3 + idx * 0.7, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Points list */}
                <div className={styles.prizeList}>
                  {card.points.map((point, i) => (
                    <div key={i} className={styles.prizeItem}>
                      <point.icon size={14} className={styles.prizeIcon} />
                      <span>{point.text}</span>
                    </div>
                  ))}
                </div>

                {/* Bottom row */}
                <div className={styles.cardBottom}>
                  <div className={styles.cardText}>
                    <h3 className={styles.cardTitle}>{card.title}</h3>
                    <p className={styles.cardDesc}>{card.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
