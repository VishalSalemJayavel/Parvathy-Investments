'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '@/lib/constants';

const NAV_ITEMS = NAV_LINKS.filter((l) => l.href !== '/contact');

const navEntrance = {
  hidden: { opacity: 0, y: -22 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: 1,
          y: 0,
          backgroundColor: scrolled ? 'rgba(6, 16, 31, 0.96)' : 'rgba(0,0,0,0)',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(0px)',
          borderBottomColor: scrolled ? 'rgba(197,162,86,0.12)' : 'rgba(197,162,86,0)',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
        }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div
          className="max-w-7xl mx-auto px-6 flex items-center justify-between"
          style={{ paddingTop: scrolled ? '10px' : '18px', paddingBottom: scrolled ? '10px' : '18px', transition: 'padding 0.4s ease' }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/" className="flex items-center gap-3 shrink-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              <Image
                src="/logo.png"
                alt="Parvathy Investments"
                width={160}
                height={64}
                className="h-11 w-auto rounded-lg"
                priority
              />
            </Link>
          </motion.div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((link, i) => {
              const active = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  custom={i}
                  variants={navEntrance}
                  initial="hidden"
                  animate="visible"
                  className="relative"
                >
                  <Link
                    href={link.href}
                    className={`relative font-body text-sm pb-0.5 transition-colors duration-200 group ${
                      active ? 'text-gold' : 'text-gray-300 hover:text-cream'
                    }`}
                  >
                    {link.label}
                    {/* Active gold underline (shared layout) */}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-px bg-gold"
                      />
                    )}
                    {/* Hover underline sweep (inactive only) */}
                    {!active && (
                      <span className="absolute bottom-0 left-0 h-px bg-gold/60 w-0 group-hover:w-full transition-all duration-300 ease-out" />
                    )}
                  </Link>
                </motion.div>
              );
            })}

            {/* Contact: animated gold outline button */}
            <motion.div
              custom={NAV_ITEMS.length}
              variants={navEntrance}
              initial="hidden"
              animate="visible"
            >
              <Link
                href="/contact"
                className="font-body text-sm font-500 px-5 py-2 rounded-sm bg-gold text-navy-deep hover:bg-gold-light hover:shadow-[0_8px_24px_rgba(197,162,86,0.35)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                Contact
              </Link>
            </motion.div>
          </nav>

          {/* Mobile hamburger */}
          <motion.button
            className="md:hidden text-cream p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <X size={24} />
                </motion.span>
              ) : (
                <motion.span
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="block"
                >
                  <Menu size={24} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-navy-deep flex flex-col items-center justify-center gap-10"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            {/* Subtle gold glow at bottom */}
            <div
              className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none opacity-20"
              style={{ background: 'radial-gradient(ellipse, #C5A256 0%, transparent 70%)' }}
            />

            {NAV_LINKS.map((link, i) => {
              const active = pathname === link.href;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    className={`relative font-display text-5xl font-500 transition-colors duration-200 ${
                      active ? 'text-gold' : 'text-cream hover:text-gold'
                    }`}
                  >
                    {link.label}
                    {active && (
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-gold block" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
