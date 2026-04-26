#!/usr/bin/env node
/**
 * Add generateStaticParams() to all page.tsx files for static export
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
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

console.log(`Found ${files.length} page.tsx and layout.tsx files\n`);

let modified = 0;

for (const file of files) {
  let content = readFileSync(file, 'utf-8');
  
  // Skip if already has generateStaticParams
  if (content.includes('generateStaticParams')) {
    console.log(`✓ Skip: ${file.replace(root, '')}`);
    continue;
  }
  
  // Skip if already has dynamic export
  if (content.includes("export const dynamic = 'force-static'")) {
    console.log(`✓ Skip: ${file.replace(root, '')}`);
    continue;
  }
  
  // Find the first export default function/const
  const exportDefaultMatch = content.match(/(export default (?:async )?function|export default)/);
  
  if (!exportDefaultMatch) {
    console.log(`⚠ Skip (no export default): ${file.replace(root, '')}`);
    continue;
  }
  
  const insertIndex = exportDefaultMatch.index;
  
  // Insert before export default
  const before = content.slice(0, insertIndex);
  const after = content.slice(insertIndex);
  
  const insertion = `export const dynamic = 'force-static'\n\nexport async function generateStaticParams() {\n  return []\n}\n\n`;
  
  const newContent = before + insertion + after;
  
  writeFileSync(file, newContent, 'utf-8');
  console.log(`✅ Modified: ${file.replace(root, '')}`);
  modified++;
}

console.log(`\n✅ Modified ${modified} files`);
console.log(`✓ Skipped ${files.length - modified} files`);
