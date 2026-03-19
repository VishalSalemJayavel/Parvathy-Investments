/* Pure CSS animated ambient orbs — replaces static diagonal stripe patterns.
   Server component: no JS, no canvas. Driven entirely by CSS keyframes. */

export function AnimatedPattern() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Primary gold orb — top-left drift */}
      <div className="pattern-orb-a" />
      {/* Secondary gold orb — bottom-right drift */}
      <div className="pattern-orb-b" />
      {/* Accent blue orb — center wander */}
      <div className="pattern-orb-c" />
    </div>
  );
}
