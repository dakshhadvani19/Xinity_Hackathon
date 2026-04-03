'use client';

import { useState, useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import { db, storage } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { UploadCloud, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import styles from './RegistrationForm.module.css';

interface FormData {
  teamName: string;
  leaderName: string;
  member1: string;
  member2: string;
  member3: string;
}

export default function RegistrationForm() {
  const [formData, setFormData] = useState<FormData>({
    teamName: '',
    leaderName: '',
    member1: '',
    member2: '',
    member3: ''
  });
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let logoUrl = '';

      // Handle file upload if exists
      if (file) {
        const storageRef = ref(storage, `team_logos/${Date.now()}_${file.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, file);
        logoUrl = await getDownloadURL(uploadTask.ref);
      }

      // Add to Firestore
      await addDoc(collection(db, 'registrations'), {
        ...formData,
        teamLogo: logoUrl,
        timestamp: new Date()
      });

      setIsSuccess(true);
    } catch (error) {
      console.error("Error registering team: ", error);
      alert("Registration failed (Verify Firebase Config). See console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        className={`${styles.container} glass-card`}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className={styles.successState}>
          <CheckCircle size={64} color="#00ffff" className={styles.successIcon} />
          <h2 className="heading-display">Registration Complete</h2>
          <p>Welcome to the frontier, {formData.teamName}.</p>
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
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemAnim: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
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
        <h1 className="heading-display">Register Team</h1>
        <p className={styles.subtitle}>Enter the infinite.</p>
      </motion.div>

      <form className={styles.form} onSubmit={handleSubmit}>

        <motion.div className={styles.inputGroup} variants={itemAnim}>
          <label htmlFor="teamName">Team Name *</label>
          <input type="text" id="teamName" name="teamName" onChange={handleInputChange} required placeholder="e.g. VIBECoders" />
        </motion.div>

        <motion.div className={styles.inputGroup} variants={itemAnim}>
          <label htmlFor="leaderName">Leader Name *</label>
          <input type="text" id="leaderName" name="leaderName" onChange={handleInputChange} required placeholder="Your full name" />
        </motion.div>

        <div className={styles.divider}></div>

        <motion.div className={styles.inputGroup} variants={itemAnim}>
          <label htmlFor="member1">Teammate 1 Name *</label>
          <input type="text" id="member1" name="member1" onChange={handleInputChange} required placeholder="Required" />
        </motion.div>

        <motion.div className={styles.inputGroup} variants={itemAnim}>
          <label htmlFor="member2">Teammate 2 Name (Optional)</label>
          <input type="text" id="member2" name="member2" onChange={handleInputChange} placeholder="Leave blank if solo" />
        </motion.div>

        <motion.div className={styles.inputGroup} variants={itemAnim}>
          <label htmlFor="member3">Teammate 3 Name (Optional)</label>
          <input type="text" id="member3" name="member3" onChange={handleInputChange} placeholder="Leave blank if solo" />
        </motion.div>

        <div className={styles.divider}></div>

        <motion.div className={styles.inputGroup} variants={itemAnim}>
          <label>Team Logo (Preferred)</label>
          <div
            className={styles.uploadZone}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />
            {file ? (
              <div className={styles.fileSelected}>
                <CheckCircle size={24} color="#00ffff" />
                <span>{file.name}</span>
              </div>
            ) : (
              <>
                <UploadCloud size={32} className={styles.uploadIcon} />
                <p>Click or drag to upload logo</p>
                <span className={styles.uploadSub}>PNG, JPG to 5MB</span>
              </>
            )}
          </div>
        </motion.div>

        <motion.button
          className="btn-register"
          style={{ width: '100%', marginTop: '2rem' }}
          disabled={isSubmitting}
          variants={itemAnim}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isSubmitting ? (
            <div className={styles.loaderContainer}>
              <Loader2 className={styles.spinIcon} /> Initializing...
            </div>
          ) : 'Submit Registration'}
        </motion.button>

      </form>
    </motion.div>
  );
}
