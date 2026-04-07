# PureBiome — purebio.me marketing preview

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
