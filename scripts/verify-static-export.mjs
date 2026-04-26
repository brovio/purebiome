#!/usr/bin/env node
/**
 * Verify all files under [countryCode] have generateStaticParams() for static export
 * This runs BEFORE the build to catch issues early
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..');

// Recursively find all page.tsx and layout.tsx files
function findPageFiles(dir, files = []) {
  const items = readdirSync(dir);
  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      findPageFiles(fullPath, files);
    } else if (item === 'page.tsx' || item === 'layout.tsx') {
      files.push(fullPath);
    }
  }
  return files;
}

const startDir = join(root, 'apps/storefront/src/app/[countryCode]');
const files = findPageFiles(startDir);

console.log(`\n🔍 Verifying ${files.length} files for static export compatibility...\n`);

let missingCount = 0;
const missingFiles = [];

for (const file of files) {
  const content = readFileSync(file, 'utf-8');
  const relativePath = file.replace(root, '').replace(/\\/g, '/');
  
  if (!content.includes('generateStaticParams')) {
    console.log(`❌ MISSING: ${relativePath}`);
    missingFiles.push(relativePath);
    missingCount++;
  } else {
    console.log(`✅ OK: ${relativePath}`);
  }
}

// Check sitemap and robots
const sitemapPath = join(root, 'apps/storefront/src/app/sitemap.ts');
const robotsPath = join(root, 'apps/storefront/src/app/robots.ts');

const sitemapContent = readFileSync(sitemapPath, 'utf-8');
const robotsContent = readFileSync(robotsPath, 'utf-8');

if (!sitemapContent.includes('export const dynamic')) {
  console.log(`❌ MISSING: /apps/storefront/src/app/sitemap.ts (needs dynamic export)`);
  missingFiles.push('/apps/storefront/src/app/sitemap.ts');
  missingCount++;
} else {
  console.log(`✅ OK: /apps/storefront/src/app/sitemap.ts`);
}

if (!robotsContent.includes('export const dynamic')) {
  console.log(`❌ MISSING: /apps/storefront/src/app/robots.ts (needs dynamic export)`);
  missingFiles.push('/apps/storefront/src/app/robots.ts');
  missingCount++;
} else {
  console.log(`✅ OK: /apps/storefront/src/app/robots.ts`);
}

console.log(`\n${'='.repeat(60)}`);
if (missingCount === 0) {
  console.log(`✅ SUCCESS: All ${files.length + 2} files are ready for static export!`);
  console.log(`${'='.repeat(60)}\n`);
  process.exit(0);
} else {
  console.log(`❌ FAILURE: ${missingCount} files are missing generateStaticParams()`);
  console.log(`${'='.repeat(60)}\n`);
  console.log('Missing files:');
  missingFiles.forEach(f => console.log(`  - ${f}`));
  console.log('\nRun: node scripts/add-static-params.mjs to fix automatically\n');
  process.exit(1);
}
