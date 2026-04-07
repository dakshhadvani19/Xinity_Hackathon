'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import styles from './HostForm.module.css';

interface HostFormData {
  hackathonName: string;
  universityName: string;
  organizerName: string;
  organizerEmail: string;
  organizerPhone: string;
  expectedParticipants: string;
  proposedDateRange: string;
  prizePoolBudget: string;
  sponsorshipDetails: string;
  hackathonTheme: string;
  venueDetails: string;
  additionalRequirements: string;
}

export default function HostForm() {
  const [formData, setFormData] = useState<HostFormData>({
    hackathonName: '',
    universityName: '',
    organizerName: '',
    organizerEmail: '',
    organizerPhone: '',
    expectedParticipants: '',
    proposedDateRange: '',
    prizePoolBudget: '',
    sponsorshipDetails: '',
    hackathonTheme: '',
    venueDetails: '',
    additionalRequirements: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Show success immediately — fire Firestore + email in background
    setIsSuccess(true);

    import('../lib/firebase').then(({ db }) =>
      import('firebase/firestore').then(({ collection, addDoc }) =>
        addDoc(collection(db, 'hackathon_applications'), {
          ...formData,
          timestamp: new Date(),
        })
      )
    ).catch((err) => console.error('Background save failed:', err));

    fetch('/api/send-notification', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).catch((err) => console.error('Email notification failed:', err));
  };

  if (isSuccess) {
    return (
      <motion.div
        className={`${styles.container} glass-card`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className={styles.successState}>
          <CheckCircle size={64} color="#00c4b4" className={styles.successIcon} />
          <h2 className="heading-display">Application Submitted</h2>
          <p>Thank you, {formData.organizerName}. We&apos;ll review your application and get in touch soon.</p>
          <Link href="/" className="btn-primary" style={{ marginTop: '2rem' }}>
            Return to Home
          </Link>
        </div>
      </motion.div>
    );
  }

  const staggeredContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08 },
    },
  };

  const itemAnim: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } },
  };

  return (
    <motion.div
      className={`${styles.container} glass-card`}
      variants={staggeredContainer}
      initial="hidden"
      animate="show"
    >
      <Link href="/" className={styles.backLink}>
        <ArrowLeft size={16} /> Back
      </Link>

      <motion.div className={styles.header} variants={itemAnim}>
        <h1 className="heading-display">Host Your Hackathon</h1>
        <p className={styles.subtitle}>Bring XINITY to your campus — fill in the details below.</p>
      </motion.div>

      <form className={styles.form} onSubmit={handleSubmit}>

        {/* Event Info */}
        <motion.p className={styles.sectionLabel} variants={itemAnim}>Event Info</motion.p>
        <motion.div className={styles.fieldGrid} variants={itemAnim}>
          <div className={styles.inputGroup}>
            <label htmlFor="hackathonName">Hackathon Name *</label>
            <input type="text" id="hackathonName" name="hackathonName" onChange={handleChange} required placeholder="e.g. CodeStorm 2026" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="universityName">University / College *</label>
            <input type="text" id="universityName" name="universityName" onChange={handleChange} required placeholder="e.g. IIT Bombay" />
          </div>
        </motion.div>

        <div className={styles.divider} />

        {/* Organizer Details */}
        <motion.p className={styles.sectionLabel} variants={itemAnim}>Organizer Details</motion.p>
        <motion.div className={styles.fieldGrid} variants={itemAnim}>
          <div className={styles.inputGroup}>
            <label htmlFor="organizerName">Your Name *</label>
            <input type="text" id="organizerName" name="organizerName" onChange={handleChange} required placeholder="Full name" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="organizerEmail">Email *</label>
            <input type="email" id="organizerEmail" name="organizerEmail" onChange={handleChange} required placeholder="you@university.edu" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="organizerPhone">Phone *</label>
            <input type="tel" id="organizerPhone" name="organizerPhone" onChange={handleChange} required placeholder="+91 98765 43210" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="expectedParticipants">Expected Participants *</label>
            <select id="expectedParticipants" name="expectedParticipants" onChange={handleChange} required defaultValue="">
              <option value="" disabled>Select range</option>
              <option value="50-100">50 – 100</option>
              <option value="100-200">100 – 200</option>
              <option value="200-500">200 – 500</option>
              <option value="500+">500+</option>
            </select>
          </div>
        </motion.div>

        <div className={styles.divider} />

        {/* Logistics */}
        <motion.p className={styles.sectionLabel} variants={itemAnim}>Logistics</motion.p>
        <motion.div className={styles.fieldGrid} variants={itemAnim}>
          <div className={styles.inputGroup}>
            <label htmlFor="proposedDateRange">Proposed Date Range *</label>
            <input type="text" id="proposedDateRange" name="proposedDateRange" onChange={handleChange} required placeholder="e.g. 15-17 Aug 2026" />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="prizePoolBudget">Prize Pool Budget *</label>
            <select id="prizePoolBudget" name="prizePoolBudget" onChange={handleChange} required defaultValue="">
              <option value="" disabled>Select budget</option>
              <option value="Under 25K">Under ₹25,000</option>
              <option value="25K-50K">₹25,000 – ₹50,000</option>
              <option value="50K-1L">₹50,000 – ₹1,00,000</option>
              <option value="Above 1L">Above ₹1,00,000</option>
            </select>
          </div>
        </motion.div>
        <motion.div className={styles.inputGroup} variants={itemAnim}>
          <label htmlFor="venueDetails">Venue Details *</label>
          <input type="text" id="venueDetails" name="venueDetails" onChange={handleChange} required placeholder="Building, campus, city" />
        </motion.div>

        <div className={styles.divider} />

        {/* Details */}
        <motion.p className={styles.sectionLabel} variants={itemAnim}>Additional Details</motion.p>
        <motion.div className={styles.inputGroup} variants={itemAnim}>
          <label htmlFor="sponsorshipDetails">Sponsorship &amp; Prizes</label>
          <textarea id="sponsorshipDetails" name="sponsorshipDetails" onChange={handleChange} placeholder="What prizes or sponsors will you bring?" />
        </motion.div>
        <motion.div className={styles.inputGroup} variants={itemAnim}>
          <label htmlFor="hackathonTheme">Theme / Tracks</label>
          <textarea id="hackathonTheme" name="hackathonTheme" onChange={handleChange} placeholder="Describe your proposed themes or challenge tracks" />
        </motion.div>
        <motion.div className={styles.inputGroup} variants={itemAnim}>
          <label htmlFor="additionalRequirements">Anything Else?</label>
          <textarea id="additionalRequirements" name="additionalRequirements" onChange={handleChange} placeholder="Special requirements, questions, etc." />
        </motion.div>

        <motion.button
          className="btn-register"
          style={{ width: '100%', marginTop: '1.5rem' }}
          disabled={isSubmitting}
          variants={itemAnim}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <div className={styles.loaderContainer}>
              <Loader2 className={styles.spinIcon} /> Submitting...
            </div>
          ) : 'Submit Application'}
        </motion.button>

      </form>
    </motion.div>
  );
}
