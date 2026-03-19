import type { Metadata } from 'next';
import Image from 'next/image';
import { PageHero } from '@/components/PageHero';
import { SectionReveal, StaggerItem } from '@/components/SectionReveal';
import { SectionHeader } from '@/components/SectionHeader';
import { PartnerCTA } from '@/components/PartnerCTA';
import { SectionGlow } from '@/components/SectionGlow';
import { AnimatedPattern } from '@/components/AnimatedPattern';
import { CommitmentCards } from '@/components/CommitmentCards';
import { GUIDING_PRINCIPLES, RISK_ITEMS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Our Approach',
  description:
    'Discover how Parvathy Investment Company evaluates opportunities, manages risk, and deploys capital responsibly through a structured, disciplined investment process.',
  openGraph: {
    type: 'website',
    siteName: 'Parvathy Investment Company',
    title: 'Our Investment Approach | Parvathy Investment Company',
    description:
      'A deliberate, structured methodology for evaluating opportunities, managing risk, and creating sustainable long-term value.',
    url: 'https://parvathyinvestments.com/approach',
  },
};

/* ─── Evaluation steps (self-contained) ───────────────────────── */
const EVAL_STEPS = [
  {
    number: '01',
    title: 'Market And Sector Analysis',
    description: 'We begin with a thorough assessment of the macro environment, sector dynamics, and market positioning relevant to each opportunity.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/>
      </svg>
    ),
    image: '/images/market-sector-analysis.jpg',
  },
  {
    number: '02',
    title: 'Project And Business Fundamentals',
    description: 'A deep review of the underlying business or project — operational capacity, management quality, competitive positioning, and financial health.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
        <line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/>
      </svg>
    ),
    image: '/images/project-business-fundamentals.jpg',
  },
  {
    number: '03',
    title: 'Capital Structure And Sustainability',
    description: 'Evaluation of how the investment is structured, including debt levels, investor protections, covenants, and the overall sustainability of the capital framework.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    image: '/images/capital-structure.jpg',
  },
  {
    number: '04',
    title: 'Long-Term Growth Potential',
    description: 'A forward-looking assessment of the opportunity\'s capacity to generate sustainable value over the investment horizon, accounting for realistic scenarios.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    image: '/images/long-term-growth.jpg',
  },
];

/* ─── Guiding principle icons ──────────────────────────────────── */
const PRINCIPLE_ICONS = [
  /* Disciplined Opportunity Evaluation */
  <svg key="0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
  </svg>,
  /* Responsible Capital Stewardship */
  <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    <polyline points="9 12 11 14 15 10"/>
  </svg>,
  /* Diversified Investment Exposure */
  <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/>
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>,
  /* Long-Term Value Orientation */
  <svg key="3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
  </svg>,
];

/* ─── Evaluation step card ─────────────────────────────────────── */
function EvalCard({
  number,
  title,
  description,
  icon,
  image,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  image?: string;
}) {
  return (
    <div className="group relative bg-white border border-gray-200 rounded-sm hover:border-gold/40 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Gold top-border wipe */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-10" />

      {/* Photo header */}
      {image && (
        <div className="relative h-52 overflow-hidden flex-shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20" />
          <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
      )}

      <div className="p-8 flex flex-col flex-1">
        {/* Step number watermark */}
        <div
          className="absolute top-4 right-5 font-display font-700 text-6xl leading-none select-none pointer-events-none"
          style={{ color: 'rgba(197,162,86,0.07)' }}
        >
          {number}
        </div>

        {/* Gold-tinted icon box */}
        <div className="w-14 h-14 rounded-sm bg-gold/10 text-gold flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-navy-deep transition-all duration-300">
          {icon}
        </div>

        {/* Step label */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-px bg-gold" />
          <span className="font-body text-xs font-600 tracking-widest uppercase text-gold">{number}</span>
        </div>

        <h3 className="font-display text-xl font-600 text-navy leading-snug mb-3">{title}</h3>
        <p className="font-body text-base text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ─── Guiding principle card ───────────────────────────────────── */
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
    <div className="group relative bg-navy-mid border border-white/5 rounded-sm p-8 hover:border-gold/25 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
      {/* Subtle gold top-border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />

      {/* Gold-tinted icon box */}
      <div className="w-14 h-14 rounded-sm bg-gold/10 text-gold flex items-center justify-center mb-6 group-hover:bg-gold group-hover:text-navy-deep transition-all duration-300">
        {PRINCIPLE_ICONS[iconIndex]}
      </div>

      <h3 className="font-display text-xl font-600 text-cream leading-snug mb-3">{title}</h3>
      <p className="font-body text-base text-gray-400 leading-relaxed">{description}</p>
    </div>
  );
}

/* ─── Risk item ────────────────────────────────────────────────── */
function RiskItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="group flex gap-5 p-6 border border-gray-200 rounded-sm hover:border-gold/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 bg-white">
      <div className="w-0.5 flex-shrink-0 bg-gold rounded-full" />
      <div>
        <h4 className="font-body font-600 text-navy mb-2">{title}</h4>
        <p className="font-body text-base text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

/* ─── Page ─────────────────────────────────────────────────────── */
export default function ApproachPage() {
  return (
    <>
      {/* 1 ─ PAGE HERO */}
      <PageHero
        title="Our Investment Approach"
        subtitle="A structured, disciplined methodology applied consistently across every investment opportunity we evaluate."
      />

      {/* 2 ─ INVESTMENT MINDSET */}
      <section className="py-24 bg-white relative overflow-hidden">
        <SectionGlow variant="light" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — copy */}
            <SectionReveal from="left">
              <SectionHeader
                overline="Investment Mindset"
                title="Our Investment Mindset"
              />
              <div className="mt-6 space-y-4 font-body text-base text-gray-600 leading-relaxed">
                <p>
                  Successful investing requires patience, perspective, and structured decision-making above all else.
                  We do not deploy capital under pressure or allow short-term market movements to override our
                  evaluation process. Every investment decision is made through a consistent framework,
                  regardless of external noise or market sentiment.
                </p>
                <p>
                  We evaluate every opportunity through a balanced lens — considering current market conditions,
                  the underlying fundamentals of the investment, and its realistic long-term value potential.
                  This disciplined balance ensures we neither overlook attractive opportunities nor
                  accept undue risk in pursuit of return.
                </p>
                <p>
                  Our mindset is rooted in the belief that long-term consistency outperforms short-term
                  opportunism. By maintaining the same standards across market cycles, we build
                  portfolios that are resilient, well-structured, and genuinely aligned with
                  investor goals.
                </p>
              </div>
            </SectionReveal>

            {/* Right — navy visual card */}
            <SectionReveal delay={0.15} from="right">
              <div
                className="relative rounded-sm overflow-hidden p-6 md:p-10 min-h-[360px] flex flex-col justify-between"
                style={{ background: 'linear-gradient(145deg, #06101F 0%, #0B1D3A 60%, #132B4F 100%)' }}
              >
                <AnimatedPattern />

                {/* Top */}
                <div className="relative z-10">
                  <span className="overline-label mb-4 block">Our Commitment</span>
                  <h3 className="font-display text-3xl font-600 text-cream leading-snug mb-2">
                    Disciplined Capital.<br />Long-Term Value.
                  </h3>
                  <div className="w-10 h-px bg-gold mt-5" />
                </div>

                {/* Bottom — animated commitment cards */}
                <div className="relative z-10">
                  <CommitmentCards />
                </div>

                {/* Radial glow */}
                <div
                  className="absolute top-0 right-0 w-56 h-56 pointer-events-none opacity-10"
                  style={{ background: 'radial-gradient(circle at 100% 0%, #C5A256 0%, transparent 60%)' }}
                />
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* 3 ─ EVALUATION PROCESS */}
      <section className="py-24 bg-cream relative overflow-hidden">
        <SectionGlow variant="light" />
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal className="mb-14">
            <SectionHeader
              overline="Evaluation Process"
              title="Our Evaluation Process"
              subtitle="Every investment opportunity is assessed through four sequential lenses before any capital commitment is made."
              align="center"
            />
          </SectionReveal>

          {/* Connector line (desktop) */}
          <SectionReveal delay={0.1} className="hidden lg:block mb-2 px-16">
            <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          </SectionReveal>

          <SectionReveal stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              {EVAL_STEPS.map((step) => (
                <StaggerItem key={step.number} className="h-full">
                  <EvalCard {...step} />
                </StaggerItem>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* 4 ─ RISK AWARENESS */}
      <section className="py-24 bg-white relative overflow-hidden">
        <SectionGlow variant="light" />
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — copy */}
            <SectionReveal from="left">
              <SectionHeader
                overline="Risk Awareness"
                title="Risk Awareness in Every Decision"
              />
              <div className="mt-6 space-y-4 font-body text-base text-gray-600 leading-relaxed">
                <p>
                  Every investment opportunity we consider is evaluated through two lenses simultaneously:
                  the potential for value creation, and the realistic risks that could impair that value.
                  We do not separate these considerations — opportunity and risk are assessed together,
                  at every stage of our process.
                </p>
                <p>
                  Our structured evaluation is designed to surface risks early, understand their nature
                  and magnitude, and ensure our investment structures contain appropriate protections
                  and oversight mechanisms. This approach allows us to proceed with confidence when
                  the risk-reward balance is sound — and to step back without hesitation when it is not.
                </p>
              </div>

              {/* Risk philosophy callout — pull-quote */}
              <div className="mt-8 p-8 bg-cream border border-gray-200 rounded-sm relative overflow-hidden">
                {/* Decorative large opening quote */}
                <div
                  className="absolute top-0 left-4 font-display font-700 leading-none text-gold/10 select-none pointer-events-none"
                  style={{ fontSize: '9rem' }}
                  aria-hidden="true"
                >
                  &ldquo;
                </div>
                <div className="relative z-10 flex gap-4 items-start">
                  <div className="w-0.5 bg-gold flex-shrink-0 self-stretch" />
                  <p className="font-display text-2xl italic text-navy leading-snug">
                    We invest where we have genuine conviction — and we hold our standards where we don&rsquo;t.
                  </p>
                </div>
              </div>
            </SectionReveal>

            {/* Right — risk items */}
            <SectionReveal delay={0.12} stagger from="right">
              <div className="space-y-4">
                {RISK_ITEMS.map((item) => (
                  <StaggerItem key={item.title}>
                    <RiskItem {...item} />
                  </StaggerItem>
                ))}
              </div>
            </SectionReveal>
          </div>
        </div>
      </section>

      {/* 5 ─ GUIDING PRINCIPLES */}
      <section className="py-24 bg-navy relative overflow-hidden">
        <SectionGlow variant="dark" />
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal className="mb-14">
            <SectionHeader
              overline="Guiding Principles"
              title="Principles That Guide Our Approach"
              subtitle="Four commitments that shape every investment decision we make."
              align="center"
              light
            />
          </SectionReveal>

          <SectionReveal stagger>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {GUIDING_PRINCIPLES.map((p, i) => (
                <StaggerItem key={p.title}>
                  <PrincipleCard {...p} iconIndex={i} />
                </StaggerItem>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* 6 ─ PARTNER CTA */}
      <PartnerCTA />
    </>
  );
}
