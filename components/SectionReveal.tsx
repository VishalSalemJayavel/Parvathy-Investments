'use client';

import { motion, type Variants } from 'framer-motion';
import { ReactNode } from 'react';

/* Apple-grade cubic-bezier — sharp expo-out, very confident */
const APPLE_EASE = [0.16, 1, 0.3, 1] as const;

interface SectionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: boolean;
  /** Direction the element slides in from. Default: 'up' */
  from?: 'up' | 'down' | 'left' | 'right' | 'none';
}

function getInitial(from: SectionRevealProps['from']) {
  const base = { opacity: 0, filter: 'blur(6px)' };
  switch (from) {
    case 'up':    return { ...base, y: 56 };
    case 'down':  return { ...base, y: -40 };
    case 'left':  return { ...base, x: -48 };
    case 'right': return { ...base, x: 48 };
    case 'none':  return { ...base };
    default:      return { ...base, y: 56 };
  }
}

function getVisible(from: SectionRevealProps['from']) {
  const base = { opacity: 1, filter: 'blur(0px)' };
  switch (from) {
    case 'left':
    case 'right': return { ...base, x: 0 };
    case 'up':
    case 'down':  return { ...base, y: 0 };
    case 'none':  return base;
    default:      return { ...base, y: 0 };
  }
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09 },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 48, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: APPLE_EASE },
  },
};

/** Wraps children in a scroll-triggered Apple-style reveal. */
export function SectionReveal({
  children,
  className = '',
  delay = 0,
  stagger = false,
  from = 'up',
}: SectionRevealProps) {
  if (stagger) {
    return (
      <motion.div
        className={className}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={getInitial(from)}
      whileInView={getVisible(from)}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.85, ease: APPLE_EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/** Used as direct child of a stagger SectionReveal. */
export function StaggerItem({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={childVariants}>
      {children}
    </motion.div>
  );
}
