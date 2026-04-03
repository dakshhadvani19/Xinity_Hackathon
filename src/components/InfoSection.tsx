'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import styles from './InfoSection.module.css';

interface InfoSectionProps {
  id: string;
  title: string;
  description: React.ReactNode;
  align?: 'left' | 'right';
  children?: React.ReactNode;
}

export default function InfoSection({ id, title, description, align = 'left', children }: InfoSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-15%' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section id={id} className={`section ${styles.sectionWrapper}`}>
      <div className={`container ${styles.container}`} ref={ref}>
        <motion.div
          className={`${styles.content} ${align === 'right' ? styles.contentRight : ''}`}
          initial={{ opacity: 0, x: align === 'left' ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: align === 'left' ? -40 : 40 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onMouseMove={handleMouseMove}
          style={{ '--mouse-x': `${mousePos.x}px`, '--mouse-y': `${mousePos.y}px` } as React.CSSProperties}
        >
          <h2 className={`heading-display ${styles.title}`}>{title}</h2>
          <motion.div
            className={styles.divider}
            initial={{ width: 0 }}
            animate={isInView ? { width: 48 } : { width: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
          <p className={styles.description}>{description}</p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
