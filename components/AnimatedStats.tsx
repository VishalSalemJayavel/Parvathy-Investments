'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  label: string;
  value: string;
  numeric?: number; // if provided, count up to this
  suffix?: string;
  prefix?: string;  // static text before the counter
  pop?: boolean;    // pop animation instead of count-up
}

function Counter({ target, suffix = '', pop = false, duration = 1800 }: { target: number; suffix?: string; pop?: boolean; duration?: number }) {
  const [count, setCount] = useState(pop ? target : 0);
  const [visible, setVisible] = useState(false);
  const started = useRef(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          if (pop) {
            setTimeout(() => setVisible(true), 100);
          } else {
            setVisible(true);
            const startTime = performance.now();
            const tick = (now: number) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setCount(Math.floor(eased * target));
              if (progress < 1) requestAnimationFrame(tick);
              else setCount(target);
            };
            requestAnimationFrame(tick);
          }
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, pop]);

  if (pop) {
    return (
      <span
        ref={ref}
        style={{
          display: 'inline-block',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.4) translateY(8px)',
          transition: 'opacity 0.5s cubic-bezier(0.34,1.56,0.64,1), transform 0.5s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        {target}{suffix}
      </span>
    );
  }

  return (
    <span ref={ref} style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.3s' }}>
      {count}{suffix}
    </span>
  );
}

const STATS: Stat[] = [
  { label: 'Established', value: '2026' },
  { label: 'Asset Classes', value: '6+', numeric: 6, suffix: '+', pop: true },
  { label: 'Investor Focus', value: 'Global' },
];

export function AnimatedStats() {
  const [globalVisible, setGlobalVisible] = useState(false);
  const globalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = globalRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setGlobalVisible(true); },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-8 grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
      {STATS.map((stat) => (
        <div key={stat.label}>
          <div className="font-display text-3xl font-600 text-navy">
            {stat.numeric !== undefined ? (
              <>{stat.prefix}<Counter target={stat.numeric} suffix={stat.suffix} pop={stat.pop} /></>
            ) : (
              <span
                ref={globalRef}
                style={{
                  opacity: globalVisible ? 1 : 0,
                  transform: globalVisible ? 'translateY(0)' : 'translateY(12px)',
                  transition: 'opacity 0.7s ease, transform 0.7s ease',
                  display: 'inline-block',
                }}
              >
                {stat.value}
              </span>
            )}
          </div>
          <div className="font-body text-xs text-gray-400 mt-1 uppercase tracking-widest">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
}
