'use client';

import { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import { Code, Mic, Trophy, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './EventCarousel.module.css';

const CAROUSEL_ITEMS = [
  {
    id: 1,
    title: 'The Build { }',
    description: '3D Code-block cluster. Architect scalable solutions.',
    icon: Code,
    gradient: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
  },
  {
    id: 2,
    title: 'The Pitch ▲',
    description: 'Stage + Spotlight silhouette. Present your vision.',
    icon: Mic,
    gradient: 'linear-gradient(135deg, #7e22ce, #d946ef)',
  },
  {
    id: 3,
    title: 'The Reward ★',
    description: 'Holographic Trophy. Glory and infinite prizes.',
    icon: Trophy,
    gradient: 'linear-gradient(135deg, #047857, #10b981)',
  },
];

const total = CAROUSEL_ITEMS.length;

export default function EventCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + total) % total);

  // Always render as [leftCard, activeCard, rightCard]
  const leftIndex = (currentIndex - 1 + total) % total;
  const rightIndex = (currentIndex + 1) % total;

  const orderedItems = [
    { item: CAROUSEL_ITEMS[leftIndex], isActive: false },
    { item: CAROUSEL_ITEMS[currentIndex], isActive: true },
    { item: CAROUSEL_ITEMS[rightIndex], isActive: false },
  ];

  return (
    <section className={`section ${styles.carouselSection}`}>
      <div className={styles.sectionInner}>
        <h2 className={`heading-display ${styles.sectionTitle}`}>Event Showcase</h2>

        <div className={styles.carouselContainer}>
          <button
            className={styles.navButton}
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={28} />
          </button>

          <LayoutGroup id="carousel">
            <div className={styles.cardsWrapper}>
              {orderedItems.map(({ item, isActive }) => (
                <motion.div
                  key={item.id}
                  layout
                  className={styles.card}
                  animate={{
                    opacity: isActive ? 1 : 0.3,
                    scale: isActive ? 1 : 0.86,
                    filter: isActive ? 'blur(0px)' : 'blur(3px)',
                  }}
                  transition={{
                    layout: { type: 'spring', stiffness: 280, damping: 28 },
                    opacity: { duration: 0.35 },
                    scale: { duration: 0.35 },
                    filter: { duration: 0.35 },
                  }}
                  style={{
                    backgroundImage: item.gradient,
                    boxShadow: isActive
                      ? '0 24px 64px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.15)'
                      : '0 4px 24px rgba(0,0,0,0.4)',
                  }}
                >
                  <div className={styles.cardContent}>
                    <item.icon size={60} className={styles.icon} />
                    <h3 className={styles.cardTitle}>{item.title}</h3>
                    <p className={styles.cardDesc}>{item.description}</p>
                  </div>

                  {isActive && (
                    <motion.div
                      className={styles.glow}
                      animate={{ opacity: [0.4, 0.9, 0.4] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </LayoutGroup>

          <button
            className={styles.navButton}
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={28} />
          </button>
        </div>

      </div>
    </section>
  );
}
