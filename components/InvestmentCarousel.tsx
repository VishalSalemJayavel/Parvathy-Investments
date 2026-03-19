'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface Item {
  number: string;
  title: string;
  description: string;
  href: string;
}

const CARD_HEIGHT = 500;

/* ─── Individual Netflix-style card ─────────────────────────────── */
function NetflixCard({ number, title, description, href }: Item) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-stretch w-full gap-0"
      style={{ height: CARD_HEIGHT }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Left: large hollow number, vertically centred ── */}
      <div className="flex items-center justify-center flex-shrink-0" style={{ width: '28%' }}>
        <span
          className="font-display font-700 select-none pointer-events-none leading-none"
          style={{
            fontSize: 'clamp(60px, 7vw, 110px)',
            WebkitTextStroke: '2.5px rgba(197,162,86,0.6)',
            color: 'transparent',
          }}
        >
          {number}
        </span>
      </div>

      {/* ── Right: blue card ── */}
      <motion.div
        className="relative flex-1 rounded-lg overflow-hidden cursor-default flex flex-col"
        style={{
          background: 'linear-gradient(145deg, #0D1E38 0%, #112244 100%)',
        }}
        animate={{
          boxShadow: hovered
            ? '0 0 0 1px rgba(197,162,86,0.45), 0 12px 48px rgba(0,0,0,0.5)'
            : '0 4px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Gold top sweep on hover */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-gold via-gold-light to-transparent origin-left z-10"
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        <div className="p-8 flex flex-col flex-1">
          {/* Title */}
          <motion.h3
            className="font-display text-3xl font-600 leading-snug mb-5"
            animate={{ color: hovered ? '#D4B978' : '#F8F6F1' }}
            transition={{ duration: 0.25 }}
          >
            {title}
          </motion.h3>

          {/* Description */}
          <p className="font-body text-base text-gray-400 leading-relaxed flex-1">
            {description}
          </p>

          {/* Bottom: accent line + Learn More */}
          <div>
            <div className="h-px bg-gold/15 mb-5" />
            <Link
              href={href}
              className="inline-flex items-center gap-2 text-sm font-600 uppercase tracking-wider text-gold border border-gold/35 px-5 py-2.5 rounded-sm hover:bg-gold hover:text-navy-deep transition-colors duration-200"
            >
              Learn More <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Carousel shell ─────────────────────────────────────────────── */
const PER_PAGE = 3;
const CARDS_IN_VIEW = 3.1;

export function InvestmentCarousel({ items }: { items: Item[] }) {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(items.length / PER_PAGE);

  const canPrev = page > 0;
  const canNext = page < totalPages - 1;

  const cardW = 100 / CARDS_IN_VIEW;
  const trackW = items.length * cardW;
  const shiftPct = (PER_PAGE * cardW) / trackW * 100;

  return (
    <div className="relative -mx-6">

      {/* ── Always-visible left arrow ──────────────────────────────── */}
      <button
        onClick={() => canPrev && setPage((p) => p - 1)}
        aria-label="Previous"
        className={`
          absolute left-0 top-1/2 -translate-y-1/2 z-30
          w-10 h-32 rounded-r-xl flex items-center justify-center
          transition-all duration-200
          ${canPrev
            ? 'bg-navy-deep/80 backdrop-blur-sm text-white hover:bg-navy-deep hover:text-gold cursor-pointer'
            : 'bg-navy-deep/30 text-white/15 cursor-not-allowed'}
        `}
      >
        <ChevronLeft size={22} strokeWidth={2} />
      </button>

      {/* ── Always-visible right arrow ─────────────────────────────── */}
      <button
        onClick={() => canNext && setPage((p) => p + 1)}
        aria-label="Next"
        className={`
          absolute right-0 top-1/2 -translate-y-1/2 z-30
          w-10 h-32 rounded-l-xl flex items-center justify-center
          transition-all duration-200
          ${canNext
            ? 'bg-navy-deep/80 backdrop-blur-sm text-white hover:bg-navy-deep hover:text-gold cursor-pointer'
            : 'bg-navy-deep/30 text-white/15 cursor-not-allowed'}
        `}
      >
        <ChevronRight size={22} strokeWidth={2} />
      </button>

      {/* Right peek gradient */}
      {canNext && (
        <div className="absolute right-0 top-0 bottom-10 w-24 z-20 pointer-events-none bg-gradient-to-l from-navy-deep via-navy-deep/50 to-transparent" />
      )}

      {/* ── Sliding track ─────────────────────────────────────────── */}
      <div className="overflow-hidden pb-4 px-10">
        <motion.div
          className="flex items-stretch"
          animate={{ x: `-${page * shiftPct}%` }}
          transition={{ type: 'spring', stiffness: 240, damping: 30, mass: 0.85 }}
          style={{ width: `${trackW}%` }}
        >
          {items.map((item) => (
            <div
              key={item.number}
              style={{ width: `${100 / items.length}%` }}
              className="px-2"
            >
              <NetflixCard {...item} />
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── Page dots ─────────────────────────────────────────────── */}
      <div className="flex justify-center items-center gap-3 mt-8">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button key={i} onClick={() => setPage(i)} className="p-1 cursor-pointer">
            <motion.div
              animate={{
                width: i === page ? 28 : 6,
                backgroundColor: i === page ? '#C5A256' : 'rgba(197,162,86,0.28)',
              }}
              transition={{ duration: 0.3 }}
              className="h-1.5 rounded-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
