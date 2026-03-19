'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface InvestmentCardProps {
  number: string;
  title: string;
  description: string;
  href: string;
}

export function InvestmentCard({ number, title, description, href }: InvestmentCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-lg overflow-hidden group h-full flex flex-col cursor-default"
      style={{ background: 'linear-gradient(145deg, #0D1E38 0%, #112244 100%)' }}
      onMouseMove={handleMouseMove}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      animate={{ y: hovered ? -5 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
    >
      {/* ── Cursor-tracking radial glow ───────────────────────────── */}
      <div
        className="pointer-events-none absolute -inset-px rounded-lg opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: hovered
            ? `radial-gradient(circle 300px at ${mousePos.x}px ${mousePos.y}px, rgba(197,162,86,0.12) 0%, rgba(197,162,86,0.05) 35%, rgba(197,162,86,0.02) 55%, transparent 70%)`
            : 'none',
        }}
      />

      {/* ── Border ────────────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 rounded-lg pointer-events-none"
        animate={{ borderColor: hovered ? 'rgba(197,162,86,0.45)' : 'rgba(197,162,86,0.12)' }}
        style={{ border: '1px solid rgba(197,162,86,0.12)' }}
        transition={{ duration: 0.3 }}
      />

      {/* ── Top gold line sweep ────────────────────────────────────── */}
      <motion.div
        className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-gold via-gold-light to-transparent origin-left"
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="relative z-10 p-6 flex flex-col h-full">
        {/* Number badge */}
        <div className="flex items-center gap-2 mb-5">
          <motion.div
            className="h-px bg-gold/60 origin-left"
            animate={{ width: hovered ? '28px' : '20px' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
          <span className="font-body text-[11px] font-600 tracking-[0.22em] uppercase text-gold/70">
            {number}
          </span>
        </div>

        {/* Title */}
        <motion.h3
          className="font-display text-xl font-600 leading-snug mb-3"
          animate={{ color: hovered ? '#D4B978' : '#F8F6F1' }}
          transition={{ duration: 0.3 }}
        >
          {title}
        </motion.h3>

        {/* Description */}
        <motion.p
          className="font-body text-sm leading-relaxed flex-1"
          animate={{ color: hovered ? 'rgba(255,255,255,0.65)' : 'rgba(255,255,255,0.42)' }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>

        {/* Learn More */}
        <Link href={href} className="mt-6 pt-5 border-t border-white/[0.06] inline-flex items-center gap-2.5 w-fit">
          <motion.div
            className="h-px bg-gold/50"
            animate={{ width: hovered ? '28px' : '16px' }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
          <motion.span
            className="font-body text-[11px] tracking-widest uppercase"
            animate={{ color: hovered ? '#C5A256' : 'rgba(197,162,86,0.45)' }}
            transition={{ duration: 0.2 }}
          >
            Learn More
          </motion.span>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="text-gold"
          >
            <ArrowRight size={13} strokeWidth={2} />
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
}
