#!/usr/bin/env node
/**
 * Remove static export config from pages that don't need it for SSR
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..');

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

// Skip these files - they have backend calls and need generateStaticParams
const skipFiles = [
  'categories/[...category]/page.tsx',
  'collections/[handle]/page.tsx',
  'products/[handle]/page.tsx',
  'blog/[slug]/page.tsx',
  'recipes/[slug]/page.tsx'
];

let fixed = 0;

for (const file of files) {
  const relativePath = file.replace(startDir, '').replace(/\\/g, '/');
  
  // Skip files that need their generateStaticParams
  if (skipFiles.some(skip => relativePath.includes(skip))) {
    continue;
  }
  
  let content = readFileSync(file, 'utf-8');
  let modified = false;
  
  // Remove export const dynamic = 'force-static'
  if (content.includes("export const dynamic = 'force-static'")) {
    content = content.replace(/export const dynamic = 'force-static'\n/g, '');
    modified = true;
  }
  
  // Remove export const dynamicParams = false
  if (content.includes('export const dynamicParams = false')) {
    content = content.replace(/export const dynamicParams = false\n/g, '');
    modified = true;
  }
  
  // Remove simple generateStaticParams that just return [{ countryCode: 'us' }]
  if (content.includes('export function generateStaticParams()') && 
      content.includes("return [{ countryCode: 'us' }]")) {
    content = content.replace(/export function generateStaticParams\(\) \{\s*return \[\{ countryCode: 'us' \}\]\s*\}\n\n/g, '');
    modified = true;
  }
  
  if (modified) {
    writeFileSync(file, content, 'utf-8');
    console.log(`✅ Cleaned: ${relativePath}`);
    fixed++;
  }
}

console.log(`\n✅ Cleaned ${fixed} files`);
