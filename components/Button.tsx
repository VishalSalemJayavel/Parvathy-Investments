'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ReactNode } from 'react';

interface ButtonProps {
  /** primary = gold bg / ghost = white border (dark bg) / ghostGold = gold border (light bg) */
  variant?: 'primary' | 'ghost' | 'ghostGold';
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  showArrow?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
}

export function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  showArrow = false,
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const base =
    'group inline-flex items-center gap-2 font-body font-500 text-sm tracking-wide rounded-sm transition-all duration-300 cursor-pointer select-none';

  const styles = {
    primary:
      'bg-gold text-navy-deep px-6 py-3 hover:bg-gold-light hover:shadow-[0_8px_24px_rgba(197,162,86,0.35)] hover:-translate-y-0.5 active:translate-y-0',
    ghost:
      'border border-white/70 text-white px-6 py-3 hover:border-white hover:bg-white/10 active:bg-white/5',
    ghostGold:
      'border border-gold text-gold px-6 py-3 hover:border-gold-light hover:bg-gold/5 active:bg-gold/10',
  };

  const classes = `${base} ${styles[variant]} ${disabled ? 'opacity-50 pointer-events-none' : ''} ${className}`;

  const inner = (
    <>
      <span>{children}</span>
      {showArrow && (
        <motion.span
          className="flex items-center"
          initial={{ x: 0 }}
          animate={{ x: 0 }}
          whileHover={{ x: 4 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
        >
          <ArrowRight size={15} />
        </motion.span>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} disabled={disabled}>
      {inner}
    </button>
  );
}
