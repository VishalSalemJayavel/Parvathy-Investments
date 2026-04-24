import type { Metadata } from 'next';
import { Mail, MapPin, Clock, ArrowRight } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionReveal } from '@/components/SectionReveal';
import { ContactForm } from '@/components/ContactForm';
import { SectionGlow } from '@/components/SectionGlow';
import { AnimatedPattern } from '@/components/AnimatedPattern';
import { COMPANY } from '@/lib/constants';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch with Parvathy Investment Company to discuss investment opportunities and start a conversation about your long-term investment goals.',
  openGraph: {
    type: 'website',
    siteName: 'Parvathy Investment Company',
    title: 'Contact | Parvathy Investment Company',
    description:
      'We welcome conversations with investors who share our commitment to disciplined, long-term investing.',
    url: 'https://parvathyinvestments.com/contact',
  },
};

/* ─── Contact detail row ───────────────────────────────────────── */
function ContactDetail({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="w-11 h-11 rounded-sm bg-gold/10 border border-gold/20 flex items-center justify-center text-gold flex-shrink-0 group-hover:bg-gold group-hover:text-navy-deep transition-all duration-300">
        {icon}
      </div>
      <div>
        <p className="font-body text-[10px] text-gray-500 uppercase tracking-[0.18em] mb-1">
          {label}
        </p>
        {href ? (
          <a
            href={href}
            className="font-body text-cream hover:text-gold transition-colors duration-200"
          >
            {value}
          </a>
        ) : (
          <p className="font-body text-cream">{value}</p>
        )}
      </div>
    </div>
  );
}

/* ─── Investor type pill list ──────────────────────────────────── */
const INVESTOR_TYPES = [
  'Individual Investors',
  'High-Net-Worth Families',
  'Institutional Partners',
  'International Investors',
  'Business Partners',
];

/* ─── Page ─────────────────────────────────────────────────────── */
export default function ContactPage() {
  return (
    <>
      {/* 1 ─ PAGE HERO */}
      <PageHero
        title="Get In Touch"
        subtitle="We welcome conversations with investors who share our commitment to disciplined, long-term investing."
      />

      {/* 2 ─ CONTACT LAYOUT */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <SectionGlow variant="dark" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — contact info */}
            <SectionReveal from="left">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-px bg-gold" />
                <span className="overline-label">Contact Us</span>
              </div>

              <h2 className="font-display text-4xl md:text-5xl font-600 text-cream leading-tight mb-6">
                Let&apos;s Start a<br />Conversation
              </h2>

              <p className="font-body text-base text-gray-400 leading-relaxed mb-10">
                Whether you&apos;re an individual investor, a high-net-worth family, an institution,
                or an international partner, we&apos;re here to discuss how our investment platform
                might align with your goals. Every conversation starts with listening.
              </p>

              {/* Contact details */}
              <div className="space-y-5 mb-10">
                <ContactDetail
                  icon={<Mail size={18} strokeWidth={1.6} />}
                  label="Email"
                  value={COMPANY.email}
                  href={`mailto:${COMPANY.email}`}
                />
                <ContactDetail
                  icon={<MapPin size={18} strokeWidth={1.6} />}
                  label="Location"
                  value={COMPANY.location}
                />
                <ContactDetail
                  icon={<Clock size={18} strokeWidth={1.6} />}
                  label="Response Time"
                  value="Within 2 business days"
                />
              </div>

              {/* Divider */}
              <div className="border-t border-white/10 pt-8 mb-8">
                <p className="font-body text-xs text-gray-500 uppercase tracking-widest mb-4">
                  We work with
                </p>
                <div className="flex flex-wrap gap-2">
                  {INVESTOR_TYPES.map((type) => (
                    <span
                      key={type}
                      className="font-body text-base px-3 py-1.5 rounded-sm border border-white/10 text-gray-400 hover:border-gold/30 hover:text-gold transition-all duration-200"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tagline */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-px bg-gold/50" />
                <p className="font-body text-base text-gray-500 italic">
                  &ldquo;{COMPANY.tagline}&rdquo;
                </p>
              </div>
            </SectionReveal>

            {/* Right — form card */}
            <SectionReveal delay={0.15} from="right">
              <div className="relative bg-navy-mid rounded-sm border border-white/5 overflow-hidden">
                <AnimatedPattern />
                {/* Gold top accent */}
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-gold to-transparent" />

                <div className="relative z-10 p-8 md:p-10">
                  <h3 className="font-display text-2xl font-600 text-cream mb-1">
                    Send Us a Message
                  </h3>
                  <p className="font-body text-base text-gray-500 mb-8">
                    Fill in the form and we&apos;ll be in touch shortly.
                  </p>
                  <ContactForm />
                </div>
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* 3 ─ TESTIMONIALS */}
      <TestimonialsCarousel />

      {/* 4 ─ SIMPLE CLOSING STRIP (lighter alternative to full PartnerCTA) */}
      <section className="bg-navy-deep border-t border-white/5 relative overflow-hidden">
        <SectionGlow variant="dark" />
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="font-display text-xl font-500 text-cream">
              Prefer to learn more first?
            </p>
            <p className="font-body text-base text-gray-500 mt-1">
              Explore our investment platform and approach before reaching out.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a
              href="/investments"
              className="inline-flex items-center gap-2 font-body text-base text-gold border border-gold/40 px-5 py-2.5 rounded-sm hover:border-gold hover:bg-gold/5 transition-all duration-200 group"
            >
              View Investments
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </a>
            <a
              href="/approach"
              className="inline-flex items-center gap-2 font-body text-base text-gray-400 border border-white/10 px-5 py-2.5 rounded-sm hover:border-white/20 hover:text-cream transition-all duration-200 group"
            >
              Our Approach
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
