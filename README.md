# Pensr-1 — The Original Text Generation Model

A satirical AI product landing page built with Next.js 14, Framer Motion, and Recharts.
Inspired by [oryzo.ai](https://oryzo.ai) by Lusion.

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Charts**: Recharts
- **Fonts**: Bebas Neue (display), DM Serif Display (serif), Instrument Sans (body), DM Mono (mono)
- **Deployment**: Vercel

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout, fonts, metadata
│   ├── page.tsx            # Main page — assembles all sections
│   └── globals.css         # Design tokens, animations, grain
├── components/
│   ├── sections/
│   │   ├── Hero.tsx         # Full-screen hero with typewriter
│   │   ├── ModelCard.tsx    # Fake AI model spec table
│   │   ├── Features.tsx     # 6-feature grid
│   │   ├── HowItWorks.tsx   # 3-step inference pipeline
│   │   ├── ContextWindow.tsx # 1.2km ink visualization
│   │   ├── Benchmarks.tsx   # Recharts bar/radar charts
│   │   ├── BentoGrid.tsx    # Bento social proof tiles
│   │   ├── Testimonials.tsx # Fake review grid
│   │   ├── Pricing.tsx      # 3-tier pricing
│   │   ├── Paper.tsx        # Fake research paper + BibTeX
│   │   └── Footer.tsx       # Footer + CTA
│   ├── ui/
│   │   ├── Nav.tsx          # Sticky nav with mobile menu
│   │   ├── Cursor.tsx       # Custom cursor (dot + ring)
│   │   └── Ticker.tsx       # Scrolling marquee strip
│   └── icons/
│       ├── PenIcon.tsx      # Logo icon
│       └── FeatureIcons.tsx # All feature SVG icons
└── lib/                    # (reserved for utilities)
```

## Sections

| Section | Description |
|---|---|
| Hero | Full-screen with animated typewriter, stat grid, scroll indicator |
| Ticker | Horizontal scrolling stats marquee |
| Model card | Fake spec table, abstract, open-weight framing |
| Features | 6-card grid with SVG icons and stats |
| How it works | 3-step numbered pipeline with code blocks |
| Context window | Ink length visualization + comparison table |
| Benchmarks | 4 Recharts: cost, uptime, latency, radar |
| Bento grid | 6 tiles: uptime, GPU, power, legacy, drop test |
| Testimonials | 6 fake reviews + aggregate stats |
| Pricing | 3-tier cards + comparison table |
| Paper | Fake LaTeX-style research paper + BibTeX + peer review |
| Footer | CTA + link grid + disclaimer |

## Design Tokens

| Token | Value |
|---|---|
| `ink` | `#0A0A0E` — main background |
| `dim` | `#1C1C24` — elevated surface |
| `line` | `#2A2A36` — borders |
| `cobalt` | `#1A3AFF` — primary accent |
| `paper` | `#F5F0E8` — primary text |
| `mist` | `#8A8A9A` — secondary text |

## Customization

To adapt this for a different object (e.g. a stapler, a mug):

1. Replace all "pen/ink/nib" references in section files
2. Update `src/app/globals.css` accent color if needed
3. Update metadata in `src/app/layout.tsx`
4. Swap SVG icons in `src/components/icons/`
5. Update benchmark data in `Benchmarks.tsx`

---

*Pensr-1 is a real pen. This site is a creative portfolio piece. No products are for sale.*
