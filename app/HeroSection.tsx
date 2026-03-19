'use client';

import { motion, type Variants } from 'framer-motion';
import { Button } from '@/components/Button';
import HeroBackground from '@/components/HeroBackground';

/* Staggered container for hero children */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.3 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show:  { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

export function HeroSection() {
  return (
    <section className="relative">
      <HeroBackground />

      {/* ── Content overlaid ─────────────────────────────── */}
      <div className="absolute inset-0 z-10 flex items-center overflow-hidden">
        <motion.div
          className="max-w-7xl mx-auto px-6 w-full pt-28 sm:pt-0"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {/* Overline with gold line */}
          <motion.div variants={item} className="flex items-center gap-3 mb-7">
            <div className="w-8 h-px bg-gold" />
            <span className="overline-label">Since 2026 — Parvathy Investment Company</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-600 text-cream leading-[1.05] max-w-5xl mb-7"
          >
            Diversified Investment Solutions for{' '}
            <em
              className="font-display italic not-italic"
              style={{ color: '#C5A256', fontStyle: 'italic' }}
            >
              Long-Term Growth
            </em>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="font-body text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed mb-11"
          >
            A disciplined investment platform focused on responsible capital deployment
            across diversified asset classes — from real estate and structured credit to
            private equity and alternative investments.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-wrap gap-4">
            <Button href="#investments" variant="primary" showArrow>
              Explore Investments
            </Button>
            <Button href="#about-preview" variant="ghost">
              Our Story
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ────────────────────────────── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-3 z-20">
        <motion.div
          className="w-px bg-gold origin-top"
          initial={{ scaleY: 0, height: 40 }}
          animate={{ scaleY: [0, 1, 0] }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: 'easeInOut',
            repeatDelay: 0.4,
          }}
          style={{ height: 40 }}
        />
        <motion.span
          className="font-body text-[10px] tracking-[0.25em] uppercase text-gold/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4, delay: 0.2 }}
        >
          Scroll
        </motion.span>
      </div>
    </section>
  );
}
