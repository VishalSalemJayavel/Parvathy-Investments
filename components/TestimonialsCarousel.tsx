'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { SectionReveal } from './SectionReveal';
import { SectionHeader } from './SectionHeader';

/* ─── Data ───────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    name: 'Varun',
    location: 'Seattle, WA',
    initials: 'VT',
    stars: 4,
    review:
      'I have been investing with Parvathy Investment Company and the experience has been excellent from start to finish. They are coordinating and genuinely helpful,  every question I had was answered promptly and clearly. I always felt informed and never had to chase anyone for updates. Most importantly, my returns were delivered on time, exactly as expected. Very satisfied and would recommend them to anyone looking for a reliable investment partner.',
  },
  {
    name: 'Karthik Nair',
    location: 'San Jose, CA',
    initials: 'KN',
    stars: 5,
    review:
      'Their EB-5 guidance was thorough and professional. Every step was clearly explained, and the team was responsive throughout the entire process. Three years in, my investment has performed exactly as projected.',
  },
  {
    name: 'Aakash Mehta',
    location: 'Fremont, CA',
    initials: 'AM',
    stars: 5,
    review:
      'From the first conversation to quarterly updates, the level of professionalism has been remarkable. My family office committed additional capital this year because every commitment Parvathy made was matched by results.',
  },
  {
    name: 'Santhosh Kumar',
    location: 'Edison, NJ',
    initials: 'SK',
    stars: 5,
    review:
      'As an NRI investor navigating U.S. real estate structures for the first time, Parvathy made the entire process approachable and legally sound. I felt supported every step of the way and have since referred two colleagues.',
  },
  {
    name: 'Suresh',
    location: 'Alpharetta, GA',
    initials: 'SA',
    stars: 5,
    review:
      'Parvathy has been an exceptional partner in growing my portfolio. Their disciplined approach and complete transparency gave me confidence from the very first meeting. I have recommended them to several friends and family members without hesitation.',
  },
  {
    name: 'Rohan',
    location: 'Nashville, TN',
    initials: 'RO',
    stars: 5,
    review:
      'I have worked with several investment firms over the years and Parvathy is in a different league. Their structured approach, honest reporting, and genuine care for investor outcomes make them the only firm I trust with long-term capital.',
  },
  {
    name: 'Vikram',
    location: 'Houston, TX',
    initials: 'VI',
    stars: 5,
    review:
      'What sets Parvathy apart is their integrity. They turned down a deal I was eager to pursue because the risk profile did not meet their standards. That judgment, prioritizing my long-term interest over a quick close, earned my complete trust.',
  },
  {
    name: 'Arjun',
    location: 'Denver, CO',
    initials: 'AR',
    stars: 5,
    review:
      'Parvathy stands out for the rigor of their underwriting and the quality of structured opportunities they bring to investors. Their evaluation process is exactly what I want protecting my capital.',
  },
  {
    name: 'Rahul',
    location: 'Frisco, TX',
    initials: 'RA',
    stars: 4,
    review:
      'Strong returns and a professional team. The onboarding process took slightly longer than expected, but once we were up and running the experience has been excellent. My portfolio has grown steadily and reporting is clear.',
  },
];

const N = TESTIMONIALS.length;
const DURATION = 5000;

/* ─── Star row ───────────────────────────────────────────────────── */
function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < count ? 'fill-gold text-gold' : 'fill-transparent text-white/20'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

/* ─── Component ──────────────────────────────────────────────────── */
export function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(3);
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  /* Responsive visible card count */
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) setVisible(1);
      else if (window.innerWidth < 1024) setVisible(2);
      else setVisible(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const maxIndex = Math.max(0, N - visible);

  /* Clamp current when visible changes (e.g. resize) */
  useEffect(() => {
    setCurrent((c) => Math.min(c, maxIndex));
  }, [maxIndex]);

  const go = useCallback(
    (dir: number) => {
      setCurrent((c) => {
        const next = c + dir;
        if (next < 0) return maxIndex;        // wrap backward
        if (next > maxIndex) return 0;         // wrap forward
        return next;
      });
    },
    [maxIndex],
  );

  /* Auto-advance with progress bar */
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

  /*
   * Track geometry (same formula regardless of visible count):
   *   trackWidth  = (N / visible) * 100% of container
   *   translateX  = -(current * 100 / N)% of track  ← moves exactly 1 card per step
   */
  const trackW = (N / visible) * 100;
  const translateX = -(current * 100) / N;

  return (
    <section
      className="py-14 md:py-16 bg-navy relative overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Top separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          width: '700px',
          height: '400px',
          background: 'radial-gradient(ellipse, rgba(197,162,86,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <SectionReveal className="mb-10 text-center">
          <SectionHeader
            overline="Investor Reviews"
            title="What Our Investors Say"
            align="center"
            light
          />
        </SectionReveal>

        {/* ── Sliding track ──────────────────────────────────────── */}
        <SectionReveal delay={0.1}>
          <div className="overflow-hidden -mx-3">
            <motion.div
              className="flex items-stretch"
              animate={{ x: `${translateX}%` }}
              transition={{ type: 'spring', stiffness: 260, damping: 30, mass: 0.85 }}
              style={{ width: `${trackW}%` }}
            >
              {TESTIMONIALS.map((t, i) => {
                const isActive = i >= current && i < current + visible;
                const isFirst = i === current;
                return (
                  <div
                    key={t.name}
                    style={{ width: `${100 / N}%` }}
                    className="px-3"
                  >
                    <motion.div
                      animate={{
                        opacity: isActive ? 1 : 0.45,
                        scale: isActive ? 1 : 0.97,
                      }}
                      transition={{ duration: 0.35 }}
                      className={`h-full flex flex-col gap-4 rounded-sm p-5 md:p-6 border transition-colors duration-300 ${
                        isFirst
                          ? 'bg-navy-mid border-gold/35 shadow-[0_6px_28px_rgba(197,162,86,0.10)]'
                          : 'bg-navy/70 border-white/7'
                      }`}
                    >
                      {/* Stars */}
                      <StarRow count={t.stars} />

                      {/* Review */}
                      <p className="font-body text-sm text-gray-300 leading-relaxed flex-1">
                        &ldquo;{t.review}&rdquo;
                      </p>

                      {/* Author */}
                      <div className="flex items-center gap-3 pt-3 border-t border-white/8">
                        <div className="w-8 h-8 rounded-full bg-gold/12 border border-gold/30 flex items-center justify-center flex-shrink-0">
                          <span className="font-display text-xs font-600 text-gold leading-none">
                            {t.initials}
                          </span>
                        </div>
                        <div>
                          <p className="font-body font-600 text-cream text-xs leading-tight">
                            {t.name}
                          </p>
                          <p className="font-body text-[11px] text-gold/55 mt-0.5">
                            {t.location}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </SectionReveal>

        {/* ── Controls ───────────────────────────────────────────── */}
        <div className="mt-8 flex items-center justify-center gap-5">
          {/* Prev */}
          <motion.button
            onClick={() => go(-1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Previous"
            className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-navy-deep transition-colors duration-250"
          >
            <ChevronLeft size={16} strokeWidth={2.5} />
          </motion.button>

          {/* Dots + progress bar */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1.5">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to ${i + 1}`}
                  className="p-0.5"
                >
                  <motion.div
                    animate={{
                      width: i === current ? 20 : 5,
                      backgroundColor:
                        i === current ? '#C5A256' : 'rgba(197,162,86,0.22)',
                    }}
                    transition={{ duration: 0.25 }}
                    className="h-1 rounded-full"
                  />
                </button>
              ))}
            </div>
            {/* Progress bar */}
            <div className="w-28 h-px bg-white/8 rounded-full overflow-hidden">
              <div
                className="h-full bg-gold rounded-full"
                style={{ width: `${progress}%`, transition: 'none' }}
              />
            </div>
          </div>

          {/* Next */}
          <motion.button
            onClick={() => go(1)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Next"
            className="w-9 h-9 rounded-full border border-gold/30 flex items-center justify-center text-gold hover:bg-gold hover:text-navy-deep transition-colors duration-250"
          >
            <ChevronRight size={16} strokeWidth={2.5} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
