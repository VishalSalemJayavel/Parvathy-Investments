import Link from 'next/link';
import { Navbar } from '@/components/Navbar';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-navy-deep flex items-center justify-center px-6">
        <div className="text-center max-w-lg mx-auto">
          {/* Gold-outlined 404 */}
          <p
            className="font-display font-700 leading-none select-none mb-6"
            style={{
              fontSize: 'clamp(6rem, 20vw, 10rem)',
              color: 'transparent',
              WebkitTextStroke: '2px #C5A256',
            }}
          >
            404
          </p>

          {/* Heading */}
          <h1 className="font-display text-3xl md:text-4xl font-600 text-cream mb-4 leading-tight">
            Page Not Found
          </h1>

          {/* Subtitle */}
          <p className="font-body text-base text-gray-400 leading-relaxed mb-10">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>

          {/* Gold divider */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="flex-1 max-w-[60px] h-px bg-gold/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold/60" />
            <div className="flex-1 max-w-[60px] h-px bg-gold/40" />
          </div>

          {/* Return Home button */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body font-500 text-sm tracking-wide rounded-sm bg-gold text-navy-deep px-6 py-3 hover:bg-gold-light hover:shadow-[0_8px_24px_rgba(197,162,86,0.35)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Return Home
          </Link>
        </div>
      </main>
    </>
  );
}
