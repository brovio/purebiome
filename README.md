# PureBiome — purebio.me

This repo now contains **two things** during migration:

1. The **live static marketing site** (HTML/CSS/JS at the root) — currently deployed via GitHub Pages at `purebio.me`. Keep this working until the new stack is in production.
2. An in-progress **Next.js + Medusa monorepo** (under `apps/`, `services/`, `packages/`, `infra/`) that will replace it.

---

## Monorepo (in progress)

Commerce-grade rebuild: React storefront + open-source headless backend. See the build spec in the project chat for full context.

### Stack

| Layer | Choice |
|-------|--------|
| Storefront | Next.js 15 (App Router) + React 19 + Tailwind (`apps/storefront`) |
| Commerce backend | **Medusa v2** — Node/TS, MIT licensed (`services/medusa`) |
| Database | Postgres 16 + Redis 7 (local via `infra/docker-compose.yml`) |
| Payments | Stripe (Medusa-native provider) |
| Shared code | `packages/tokens` (design tokens), `packages/ui` (Nav, GeoBar, CheckoutModal) |
| Hosting (target) | Vercel (storefront) + Railway (Medusa + DB) |

### Layout

```
apps/
  storefront/            Next.js storefront — all landing variants live here as routes
services/
  medusa/                Medusa v2 backend + admin
packages/
  tokens/                design tokens (CSS vars + TS exports)
  ui/                    shared React components
infra/
  docker-compose.yml     Postgres + Redis for local dev
```

### Local dev (once scaffolded)

```powershell
pnpm install
pnpm infra:up            # starts Postgres + Redis (Docker Desktop must be running)
pnpm dev                 # runs storefront (:8000) + medusa (:9000) in parallel
```

### Prerequisites

- Node 20+ (22 works), pnpm 9 (`corepack enable pnpm`), Docker Desktop.

### Migration status

- [x] **Step 1** — workspace scaffolding, tokens, UI stub, docker-compose.
- [x] **Step 2a** — scaffold `services/medusa` (Medusa v2 + admin), env + CORS wired.
- [ ] **Step 2b** — boot Postgres/Redis (`pnpm infra:up`), run migrations + seed products. *Requires Docker Desktop running.*
- [x] **Step 3a** — Medusa Next.js starter installed at `apps/storefront` (includes cart, regions, checkout, Stripe Elements scaffolding out of the box).
- [x] **Step 3b** — `@purebiome/tokens` wired in root layout, Fraunces + Inter loaded via `next/font`, Tailwind extended with brand palette (`bg-cane`, `text-bone`, `bg-culture`, …) and `font-display`.
- [x] **Seed** — `services/medusa/src/scripts/seed.ts` rewritten for PureBiome: AU + International regions (AUD/USD/NZD), Brisbane stock location, 4 products (Essential Tub, Essential Sachets, Calm, Flow) with real variants and pricing. *Runs once Postgres is up.*
- [ ] **Step 4** — ship shared components (`Nav`, `GeoBar`, `Footer`) into `packages/ui`.
- [ ] **Step 5** — V1 (AG1 Foundational) landing at `/`.
- [ ] **Step 6** — Stripe Elements checkout end-to-end.
- [ ] **Step 7** — V3 (LMNT blunt) landing at `/v3`.
- [ ] **Step 8** — deploy to Vercel + Railway, point `purebio.me` DNS.
- [ ] **Step 9** — archive the static preview below into `archive/`.

---

# PureBiome — purebio.me marketing preview (current static site)

Static marketing site (HTML, CSS, vanilla JS) for **PureBiome** gut-health positioning. This repo is a **concept / preview** build, not a production storefront.

---

## What’s in the box

| Area | Notes |
|------|--------|
| **Primary homepage** | [`index.html`](index.html) — “new branding” (studio-style hero, Essential / Pro range cards). |
| **Classic branding** | [`index-classic.html`](index-classic.html) — colour-forward lineup and tub imagery for the legacy range story. |
| **Archived variants** | [`index-v1.html`](index-v1.html), [`index-v3.html`](index-v3.html) — earlier layout experiments kept for reference. |
| **Styles** | [`styles.css`](styles.css) — layout, hero, offer stack, range cards, checkout modal, GEO bar, motion (with reduced-motion support). |
| **Behaviour** | [`main.js`](main.js) — region (AU / Intl), campaign UTM capture, checkout modal, GEO confirmation bar, Stripe Payment Link wiring. |
| **Stripe (phase B+)** | [`docs/stripe-appwrite-phase-b.md`](docs/stripe-appwrite-phase-b.md) — optional Appwrite Function + Stripe Checkout Session path. |
| **Placeholder images** | [`scripts/gen-placeholders.ps1`](scripts/gen-placeholders.ps1) — regenerates demo PNG/JPG under `images/` when assets are missing locally. |

---

## Summarised history (what’s been done)

1. **Marketing surface**  
   Single-page structure: hero, trust bar, starter offer, two range cards, science / quote, guarantee strip, testimonials, contact CTA. Copy and structure tuned for supplements / gut health.

2. **Merge of homepage experiments**  
   Best ideas from multiple HTML drafts were combined into the main [`index.html`](index.html): full-viewport hero, canefield background, v3-style accents, optional floating card (later tightened for layout reliability).

3. **Checkout (phase A — fastest demo)**  
   “Buy now” opens a **modal** with bundle summary; **Continue to secure checkout** uses **Stripe Payment Links** (no custom card fields on this site). Configure in [`main.js`](main.js): `PUREBIO.stripePaymentLinkAu` and `PUREBIO.stripePaymentLinkIntl`. UTMs from the URL are stored and appended to the checkout link when possible.

4. **GEO confirmation bar (AG1-style)**  
   Bottom bar to confirm inferred country and offer a nearby alternative (e.g. AU ↔ NZ, IE ↔ GB). Uses client-side geolocation when available, with a **visible fallback** so the bar still appears if the API fails. Works alongside the existing **AU / Intl** shipping toggle.

5. **Dual branding**  
   Two entry points: new look ([`index.html`](index.html)) vs classic lineup / tubs ([`index-classic.html`](index-classic.html)), each with its own meta, canonical, and JSON-LD where implemented.

6. **SEO / discovery**  
   Per-page titles and descriptions, Open Graph / Twitter cards, canonical URLs, structured data (Organization, WebSite, product range as ItemList). Lazy loading on below-fold images where appropriate.

7. **Motion**  
   Short CSS entrance animations on hero + trust bar, with **`prefers-reduced-motion`** respected.

8. **Reliability pass**  
   Hero layout hardened (stable aspect ratio, `object-fit`, overlap fixes), image `onerror` fallbacks on key heroes, GEO bar always usable without silent failure. Placeholder assets can be regenerated via the PowerShell script when `images/` is incomplete.

9. **Future path (documented, not required for static demo)**  
   Optional **Appwrite Function** + Stripe Checkout Session (redirect or embedded) for metadata, dynamic line items, and tighter tracking — described in [`docs/stripe-appwrite-phase-b.md`](docs/stripe-appwrite-phase-b.md).

---

## Local preview

Open [`index.html`](index.html) in a browser, or serve the folder with any static server, for example:

```bash
npx --yes serve .
```

---

## Configuration checklist

- **Stripe Payment Links:** set `PUREBIO.stripePaymentLinkAu` and `PUREBIO.stripePaymentLinkIntl` in [`main.js`](main.js).
- **Replace placeholder art:** swap files under `images/` with final photography; re-run [`scripts/gen-placeholders.ps1`](scripts/gen-placeholders.ps1) only if you need temporary placeholders again.
- **Production domain:** search/replace `https://purebio.me/` in meta tags and JSON-LD if the live URL differs.

---

## Licence / affiliation

Footer copy on the site states this is a **concept preview** for purebio.me and is **not affiliated with previous domain holders**. Adjust legal/footer text when you go live.
