# Full E-Commerce Deployment Guide

## Option 2: Next.js + Netlify (Full Store)

This deployment gives you:
- ✅ Complete shopping cart functionality
- ✅ Checkout flow with Medusa backend
- ✅ API routes (search, cart, checkout)
- ✅ Server-side rendering for SEO
- ✅ Automatic deploys on git push

---

## Prerequisites

1. **GitHub account** (free)
2. **Netlify account** (free tier works)
3. **Medusa backend deployed** (Render, Railway, or VPS)

---

## Step 1: Push to GitHub

```bash
# From project root
git init
git add .
git commit -m "Initial commit"
gh repo create purebiome --public --source=. --push
```

Or manually:
1. Create new repo at https://github.com/new
2. Copy the commands shown after creation
3. Run them in your `c:\Purebiome\purebiome` folder

---

## Step 2: Deploy Medusa Backend

The storefront needs a live Medusa backend. Deploy options:

### Option A: Railway (Easiest)
1. Go to https://railway.app
2. "New Project" → "Deploy from GitHub repo"
3. Select your repo
4. Add PostgreSQL database
5. Set environment variables

### Option B: Render
1. https://dashboard.render.com
2. "New Web Service"
3. Connect GitHub repo
4. Build command: `pnpm install && pnpm build`
5. Start command: `pnpm start`

### Required Backend Env Vars:
```
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
```

Get your backend URL: `https://your-medusa-app.render.com`

---

## Step 3: Connect to Netlify

1. Go to https://app.netlify.com
2. "Add new site" → "Import from GitHub"
3. Select your `purebiome` repo
4. Configure build:
   - **Base directory:** `apps/storefront`
   - **Build command:** `pnpm run build`
   - **Publish directory:** `.next`

5. Click "Show advanced" → Add environment variables:
   ```
   NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://your-medusa-backend.com
   NEXT_PUBLIC_DEFAULT_REGION=au
   NEXT_PUBLIC_STOREFRONT_URL=https://purebiome.netlify.app
   ```

6. Click "Deploy site"

---

## Step 4: Configure Netlify Next.js Plugin

The `netlify.toml` in `apps/storefront/` already has:
```toml
[[plugins]]
  package = "@netlify/plugin-nextjs"
```

This enables:
- Next.js API routes
- Image optimization
- Middleware
- SSR/SSG

---

## Step 5: Custom Domain

1. In Netlify: Site settings → Domain management
2. "Add custom domain"
3. Enter: `purebiome.com.au`
4. Update DNS at your registrar:
   - CNAME: `purebiome.com.au` → `your-site.netlify.app`
   - Or use Netlify's nameservers

4. Update env var:
   ```
   NEXT_PUBLIC_STOREFRONT_URL=https://purebiome.com.au
   ```

---

## Step 6: Test Everything

After deployment, verify:

```bash
# Test homepage
curl https://your-site.netlify.app/au

# Test product page
curl https://your-site.netlify.app/au/products/essential-tub

# Test cart API
curl https://your-site.netlify.app/api/cart

# Test sitemap
curl https://your-site.netlify.app/sitemap.xml
```

Manual checks:
- [ ] Add product to cart
- [ ] View cart
- [ ] Start checkout
- [ ] Complete test purchase (use Stripe test mode)

---

## Environment Variables Reference

### Storefront (.env.local)
```
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://api.purebiome.com.au
NEXT_PUBLIC_DEFAULT_REGION=au
NEXT_PUBLIC_STOREFRONT_URL=https://purebiome.com.au
```

### Medusa Backend
```
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
JWT_SECRET=random_string_32_chars
COOKIE_SECRET=random_string_32_chars
STORE_CORS=https://purebiome.com.au
ADMIN_CORS=https://admin.purebiome.com.au
```

---

## Troubleshooting

### Build fails with "Cannot find module"
- Check `base directory` is set to `apps/storefront`
- Ensure `pnpm-lock.yaml` is committed

### Cart not working
- Verify `NEXT_PUBLIC_MEDUSA_BACKEND_URL` is set
- Check backend is responding: `curl https://your-backend/health`

### Images not loading
- Check `images.remotePatterns` in `next.config.js`
- Add your domain to the list

### 404 on product pages
- Ensure Medusa backend has products
- Check `NEXT_PUBLIC_MEDUSA_BACKEND_URL` is correct

---

## Continuous Deployment

With this setup:
1. Push to `main` branch → Auto-deploy to production
2. Pull requests → Deploy previews (test before merging)
3. Every commit gets its own URL for testing

---

## Cost Estimate

| Service | Free Tier | Paid (Starter) |
|---------|-----------|----------------|
| Netlify | 100GB bandwidth | $19/month |
| Railway | $5 credit/month | ~$10-20/month |
| Domain | - | ~$15/year |
| **Total** | **$0-5/month** | **~$35-55/month** |

---

## Next Steps After Deploy

1. **Stripe Connect**: Set up live payments
2. **Postmark**: Configure order confirmation emails
3. **Analytics**: Add Google Analytics 4
4. **Search Console**: Submit sitemap to Google
5. **Monitoring**: Set up uptime monitoring

---

## Quick Deploy Checklist

- [ ] Code pushed to GitHub
- [ ] Medusa backend deployed and running
- [ ] Netlify site connected to GitHub
- [ ] Environment variables set in Netlify
- [ ] Build successful
- [ ] Custom domain added (optional)
- [ ] Cart functionality tested
- [ ] Checkout flow tested
- [ ] SSL certificate active
- [ ] Sitemap submitted to Google

---

**Questions?** Check Netlify docs: https://docs.netlify.com
