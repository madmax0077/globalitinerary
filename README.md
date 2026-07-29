# Voyara — Premium Luxury World Travel Guide

> The World, Beautifully Guided.

A world-class, production-ready travel guide platform built to scale to **every country, city, island and landmark on earth**. Designed to feel like a modern SaaS product — not a blog — with a premium, luxury, editorial aesthetic.

Built with the latest App Router stack, React Server Components, ISR, dynamic metadata and full structured-data SEO.

---

## ✨ Highlights

- **Stunning, premium UI** — glassmorphism, gradient accents, large typography, generous whitespace, soft shadows, big rounded corners.
- **Automatic dark / light mode** with a beautiful animated toggle (`next-themes`, class strategy).
- **Buttery Framer Motion animations** — page reveals, staggered grids, hover lifts, image zoom, animated counters, mega-menu, gallery lightbox.
- **Instant global search** — ⌘K / Ctrl+K command palette with debounced autocomplete, grouped results and keyboard navigation.
- **Fully responsive & mobile-first** with an animated slide-out mobile nav.
- **Scalable content model** — dynamic country / city / attraction / collection / article pages with `generateStaticParams` + **ISR**.
- **Complete SEO** — dynamic metadata, canonical URLs, OpenGraph, Twitter cards, dynamic OG image, `sitemap.xml`, `robots.txt`, web manifest, and JSON-LD (`BreadcrumbList`, `FAQPage`, `TouristAttraction`, `TouristDestination`, `Article`).
- **Admin dashboard** — sidebar shell, KPI cards, Recharts analytics (area / bar / donut), and searchable content-management tables for every entity.
- **Accessibility** — skip link, focus rings, semantic landmarks, ARIA labels, keyboard-navigable dialogs, reduced-motion support.
- **Google AdSense-ready** — responsive `AdSlot` containers that blend into the design (renders real `<ins>` units when configured, tasteful placeholders otherwise).

---

## 🧱 Tech Stack

| Area | Technology |
| --- | --- |
| Framework | **Next.js 16** (App Router) · React 19 · TypeScript |
| Styling | **Tailwind CSS v4** (CSS-first `@theme`) · custom design tokens |
| UI | shadcn-style component library · Radix primitives · `lucide-react` |
| Animation | **Framer Motion** |
| Search | `cmdk` command palette + cached API route |
| Charts | **Recharts** |
| Data / ORM | **Prisma** + **PostgreSQL** (schema included) |
| Auth | **Auth.js (NextAuth v5)** — inert in demo mode, provider-ready |
| Deployment | **Vercel-ready** |

> Note: `create-next-app` provisions the current latest (Next 16 / React 19 / Tailwind v4), which is a superset of the requested Next 15 stack — same App Router, RSC, Server Actions and ISR APIs.

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment (optional — the app runs in demo mode without it)
cp .env.example .env

# 3. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The site runs entirely on rich in-memory demo data, so **no database is required** to explore it.

### Production build

```bash
npm run build
npm run start
```

---

## 🗄️ Database (optional, for production)

A complete, scalable Prisma schema lives in [`prisma/schema.prisma`](prisma/schema.prisma) modelling countries, cities, attractions, articles, images, FAQs, collections, newsletter subscribers and the full Auth.js user/session tables.

```bash
# Set DATABASE_URL in .env, then:
npx prisma generate
npx prisma migrate dev --name init
```

The data-access layer (`src/data/*`, `src/lib/search.ts`) is structured so swapping the in-memory arrays for Prisma queries is a drop-in change.

---

## 📁 Project Structure

```
src/
├─ app/
│  ├─ layout.tsx                # Root layout: fonts, providers, chrome
│  ├─ page.tsx                  # Homepage (all sections)
│  ├─ countries/                # Listing + [slug] (ISR, metadata, JSON-LD)
│  ├─ cities/                   # Listing + [slug]
│  ├─ attractions/              # Listing + [slug]
│  ├─ collections/              # Listing + [slug]
│  ├─ blog/                     # Listing + [slug] (Article schema)
│  ├─ map/  planner/            # Interactive map + trip planner
│  ├─ admin/                    # Dashboard + [section] management
│  ├─ api/                      # search · newsletter · auth
│  ├─ sitemap.ts robots.ts manifest.ts opengraph-image.tsx
│  ├─ not-found.tsx error.tsx loading.tsx
│  └─ globals.css               # Design tokens, dark mode, utilities
├─ components/
│  ├─ ui/                       # Button, Card, Badge, Dialog, Accordion, Tabs…
│  ├─ layout/                   # Navbar (+mega menu), Footer, Mobile nav, Theme toggle
│  ├─ search/                   # Command palette + provider + triggers
│  ├─ home/                     # Hero, Collections, Category showcase, World map
│  ├─ shared/                   # DestinationCard, Gallery, FAQ, Timeline, Stats…
│  └─ admin/                    # Sidebar, Charts, DataTable
├─ data/                        # countries · cities · attractions · content
└─ lib/                         # types · seo · search · config · images · utils
```

---

## 🔎 SEO Endpoints

- `/{sitemap.xml}` — every static + dynamic route with priorities
- `/robots.txt` — with sitemap + host
- `/manifest.webmanifest` — PWA manifest
- `/opengraph-image` — dynamically generated branded social card
- Per-page **JSON-LD** structured data injected via `<JsonLd />`

---

## 🔐 Environment Variables

See [`.env.example`](.env.example). All are optional for local exploration:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical/OG absolute URLs |
| `DATABASE_URL` | PostgreSQL connection (enables persistence) |
| `AUTH_SECRET` / `AUTH_URL` | Auth.js session signing |
| `AUTH_GITHUB_ID/SECRET` | Optional OAuth provider |
| `NEXT_PUBLIC_ADSENSE_CLIENT_ID` | Enables live AdSense units |

---

## ⚡ Performance

- Static generation + **ISR** (`revalidate`) on all content pages
- `next/image` with AVIF/WebP, responsive `sizes`, priority hero images
- Optimized Google fonts (`next/font`) with `display: swap`
- Package-import optimization for `lucide-react` & `framer-motion`
- Cached search API (`s-maxage` + `stale-while-revalidate`)
- Reduced-motion honored across all animations

---

## 📄 License

Provided as a production-ready starter. Replace demo imagery/content with licensed assets before commercial use.
