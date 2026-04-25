# GitHub Pages Custom Domain Setup (purebio.me)

## Quick Overview

1. **Push code** → GitHub Actions builds and deploys
2. **Enable GitHub Pages** in repo settings
3. **Add custom domain** in GitHub settings
4. **Update DNS** on Namecheap
5. **SSL certificate** provisions automatically (takes a few minutes)

---

## Step 1: Push Your Code

```bash
cd c:\Purebiome\purebiome
git add -A
git commit -m "feat: GitHub Pages deployment with custom domain purebio.me"
git push origin main
```

This triggers the GitHub Actions workflow (`.github/workflows/github-pages.yml`).

---

## Step 2: Enable GitHub Pages

1. Go to your repo on GitHub: `https://github.com/YOUR_USERNAME/purebiome`
2. Click **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The workflow will run automatically

---

## Step 3: Configure Custom Domain

Still in **Settings → Pages**:

1. Under **Custom domain**, enter: `purebio.me`
2. Click **Save**
3. ✅ Check **Enforce HTTPS** (after DNS propagates)

GitHub will automatically create an SSL certificate via Let's Encrypt.

---

## Step 4: Namecheap DNS Setup

Log in to **Namecheap** → **Domain List** → Click **Manage** next to purebio.me

### Option A: Apex Domain (purebio.me)

Go to **Advanced DNS** tab:

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | 185.199.108.153 | Automatic |
| A Record | @ | 185.199.109.153 | Automatic |
| A Record | @ | 185.199.110.153 | Automatic |
| A Record | @ | 185.199.111.153 | Automatic |

### Option B: WWW Subdomain (www.purebio.me)

| Type | Host | Value | TTL |
|------|------|-------|-----|
| CNAME Record | www | YOUR_USERNAME.github.io | Automatic |

### Option C: Both (Recommended)

| Type | Host | Value | TTL |
|------|------|-------|-----|
| A Record | @ | 185.199.108.153 | Automatic |
| A Record | @ | 185.199.109.153 | Automatic |
| A Record | @ | 185.199.110.153 | Automatic |
| A Record | @ | 185.199.111.153 | Automatic |
| CNAME Record | www | YOUR_USERNAME.github.io | Automatic |

**GitHub Pages IPs:**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

---

## Step 5: Wait for Propagation

| Step | Time |
|------|------|
| GitHub Actions build | ~2 minutes |
| DNS propagation | 5 minutes - 48 hours (usually < 1 hour) |
| SSL certificate | 5-15 minutes after DNS resolves |

---

## Step 6: Verify SSL (HTTPS)

Once GitHub shows ✅ **"Your site is published at https://purebio.me"**:

1. Visit `https://purebio.me`
2. Check for 🔒 lock icon in browser
3. If you see "Not Secure", wait 5-10 more minutes

---

## Troubleshooting

### "Domain does not resolve" error in GitHub

- Double-check DNS records in Namecheap
- Use [whatsmydns.net](https://whatsmydns.net) to check propagation
- Ensure no conflicting records (delete old A records if they exist)

### SSL certificate not provisioning

1. Remove custom domain from GitHub settings
2. Wait 2 minutes
3. Re-add custom domain
4. GitHub will re-request the certificate

### Site shows 404

- Check GitHub Actions completed successfully (green checkmark)
- Verify `CNAME` file exists in `apps/storefront/public/CNAME`
- Ensure `.nojekyll` file is in dist folder

### Styles not loading

- Check browser console for mixed content errors
- Ensure all assets use relative paths
- Verify `basePath` is set correctly in next.config

---

## DNS Verification Commands

Check if your DNS is working:

```bash
# Check A records
nslookup purebio.me

# Check CNAME
nslookup -type=CNAME www.purebio.me

# Check all records
dig purebio.me +short
```

---

## What Works on GitHub Pages

✅ Static HTML/CSS/JS  
✅ All React components  
✅ Product pages (static data)  
✅ Blog posts  
✅ Recipes  
✅ Quiz (static version)  
✅ Responsive design  
✅ SEO meta tags  
✅ Custom fonts  

❌ Server-side API routes  
❌ Database connections  
❌ Cart/checkout (disabled in demo mode)  
❌ Real-time updates  

---

## Switching Back to Local Dev

```bash
cd apps/storefront
# Restore original config
git checkout next.config.js
pnpm run dev
```

---

## Deploying Updates

Just push to main:
```bash
git add .
git commit -m "Update: new content"
git push origin main
```

GitHub Actions rebuilds and deploys automatically (~2 minutes).

---

## Cost

**FREE** — GitHub Pages custom domains with SSL:
- ✅ Free hosting
- ✅ Free SSL certificate (Let's Encrypt)
- ✅ Unlimited bandwidth (fair use)
- ✅ Automatic deployments

Only cost is your Namecheap domain renewal (~$10/year).

---

## Ready?

1. ✅ Push code
2. ✅ Enable GitHub Pages (GitHub Actions)
3. ✅ Add custom domain in settings
4. ✅ Update Namecheap DNS
5. ⏳ Wait 5-60 minutes
6. ✅ Share `https://purebio.me` with client!
