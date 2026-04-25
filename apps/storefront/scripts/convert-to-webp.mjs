#!/usr/bin/env node
/**
 * Convert high-res product images to optimized WebP
 */
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';

const PRODUCTS_DIR = 'public/images/products';

const CONVERSIONS = [
  // Tubs - convert PNG to WebP
  { input: 'tub-berry.png', output: 'tub-berry.webp', width: 1200 },
  { input: 'tub-citrus.png', output: 'tub-citrus.webp', width: 1200 },
  { input: 'tub-neutral.png', output: 'tub-neutral.webp', width: 1200 },
  // Sachets - convert JPG to WebP
  { input: 'sachets-berry.jpg', output: 'sachets-berry.webp', width: 1200 },
  { input: 'sachets-citrus.jpg', output: 'sachets-citrus.webp', width: 1200 },
  { input: 'sachets-neutral.jpg', output: 'sachets-neutral.webp', width: 1200 },
];

async function convertImage({ input, output, width }) {
  const inputPath = path.join(PRODUCTS_DIR, input);
  const outputPath = path.join(PRODUCTS_DIR, output);
  
  try {
    await sharp(inputPath)
      .resize(width, null, { withoutEnlargement: true, fit: 'inside' })
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);
    
    const stats = await fs.stat(outputPath);
    console.log(`✓ ${output} (${(stats.size / 1024).toFixed(1)}KB)`);
    return true;
  } catch (err) {
    console.error(`✗ Failed to convert ${input}: ${err.message}`);
    return false;
  }
}

async function main() {
  console.log('=== Converting to optimized WebP ===\n');
  
  for (const conv of CONVERSIONS) {
    await convertImage(conv);
  }
  
  console.log('\n=== Done ===');
  
  // List final webp files
  const files = await fs.readdir(PRODUCTS_DIR);
  const webps = files.filter(f => f.endsWith('.webp') && !f.includes('-old'));
  console.log(`\nFinal WebP files:`);
  for (const f of webps.sort()) {
    const stats = await fs.stat(path.join(PRODUCTS_DIR, f));
    console.log(`  ${f}: ${(stats.size / 1024).toFixed(1)}KB`);
  }
}

main().catch(console.error);
