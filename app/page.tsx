import type { Metadata } from 'next';
import { Search, Shield, Monitor, Activity } from 'lucide-react';
import { SectionReveal, StaggerItem } from '@/components/SectionReveal';
import { Button } from '@/components/Button';
import { SectionHeader } from '@/components/SectionHeader';
import { InvestmentCarousel } from '@/components/InvestmentCarousel';
import { WhoWeServeCards } from '@/components/WhoWeServeCards';
import { PartnerCTA } from '@/components/PartnerCTA';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { LayeredIcon } from '@/components/LayeredIcon';
import {
  INVESTMENT_CATEGORIES,
  APPROACH_STEPS,
  FOCUS_AREAS,
  WHO_WE_SERVE,
  VALUES,
  PHILOSOPHY_QUOTE,
} from '@/lib/constants';
import Image from 'next/image';
import { SectionGlow } from '@/components/SectionGlow';
import { AnimatedPattern } from '@/components/AnimatedPattern';
import { HeroSection } from './HeroSection';

export const metadata: Metadata = {
  title: 'Parvathy Investment Company | Diversified Investment Solutions',
  description:
    'Parvathy Investment Company is a disciplined investment platform offering diversified solutions across EB-5, real estate, secured credit, private equity, and alternative assets — focused on responsible capital deployment and long-term value creation.',
  openGraph: {
    type: 'website',
    siteName: 'Parvathy Investment Company',
    title: 'Parvathy Investment Company | Diversified Investment Solutions',
    description:
      'Responsible capital deployment and disciplined investing for long-term value creation.',
    url: 'https://parvathyinvestments.com',
  },
};

/* ─── Icon map ────────────────────────────────────────────────── */
const APPROACH_ICONS: Record<string, React.ReactNode> = {
  Search:   <Search   size={28} strokeWidth={1.6} />,
  Shield:   <Shield   size={28} strokeWidth={1.6} />,
  Monitor:  <Monitor  size={28} strokeWidth={1.6} />,
  Activity: <Activity size={28} strokeWidth={1.6} />,
};

/* ─── Section sub-components ──────────────────────────────────── */
function ApproachItem({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="group text-center px-2">
      <div className="w-20 h-20 rounded-2xl mx-auto mb-5 flex items-center justify-center bg-gold/10 text-gold group-hover:bg-gold group-hover:text-navy-deep transition-all duration-300 shadow-sm group-hover:shadow-[0_4px_20px_rgba(197,162,86,0.3)]">
        {APPROACH_ICONS[icon]}
      </div>
      <h3 className="font-display text-xl font-600 text-navy mb-2 leading-snug">{title}</h3>
      <p className="font-body text-base text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function FocusAreaItem({
  title,
  description,
  isLast,
}: {
  title: string;
  description: string;
  isLast: boolean;
}) {
  return (
    <div
      className={`group flex gap-5 py-7 cursor-default hover:translate-x-2 transition-transform duration-300 ${
        !isLast ? 'border-b border-white/10' : ''
      }`}
    >
      <div className="w-0.5 bg-gold flex-shrink-0 rounded-full" />
      <div>
        <h3 className="font-display text-xl font-600 text-gold-light mb-1.5">{title}</h3>
        <p className="font-body text-base text-gray-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}


function ValueItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="group flex gap-4 py-5 border-b border-gray-300/60 last:border-0 cursor-default hover:translate-x-1.5 transition-transform duration-300">
      {/* Gold left border + dot */}
      <div className="flex flex-col items-center gap-1 flex-shrink-0 pt-1">
        <div className="w-1.5 h-1.5 rounded-full bg-gold" />
        <div className="w-px flex-1 bg-gold/30" />
      </div>
      <div className="pl-1">
        <h4 className="font-body font-600 text-navy mb-1 text-lg">{title}</h4>
        <p className="font-body text-base text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ─── Page ────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      {/* 1 ─ HERO (client component for scroll indicator animation) */}
      <HeroSection />

      {/* 2 ─ ABOUT PREVIEW */}
      <section id="about-preview" className="py-24 bg-cream scroll-mt-20 relative overflow-hidden">
        <SectionGlow variant="light" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left — text */}
            <SectionReveal from="left">
              <SectionHeader
                overline="About Us"
                title="A Platform for Disciplined Investing"
              />
              <div className="mt-6 space-y-4 font-body text-gray-600 leading-relaxed text-base">
                <p>
                  Parvathy Investment Company was established with a clear purpose: to provide investors with access to a diversified range of investment opportunities managed with rigorous discipline and a long-term perspective.
                </p>
                <p>
                  We believe that sustainable wealth creation requires patience, careful evaluation, and a commitment to responsible capital management. Our platform is designed to reflect these values in every investment decision we make.
                </p>
              </div>
              <div className="mt-8">
                <Button href="/about" variant="ghostGold" showArrow>
                  Discover Our Story
                </Button>
              </div>
            </SectionReveal>

            {/* Right — photo card with layered icon overlay */}
            <SectionReveal delay={0.15} from="right">
              <div className="relative rounded-sm overflow-hidden min-h-[300px] flex flex-col justify-between group">
                {/* Photo */}
                <Image
                  src="/images/our-story.jpg"
                  alt="Our Story"
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/95 via-navy-deep/70 to-navy-deep/55" />
                {/* Gold shimmer on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-gold/8 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Layered icon centred at top */}
                <div className="relative z-10 flex flex-col items-center text-center p-6 md:p-10">
                  <LayeredIcon />
                  <span className="overline-label mb-3">Our Foundation</span>
                  <h3 className="font-display text-3xl font-600 text-cream leading-snug">
                    Our Story
                  </h3>
                  <p className="font-body text-sm text-gray-300 mt-3 leading-relaxed max-w-xs">
                    Built on integrity, guided by discipline, and focused on long-term value creation for every investor we serve.
                  </p>
                </div>

                <div className="relative z-10 flex items-center gap-4 p-6 md:px-10 pb-8">
                  <div className="w-8 h-px bg-gold" />
                  <span className="font-body text-xs text-gray-400 tracking-widest uppercase">
                    Est. 2026
                  </span>
                </div>

                {/* Gold border on hover */}
                <div className="absolute inset-0 rounded-sm border border-gold/0 group-hover:border-gold/30 transition-colors duration-500" />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* 3 ─ PHILOSOPHY QUOTE */}
      <section className="py-20 bg-cream border-t border-gray-200/60 relative overflow-hidden">
        <SectionGlow variant="light" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionReveal>
            {/* Gold horizontal line */}
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

      {/* 4 ─ INVESTMENT PLATFORM */}
      <section id="investments" className="py-16 bg-navy-deep scroll-mt-20 relative overflow-hidden">
        <SectionGlow variant="dark" />
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal className="mb-10">
            <SectionHeader
              overline="Investment Platform"
              title="Our Investment Categories"
              subtitle="We provide access to a carefully curated range of investment opportunities across multiple asset classes and structures."
              light
            />
          </SectionReveal>
          <InvestmentCarousel items={INVESTMENT_CATEGORIES} />
          <SectionReveal delay={0.3} className="mt-12 text-center">
            <Button href="/investments" variant="primary" showArrow>
              View All Investment Categories
            </Button>
          </SectionReveal>
        </div>
      </section>

      {/* 5 ─ APPROACH OVERVIEW */}
      <section className="py-24 bg-white relative overflow-hidden">
        <SectionGlow variant="light" />
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal className="mb-16">
            <SectionHeader
              overline="Our Approach"
              title="How We Evaluate Every Opportunity"
              subtitle="A consistent, disciplined framework applied to every investment we consider."
              align="center"
            />
          </SectionReveal>

          <SectionReveal stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {APPROACH_STEPS.map((step) => (
                <StaggerItem key={step.title}>
                  <ApproachItem {...step} />
                </StaggerItem>
              ))}
            </div>
          </SectionReveal>

          {/* Connecting line between steps (desktop only) */}
          <SectionReveal delay={0.4} className="hidden lg:block mt-8">
            <div className="max-w-3xl mx-auto h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </SectionReveal>
        </div>
      </section>

      {/* 6 ─ FOCUS AREAS */}
      <section className="overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[520px]">

          {/* Left — navy with diagonal geo pattern */}
          <div
            className="relative flex items-center justify-center py-16 md:py-24 px-6 md:px-12 lg:px-16"
            style={{
              background: 'linear-gradient(135deg, #06101F 0%, #0B1D3A 100%)',
            }}
          >
            <AnimatedPattern />
            <SectionReveal className="relative z-10 text-center max-w-xs">
              <div className="w-10 h-px bg-gold mx-auto mb-6" />
              <h2 className="font-display text-4xl md:text-5xl font-600 text-cream leading-tight">
                How We Create Value
              </h2>
              <p className="font-body text-sm text-gray-400 mt-5 leading-relaxed">
                Our investment platform creates value through disciplined selection, sound structure, and patient capital management.
              </p>
              <div className="w-10 h-px bg-gold/40 mx-auto mt-6" />
            </SectionReveal>
          </div>

          {/* Right — navy with list */}
          <div
            className="py-12 md:py-16 px-6 md:px-10 lg:px-14 flex flex-col justify-center"
            style={{ background: '#0B1D3A' }}
          >
            <SectionReveal stagger>
              <div>
                {FOCUS_AREAS.map((area, i) => (
                  <StaggerItem key={area.title}>
                    <FocusAreaItem {...area} isLast={i === FOCUS_AREAS.length - 1} />
                  </StaggerItem>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* 7 ─ WHO WE SERVE */}
      <section className="py-24 bg-white relative overflow-hidden">
        <SectionGlow variant="light" />
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal className="mb-14">
            <SectionHeader
              overline="Who We Serve"
              title="Investment Solutions for Every Investor"
              subtitle="Our platform is designed to meet the needs of a diverse range of investors — from individuals to institutions."
              align="center"
            />
          </SectionReveal>
          <WhoWeServeCards items={WHO_WE_SERVE} />
        </div>
      </section>

      {/* 8 ─ TRUST / VALUES */}
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
              <p className="mt-6 font-body text-gray-600 leading-relaxed text-base">
                Trust is earned through consistent action, not claimed through marketing.
                Every decision we make — from how we evaluate investments to how we communicate
                with investors — reflects our commitment to operating with integrity and accountability.
              </p>
              <div className="mt-8">
                <Button href="/about" variant="ghostGold" showArrow>
                  Our Values & Principles
                </Button>
              </div>
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

      {/* 9 ─ TESTIMONIALS */}
      <TestimonialsCarousel />

      {/* 10 ─ PARTNER CTA */}
      <PartnerCTA />
    </>
  );
}
