export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-deep">
      {/* Outer pulsing ring */}
      <div className="relative flex items-center justify-center">
        <div
          className="absolute w-16 h-16 rounded-full border border-gold/20 animate-ping"
          style={{ animationDuration: '1.4s' }}
        />
        <div
          className="absolute w-20 h-20 rounded-full border border-gold/10 animate-ping"
          style={{ animationDuration: '1.8s', animationDelay: '0.2s' }}
        />

        {/* PI badge */}
        <div className="relative w-12 h-12 bg-gold rounded-sm flex items-center justify-center shadow-[0_0_24px_rgba(197,162,86,0.4)]">
          <span
            className="font-display font-700 text-navy-deep leading-none"
            style={{ fontSize: '1.25rem' }}
          >
            PI
          </span>
        </div>
      </div>

      {/* Tagline */}
      <p
        className="absolute bottom-1/3 font-body text-xs text-gray-600 tracking-[0.3em] uppercase"
      >
        Parvathy Investments
      </p>
    </div>
  );
}
