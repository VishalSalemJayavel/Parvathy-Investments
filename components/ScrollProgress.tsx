'use client';

import { useScroll, useSpring, motion } from 'framer-motion';

/* Thin gold line at the very top tracking scroll position — Apple style. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[200] origin-left pointer-events-none"
      style={{
        scaleX,
        height: '2px',
        background: 'linear-gradient(90deg, #C5A256 0%, #D4B978 60%, rgba(197,162,86,0.4) 100%)',
      }}
    />
  );
}
