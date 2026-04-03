'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './Hero.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftXRef = useRef<HTMLDivElement>(null);
  const rightXRef = useRef<HTMLDivElement>(null);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    if (!leftXRef.current || !rightXRef.current || !containerRef.current) return;

    let ctx = gsap.context(() => {
      // The giant stroke 'X' splits and flies apart
      gsap.to(leftXRef.current, {
        x: '-20vw',
        y: '-10vh',
        rotation: 0,
        opacity: 0,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(rightXRef.current, {
        x: '20vw',
        y: '10vh',
        rotation: 0,
        opacity: 0,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className={styles.heroSection}>
      <div className="star-layer"></div>
      
      <motion.div 
        className={styles.content}
        style={{ y: y1, opacity }}
      >
        <div className={styles.titleContainer}>
          <motion.div 
            className={styles.xWrapper}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
          >
            <div ref={leftXRef} className={`${styles.xStroke} ${styles.xLeftStroke}`}></div>
            <div ref={rightXRef} className={`${styles.xStroke} ${styles.xRightStroke}`}></div>
          </motion.div>
          <motion.div 
            className={styles.inity}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
          >
            INITY
          </motion.div>
        </div>
        <motion.p 
          className={styles.tagline}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <i>Beyond the code. Into the infinite.</i>
        </motion.p>
      </motion.div>
    </section>
  );
}
