import { Button } from './Button';

export function PartnerCTA() {
  return (
    <section className="relative bg-navy-deep py-20 md:py-28 overflow-hidden">
      {/* Radial gold glow at bottom */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          width: '600px',
          height: '300px',
          background: 'radial-gradient(ellipse at 50% 100%, rgba(197,162,86,0.22) 0%, transparent 70%)',
        }}
      />
      {/* Subtle top-left glow */}
      <div
        className="absolute top-0 left-0 pointer-events-none opacity-30"
        style={{
          width: '400px',
          height: '200px',
          background: 'radial-gradient(ellipse at 0% 0%, rgba(197,162,86,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-px bg-gold" />
          <span className="overline-label">Get Started</span>
          <div className="w-8 h-px bg-gold" />
        </div>

        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-600 text-cream leading-tight mb-6">
          Partner With Us
        </h2>

        <p className="font-body text-gray-400 text-base md:text-lg leading-relaxed mb-10">
          We welcome conversations with investors who share our long-term perspective and
          commitment to disciplined capital deployment.
        </p>

        <Button href="/contact" variant="primary" showArrow>
          Start a Conversation
        </Button>
      </div>
    </section>
  );
}
