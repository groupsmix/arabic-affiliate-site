# Arabic Affiliate Content Starter

Minimal, config-driven Arabic affiliate content site built with **Next.js 16**, **Tailwind CSS 4**, and **Supabase**.

Designed to be forked and adapted to any product-review niche (home organization, pets, fashion accessories, beauty tools, kitchen gadgets, fitness gear, etc.) by changing config and copy — not code architecture.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server Components)
- **Styling:** Tailwind CSS 4 + `@tailwindcss/typography`
- **Database:** Supabase (Postgres + Row Level Security)
- **Analytics:** Google Analytics 4 (optional)
- **Language:** TypeScript, RTL-first

## Project Structure

```
app/
  layout.tsx            # Root layout (metadata, analytics, direction)
  page.tsx              # Homepage (article listing)
  content/[slug]/       # Content pages (articles, reviews, comparisons, guides)
  category/[slug]/      # Category listing pages
  about/                # About page
  privacy/              # Privacy policy
  terms/                # Terms of use
  admin/                # Admin panel (content, products, categories CRUD)
  api/                  # API routes (auth, affiliate click tracking)
  robots.ts             # robots.txt (config-driven)
  sitemap.ts            # sitemap.xml (config-driven)

components/
  Shell.tsx             # Site chrome (header, nav, footer, disclosure)
  Breadcrumb.tsx        # Visual breadcrumb nav
  JsonLdBreadcrumb.tsx  # Breadcrumb structured data (JSON-LD)
  ArticleCard.tsx       # Content listing card
  ProductCard.tsx       # Product card with affiliate link
  AffiliateLink.tsx     # Tracked affiliate link (nofollow, sponsored)
  ContentBody.tsx       # Sanitized HTML body renderer
  PageHeader.tsx        # Page title + description header
  GoogleAnalytics.tsx   # GA4 script loader
  WebVitals.tsx         # Core Web Vitals reporter
  admin/                # Admin-only form components

config/
  site.ts               # Brand, copy, disclosure text, page metadata
  seo.ts                # SEO defaults, robots, sitemap, canonical base
  categories.ts         # Content types, layouts, validation rules

lib/
  queries.ts            # Supabase read queries
  actions.ts            # Server actions (CRUD)
  types.ts              # Shared TypeScript types
  auth.ts               # Admin auth (token generation)
  analytics.ts          # Affiliate click tracking
  sanitize.ts           # HTML sanitization
  slugify.ts            # Arabic-safe slug generation
  supabase.ts           # Supabase client (browser)
  supabase-server.ts    # Supabase client (server)

supabase/
  schema.sql            # Database schema (run once in Supabase SQL Editor)
```

## Getting Started

### 1. Clone and install

```bash
git clone <your-fork-url>
cd arabic-affiliate-site
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Run `supabase/schema.sql` in the SQL Editor
3. Copy `.env.local.example` to `.env.local` and fill in your keys:

```bash
cp .env.local.example .env.local
```

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Admin panel is at `/admin/login` (password set via `ADMIN_PASSWORD` env var).

---

## How to Launch a New Niche from This Starter

### Step 1 — Update site config

Edit **`config/site.ts`** — this is the single "edit this first" file:

| Field | What to change |
|---|---|
| `name` | Your brand / site name |
| `description` | One-line niche pitch (used as default meta description) |
| `niche` | Short niche label |
| `contactEmail` | Real contact email |
| `language` / `direction` / `locale` | Keep `ar` / `rtl` / `ar_SA` for Arabic, or change for other languages |
| `affiliateDisclosure` | Footer affiliate disclosure text |
| `contentDisclosure` | In-content affiliate disclosure banner |
| `priceDisclaimer` | Price disclaimer shown on product cards |
| `availabilityDisclaimer` | Shipping/availability disclaimer |
| `buyButtonLabel` | CTA text on affiliate buttons |
| `pages.about` / `pages.privacy` / `pages.terms` | Title, description, and heading for each legal page |
| `footerLinks` | Footer navigation (add or remove pages) |
| All other labels | Homepage heading, empty states, error messages, etc. |

### Step 2 — Update SEO config

Edit **`config/seo.ts`** (most values derive from `site.ts` automatically):

- `robotsDisallow` — paths blocked from crawlers (default: `/admin/`, `/api/`)
- `sitemapStaticPages` — static pages included in sitemap with priority/frequency

Set your production domain in `.env.local`:
```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

### Step 3 — Update content types and categories

Edit **`config/categories.ts`**:

- Add/remove content types (e.g. `review`, `comparison`, `guide`, `article`)
- Set which types are `commercial` (shows affiliate disclosures + product sidebar)
- Set layout per type (`sidebar` or `standard`)
- Set minimum product requirements per type

If you add or remove content type values, also update the `CHECK` constraint in `supabase/schema.sql`.

### Step 4 — Seed content and product data

Using the admin panel (`/admin`):

1. **Create categories** — e.g. "Blenders", "Coffee Makers", "Air Fryers"
2. **Add products** — name, affiliate URL, image, price, merchant
3. **Write content** — articles, reviews, comparisons, buying guides
4. **Link products to content** — via the product linker in the content editor

### Step 5 — Review legal and trust pages

These pages have **config-driven metadata and headings** but their **body copy requires manual editing** for each niche:

| Page | File | What to edit |
|---|---|---|
| About | `app/about/page.tsx` | Mission statement, "how we work" prose |
| Privacy | `app/privacy/page.tsx` | Data collection details, cookie descriptions |
| Terms | `app/terms/page.tsx` | Disclaimer scope, IP terms, liability |

The site name (`siteConfig.name`), contact email (`siteConfig.contactEmail`), and disclosure text (`siteConfig.contentDisclosure`) are already injected dynamically — you only need to edit the niche-specific prose.

### Step 6 — Deploy

Set all env vars from `.env.local.example` on your hosting platform, then deploy:

```bash
npm run build
```

Works with Vercel, Netlify, or any Node.js hosting.

---

## What Is Intentionally Not Included

| Feature | Reason |
|---|---|
| i18n / multi-language | Adds complexity; change `config/site.ts` labels for a single language |
| Legal CMS / page builder | Legal pages are static TSX; edit directly per niche |
| Multi-tenant / multi-site | This is a single-site starter; fork per niche |
| User accounts / comments | Out of scope for an affiliate content site |
| Payment processing | Affiliate model only — no direct commerce |
| Email collection / newsletter | Add separately if needed |
| Image optimization CDN | Uses Next.js Image with remote patterns; add a CDN if needed |
| Automated content generation | Content is created manually via the admin panel |
| A/B testing | Add separately if needed |
| Advanced analytics dashboard | Uses GA4; affiliate clicks are tracked in Supabase |

---

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```
