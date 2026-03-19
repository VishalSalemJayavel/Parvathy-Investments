'use client';

import { motion } from 'framer-motion';

const PILLARS = [
  {
    n: '01', label: 'Patience', sub: 'Long-term perspective',
    icon: (
      /* Hourglass — sand drips slowly */
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        {/* Top triangle */}
        <motion.path
          d="M10 8 L30 8 L20 20 Z"
          stroke="#C5A256" strokeWidth="1.2" strokeLinejoin="round" strokeOpacity="0.6"
          animate={{ strokeOpacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Bottom triangle */}
        <motion.path
          d="M10 32 L30 32 L20 20 Z"
          stroke="#C5A256" strokeWidth="1.2" strokeLinejoin="round" strokeOpacity="0.6"
          animate={{ strokeOpacity: [0.85, 0.4, 0.85] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Top cap & bottom cap */}
        <line x1="9" y1="8" x2="31" y2="8" stroke="#C5A256" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
        <line x1="9" y1="32" x2="31" y2="32" stroke="#C5A256" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.7" />
        {/* Dripping sand dot */}
        <motion.circle
          cx="20" cy="22"
          r="1.5"
          fill="#C5A256" fillOpacity="0.8"
          animate={{ cy: [20, 29, 20], opacity: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeIn' }}
        />
      </svg>
    ),
  },
  {
    n: '02', label: 'Discipline', sub: 'Consistent standards',
    icon: (
      /* Target / bullseye — rings pulse outward */
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <motion.circle cx="20" cy="20" r="13"
          stroke="#C5A256" strokeWidth="1.2" strokeOpacity="0.3"
          animate={{ r: [13, 14, 13], strokeOpacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle cx="20" cy="20" r="8"
          stroke="#C5A256" strokeWidth="1.2" strokeOpacity="0.5"
          animate={{ r: [8, 9, 8], strokeOpacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
        />
        <motion.circle cx="20" cy="20" r="3"
          fill="#C5A256" fillOpacity="0.7"
          animate={{ r: [3, 3.8, 3], fillOpacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
        />
      </svg>
    ),
  },
  {
    n: '03', label: 'Rigor', sub: 'Deep due diligence',
    icon: (
      /* Magnifying glass — scans left-right */
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <motion.g
          animate={{ x: [-2, 2, -2] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          <circle cx="17" cy="17" r="9" stroke="#C5A256" strokeWidth="1.2" strokeOpacity="0.6" />
          {/* Scan line inside lens */}
          <motion.line
            x1="10" y1="17" x2="24" y2="17"
            stroke="#C5A256" strokeWidth="0.8" strokeOpacity="0.4" strokeLinecap="round"
            animate={{ y1: [13, 21, 13], y2: [13, 21, 13] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <line x1="24" y1="24" x2="32" y2="32" stroke="#C5A256" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.8" />
        </motion.g>
      </svg>
    ),
  },
  {
    n: '04', label: 'Alignment', sub: 'Investor-first mindset',
    icon: (
      /* Two rings linking together — pulse overlap */
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <motion.circle
          cx="15" cy="20" r="8"
          stroke="#C5A256" strokeWidth="1.2" strokeOpacity="0.6"
          animate={{ cx: [15, 14, 15], strokeOpacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="25" cy="20" r="8"
          stroke="#C5A256" strokeWidth="1.2" strokeOpacity="0.6"
          animate={{ cx: [25, 26, 25], strokeOpacity: [0.9, 0.5, 0.9] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Overlap glow */}
        <motion.ellipse
          cx="20" cy="20" rx="3" ry="7"
          fill="#C5A256" fillOpacity="0.12"
          animate={{ fillOpacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </svg>
    ),
  },
];

export function PhilosophyPillars() {
  return (
    <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
      {PILLARS.map(({ n, label, sub, icon }, i) => (
        <motion.div
          key={label}
          className="relative overflow-hidden rounded-lg border border-white/8 p-5 cursor-default"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{
            scale: 1.08,
            y: -7,
            borderColor: 'rgba(197,162,86,0.5)',
            backgroundColor: 'rgba(197,162,86,0.07)',
            boxShadow: '0 16px 36px rgba(197,162,86,0.15)',
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ delay: i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], type: 'spring', stiffness: 180, damping: 22, mass: 1.1 }}
          style={{ originX: '50%', originY: '50%' }}
        >
          {/* Shared transition override for hover — slower spring */}
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            style={{ background: 'radial-gradient(ellipse at center, rgba(197,162,86,0.10) 0%, transparent 70%)' }}
          />

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* Animated icon */}
            <div className="mb-3">{icon}</div>
            <div className="font-display text-lg font-600 text-cream leading-tight">{label}</div>
            <div className="font-body text-xs text-gray-600 mt-1 tracking-wide">{sub}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
