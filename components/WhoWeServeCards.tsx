'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { User, Briefcase, Globe } from 'lucide-react';
import Image from 'next/image';

const ICONS: Record<string, React.ReactNode> = {
  User:      <User      size={22} strokeWidth={1.6} />,
  Briefcase: <Briefcase size={22} strokeWidth={1.6} />,
  Globe:     <Globe     size={22} strokeWidth={1.6} />,
};

interface CardProps {
  title: string;
  description: string;
  icon: string;
  image?: string;
  index: number;
}

function Card({ title, description, icon, image, index }: CardProps) {
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
      className="relative overflow-hidden rounded-sm border border-gray-200 bg-white cursor-default group"
      onMouseMove={handleMouseMove}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      animate={{ y: hovered ? -6 : 0, boxShadow: hovered ? '0 20px 48px rgba(11,29,58,0.12)' : '0 0px 0px rgba(0,0,0,0)' }}
    >
      {/* ── Cursor-tracking radial glow ───────────────────────────── */}
      <div
        className="pointer-events-none absolute -inset-px rounded-sm opacity-0 transition-opacity duration-500 group-hover:opacity-100 z-10"
        style={{
          background: hovered
            ? `radial-gradient(circle 280px at ${mousePos.x}px ${mousePos.y}px, rgba(197,162,86,0.08) 0%, rgba(197,162,86,0.03) 40%, transparent 65%)`
            : 'none',
        }}
      />

      {/* ── Gold top border sweep ──────────────────────────────────── */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold via-gold-light to-transparent origin-left z-20"
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      />

      {/* ── Border glow ───────────────────────────────────────────── */}
      <motion.div
        className="absolute inset-0 rounded-sm pointer-events-none z-10"
        animate={{ borderColor: hovered ? 'rgba(197,162,86,0.35)' : 'rgba(229,231,235,1)' }}
        style={{ border: '1px solid rgba(229,231,235,1)' }}
        transition={{ duration: 0.3 }}
      />

      {/* ── Photo header ──────────────────────────────────────────── */}
      {image && (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/15" />
        </div>
      )}

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className={`relative z-10 p-8 ${image ? 'pt-5' : ''}`}>
        {/* Icon box */}
        <motion.div
          className="w-14 h-14 rounded-sm flex items-center justify-center mb-6"
          animate={{
            backgroundColor: hovered ? '#0B1D3A' : '#132B4F',
            scale: hovered ? 1.08 : 1,
          }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        >
          <motion.div
            className="text-gold"
            animate={{ scale: hovered ? 1.15 : 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.04 }}
          >
            {ICONS[icon]}
          </motion.div>
        </motion.div>

        {/* Title */}
        <h3 className="font-display text-2xl font-600 text-navy leading-snug mb-3">
          {title}
        </h3>

        {/* Description */}
        <motion.p
          className="font-body text-base leading-relaxed"
          animate={{ color: hovered ? '#4A4A54' : '#5A5A64' }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>

        {/* Gold accent line */}
        <motion.div
          className="mt-6 h-px bg-gold/30 origin-left"
          animate={{ scaleX: hovered ? 1 : 0.3, opacity: hovered ? 1 : 0.4 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
}

interface WhoWeServeItem {
  title: string;
  description: string;
  icon: string;
  image?: string;
}

export function WhoWeServeCards({ items }: { items: WhoWeServeItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {items.map((item, i) => (
        <Card key={item.title} {...item} index={i} />
      ))}
    </div>
  );
}
