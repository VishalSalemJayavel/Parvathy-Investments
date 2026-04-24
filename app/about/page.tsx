import type { Metadata } from 'next';
import Image from 'next/image';
import { User, Briefcase, Globe } from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionReveal, StaggerItem } from '@/components/SectionReveal';
import { SectionHeader } from '@/components/SectionHeader';
import { PartnerCTA } from '@/components/PartnerCTA';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { SectionGlow } from '@/components/SectionGlow';
import { PhilosophyPillars } from '@/components/PhilosophyPillars';
import { AnimatedStats } from '@/components/AnimatedStats';
import { WHO_WE_SERVE, VALUES, PRINCIPLES, PHILOSOPHY_QUOTE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Parvathy Investment Company — our story, philosophy, and commitment to disciplined, responsible investing for long-term value creation.',
  openGraph: {
    type: 'website',
    siteName: 'Parvathy Investment Company',
    title: 'About Us | Parvathy Investment Company',
    description:
      'Established to create a structured platform for diversified investment opportunities, built on transparency, governance, and long-term investor alignment.',
    url: 'https://parvathyinvestments.com/about',
  },
};

/* ─── Icon map ─────────────────────────────────────────────────── */
const SERVE_ICONS: Record<string, React.ReactNode> = {
  User:      <User      size={22} strokeWidth={1.6} />,
  Briefcase: <Briefcase size={22} strokeWidth={1.6} />,
  Globe:     <Globe     size={22} strokeWidth={1.6} />,
};

/* ─── Placeholder icon for principle cards ─────────────────────── */
const PRINCIPLE_ICONS = [
  /* Thoughtful Opportunity Selection */
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35"/><path d="M11 8v6M8 11h6"/>
  </svg>,
  /* Disciplined Investment Structures */
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
  </svg>,
  /* Responsible Capital Management */
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  </svg>,
  /* Long-Term Investor Alignment */
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>,
];

/* ─── Story card with photo background ─────────────────────────── */
function StoryCard() {
  return (
    <div className="relative rounded-sm overflow-hidden min-h-[380px] flex flex-col justify-between group">
      {/* Photo */}
      <Image
        src="/images/story.jpg"
        alt="Long-term investment growth"
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />

      {/* Dark gradient overlay — heavier at bottom for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/40 to-navy-deep/10" />

      {/* Gold shimmer on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top section: year badge */}
      <div className="relative z-10 p-6 md:p-10">
        <div className="inline-flex items-center gap-3 bg-navy-deep/60 backdrop-blur-sm px-4 py-2 rounded-sm border border-gold/20">
          <div className="w-5 h-px bg-gold flex-shrink-0" />
          <span className="overline-label">Established 2026</span>
        </div>
      </div>

      {/* Bottom section: text content */}
      <div className="relative z-10 p-6 md:p-10">
        <div className="w-10 h-px bg-gold mb-4" />
        <p className="font-display text-2xl font-500 text-cream leading-snug mb-3">
          Built for the Long Term.
        </p>
        <p className="font-body text-sm text-gray-300 leading-relaxed">
          A structured platform for disciplined investors who share our commitment to
          responsible, patient capital deployment.
        </p>
      </div>

      {/* Animated gold border on hover */}
      <div className="absolute inset-0 rounded-sm border border-gold/0 group-hover:border-gold/30 transition-colors duration-500" />
    </div>
  );
}

/* ─── Principle card ────────────────────────────────────────────── */
function PrincipleCard({
  title,
  description,
  iconIndex,
}: {
  title: string;
  description: string;
  iconIndex: number;
}) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-sm p-8 hover:border-gold/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Gold top-border reveal on hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />

      {/* Gold-tinted icon square */}
      <div className="w-14 h-14 rounded-sm bg-gold/10 text-gold flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-navy-deep transition-all duration-300">
        {PRINCIPLE_ICONS[iconIndex]}
      </div>

      <h3 className="font-display text-xl font-600 text-navy mb-3 leading-snug">{title}</h3>
      <p className="font-body text-base text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

/* ─── Who We Serve card ─────────────────────────────────────────── */
function ServeCard({
  title,
  description,
  icon,
  image,
}: {
  title: string;
  description: string;
  icon: string;
  image?: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-sm border border-transparent hover:border-gold/30 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 min-h-[320px] flex flex-col justify-end">
      {/* Background image */}
      {image && (
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      )}
      {!image && <div className="absolute inset-0 bg-navy" />}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/92 via-navy-deep/55 to-navy-deep/15" />

      {/* Gold shimmer on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/6 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10 p-8">
        <div className="w-12 h-12 rounded-sm flex items-center justify-center text-gold mb-5 border border-gold/25 bg-navy-deep/50 backdrop-blur-sm group-hover:border-gold/50 group-hover:bg-gold/15 transition-all duration-300">
          {SERVE_ICONS[icon]}
        </div>
        <h3 className="font-display text-2xl font-600 text-cream mb-3 leading-snug group-hover:text-gold-light transition-colors duration-300">{title}</h3>
        <p className="font-body text-sm text-gray-300 leading-relaxed group-hover:text-gray-200 transition-colors duration-300">{description}</p>
        {/* Gold accent line */}
        <div className="mt-5 h-px bg-gold/25 origin-left scale-x-[0.25] group-hover:scale-x-100 transition-transform duration-500 ease-out" />
      </div>
    </div>
  );
}

/* ─── Value item ────────────────────────────────────────────────── */
function ValueItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="group flex gap-4 py-5 border-b border-gray-300/60 last:border-0 cursor-default hover:translate-x-1.5 transition-transform duration-300">
      <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-1">
        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
        <div className="w-px flex-1 bg-gold/25" />
      </div>
      <div className="pl-1">
        <h4 className="font-body font-600 text-navy mb-1 text-lg">{title}</h4>
        <p className="font-body text-base text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function AboutPage() {
  return (
    <>
      {/* 1 ─ PAGE HERO */}
      <PageHero title="A Long-Term Perspective<br/>on Investing" />

      {/* 2 ─ OUR STORY */}
      <section className="py-24 bg-white relative overflow-hidden">
        <SectionGlow variant="light" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — copy */}
            <SectionReveal from="left">
              <SectionHeader
                overline="Our Story"
                title="A Structured Platform for Diversified Investing"
              />
              <div className="mt-6 space-y-4 font-body text-base text-gray-600 leading-relaxed">
                <p>
                  Parvathy Investment Company was established in 2026 with a clear and deliberate purpose — to create a structured platform that gives investors meaningful access to a diversified range of investment opportunities, managed with the discipline and transparency that long-term wealth creation demands.
                </p>
                <p>
                  We recognized that investors at every level — individual, institutional, and international — deserve a thoughtful approach to capital management. One grounded not in short-term market movements, but in rigorous evaluation, sound governance, and genuine alignment with investor goals.
                </p>
                <p>
                  From the outset, our commitment has been to build something enduring: a platform where every investment decision reflects our core belief that responsible capital deployment and patient, disciplined investing are the surest foundations of long-term value creation.
                </p>
              </div>

              {/* Highlights row — animated */}
              <AnimatedStats />
            </SectionReveal>

            {/* Right — navy geometric card */}
            <SectionReveal delay={0.15} from="right">
              <StoryCard />
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* 3 ─ INVESTMENT PHILOSOPHY */}
      <section id="philosophy" className="py-24 bg-navy-deep relative overflow-hidden scroll-mt-20">
        <SectionGlow variant="dark" />
        <div className="max-w-5xl mx-auto px-6">
          <SectionReveal className="text-center mb-12">
            <SectionHeader
              overline="Investment Philosophy"
              title="Our Investment Philosophy"
              align="center"
              light
            />
          </SectionReveal>

          <SectionReveal delay={0.1}>
            {/* Philosophy paragraph cards — glassmorphism */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
              {[
                'Successful investing requires patience, discipline, and careful evaluation above all else. We do not chase market trends or sacrifice investment quality for the sake of short-term returns. Every decision we make is grounded in a consistent process that we apply regardless of market conditions or external pressure.',
                'Our focus is on identifying opportunities with strong underlying fundamentals — businesses, projects, and assets that demonstrate sustainable long-term potential. We invest where we have genuine conviction, and we hold our positions with the patience required to let value compound over time.',
              ].map((text, i) => (
                <div
                  key={i}
                  className="relative overflow-hidden rounded-lg border border-white/8 bg-white/[0.03] p-8 group hover:border-gold/20 hover:bg-white/[0.05] transition-all duration-500"
                >
                  {/* Large decorative open-quote */}
                  <div
                    className="font-display leading-none select-none mb-1 -ml-1"
                    style={{ fontSize: '5rem', color: 'rgba(197,162,86,0.12)', lineHeight: 1 }}
                  >
                    &ldquo;
                  </div>
                  <p className="font-body text-base text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-400">
                    {text}
                  </p>
                  {/* Animated bottom accent */}
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-gold/60 to-transparent w-0 group-hover:w-full transition-all duration-500 ease-out" />
                  {/* Corner radial glow */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{ background: 'radial-gradient(circle at 100% 0%, rgba(197,162,86,0.08) 0%, transparent 70%)' }}
                  />
                </div>
              ))}
            </div>

            <PhilosophyPillars />
          </SectionReveal>
        </div>
      </section>

      {/* 4 ─ PRINCIPLES */}
      <section className="py-24 bg-white relative overflow-hidden">
        <SectionGlow variant="light" />
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal className="mb-14">
            <SectionHeader
              overline="Our Principles"
              title="The Standards That Guide Every Decision"
              align="center"
            />
          </SectionReveal>

          <SectionReveal stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {PRINCIPLES.map((p, i) => (
                <StaggerItem key={p.title} className="h-full">
                  <PrincipleCard {...p} iconIndex={i} />
                </StaggerItem>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* 5 ─ PHILOSOPHY QUOTE */}
      <section className="py-20 bg-cream border-t border-gray-200/60 relative overflow-hidden">
        <SectionGlow variant="light" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionReveal>
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="flex-1 max-w-[80px] h-px bg-gold" />
              <div className="w-1.5 h-1.5 rounded-full bg-gold" />
              <div className="flex-1 max-w-[80px] h-px bg-gold" />
            </div>
            <blockquote className="font-display text-2xl md:text-3xl lg:text-4xl font-400 italic text-navy leading-relaxed">
              {PHILOSOPHY_QUOTE}
            </blockquote>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-6 h-px bg-gold/50" />
              <span className="font-body text-xs text-gray-400 tracking-widest uppercase">
                Parvathy Investment Company
              </span>
              <div className="w-6 h-px bg-gold/50" />
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* 6 ─ WHO WE SERVE */}
      <section id="who-we-serve" className="py-24 bg-white relative overflow-hidden scroll-mt-20">
        <SectionGlow variant="light" />
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal className="mb-14">
            <SectionHeader
              overline="Who We Serve"
              title="Investment Solutions for Every Investor"
              subtitle="Our platform is designed to meet the needs of a diverse range of investors — from individuals to institutions and international partners."
              align="center"
            />
          </SectionReveal>

          <SectionReveal stagger>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {WHO_WE_SERVE.map((item) => (
                <StaggerItem key={item.title}>
                  <ServeCard {...item} />
                </StaggerItem>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* 7 ─ TRUST / VALUES */}
      <section className="py-24 bg-cream relative overflow-hidden">
        <SectionGlow variant="light" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <SectionReveal from="left">
              <SectionHeader
                overline="Our Values"
                title="Building a Trusted Investment Platform"
              />
              <p className="mt-6 font-body text-base text-gray-600 leading-relaxed">
                Trust is earned through consistent action, not claimed through marketing.
                Every decision we make — from how we evaluate investments to how we communicate
                with investors — reflects our commitment to operating with integrity and accountability.
              </p>
              <p className="mt-4 font-body text-base text-gray-600 leading-relaxed">
                These values are not aspirational statements. They are the operating principles
                that guide every interaction, every evaluation, and every capital allocation
                decision we make on behalf of our investors.
              </p>
            </SectionReveal>

            {/* Right — values list */}
            <SectionReveal delay={0.12} stagger from="right">
              <div>
                {VALUES.map((value) => (
                  <StaggerItem key={value.title}>
                    <ValueItem {...value} />
                  </StaggerItem>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* 8 ─ PARTNER CTA */}
      <TestimonialsCarousel />
      <PartnerCTA />
    </>
  );
}
