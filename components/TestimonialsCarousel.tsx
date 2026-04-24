'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { SectionReveal } from './SectionReveal';
import { SectionHeader } from './SectionHeader';

/* ─── Data ───────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: 'James Mitchell',
    location: 'New York, NY',
    initials: 'JM',
    stars: 5,
    review:
      'Working with Parvathy Investment Company has been one of the best financial decisions I have made. Their disciplined approach to capital deployment gave me confidence from day one. The transparency and structured communication set them apart from every other firm I have worked with.',
  },
  {
    name: 'Sarah Williams',
    location: 'Austin, TX',
    initials: 'SW',
    stars: 5,
    review:
      'I was looking for a long-term investment partner, not just a fund manager. Parvathy genuinely treats your capital as a responsibility. Three years in and my portfolio is exactly where we planned it to be. That kind of consistency is rare.',
  },
  {
    name: 'Robert Anderson',
    location: 'Chicago, IL',
    initials: 'RA',
    stars: 5,
    review:
      'Their EB-5 program guidance was exceptional. The team walked us through every step with complete transparency and professionalism. I felt genuinely informed and protected throughout the entire process.',
  },
  {
    name: 'Jennifer Thompson',
    location: 'San Francisco, CA',
    initials: 'JT',
    stars: 5,
    review:
      'As a high-net-worth investor, I have worked with many firms. Parvathy stands out for their integrity and the quality of structured opportunities they provide. Their evaluation process is rigorous — which is exactly what I want guarding my capital.',
  },
  {
    name: 'Michael Davis',
    location: 'Dallas, TX',
    initials: 'MD',
    stars: 5,
    review:
      'The team declined an investment I was excited about — and they were completely right. That kind of disciplined judgment, prioritising my long-term interests above a quick return, earns real and lasting trust.',
  },
  {
    name: 'Karen Johnson',
    location: 'Boston, MA',
    initials: 'KJ',
    stars: 5,
    review:
      'From the first conversation to ongoing quarterly updates, the professionalism has been consistent. My family office has committed additional capital this year because the results have matched every promise made at the start.',
  },
  {
    name: 'David Carter',
    location: 'Seattle, WA',
    initials: 'DC',
    stars: 5,
    review:
      'The diversified exposure across real estate and secured credit has performed steadily through a volatile market. I appreciate how clearly they communicate risk alongside opportunity — no sugarcoating, just honest analysis.',
  },
  {
    name: 'Linda Martinez',
    location: 'Miami, FL',
    initials: 'LM',
    stars: 5,
    review:
      'I came to Parvathy as an international investor navigating U.S. investment structures for the first time. They made the process approachable, legally sound, and ultimately very rewarding. I have since referred two close colleagues.',
  },
];

const DURATION = 5500;
const EASE = [0.16, 1, 0.3, 1] as const;

/* ─── Animated stars — each star pops in on card change ─────────── */
function AnimatedStars({ count, animKey }: { count: number; animKey: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.span
          key={`${animKey}-${i}`}
          initial={{ opacity: 0, scale: 0, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: i * 0.07, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          <Star
            size={18}
            className={i < count ? 'fill-gold text-gold' : 'fill-transparent text-white/20'}
            strokeWidth={1.5}
          />
        </motion.span>
      ))}
    </div>
  );
}

/* ─── Card slide variants ────────────────────────────────────────── */
const cardVariants = {
  enter: (d: number) => ({
    x: d > 0 ? 72 : -72,
    opacity: 0,
    scale: 0.96,
    filter: 'blur(4px)',
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
  },
  exit: (d: number) => ({
    x: d > 0 ? -72 : 72,
    opacity: 0,
    scale: 0.96,
    filter: 'blur(4px)',
  }),
};

const cardTransition = { duration: 0.55, ease: EASE };

/* ─── Component ──────────────────────────────────────────────────── */
export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = TESTIMONIALS.length;

  const go = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((c) => (c + dir + total) % total);
    },
    [total],
  );

  /* ── Progress bar + auto-advance ─────────────────────────────── */
  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const pct = Math.min(((now - start) / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    const timer = setTimeout(() => go(1), DURATION);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [current, paused, go]);

  const t = TESTIMONIALS[current];

  return (
    <section
      className="relative bg-navy overflow-hidden py-24 md:py-32"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Background decorations ──────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gold ambient glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: '900px',
            height: '500px',
            background: 'radial-gradient(ellipse, rgba(197,162,86,0.07) 0%, transparent 65%)',
          }}
        />
        {/* Top separator */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
        {/* Bottom separator */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/6 to-transparent" />
        {/* Giant decorative quote mark */}
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 font-display leading-none select-none pointer-events-none text-gold"
          style={{ fontSize: 'clamp(220px, 30vw, 420px)', opacity: 0.035, fontStyle: 'italic' }}
        >
          &ldquo;
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* ── Section header ───────────────────────────────────── */}
        <SectionReveal className="mb-14 text-center">
          <SectionHeader
            overline="Investor Reviews"
            title="What Our Investors Say"
            subtitle="Hear from the investors who have trusted us with their capital."
            align="center"
            light
          />
        </SectionReveal>

        {/* ── Card row: arrow — card — arrow ───────────────────── */}
        <SectionReveal delay={0.15} from="up" className="flex items-center gap-3 md:gap-5">
          {/* Prev */}
          <motion.button
            onClick={() => go(-1)}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(197,162,86,1)' }}
            whileTap={{ scale: 0.92 }}
            aria-label="Previous review"
            className="flex-shrink-0 w-11 h-11 rounded-full border border-gold/35 flex items-center justify-center text-gold transition-colors duration-300"
            style={{ color: '#C5A256' }}
          >
            <ChevronLeft size={20} strokeWidth={2} />
          </motion.button>

          {/* Card */}
          <div className="flex-1 min-w-0 overflow-hidden rounded-sm">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={cardTransition}
                className="bg-navy-mid border border-white/8 rounded-sm px-7 md:px-12 py-9 md:py-12 shadow-[0_20px_60px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.04)]"
              >
                {/* Stars */}
                <AnimatedStars count={t.stars} animKey={current} />

                {/* Review text */}
                <motion.p
                  className="font-display text-xl md:text-2xl lg:text-[1.65rem] font-400 italic text-cream leading-relaxed mt-6 mb-9"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18, duration: 0.5, ease: 'easeOut' }}
                >
                  &ldquo;{t.review}&rdquo;
                </motion.p>

                {/* Divider */}
                <motion.div
                  className="h-px bg-gradient-to-r from-gold/40 via-gold/20 to-transparent mb-6"
                  initial={{ scaleX: 0, originX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: EASE }}
                />

                {/* Author */}
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.45, ease: 'easeOut' }}
                >
                  <div className="w-11 h-11 rounded-full bg-gold/12 border border-gold/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-base font-600 text-gold leading-none">
                      {t.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-body font-600 text-cream text-sm leading-tight">{t.name}</p>
                    <p className="font-body text-xs text-gold/65 mt-0.5">{t.location}</p>
                  </div>
                  {/* Counter badge */}
                  <div className="ml-auto font-body text-xs text-white/20 tabular-nums">
                    {String(current + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next */}
          <motion.button
            onClick={() => go(1)}
            whileHover={{ scale: 1.1, backgroundColor: 'rgba(197,162,86,1)' }}
            whileTap={{ scale: 0.92 }}
            aria-label="Next review"
            className="flex-shrink-0 w-11 h-11 rounded-full border border-gold/35 flex items-center justify-center text-gold transition-colors duration-300"
            style={{ color: '#C5A256' }}
          >
            <ChevronRight size={20} strokeWidth={2} />
          </motion.button>
        </SectionReveal>

        {/* ── Progress bar + dots ───────────────────────────────── */}
        <SectionReveal delay={0.25} from="up" className="mt-8 flex flex-col items-center gap-4">
          {/* Thin progress bar */}
          <div className="w-40 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold to-gold-light rounded-full"
              style={{ width: `${progress}%`, transition: 'none' }}
            />
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i);
                }}
                aria-label={`Go to review ${i + 1}`}
                className="p-1 cursor-pointer"
              >
                <motion.div
                  animate={{
                    width: i === current ? 24 : 6,
                    backgroundColor:
                      i === current ? '#C5A256' : 'rgba(197,162,86,0.22)',
                  }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="h-1.5 rounded-full"
                />
              </button>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
