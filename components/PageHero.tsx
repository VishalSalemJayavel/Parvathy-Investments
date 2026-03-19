'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import HeroBackground from '@/components/HeroBackground';

interface PageHeroProps {
  title: string | ReactNode;
  subtitle?: string;
}

function renderTitle(title: string | ReactNode): ReactNode {
  if (typeof title !== 'string') return title;
  // Split on <br/>, <br />, or <br> to render safe line breaks
  const parts = title.split(/<br\s*\/?>/i);
  if (parts.length === 1) return title;
  return (
    <>
      {parts.map((part, i) => (
        <span key={i}>
          {part}
          {i < parts.length - 1 && <br />}
        </span>
      ))}
    </>
  );
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="relative">
      <HeroBackground compact />

      <div className="absolute inset-0 z-10 flex items-end overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 pb-12 md:pb-16 pt-32 md:pt-40 w-full">
          <motion.span
            className="overline-label mb-4 block"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            Parvathy Investment Company
          </motion.span>

          <motion.h1
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-600 text-cream leading-tight max-w-4xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            {renderTitle(title)}
          </motion.h1>

          {subtitle && (
            <motion.p
              className="font-body text-gray-400 text-base md:text-lg mt-5 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          )}

          {/* Gold accent line */}
          <motion.div
            className="mt-8 h-px bg-gold origin-left"
            initial={{ scaleX: 0, width: 64 }}
            animate={{ scaleX: 1, width: 64 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.35 }}
            style={{ width: 64 }}
          />
        </div>
      </div>
    </section>
  );
}
