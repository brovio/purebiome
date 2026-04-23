# Deployment guide — PureBiome

This document is the playbook for taking the monorepo live on the recommended
stack:

- **Storefront** → Vercel (Next.js 15, edge runtime where possible)
- **Medusa backend + admin** → Railway (long-running Node worker)
- **Postgres** → Railway managed Postgres
- **Redis** → Railway managed Redis
- **DNS** → whoever holds `purebio.me` (Cloudflare recommended)
- **Images** → S3-compatible bucket (Cloudflare R2 is cheapest)

Nothing here is deploy-button magic; every step is a human decision and a
credential I don't have. Work through them in order.

---

## 0. Before you start

Have these handy:

- Vercel account with access to the target team
- Railway account + billing enabled (the free tier can't run a long-running
  Medusa instance 24/7 reliably)
- Stripe account with live and test mode API keys
- DNS admin access to `purebio.me`
- An S3-compatible bucket + access keys (R2, AWS S3, Backblaze B2)

You will commit nothing secret to git. All secrets live in the platforms'
environment variable UIs.

---

## 1. Railway — Postgres + Redis

1. **New Project** → *Empty Project* named `purebiome-prod`.
2. **Add Postgres** → *Add Service → Database → PostgreSQL 16*.
   - Wait for it to provision. Copy the `DATABASE_URL` from the Variables tab.
3. **Add Redis** → *Add Service → Database → Redis 7*.
   - Copy the `REDIS_URL`.

Nothing else to do here — the databases are headless.

---

## 2. Railway — Medusa service

1. **New Service** → *Deploy from GitHub repo* → select `brovio/purebiome`.
2. **Root Directory**: `services/medusa`.
3. **Start Command**: `pnpm run start` (not `dev` — that watches files and
   uses more memory).
4. **Build Command**: `pnpm install --frozen-lockfile && pnpm run build`
   - Railway detects pnpm from `pnpm-workspace.yaml`. If it insists on npm,
     add a `.nvmrc` and force pnpm via `NPM_CONFIG_PACKAGE_MANAGER=pnpm`.

### Environment variables on the Medusa service

Copy these from Railway's Postgres/Redis services (use the `${{Postgres.DATABASE_URL}}`
reference syntax so rotations propagate):

```env
NODE_ENV=production
PORT=9000

DATABASE_URL=${{Postgres.DATABASE_URL}}
REDIS_URL=${{Redis.REDIS_URL}}

JWT_SECRET=<run: openssl rand -hex 32>
COOKIE_SECRET=<run: openssl rand -hex 32>

STORE_CORS=https://purebio.me,https://www.purebio.me
ADMIN_CORS=https://admin.purebio.me
AUTH_CORS=https://purebio.me,https://www.purebio.me,https://admin.purebio.me

# Stripe — fill with LIVE keys (or test keys if not live yet)
STRIPE_API_KEY=sk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# Optional: S3 storage — required for admin image uploads
S3_FILE_URL=https://<bucket>.<region>.r2.cloudflarestorage.com
S3_ACCESS_KEY_ID=xxx
S3_SECRET_ACCESS_KEY=xxx
S3_REGION=auto
S3_BUCKET=purebiome-media
```

### First-run: migrate + seed (production)

Railway exposes a one-off shell. SSH into the Medusa service and run:

```sh
pnpm exec medusa db:migrate
# optional — only on first deploy; skip on re-deploys or you'll double-seed
pnpm exec medusa exec ./src/scripts/seed.ts
# create the first admin user (interactive)
pnpm exec medusa user -e you@purebio.me -p '<strong-password>'
```

Copy the token (`pk_...`) that the seed logs — you'll paste it into Vercel
next. If you already have an API key in prod from a previous seed, fetch it
with:

```sql
SELECT token FROM api_key WHERE type = 'publishable' LIMIT 1;
```

### Stripe webhook

In Stripe Dashboard → Developers → Webhooks, add:

- Endpoint URL: `https://api.purebio.me/hooks/payment/stripe`
- Events: `payment_intent.succeeded`, `payment_intent.payment_failed`,
  `payment_intent.amount_capturable_updated`

Copy the signing secret into `STRIPE_WEBHOOK_SECRET`.

### Custom domain

Railway → Medusa service → Settings → Domains → add `api.purebio.me` (and
`admin.purebio.me` if you want the admin on a subdomain).

---

## 3. Vercel — storefront

1. **New Project** → import `brovio/purebiome`.
2. **Root Directory**: `apps/storefront`.
3. **Framework Preset**: Next.js (auto-detected).
4. **Build Command**: leave default.
5. **Install Command**: `pnpm install` (Vercel auto-detects pnpm from
   `pnpm-workspace.yaml`).

### Environment variables on Vercel

```env
MEDUSA_BACKEND_URL=https://api.purebio.me
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=pk_...      # from step 2's seed
NEXT_PUBLIC_BASE_URL=https://purebio.me
NEXT_PUBLIC_DEFAULT_REGION=au
NEXT_PUBLIC_STRIPE_KEY=pk_live_...              # Stripe publishable key

# Only if using S3 images for products; otherwise leave empty.
MEDUSA_CLOUD_S3_HOSTNAME=<bucket>.r2.cloudflarestorage.com
MEDUSA_CLOUD_S3_PATHNAME=/purebiome-media
```

### Custom domain

Vercel → Project → Settings → Domains → add `purebio.me` and `www.purebio.me`.
Vercel will show you the DNS records to set (an A record for the apex and a
CNAME for `www`).

---

## 4. DNS cutover

Current state: `purebio.me` points to the static marketing preview (GitHub
Pages or wherever). You want zero-downtime cutover.

1. **Pre-flight**: with Vercel deployed but DNS still pointing to the static
   site, visit the Vercel preview URL (`purebiome-xxx.vercel.app`). Walk
   the full purchase flow end-to-end with a Stripe test card. Fix anything
   broken before cutting DNS.

2. **Flip the apex**: in Cloudflare (or wherever `purebio.me` is hosted):
   - Replace the existing apex A record with Vercel's (e.g. `76.76.21.21`).
   - Add CNAME `www → cname.vercel-dns.com`.
   - Add CNAME `api → <railway-medusa-service>.up.railway.app`.
   - Add CNAME `admin → <railway-medusa-service>.up.railway.app`.

3. **TTL**: drop TTL to 5 minutes ~24 hours *before* the cutover, then raise
   back to 1 hour after it's stable. Keeps the rollback window tight.

4. **Archive**: move the static-site source to `archive/static-preview/`
   (see README Step 9) so it's out of the deploy path.

---

## 5. Post-deploy smoke test

From a fresh incognito window:

- `https://purebio.me` → V1 landing, hero + 4 product grid + footer.
- `https://purebio.me/au/products/essential-tub` → PDP with variant picker.
- Add to cart → cart count increments.
- Go through checkout → Stripe Elements renders → test card (`4242 4242 4242 4242`
  in test mode, or a real card in live mode on you own order) completes.
- `https://admin.purebio.me/app` → Medusa admin login, order appears.
- `pnpm e2e` from local against `PLAYWRIGHT_BASE_URL=https://purebio.me` —
  smoke tests pass against prod.

---

## 6. Monitoring you should set up before week 2

- **Uptime**: BetterStack or UptimeRobot pings on `purebio.me/au` and
  `api.purebio.me/health`.
- **Error tracking**: Sentry on both the Next.js project and the Medusa
  service (Medusa has a Sentry integration — `@medusajs/sentry`).
- **Log drain**: Railway → Settings → Log Drains → forward to Axiom or
  Datadog for longer retention.
- **Stripe alerts**: enable Radar alerts for failed payments and disputes.

---

## 7. Rolling back

- **Vercel**: *Deployments → previous deployment → Promote to Production*.
  Instant, no DNS changes needed.
- **Railway**: *Deployments → redeploy previous commit*. Takes ~2min.
- **Schema**: Medusa writes down-migrations where possible. If a migration
  fails catastrophically in prod, restore from Railway's Postgres backup
  (daily snapshots are free).
- **DNS**: if cutover goes badly, flip the apex A record back to the old IP.
  With a 5-minute TTL, recovery is ~5 minutes.
