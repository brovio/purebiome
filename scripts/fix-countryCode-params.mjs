#!/usr/bin/env node
/**
 * Fix generateStaticParams to return countryCode for all pages under [countryCode]
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

let fixed = 0;

for (const file of files) {
  let content = readFileSync(file, 'utf-8');
  
  // Check if it has generateStaticParams that returns []
  if (content.includes('export function generateStaticParams()') && 
      content.includes('return []') &&
      !content.includes('countryCodes') &&
      !content.includes('STATIC_EXPORT')) {
    
    // Replace return [] with proper countryCode return
    content = content.replace(
      /export function generateStaticParams\(\) \{\s*return \[\]\s*\}/g,
      `export function generateStaticParams() {\n  return [{ countryCode: 'us' }]\n}`
    );
    
    writeFileSync(file, content, 'utf-8');
    console.log(`✅ Fixed: ${file.replace(root, '')}`);
    fixed++;
  }
}

console.log(`\n✅ Fixed ${fixed} files`);
