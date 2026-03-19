'use client';

import { useEffect, useRef, useState } from 'react';

function useInView(threshold = 0.4) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function CountUp({ target, suffix = '', duration = 900, delay = 0 }: {
  target: number; suffix?: string; duration?: number; delay?: number;
}) {
  const [count, setCount] = useState(0);
  const { ref, inView } = useInView();
  const startedRef = useRef(false);
  const rafRef = useRef<number>(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;
    timerRef.current = setTimeout(() => {
      const startTime = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        setCount(Math.round(eased * target));
        if (progress < 1) rafRef.current = requestAnimationFrame(tick);
        else setCount(target);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, delay);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, [inView, target, duration, delay]);

  return (
    <div ref={ref} className="tabular-nums">
      {count}{suffix}
    </div>
  );
}

interface StatProps {
  value: string | number;
  suffix?: string;
  label: string;
  isNumeric?: boolean;
  delay?: number;
  isLast?: boolean;
}

function Stat({ value, suffix, label, isNumeric, delay = 0, isLast }: StatProps) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col items-center justify-center px-6 py-5 text-center overflow-hidden
        ${!isLast ? 'border-r border-gray-200' : ''}
        hover:bg-navy/[0.02] transition-colors duration-500`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {/* Gold bottom accent line — expands on hover */}
      <div className="absolute bottom-0 left-0 h-0.5 bg-gold w-0 group-hover:w-full transition-all duration-500 ease-out" />

      {/* Value */}
      <div className="font-display text-2xl md:text-3xl font-600 text-navy leading-none mb-3">
        {isNumeric && typeof value === 'number' ? (
          <CountUp target={value} suffix={suffix} duration={800} delay={delay + 100} />
        ) : (
          <span>{value}</span>
        )}
      </div>

      {/* Gold dot */}
      <div
        className="w-1 h-1 rounded-full bg-gold mb-3"
        style={{
          opacity: inView ? 1 : 0,
          transition: `opacity 0.4s ease ${delay + 400}ms`,
        }}
      />

      {/* Label */}
      <div className="font-body text-xs text-gray-400 uppercase tracking-[0.2em]">{label}</div>
    </div>
  );
}

export function InvestmentStats() {
  return (
    <div className="mt-12 grid grid-cols-3 gap-0 border border-gray-200 rounded-sm overflow-hidden">
      <Stat value={6}          suffix=""   label="Asset Categories"    isNumeric delay={0}   />
      <Stat value={100}        suffix="%"  label="Due Diligence"       isNumeric delay={120} />
      <Stat value="Long-Term"              label="Investment Horizon"            delay={240} isLast />
    </div>
  );
}
