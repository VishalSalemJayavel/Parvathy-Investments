# Parvathy Investment Company

Premium investment platform website built with Next.js 16. A multi-page, fully static site for Parvathy Investment Company — a disciplined investment platform focused on responsible capital deployment and long-term value creation across diversified asset classes.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Components](#components)
- [Design System](#design-system)
- [Getting Started](#getting-started)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)

---

## Tech Stack

| Package | Version | Purpose |
|---|---|---|
| `next` | 16.2.0 | Framework (App Router, Turbopack) |
| `react` | 19.2.4 | UI library |
| `react-dom` | 19.2.4 | DOM renderer |
| `framer-motion` | ^12.38.0 | Animations and transitions |
| `lenis` | ^1.3.19 | Smooth scroll library |
| `lucide-react` | ^0.577.0 | Icon library |
| `tailwindcss` | ^4 | Utility-first CSS framework |
| `@tailwindcss/postcss` | ^4 | PostCSS integration for Tailwind v4 |
| `typescript` | ^5 | Type safety |
| `@types/react` | ^19 | React type definitions |
| `@types/react-dom` | ^19 | React DOM type definitions |
| `@types/node` | ^20 | Node.js type definitions |

---

## Project Structure

```
parvathy-investments/
├── app/
│   ├── layout.tsx              # Root layout: fonts, metadata, Navbar, Footer, SmoothScroll
│   ├── page.tsx                # Homepage with all major sections
│   ├── HeroSection.tsx         # Homepage hero (client component, uses HeroBackground)
│   ├── template.tsx            # Page transition wrapper (framer-motion fade/slide)
│   ├── loading.tsx             # Global loading state (PI badge with ping animation)
│   ├── globals.css             # Tailwind imports, theme tokens, CSS animations
│   ├── robots.ts               # /robots.txt route
│   ├── sitemap.ts              # /sitemap.xml route
│   ├── about/
│   │   └── page.tsx            # About page: story, philosophy, principles, values
│   ├── approach/
│   │   └── page.tsx            # Approach page: mindset, eval process, risk, principles
│   ├── contact/
│   │   └── page.tsx            # Contact page: info panel + ContactForm
│   └── investments/
│       └── page.tsx            # Investments page: all 6 categories + highlights
├── components/
│   ├── AnimatedPattern.tsx     # CSS-only ambient orb background (server component)
│   ├── AnimatedStats.tsx       # Intersection-observer counter animation for stats row
│   ├── Button.tsx              # Shared button/link component (3 variants)
│   ├── CommitmentCards.tsx     # 4 animated value cards (Patience, Discipline, Rigor, Integrity)
│   ├── ContactForm.tsx         # Validated contact form with success/error states
│   ├── Footer.tsx              # Site footer with navigation columns and copyright
│   ├── HeroBackground.tsx      # Canvas-based Siri-style orbs + particle animation
│   ├── InvestmentCard.tsx      # (imported in page, used via InvestmentCarousel)
│   ├── InvestmentCarousel.tsx  # Paginated Netflix-style card carousel
│   ├── LayeredIcon.tsx         # Animated concentric ring icon for About section
│   ├── Navbar.tsx              # Fixed top navigation bar with mobile overlay menu
│   ├── PageHero.tsx            # Inner page hero using HeroBackground in compact mode
│   ├── PartnerCTA.tsx          # "Partner With Us" call-to-action section
│   ├── PhilosophyPillars.tsx   # Animated 4-pillar philosophy cards
│   ├── ScrollIndicator.tsx     # Scroll prompt arrow (used in hero areas)
│   ├── ScrollProgress.tsx      # Fixed gold scroll progress bar at top of viewport
│   ├── SectionGlow.tsx         # CSS-only ambient glow for section backgrounds
│   ├── SectionHeader.tsx       # Reusable section heading (overline + title + subtitle)
│   ├── SectionReveal.tsx       # Scroll-triggered reveal animation with stagger support
│   ├── SmoothScroll.tsx        # Lenis smooth scroll initialiser (no visible output)
│   └── WhoWeServeCards.tsx     # Cursor-tracking tilt cards for investor type sections
├── lib/
│   └── constants.ts            # All site content: company info, nav links, section data
├── public/
│   ├── logo.png                # Primary logo (PNG)
│   ├── logo.svg                # Logo SVG variant
│   └── images/                 # All page images (JPG)
│       ├── our-story.jpg
│       ├── story.jpg
│       ├── eb5.jpg
│       ├── secured-loan.jpg
│       ├── unsecured-loan.jpg
│       ├── real-estate.jpg
│       ├── private-strategic-v2.jpg
│       ├── alternative.jpg
│       ├── individual-investors.jpg
│       ├── high-net-worth.jpg
│       ├── international-investors.jpg
│       ├── market-sector-analysis.jpg
│       ├── project-business-fundamentals.jpg
│       ├── capital-structure.jpg
│       └── long-term-growth.jpg
├── package.json
├── tsconfig.json
└── README.md
```

---

## Routes

| Route | File | Description |
|---|---|---|
| `/` | `app/page.tsx` | Homepage — hero, about preview, philosophy quote, investment carousel, approach overview, focus areas, who we serve, values, CTA |
| `/about` | `app/about/page.tsx` | About — story, investment philosophy, principles, philosophy quote, who we serve, values |
| `/investments` | `app/investments/page.tsx` | Investments — overview stats, 6 alternating investment category sections, highlights |
| `/approach` | `app/approach/page.tsx` | Approach — investment mindset, 4-step evaluation process, risk awareness, guiding principles |
| `/contact` | `app/contact/page.tsx` | Contact — contact details, investor type pills, validated enquiry form |
| `/robots.txt` | `app/robots.ts` | Search engine crawl rules |
| `/sitemap.xml` | `app/sitemap.ts` | XML sitemap for all 5 public routes |

All routes are pre-rendered as static pages at build time.

---

## Components

### `Button`

```tsx
<Button
  variant="primary" | "ghost" | "ghostGold"  // Default: "primary"
  href="/contact"          // Renders as Next.js Link when provided
  onClick={() => {}}       // Used when no href
  showArrow={true}         // Shows animated ArrowRight icon
  type="button" | "submit" // For button elements. Default: "button"
  disabled={false}
  className=""
>
  Label Text
</Button>
```

**Variants:**
- `primary` — Gold background, navy text
- `ghost` — White border, white text (for dark backgrounds)
- `ghostGold` — Gold border, gold text (for light backgrounds)

---

### `SectionHeader`

```tsx
<SectionHeader
  overline="Our Story"     // Small uppercase label above title (optional)
  title="A Long-Term..."   // Supports HTML via dangerouslySetInnerHTML
  subtitle="Description"   // Body text below title (optional)
  align="left" | "center"  // Default: "left"
  light={false}            // Light mode (cream/gray text for dark backgrounds)
  titleClassName=""        // Additional classes on the h2 element
/>
```

---

### `SectionReveal`

```tsx
<SectionReveal
  from="up" | "down" | "left" | "right" | "none"  // Default: "up"
  delay={0.15}   // Animation delay in seconds
  stagger={true} // Wrap children in stagger container (pair with StaggerItem)
  className=""
>
  <content />
</SectionReveal>

// For staggered children:
<StaggerItem className="">
  <content />
</StaggerItem>
```

---

### `PageHero`

```tsx
<PageHero
  title="Page Title"       // Supports HTML (rendered via dangerouslySetInnerHTML)
  subtitle="Description"   // Optional body text below title
/>
```

Uses `HeroBackground` in compact mode (420px min-height). Includes animated entrance for overline, title, subtitle, and gold accent line.

---

### `InvestmentCarousel`

```tsx
<InvestmentCarousel
  items={[
    {
      number: "01",
      title: "Category Title",
      description: "Description text",
      href: "/investments#anchor",
    },
    // ...
  ]}
/>
```

Renders a paginated carousel with 3 visible cards, prev/next buttons, and page dot indicators.

---

### `WhoWeServeCards`

```tsx
<WhoWeServeCards
  items={[
    {
      title: "Card Title",
      description: "Description",
      icon: "User" | "Briefcase" | "Globe",
      image: "/images/example.jpg",  // Optional
    },
  ]}
/>
```

---

### `SectionGlow`

```tsx
<SectionGlow variant="dark" | "light" />
```

Drop inside any `relative overflow-hidden` container. Renders CSS-animated ambient orbs — no JS, no canvas.

---

### `AnimatedStats`

Self-contained. Renders a 3-column stat strip (Established, Asset Classes, Investor Focus) with intersection-observer count-up animation. Used in the About page Our Story section.

---

### `CommitmentCards`

Self-contained. Renders 4 animated commitment value cards (Patience, Discipline, Rigor, Integrity) in a 2-column grid with inline SVG icons. Used in the Approach page mindset panel.

---

### `PhilosophyPillars`

Self-contained. Renders 4 animated philosophy pillar cards (Patience, Discipline, Rigor, Alignment) with animated SVG icons. Used in the About page Investment Philosophy section.

---

### `ContactForm`

Self-contained. Renders a validated contact form with fields for first name, last name, email, investor type (dropdown), and message. Displays inline validation errors on blur and a success state on submit.

---

### `HeroBackground`

```tsx
<HeroBackground
  compact={false}   // true = 420px min-height (for inner pages), false = full viewport
  className=""
/>
```

Canvas-based animation with Siri-style drifting orbs, a gold particle field with connection lines, and a mouse-tracking spotlight effect. Properly cancels `requestAnimationFrame` and removes all event listeners on unmount.

---

### `ScrollProgress`

Self-contained. Fixed 2px gold gradient bar at the very top of the viewport that tracks scroll position via `framer-motion`'s `useScroll`.

---

### `SmoothScroll`

Self-contained. Initialises Lenis smooth scroll globally. Renders no visible output. Cleans up on unmount.

---

## Design System

### Colors

Defined in `app/globals.css` under `@theme` and consumed as Tailwind utility classes:

| Token | Class | Hex |
|---|---|---|
| Navy | `text-navy` / `bg-navy` | `#0B1D3A` |
| Navy Deep | `text-navy-deep` / `bg-navy-deep` | `#06101F` |
| Navy Mid | `text-navy-mid` / `bg-navy-mid` | `#132B4F` |
| Gold | `text-gold` / `bg-gold` | `#C5A256` |
| Gold Light | `text-gold-light` / `bg-gold-light` | `#D4B978` |
| Cream | `text-cream` / `bg-cream` | `#F8F6F1` |
| Gray 100 | `text-gray-100` | `#F5F5F7` |
| Gray 200 | `text-gray-200` | `#E8E8EC` |
| Gray 400 | `text-gray-400` | `#9A9AA0` |
| Gray 600 | `text-gray-600` | `#5A5A64` |
| Gray 800 | `text-gray-800` | `#2A2A34` |
| Text Dark | `text-text-dark` | `#1A1A2E` |

### Typography

Two Google Fonts loaded via `next/font/google`:

| Variable | Font | Weights | Usage |
|---|---|---|---|
| `--font-cormorant` | Cormorant Garamond | 400, 500, 600, 700 (normal + italic) | Display/headings (`font-display`) |
| `--font-dm-sans` | DM Sans | 300, 400, 500, 600, 700 | Body text (`font-body`) |

Apply via classes: `font-display` for serif headings, `font-body` for body text.

### Overline Label

A shared utility class `.overline-label` defined in `globals.css`:
- Font: DM Sans
- Size: 0.75rem
- Weight: 600
- Letter spacing: 0.2em
- Color: `#C5A256` (gold)
- Text transform: uppercase

### Scrollbar

Custom styled via `::-webkit-scrollbar`: 6px width, navy track, gold thumb.

---

## Getting Started

**Prerequisites:** Node.js 18+ and npm.

```bash
# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The development server uses Turbopack for fast refresh.

---

## Building for Production

```bash
npm run build
```

All pages are pre-rendered as static HTML. The build output is in `.next/`.

To serve the production build locally:

```bash
npm start
```

---

## Deployment

### Vercel (Recommended)

1. Push the repository to GitHub, GitLab, or Bitbucket.
2. Import the project at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Next.js — no configuration required.
4. Set the production domain to `parvathyinvestments.com` in Vercel project settings.
5. The `robots.ts` and `sitemap.ts` files reference `https://parvathyinvestments.com` — update this base URL if deploying to a different domain.

### Other Platforms

Since the site outputs fully static pages, it can be deployed to any static hosting platform:

```bash
npm run build
# Deploy the .next/ directory using the platform's Next.js adapter
```

Platforms with Next.js support: Netlify, AWS Amplify, Cloudflare Pages (with `@cloudflare/next-on-pages`).

---

## Content Management

All site content is centralised in `/lib/constants.ts`:

- `COMPANY` — Company name, email, location, tagline, copyright
- `NAV_LINKS` — Top navigation links
- `FOOTER_LINKS` — Footer navigation columns
- `INVESTMENT_CATEGORIES` — Homepage carousel items
- `APPROACH_STEPS` — 4-step approach icons and descriptions
- `FOCUS_AREAS` — Value creation focus area list
- `WHO_WE_SERVE` — Investor type cards with images
- `VALUES` — Company values list
- `PRINCIPLES` — Investment principles (About page)
- `GUIDING_PRINCIPLES` — Approach guiding principles
- `PHILOSOPHY_QUOTE` — Blockquote displayed on multiple pages
- `RISK_ITEMS` — Risk awareness items (Approach page)
- `INVESTMENT_HIGHLIGHTS` — Investment platform highlights (Investments page)

To update copy or add new items, edit the relevant array or object in this file.
