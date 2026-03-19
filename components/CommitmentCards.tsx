'use client';

import { motion } from 'framer-motion';

const CARDS = [
  {
    label: 'Patience',
    sub: 'Never chase returns',
    icon: (
      /* Clock — minute hand rotates slowly */
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        {/* Outer ring */}
        <circle cx="20" cy="20" r="14" stroke="#C5A256" strokeWidth="1.2" strokeOpacity="0.5" />
        {/* Inner tick marks */}
        {[0, 90, 180, 270].map((deg) => (
          <line
            key={deg}
            x1="20" y1="8" x2="20" y2="10"
            stroke="#C5A256" strokeWidth="1.2" strokeOpacity="0.35"
            transform={`rotate(${deg} 20 20)`}
          />
        ))}
        {/* Hour hand — static */}
        <line x1="20" y1="20" x2="20" y2="13" stroke="#C5A256" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.8" />
        {/* Minute hand — animated rotation */}
        <motion.line
          x1="20" y1="20" x2="26" y2="14"
          stroke="#C5A256" strokeWidth="1.2" strokeLinecap="round"
          animate={{ rotate: 360 }}
          transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '20px', originY: '20px' }}
        />
        {/* Center dot */}
        <circle cx="20" cy="20" r="1.5" fill="#C5A256" fillOpacity="0.9" />
      </svg>
    ),
  },
  {
    label: 'Discipline',
    sub: 'Consistent standards',
    icon: (
      /* Shield with pulsing checkmark */
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <motion.path
          d="M20 6 L32 11 L32 20 C32 27 26 33 20 35 C14 33 8 27 8 20 L8 11 Z"
          stroke="#C5A256" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"
          strokeOpacity="0.6"
          animate={{ strokeOpacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.polyline
          points="14,20 18,24 26,16"
          stroke="#C5A256" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
          animate={{ scale: [0.95, 1.05, 0.95], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '20px', originY: '20px' }}
        />
      </svg>
    ),
  },
  {
    label: 'Rigor',
    sub: 'Deep due diligence',
    icon: (
      /* Magnifying glass — zooms subtly */
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        <motion.circle
          cx="17" cy="17" r="9"
          stroke="#C5A256" strokeWidth="1.2" strokeOpacity="0.6"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '17px', originY: '17px' }}
        />
        {/* Inner cross-hair */}
        <line x1="17" y1="12" x2="17" y2="22" stroke="#C5A256" strokeWidth="0.8" strokeOpacity="0.3" />
        <line x1="12" y1="17" x2="22" y2="17" stroke="#C5A256" strokeWidth="0.8" strokeOpacity="0.3" />
        {/* Handle */}
        <motion.line
          x1="24" y1="24" x2="32" y2="32"
          stroke="#C5A256" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8"
          animate={{ x2: [32, 33, 32], y2: [32, 33, 32] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    ),
  },
  {
    label: 'Integrity',
    sub: 'Investor first',
    icon: (
      /* Balance scale — pans gently */
      <svg viewBox="0 0 40 40" fill="none" className="w-10 h-10">
        {/* Centre pole */}
        <line x1="20" y1="8" x2="20" y2="32" stroke="#C5A256" strokeWidth="1.2" strokeOpacity="0.5" />
        {/* Base */}
        <line x1="14" y1="32" x2="26" y2="32" stroke="#C5A256" strokeWidth="1.4" strokeLinecap="round" strokeOpacity="0.6" />
        {/* Beam — rocks left-right */}
        <motion.g
          animate={{ rotate: [0, 6, 0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ originX: '20px', originY: '12px' }}
        >
          <line x1="8" y1="12" x2="32" y2="12" stroke="#C5A256" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.7" />
          {/* Left pan */}
          <line x1="9" y1="12" x2="9" y2="22" stroke="#C5A256" strokeWidth="1" strokeOpacity="0.5" />
          <path d="M5 22 Q9 24 13 22" stroke="#C5A256" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
          {/* Right pan */}
          <line x1="31" y1="12" x2="31" y2="20" stroke="#C5A256" strokeWidth="1" strokeOpacity="0.5" />
          <path d="M27 20 Q31 22 35 20" stroke="#C5A256" strokeWidth="1.2" strokeLinecap="round" strokeOpacity="0.6" />
        </motion.g>
        {/* Top pin */}
        <circle cx="20" cy="8" r="1.5" fill="#C5A256" fillOpacity="0.7" />
      </svg>
    ),
  },
];

function CommitmentCard({
  label, sub, icon, index,
}: { label: string; sub: string; icon: React.ReactNode; index: number }) {
  return (
    <motion.div
      className="relative rounded-full px-4 py-4 overflow-hidden cursor-default"
      style={{ border: '1px solid rgba(255,255,255,0.10)' }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.10,
        y: -6,
        borderColor: 'rgba(197,162,86,0.5)',
        backgroundColor: 'rgba(197,162,86,0.08)',
        boxShadow: '0 12px 32px rgba(197,162,86,0.18)',
      }}
      whileTap={{ scale: 0.97 }}
      transition={{
        delay: index * 0.08,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
        type: 'spring',
        stiffness: 420,
        damping: 18,
        mass: 0.8,
      }}
    >
      {/* Inner glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-full pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
        style={{ background: 'radial-gradient(ellipse at center, rgba(197,162,86,0.12) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 flex items-center gap-3">
        <div className="flex-shrink-0">{icon}</div>
        <div>
          <div className="font-display text-base font-600 text-gold leading-none mb-0.5">{label}</div>
          <div className="font-body text-xs text-gray-500">{sub}</div>
        </div>
      </div>
    </motion.div>
  );
}

export function CommitmentCards() {
  return (
    <div className="grid grid-cols-2 gap-3 mt-10">
      {CARDS.map(({ label, sub, icon }, i) => (
        <CommitmentCard key={label} label={label} sub={sub} icon={icon} index={i} />
      ))}
    </div>
  );
}
