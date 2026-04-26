# GitHub Pages Deployment Source Fix

## Problem
GitHub Pages is showing the OLD site instead of the new beautiful design because it's deploying from the wrong source.

## Solution

### Step 1: Change GitHub Pages Source
1. Go to: https://github.com/brovio/purebiome/settings/pages
2. Under **"Build and deployment"** section
3. Find **"Source"** dropdown
4. Change from **"Deploy from a branch"** to **"GitHub Actions"**
5. Click **Save**

### Step 2: Verify Custom Domain
While you're there, verify:
- **Custom domain** field shows: `purebio.me`
- **Enforce HTTPS** is checked

### Step 3: Wait for Deployment
1. Go to: https://github.com/brovio/purebiome/actions
2. Find the latest successful workflow run
3. Click on it to see the deployment URL
4. Wait 1-2 minutes for DNS propagation

### Step 4: Clear Cache & Test
1. Open incognito/private window
2. Visit: https://purebio.me
3. You should now see the beautiful new site with:
   - "Your gut, rebuilt daily" hero
   - Product images (Kfibre Essential, Pro, Vital)
   - "Start the ritual" CTA button
   - Navigation: Shop, Essential, Pro, Recipes, Journal, Account

## What Was Wrong?

GitHub Pages has TWO deployment methods:
1. **Deploy from a branch** (old method) - deploys from `gh-pages` or `main` branch
2. **GitHub Actions** (new method) - deploys from workflow artifacts

Your workflow is configured for GitHub Actions, but GitHub Pages was still set to deploy from a branch (probably showing old cached content).

## Verification

After changing the source, the next push to `feature/purebio-me-marketing-preview` will trigger a fresh deployment with the new design.

Current workflow triggers on:
- Push to `main` branch
- Push to `feature/purebio-me-marketing-preview` branch
- Manual workflow dispatch

## Need to Force a Fresh Deploy?

If you want to trigger a deployment right now:
1. Go to: https://github.com/brovio/purebiome/actions/workflows/github-pages.yml
2. Click **"Run workflow"** button
3. Select branch: `feature/purebio-me-marketing-preview`
4. Click **"Run workflow"**
