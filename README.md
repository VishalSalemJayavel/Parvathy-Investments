# Parvathy Investment Company

A premium, multi-page investment platform website built with Next.js 16, TypeScript, and Tailwind CSS v4.

---

## Tech Stack

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.2.0 | Framework — App Router, SSR, file-based routing |
| `react` | 19.2.4 | UI library |
| `framer-motion` | ^12 | Animations and scroll-triggered transitions |
| `lenis` | ^1.3 | Smooth scroll |
| `lucide-react` | ^0.577 | Icon set |
| `tailwindcss` | ^4 | Utility-first CSS with custom design tokens |
| `typescript` | ^5 | Type safety |

---

## Project Structure

```
parvathy-investments/
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, Navbar, Footer, SmoothScroll
│   ├── page.tsx                # Homepage — all major sections
│   ├── HeroSection.tsx         # Homepage hero (client component)
│   ├── template.tsx            # Page transition wrapper
│   ├── loading.tsx             # Loading state
│   ├── globals.css             # Tailwind, design tokens, global styles
│   ├── not-found.tsx           # Custom 404 page
│   ├── robots.ts               # /robots.txt
│   ├── sitemap.ts              # /sitemap.xml
│   ├── api/
│   │   └── contact/route.ts    # Contact form POST handler
│   ├── about/page.tsx          # About — story, philosophy, principles, values
│   ├── approach/page.tsx       # Approach — mindset, evaluation process, principles
│   ├── contact/page.tsx        # Contact — details panel + form
│   └── investments/page.tsx    # Investments — 6 categories + highlights
├── components/
│   ├── AnimatedPattern.tsx     # Ambient orb background (CSS only)
│   ├── AnimatedStats.tsx       # Count-up stat animation (About page)
│   ├── BackToTop.tsx           # Scroll-to-top button
│   ├── Button.tsx              # Shared button/link (3 variants)
│   ├── CommitmentCards.tsx     # 4 animated value cards (Approach page)
│   ├── ContactForm.tsx         # Validated form with success/error states
│   ├── Footer.tsx              # Site footer
│   ├── HeroBackground.tsx      # Canvas — Siri-style orbs + gold particles
│   ├── InvestmentCarousel.tsx  # Paginated Netflix-style card carousel
│   ├── InvestmentStats.tsx     # Animated stat strip (Investments page)
│   ├── LayeredIcon.tsx         # Concentric ring icon (About page)
│   ├── Navbar.tsx              # Fixed top nav with mobile overlay menu
│   ├── PageHero.tsx            # Inner-page hero (compact HeroBackground)
│   ├── PartnerCTA.tsx          # "Partner With Us" CTA section
│   ├── PhilosophyPillars.tsx   # 4 philosophy pillar cards (About page)
│   ├── ScrollProgress.tsx      # Fixed gold scroll progress bar
│   ├── SectionGlow.tsx         # Ambient glow for section backgrounds
│   ├── SectionHeader.tsx       # Reusable section heading
│   ├── SectionReveal.tsx       # Scroll-triggered reveal with stagger support
│   ├── SmoothScroll.tsx        # Lenis smooth scroll initialiser
│   └── WhoWeServeCards.tsx     # Mouse-tracking investor type cards
├── lib/
│   └── constants.ts            # All site content and data
└── public/
    ├── logo.png / logo.svg
    └── images/                 # All page images
```

---

## Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero, about preview, philosophy, investment carousel, approach, who we serve, values |
| `/about` | Company story, investment philosophy, principles, values |
| `/investments` | 6 investment categories with alternating layout + highlights |
| `/approach` | Investment mindset, 4-step evaluation process, guiding principles |
| `/contact` | Contact details + enquiry form |

All pages are statically pre-rendered at build time.

---

## Design System

### Colors

| Token | Class | Hex |
|---|---|---|
| Navy Deep | `bg-navy-deep` | `#06101F` |
| Navy | `bg-navy` | `#0B1D3A` |
| Navy Mid | `bg-navy-mid` | `#132B4F` |
| Gold | `bg-gold` | `#C5A256` |
| Gold Light | `bg-gold-light` | `#D4B978` |
| Cream | `bg-cream` | `#F8F6F1` |

### Typography

| Class | Font | Usage |
|---|---|---|
| `font-display` | Cormorant Garamond | Headings, quotes, display text |
| `font-body` | DM Sans | Body text, labels, navigation |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm start
```

---

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import at [vercel.com/new](https://vercel.com/new) — Next.js is auto-detected
3. Set production domain in Vercel project settings
4. Update the base URL in `app/robots.ts` and `app/sitemap.ts` to match your domain

### Other Platforms

Netlify, AWS Amplify, and Cloudflare Pages all support Next.js deployments.

---

## Content

All site copy is centralised in `lib/constants.ts`. To update text, navigation links, investment categories, or any section content — edit the relevant export in that file.

To wire up the contact form to an email service, add your integration inside `app/api/contact/route.ts` (Resend and Formspree instructions are included as comments).

---

© 2026 Parvathy Investment Company. All rights reserved.
