'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

const TESTIMONIALS = [
  {
    name: 'James Mitchell',
    location: 'New York, NY',
    stars: 5,
    review:
      'Working with Parvathy Investment Company has been one of the best financial decisions I have made. Their disciplined approach to capital deployment gave me confidence from day one. The transparency and structured communication set them apart from every other firm I have worked with.',
  },
  {
    name: 'Sarah Williams',
    location: 'Austin, TX',
    stars: 5,
    review:
      'I was looking for a long-term investment partner, not just a fund manager. Parvathy genuinely treats your capital as a responsibility. Three years in and my portfolio is exactly where we planned it to be. That kind of consistency is rare.',
  },
  {
    name: 'Robert Anderson',
    location: 'Chicago, IL',
    stars: 5,
    review:
      'Their EB-5 program guidance was exceptional. The team walked us through every step with transparency and professionalism that is hard to find in this industry. I felt informed and protected throughout the entire process.',
  },
  {
    name: 'Jennifer Thompson',
    location: 'San Francisco, CA',
    stars: 5,
    review:
      'As a high-net-worth investor, I have worked with many firms. Parvathy stands out for their integrity and the quality of structured opportunities they provide. Their evaluation process is rigorous — which is exactly what I want guarding my capital.',
  },
  {
    name: 'Michael Davis',
    location: 'Dallas, TX',
    stars: 5,
    review:
      'The team declined an investment opportunity I was excited about — and they turned out to be completely right. That kind of disciplined judgment, putting my long-term interests ahead of a quick commission, earns real trust.',
  },
  {
    name: 'Karen Johnson',
    location: 'Boston, MA',
    stars: 5,
    review:
      'From the first conversation to ongoing quarterly updates, the professionalism has been consistent. My family office has committed additional capital this year because the results have matched the promises made at the start.',
  },
  {
    name: 'David Carter',
    location: 'Seattle, WA',
    stars: 5,
    review:
      'The diversified exposure across real estate and secured credit has performed steadily through a volatile market period. I appreciate how clearly they communicate risk alongside opportunity — no sugarcoating, just honest analysis.',
  },
  {
    name: 'Linda Martinez',
    location: 'Miami, FL',
    stars: 5,
    review:
      'I came to Parvathy as an international investor navigating U.S. investment structures for the first time. They made the process approachable, legally sound, and ultimately very rewarding. I have since referred two colleagues.',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < count ? 'fill-gold text-gold' : 'fill-transparent text-gray-600'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = TESTIMONIALS.length;

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + total) % total);
  }, [total]);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % total);
  }, [total]);

  /* auto-advance every 5 s */
  useEffect(() => {
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [next]);

  /* visible indices: previous, current, next (desktop shows 3) */
  const indices = [
    (index - 1 + total) % total,
    index,
    (index + 1) % total,
  ];

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60 }),
  };

  return (
    <section className="py-24 bg-navy-deep relative overflow-hidden">
      {/* Top gold line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(197,162,86,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <SectionHeader
            overline="Investor Reviews"
            title="What Our Investors Say"
            subtitle="Hear from the investors who have trusted us with their capital."
            align="center"
            light
          />
        </div>

        {/* Desktop: 3 cards */}
        <div className="hidden lg:grid grid-cols-3 gap-6 mb-10">
          <AnimatePresence mode="popLayout" custom={direction}>
            {indices.map((idx, pos) => {
              const t = TESTIMONIALS[idx];
              const isCenter = pos === 1;
              return (
                <motion.div
                  key={`${idx}-${pos}`}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className={`rounded-sm p-8 flex flex-col gap-5 border transition-all duration-300 ${
                    isCenter
                      ? 'bg-navy-mid border-gold/30 shadow-[0_8px_40px_rgba(197,162,86,0.12)]'
                      : 'bg-navy/60 border-white/6 opacity-70'
                  }`}
                >
                  <Stars count={t.stars} />
                  <p className="font-body text-sm text-gray-300 leading-relaxed flex-1">
                    &ldquo;{t.review}&rdquo;
                  </p>
                  <div className="border-t border-white/8 pt-5">
                    <p className="font-body font-600 text-cream text-sm">{t.name}</p>
                    <p className="font-body text-xs text-gold/70 mt-0.5">{t.location}</p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Mobile: 1 card */}
        <div className="lg:hidden mb-10 relative overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="bg-navy-mid border border-gold/30 rounded-sm p-7 flex flex-col gap-5 shadow-[0_8px_40px_rgba(197,162,86,0.12)]"
            >
              <Stars count={TESTIMONIALS[index].stars} />
              <p className="font-body text-sm text-gray-300 leading-relaxed">
                &ldquo;{TESTIMONIALS[index].review}&rdquo;
              </p>
              <div className="border-t border-white/8 pt-5">
                <p className="font-body font-600 text-cream text-sm">{TESTIMONIALS[index].name}</p>
                <p className="font-body text-xs text-gold/70 mt-0.5">{TESTIMONIALS[index].location}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6">
          {/* Prev */}
          <button
            onClick={prev}
            aria-label="Previous review"
            className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-navy-deep transition-all duration-300"
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                aria-label={`Go to review ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === index ? 'bg-gold w-6 h-1.5' : 'bg-white/20 w-1.5 h-1.5'
                }`}
              />
            ))}
          </div>

          {/* Next */}
          <button
            onClick={next}
            aria-label="Next review"
            className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-navy-deep transition-all duration-300"
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
