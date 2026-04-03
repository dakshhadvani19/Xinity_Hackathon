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
  const isInView = useInView(ref, { once: true, margin: '-20%' });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <section id={id} className={`section ${styles.sectionWrapper}`}>
      <div className={`container ${styles.container}`} ref={ref} style={{ perspective: '1200px' }}>
        <motion.div 
          className={`${styles.content} ${align === 'right' ? styles.contentRight : ''}`}
          initial={{ opacity: 0, x: align === 'left' ? -60 : 60, scale: 0.95, rotateY: align === 'left' ? -10 : 10, y: 0 }}
          animate={isInView ? { opacity: 1, x: 0, scale: 1, rotateY: 0, y: [0, -10, 0] } : { opacity: 0, x: align === 'left' ? -60 : 60, scale: 0.95, rotateY: align === 'left' ? -10 : 10, y: 0 }}
          transition={{ 
            type: 'spring', stiffness: 120, damping: 20,
            y: { duration: 6, repeat: Infinity, ease: 'easeInOut' }
          }}
          whileHover={{ scale: 1.02 }}
          onMouseMove={handleMouseMove}
          style={{ '--mouse-x': `${mousePos.x}px`, '--mouse-y': `${mousePos.y}px` } as React.CSSProperties}
        >
          <h2 className={`heading-display ${styles.title}`}>{title}</h2>
          <motion.div 
            className={styles.divider}
            initial={{ width: 0 }}
            animate={isInView ? { width: 60 } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          ></motion.div>
          <p className={styles.description}>{description}</p>
          {children}
        </motion.div>
      </div>
    </section>
  );
}
