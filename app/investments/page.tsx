import type { Metadata } from 'next';
import Image from 'next/image';
import {
  Building2, Lock, TrendingUp, LayoutGrid,
  Briefcase, PieChart, ArrowRight,
} from 'lucide-react';
import { PageHero } from '@/components/PageHero';
import { SectionReveal, StaggerItem } from '@/components/SectionReveal';
import { SectionHeader } from '@/components/SectionHeader';
import { PartnerCTA } from '@/components/PartnerCTA';
import { TestimonialsCarousel } from '@/components/TestimonialsCarousel';
import { SectionGlow } from '@/components/SectionGlow';
import { AnimatedPattern } from '@/components/AnimatedPattern';
import { INVESTMENT_HIGHLIGHTS } from '@/lib/constants';
import { InvestmentStats } from '@/components/InvestmentStats';

export const metadata: Metadata = {
  title: 'Investments',
  description:
    'Explore Parvathy Investment Company\'s diversified investment platform — EB-5 programs, secured and unsecured lending, real estate, private equity, and alternative assets, all structured for long-term value creation.',
  openGraph: {
    type: 'website',
    siteName: 'Parvathy Investment Company',
    title: 'Investment Opportunities | Parvathy Investment Company',
    description:
      'Structured investment opportunities across lending, real estate, and alternative assets — carefully evaluated for disciplined, long-term investors.',
    url: 'https://parvathyinvestments.com/investments',
  },
};

/* ─── Category data (self-contained for this page) ────────────── */
const CATEGORIES = [
  {
    number: '01',
    title: 'EB-5 Investment Programs',
    body: [
      'Our EB-5 platform provides access to structured investment opportunities in carefully selected U.S.-based projects that meet program requirements. Each project is evaluated for its economic contribution, job creation potential, and the soundness of its investment structure.',
      'We focus on opportunities that align with the regulatory framework of the EB-5 program while offering investors the transparency and governance standards that our platform demands across all asset classes.',
    ],
    icon: <Building2 size={28} strokeWidth={1.4} />,
    tags: ['Economic Development', 'Job Creation', 'Structured Capital'],
    image: '/images/eb5.jpg',
  },
  {
    number: '02',
    title: 'Secured Loan Investments',
    body: [
      'Secured lending opportunities on our platform are backed by underlying assets or tangible collateral, providing an additional layer of capital protection for investors. This structure prioritises stability and income generation alongside meaningful return potential.',
      'Each secured loan opportunity is assessed for the quality and liquidity of the underlying collateral, the borrower\'s capacity for repayment, and the overall risk-adjusted return profile of the investment.',
    ],
    icon: <Lock size={28} strokeWidth={1.4} />,
    tags: ['Asset-Backed', 'Capital Protection', 'Income Generation'],
    image: '/images/secured-loan.jpg',
  },
  {
    number: '03',
    title: 'Unsecured Loan Investments',
    body: [
      'Unsecured lending on our platform provides financial support for business growth and project development within carefully structured frameworks. These opportunities are positioned for investors with an appropriate risk appetite seeking enhanced yield potential.',
      'Our evaluation process for unsecured lending is particularly rigorous — focusing on the borrower\'s operational track record, cash flow sustainability, and the strength of the business fundamentals underpinning repayment capacity.',
    ],
    icon: <TrendingUp size={28} strokeWidth={1.4} />,
    tags: ['Business Lending', 'Growth Capital', 'Yield Focused'],
    image: '/images/unsecured-loan.jpg',
  },
  {
    number: '04',
    title: 'Real Estate Investments',
    body: [
      'Our real estate investment opportunities span commercial properties, development projects, and real estate-backed structures across select markets. We focus on assets and developments with identifiable value drivers, sound fundamentals, and clear investment rationale.',
      'Real estate investments on our platform are structured to provide investors with appropriate exposure to one of the most time-tested asset classes, whether through direct participation, property-backed lending, or development project structures.',
    ],
    icon: <LayoutGrid size={28} strokeWidth={1.4} />,
    tags: ['Commercial Property', 'Development Projects', 'Property-Backed'],
    image: '/images/real-estate.jpg',
  },
  {
    number: '05',
    title: 'Private & Strategic Investments',
    body: [
      'Private and strategic investment opportunities on our platform involve direct participation in businesses and targeted capital placements in companies with compelling growth profiles. These opportunities are suited to investors seeking meaningful exposure to private market returns.',
      'We apply a stringent evaluation lens to private investments — assessing management capability, competitive positioning, financial structure, and the strategic rationale behind each placement before any capital is committed.',
    ],
    icon: <Briefcase size={28} strokeWidth={1.4} />,
    tags: ['Direct Participation', 'Private Markets', 'Strategic Capital'],
    image: '/images/private-strategic-v2.jpg',
  },
  {
    number: '06',
    title: 'Alternative & Diversified Investments',
    body: [
      'Alternative investment opportunities on our platform encompass non-traditional asset classes and diversified strategies that complement core holdings and broaden portfolio exposure. These investments are selected for their potential to generate returns with limited correlation to conventional markets.',
      'Our alternative investment universe includes structured products, specialty lending, and other carefully evaluated non-traditional opportunities — each assessed through the same disciplined framework we apply across our entire platform.',
    ],
    icon: <PieChart size={28} strokeWidth={1.4} />,
    tags: ['Non-Traditional Assets', 'Portfolio Complement', 'Diversification'],
    image: '/images/alternative.jpg',
  },
];

/* ─── Photo card ───────────────────────────────────────────────── */
function ImageCard({ src, alt, number }: { src: string; alt: string; number: string }) {
  return (
    <div className="relative rounded-sm overflow-hidden min-h-[320px] group">
      {/* Photo */}
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        sizes="(max-width: 1024px) 100vw, 50vw"
      />
      {/* Dark gradient overlay so the number badge is readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/20 to-transparent" />
      {/* Gold-tinted vignette on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {/* Number badge */}
      <div className="absolute bottom-6 left-6 flex items-center gap-3">
        <div className="w-6 h-px bg-gold" />
        <span className="font-body text-xs font-600 tracking-[0.22em] uppercase text-gold/90">{number}</span>
      </div>
      {/* Animated gold border on hover */}
      <div className="absolute inset-0 rounded-sm border border-gold/0 group-hover:border-gold/30 transition-colors duration-500" />
    </div>
  );
}

/* ─── Visual placeholder card ─────────────────────────────────── */
function VisualCard({ number, icon }: { number: string; icon: React.ReactNode }) {
  return (
    <div
      className="relative rounded-sm overflow-hidden min-h-[320px] flex flex-col justify-between p-6 md:p-10"
      style={{ background: 'linear-gradient(145deg, #06101F 0%, #0B1D3A 55%, #132B4F 100%)' }}
    >
      <AnimatedPattern />

      {/* Top: icon in gold ring */}
      <div className="relative z-10">
        <div className="w-16 h-16 rounded-xl border border-gold/30 bg-gold/10 flex items-center justify-center text-gold mb-6">
          {icon}
        </div>
        <div
          className="font-display font-700 leading-none select-none"
          style={{ fontSize: '7rem', color: 'rgba(197,162,86,0.07)' }}
        >
          {number}
        </div>
      </div>

      {/* Bottom: decorative grid dots */}
      <div className="relative z-10 grid grid-cols-5 gap-2">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="w-1 h-1 rounded-full"
            style={{ backgroundColor: `rgba(197,162,86,${i % 3 === 0 ? 0.35 : 0.1})` }}
          />
        ))}
      </div>

      {/* Radial glows */}
      <div
        className="absolute top-0 right-0 w-56 h-56 pointer-events-none opacity-10"
        style={{ background: 'radial-gradient(circle at 100% 0%, #C5A256 0%, transparent 60%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-40 h-40 pointer-events-none opacity-8"
        style={{ background: 'radial-gradient(circle at 0% 100%, #C5A256 0%, transparent 60%)' }}
      />
    </div>
  );
}

/* ─── Alternating investment section ──────────────────────────── */
function InvestmentSection({
  item,
  isEven,
  sectionId,
}: {
  item: (typeof CATEGORIES)[0];
  isEven: boolean;
  sectionId: string;
}) {
  const bg = isEven ? 'bg-cream' : 'bg-white';

  return (
    <section id={sectionId} className={`py-20 ${bg} border-b border-gray-100 relative overflow-hidden scroll-mt-20`}>
      <SectionGlow variant="light" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* Text column */}
          <SectionReveal from={isEven ? 'right' : 'left'} className={isEven ? 'lg:order-2' : 'lg:order-1'}>
            {/* Number + title */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px bg-gold flex-shrink-0" />
              <span className="overline-label">{item.number}</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-[2.6rem] font-600 text-navy leading-tight mb-6">
              {item.title}
            </h2>

            {/* Body paragraphs */}
            <div className="space-y-4 font-body text-base text-gray-600 leading-relaxed mb-8">
              {item.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-body text-sm px-3 py-1.5 rounded-sm border border-gold/30 text-gold bg-gold/5"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Learn more link */}
            <a
              href="/contact"
              className="inline-flex items-center gap-2 font-body text-base text-navy font-500 hover:text-gold transition-colors duration-200 group"
            >
              <span>Enquire About This Category</span>
              <ArrowRight
                size={15}
                className="group-hover:translate-x-1 transition-transform duration-200"
              />
            </a>
          </SectionReveal>

          {/* Visual column */}
          <SectionReveal delay={0.15} from={isEven ? 'left' : 'right'} className={isEven ? 'lg:order-1' : 'lg:order-2'}>
            {'image' in item && item.image ? (
              <ImageCard src={item.image as string} alt={item.title} number={item.number} />
            ) : (
              <VisualCard number={item.number} icon={item.icon} />
            )}
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}

/* ─── Highlight card ───────────────────────────────────────────── */
function HighlightCard({ title, description, index }: { title: string; description: string; index: number }) {
  return (
    <div className="group relative bg-white rounded-sm p-8 border border-gray-200 hover:border-gold/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Gold top-border reveal */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

      {/* Index number watermark */}
      <div
        className="absolute top-4 right-6 font-display font-700 text-6xl leading-none select-none pointer-events-none"
        style={{ color: 'rgba(197,162,86,0.07)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Gold left accent bar */}
      <div className="flex gap-5">
        <div className="w-0.5 bg-gold flex-shrink-0 rounded-full" />
        <div>
          <h3 className="font-display text-2xl font-600 text-navy mb-3 leading-snug">{title}</h3>
          <p className="font-body text-base text-gray-600 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
export default function InvestmentsPage() {
  return (
    <>
      {/* 1 ─ PAGE HERO */}
      <PageHero
        title="Investment Opportunities"
        subtitle="Structured, diversified investment access across lending, real estate, and alternative asset classes."
      />

      {/* 2 ─ OVERVIEW */}
      <section className="py-24 bg-white relative overflow-hidden">
        <SectionGlow variant="light" />
        <div className="max-w-4xl mx-auto px-6 text-center">
          <SectionReveal>
            <SectionHeader
              overline="Platform Overview"
              title="Diversified Investment Opportunities"
              align="center"
            />
          </SectionReveal>
          <SectionReveal delay={0.1}>
            <div className="mt-8 space-y-5 font-body text-base text-gray-600 leading-relaxed">
              <p>
                Our investment platform is focused on delivering structured opportunities across
                a carefully selected range of asset classes — including lending, real estate, private
                equity, and alternative investments. We believe that genuine diversification, combined
                with rigorous evaluation, creates the foundation for resilient, long-term investment portfolios.
              </p>
              <p>
                Every category on our platform is governed by the same standards: thorough due diligence,
                disciplined structuring, and ongoing portfolio oversight. Investors gain access to
                carefully evaluated opportunities across multiple sectors within a single, accountable
                investment relationship.
              </p>
            </div>
          </SectionReveal>

          {/* Stat strip — animated */}
          <InvestmentStats />
        </div>
      </section>

      {/* 3 ─ CATEGORY JUMP NAV */}
      <div className="sticky top-[72px] z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center gap-1 overflow-x-auto py-3" style={{ scrollbarWidth: 'none' }}>
            {CATEGORIES.map((cat, i) => {
              const ids = ['eb5', 'secured', 'unsecured', 'real-estate', 'private', 'alternative'];
              return (
                <a
                  key={cat.number}
                  href={`#${ids[i]}`}
                  className="flex-shrink-0 font-body text-sm px-4 py-2 rounded-sm text-gray-500 hover:text-navy hover:bg-gray-50 transition-all duration-200 whitespace-nowrap border border-transparent hover:border-gray-200 group"
                >
                  <span className="text-gold font-600 mr-1.5 group-hover:text-gold">{cat.number}</span>
                  {cat.title}
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4 ─ INVESTMENT CATEGORIES DETAIL */}
      {CATEGORIES.map((item, index) => (
        <InvestmentSection
          key={item.number}
          item={item}
          isEven={index % 2 === 1}
          sectionId={['eb5', 'secured', 'unsecured', 'real-estate', 'private', 'alternative'][index]}
        />
      ))}

      {/* 5 ─ INVESTMENT HIGHLIGHTS */}
      <section className="py-24 bg-navy-deep relative overflow-hidden">
        <SectionGlow variant="dark" />
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal className="mb-14">
            <SectionHeader
              overline="Why Parvathy"
              title="Investment Highlights"
              subtitle="What sets our investment platform apart."
              align="center"
              light
            />
          </SectionReveal>

          <SectionReveal stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {INVESTMENT_HIGHLIGHTS.map((h, i) => (
                <StaggerItem key={i}>
                  <HighlightCard {...h} index={i} />
                </StaggerItem>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* 6 ─ PARTNER CTA */}
      <TestimonialsCarousel />
      <PartnerCTA />
    </>
  );
}
