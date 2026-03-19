/**
 * SectionGlow — CSS-only animated ambient orbs for any section background.
 * No canvas, no JS. Drop inside any `relative overflow-hidden` section.
 *
 * variant="dark"  → gold + blue (for navy/dark sections)
 * variant="light" → very subtle warm gold (for white/cream sections)
 */
export function SectionGlow({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  if (variant === 'light') {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div style={{
          position: 'absolute',
          top: '-10%', left: '25%',
          width: '55%', height: '80%',
          background: 'radial-gradient(ellipse, rgba(197,162,86,0.055) 0%, transparent 68%)',
          animation: 'siriDrift1 22s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-15%', right: '15%',
          width: '45%', height: '65%',
          background: 'radial-gradient(ellipse, rgba(197,162,86,0.035) 0%, transparent 68%)',
          animation: 'siriDrift2 30s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          top: '30%', left: '-5%',
          width: '35%', height: '55%',
          background: 'radial-gradient(ellipse, rgba(180,150,70,0.025) 0%, transparent 68%)',
          animation: 'siriDrift3 26s ease-in-out infinite',
        }} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Gold orb */}
      <div style={{
        position: 'absolute',
        top: '5%', left: '10%',
        width: '55%', height: '75%',
        background: 'radial-gradient(ellipse, rgba(197,162,86,0.09) 0%, transparent 68%)',
        animation: 'siriDrift1 20s ease-in-out infinite',
      }} />
      {/* Blue orb */}
      <div style={{
        position: 'absolute',
        top: '15%', right: '5%',
        width: '48%', height: '65%',
        background: 'radial-gradient(ellipse, rgba(60,120,190,0.065) 0%, transparent 68%)',
        animation: 'siriDrift2 26s ease-in-out infinite',
      }} />
      {/* Warm accent orb */}
      <div style={{
        position: 'absolute',
        bottom: '0%', left: '35%',
        width: '40%', height: '50%',
        background: 'radial-gradient(ellipse, rgba(180,150,70,0.055) 0%, transparent 68%)',
        animation: 'siriDrift3 32s ease-in-out infinite',
      }} />
    </div>
  );
}
