'use client';

import { motion } from 'framer-motion';

/* Animated arrow that draws itself along a TrendingUp path */
function AnimatedArrow() {
  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      className="w-9 h-9"
      initial={{ scale: 0.2, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
    >
      <path
        d="M3 17 L9 11 L13 15 L21 7"
        stroke="#C5A256"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 7 L21 7 L21 11"
        stroke="#C5A256"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export function LayeredIcon() {
  return (
    <div className="relative w-20 h-20 mx-auto mb-6">
      {/* Slow-spinning outer ring with orbiting dot */}
      <motion.div
        className="absolute inset-0 rounded-full border border-gold/50"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gold/60" />
      </motion.div>

      {/* Counter-spinning dashed ring with small dot */}
      <motion.div
        className="absolute inset-2 rounded-full border border-dashed border-gold/35"
        animate={{ rotate: -360 }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-gold/30" />
      </motion.div>

      {/* Pulsing glow */}
      <motion.div
        className="absolute inset-4 rounded-full bg-gold/10"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Icon center — animated arrow */}
      <div className="absolute inset-2 rounded-full bg-navy-deep/70 border border-gold/60 flex items-center justify-center">
        <AnimatedArrow />
      </div>
    </div>
  );
}
