#!/usr/bin/env node
/**
 * Force update all page/layout files by adding a timestamp comment
 * This ensures GitHub Actions sees them as changed
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

const timestamp = new Date().toISOString();
let updated = 0;

for (const file of files) {
  let content = readFileSync(file, 'utf-8');
  
  // Add timestamp comment at the top if not already there
  if (!content.includes('Last verified:')) {
    const lines = content.split('\n');
    lines.splice(0, 0, `// Last verified: ${timestamp}`);
    content = lines.join('\n');
    writeFileSync(file, content, 'utf-8');
    console.log(`✅ Updated: ${file.replace(root, '')}`);
    updated++;
  }
}

console.log(`\n✅ Updated ${updated} files with timestamp`);
