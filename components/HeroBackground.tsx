"use client";

import { useEffect, useRef, useCallback } from "react";

interface HeroBackgroundProps {
  className?: string;
  compact?: boolean;
}

export default function HeroBackground({ className = "", compact = false }: HeroBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const siriRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<HTMLCanvasElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: -1, y: -1 });
  const animRef = useRef<number>(0);

  const init = useCallback(() => {
    const container = containerRef.current;
    const cSiri = siriRef.current;
    const cPart = particlesRef.current;
    if (!container || !cSiri || !cPart) return;

    const W = container.offsetWidth;
    const H = container.offsetHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    cSiri.width = W * dpr;
    cSiri.height = H * dpr;
    const ctxS = cSiri.getContext("2d")!;
    ctxS.scale(dpr, dpr);

    cPart.width = W * dpr;
    cPart.height = H * dpr;
    const ctxP = cPart.getContext("2d")!;
    ctxP.scale(dpr, dpr);

    // ======================================================
    // SIRI ORBS — soft radial gradients that drift and pulse
    // No hard edges. Pure gradient blobs like Apple's effect.
    // ======================================================
    const orbs = [
      {
        cx: W * 0.32, cy: H * 0.4,
        baseR: Math.min(W, H) * 0.35,
        color: [197, 162, 86],
        o: 0.1,
        phase: 0,
        orbitRx: 40, orbitRy: 25,
        orbitSpeed: 0.0004,
        pulseSpeed: 0.0008,
        pulseAmp: 0.12,
      },
      {
        cx: W * 0.62, cy: H * 0.45,
        baseR: Math.min(W, H) * 0.3,
        color: [60, 120, 190],
        o: 0.07,
        phase: 2.0,
        orbitRx: 50, orbitRy: 30,
        orbitSpeed: 0.0006,
        pulseSpeed: 0.001,
        pulseAmp: 0.1,
      },
      {
        cx: W * 0.45, cy: H * 0.55,
        baseR: Math.min(W, H) * 0.4,
        color: [180, 150, 70],
        o: 0.06,
        phase: 4.0,
        orbitRx: 30, orbitRy: 35,
        orbitSpeed: 0.0003,
        pulseSpeed: 0.0006,
        pulseAmp: 0.08,
      },
      {
        cx: W * 0.55, cy: H * 0.35,
        baseR: Math.min(W, H) * 0.2,
        color: [100, 160, 220],
        o: 0.06,
        phase: 1.0,
        orbitRx: 35, orbitRy: 20,
        orbitSpeed: 0.0007,
        pulseSpeed: 0.0012,
        pulseAmp: 0.15,
      },
      {
        cx: W * 0.38, cy: H * 0.3,
        baseR: Math.min(W, H) * 0.18,
        color: [210, 180, 100],
        o: 0.09,
        phase: 3.0,
        orbitRx: 20, orbitRy: 25,
        orbitSpeed: 0.0009,
        pulseSpeed: 0.0015,
        pulseAmp: 0.18,
      },
    ];

    // ======================================================
    // PARTICLES — 210 gold, balanced visibility
    // ======================================================
    const N = 210;
    const particles: {
      x: number; y: number; vx: number; vy: number;
      baseS: number; o: number; pulse: number;
    }[] = [];

    for (let i = 0; i < N; i++) {
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        baseS: Math.random() * 1.8 + 0.5,
        o: Math.random() * 0.35 + 0.1,
        pulse: Math.random() * Math.PI * 2,
      });
    }

    const CONNECT_DIST = 130;
    const CONNECT_DIST_SQ = CONNECT_DIST * CONNECT_DIST;
    let t = 0;

    // ======================================================
    // ANIMATION LOOP
    // ======================================================
    function draw() {
      t += 1;

      // ---- SIRI ORBS ----
      ctxS.clearRect(0, 0, W, H);

      orbs.forEach((orb) => {
        const x = orb.cx + Math.cos(t * orb.orbitSpeed + orb.phase) * orb.orbitRx;
        const y = orb.cy + Math.sin(t * orb.orbitSpeed * 0.7 + orb.phase) * orb.orbitRy;

        const pulse = 1 + Math.sin(t * orb.pulseSpeed + orb.phase) * orb.pulseAmp;
        const r = orb.baseR * pulse;

        let fx = x, fy = y;
        if (mouseRef.current.x > 0) {
          const dx = mouseRef.current.x - x;
          const dy = mouseRef.current.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 700) {
            const pull = 0.08 * (1 - dist / 700);
            fx = x + dx * pull;
            fy = y + dy * pull;
          }
        }

        const grad = ctxS.createRadialGradient(fx, fy, 0, fx, fy, r);
        grad.addColorStop(0, `rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},${orb.o})`);
        grad.addColorStop(0.25, `rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},${orb.o * 0.7})`);
        grad.addColorStop(0.5, `rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},${orb.o * 0.3})`);
        grad.addColorStop(0.75, `rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},${orb.o * 0.08})`);
        grad.addColorStop(1, `rgba(${orb.color[0]},${orb.color[1]},${orb.color[2]},0)`);
        ctxS.fillStyle = grad;
        ctxS.fillRect(0, 0, W, H);
      });

      // ---- PARTICLES ----
      ctxP.clearRect(0, 0, W, H);
      const mxP = mouseRef.current.x;
      const myP = mouseRef.current.y;

      for (let i = 0; i < N; i++) {
        const pt = particles[i];
        let ax = 0, ay = 0;
        if (mxP > 0) {
          const dx = mxP - pt.x, dy = myP - pt.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 180 && d > 1) {
            ax += (dx / d) * 0.02;
            ay += (dy / d) * 0.02;
          }
        }
        pt.vx += ax;
        pt.vy += ay;
        pt.vx *= 0.998;
        pt.vy *= 0.998;
        pt.x += pt.vx;
        pt.y += pt.vy;
        if (pt.x < -20) pt.x = W + 20;
        if (pt.x > W + 20) pt.x = -20;
        if (pt.y < -20) pt.y = H + 20;
        if (pt.y > H + 20) pt.y = -20;
      }

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dSq = dx * dx + dy * dy;
          if (dSq < CONNECT_DIST_SQ) {
            const d = Math.sqrt(dSq);
            const alpha = 0.06 * (1 - d / CONNECT_DIST);
            ctxP.beginPath();
            ctxP.moveTo(particles[i].x, particles[i].y);
            ctxP.lineTo(particles[j].x, particles[j].y);
            ctxP.strokeStyle = `rgba(197,162,86,${alpha})`;
            ctxP.lineWidth = 0.4;
            ctxP.stroke();
          }
        }
      }

      const tSlow = t * 0.005;
      for (let i = 0; i < N; i++) {
        const pt = particles[i];
        const glow = 0.7 + Math.sin(tSlow * 2 + pt.pulse) * 0.3;
        const s = pt.baseS * (0.85 + glow * 0.15);

        ctxP.beginPath();
        ctxP.arc(pt.x, pt.y, s * 3.5, 0, Math.PI * 2);
        ctxP.fillStyle = `rgba(197,162,86,${pt.o * 0.15 * glow})`;
        ctxP.fill();

        ctxP.beginPath();
        ctxP.arc(pt.x, pt.y, s, 0, Math.PI * 2);
        ctxP.fillStyle = `rgba(197,162,86,${pt.o * glow})`;
        ctxP.fill();

        ctxP.beginPath();
        ctxP.arc(pt.x, pt.y, s * 0.45, 0, Math.PI * 2);
        ctxP.fillStyle = `rgba(255,240,200,${pt.o * 0.5 * glow})`;
        ctxP.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    draw();
  }, []);

  useEffect(() => {
    init();

    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      const r = container.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (x >= 0 && x <= r.width && y >= 0 && y <= r.height) {
        mouseRef.current = { x, y };
        // Directly update spotlight div — no React re-render
        if (spotlightRef.current) {
          spotlightRef.current.style.background = `radial-gradient(700px circle at ${x}px ${y}px, rgba(197,162,86,0.07) 0%, rgba(60,120,190,0.04) 40%, transparent 70%)`;
        }
      } else {
        mouseRef.current = { x: -1, y: -1 };
        if (spotlightRef.current) {
          spotlightRef.current.style.background = 'none';
        }
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1, y: -1 };
      if (spotlightRef.current) {
        spotlightRef.current.style.background = 'none';
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      cancelAnimationFrame(animRef.current);
      init();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [init]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-[#040C1A] ${compact ? "min-h-[420px]" : "min-h-screen"} ${className}`}
    >
      {/* Siri orbs canvas */}
      <canvas ref={siriRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />

      {/* Particles canvas */}
      <canvas ref={particlesRef} className="absolute inset-0 w-full h-full mix-blend-screen" aria-hidden="true" />

      {/* Cursor spotlight — follows mouse directly */}
      <div ref={spotlightRef} className="absolute inset-0 pointer-events-none" />

      {/* Warm center glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 40% 45%, rgba(197,162,86,0.04) 0%, transparent 70%), radial-gradient(ellipse 40% 40% at 65% 55%, rgba(80,140,210,0.03) 0%, transparent 50%)",
        }}
      />

      {/* Top and bottom depth fade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(4,12,26,0.3) 0%, transparent 20%, transparent 60%, #040C1A 100%)",
        }}
      />

    </div>
  );
}
