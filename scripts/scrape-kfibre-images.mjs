#!/usr/bin/env node
/**
 * Scrape high-res product images from kfibre.com Shopify store
 */
import fs from 'fs/promises';
import path from 'path';

const PRODUCTS = [
  // Tubs
  { name: 'tub-neutral', url: 'https://kfibre.com/products/kfibre-essential-gut-health-fibre-neutral-tub-80g.json' },
  { name: 'tub-berry', url: 'https://kfibre.com/products/kfibre-essential-gut-health-fibre-berry-tub-80g.json' },
  { name: 'tub-citrus', url: 'https://kfibre.com/products/kfibre-essential-gut-health-fibre-orange-tub-80g.json' },
  // Sachets
  { name: 'sachets-neutral', url: 'https://kfibre.com/products/kfibre-essential-gut-health-fibre-neutral-sachets-1-5g-x-14-pack.json' },
  { name: 'sachets-berry', url: 'https://kfibre.com/products/kfibre-essential-gut-health-fibre-berry-sachets-1-5g-x-14-pack.json' },
  { name: 'sachets-citrus', url: 'https://kfibre.com/products/kfibre-essential-gut-health-fibre-orange-sachets-1-5g-x-14-pack.json' },
  // Pro range
  { name: 'pro-constipation', url: 'https://kfibre.com/products/kfibre-pro-dietary-constipation-support.json' },
  { name: 'pro-bloating', url: 'https://kfibre.com/products/kfibre-pro-dietary-indigestion-bloating.json' },
];

const OUTPUT_DIR = 'apps/storefront/public/images/products';

async function downloadImage(url, outputPath) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.error(`Failed to download ${url}: ${response.status}`);
      return false;
    }
    const buffer = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(outputPath, buffer);
    console.log(`  ✓ Downloaded ${path.basename(outputPath)} (${(buffer.length / 1024).toFixed(1)}KB)`);
    return true;
  } catch (err) {
    console.error(`  ✗ Error downloading ${url}: ${err.message}`);
    return false;
  }
}

async function scrapeProduct(product) {
  console.log(`\nProcessing: ${product.name}`);
  
  try {
    // Fetch product JSON from Shopify
    const response = await fetch(product.url);
    if (!response.ok) {
      console.error(`  ✗ Failed to fetch ${product.url}: ${response.status}`);
      return;
    }
    
    const data = await response.json();
    const productData = data.product;
    
    if (!productData || !productData.images || productData.images.length === 0) {
      console.error(`  ✗ No images found for ${product.name}`);
      return;
    }
    
    console.log(`  Found ${productData.images.length} images`);
    
    // Download the first (main) image at full resolution
    const imageUrl = productData.images[0].src;
    // Shopify images can be resized by adding _1024x1024 or _2048x2048 before the extension
    const highResUrl = imageUrl.replace(/\.(jpg|jpeg|png|webp)$/i, '_1024x1024.$1');
    
    // Clean URL for extension extraction (remove query params)
    const cleanUrl = imageUrl.split('?')[0];
    let ext = path.extname(cleanUrl).toLowerCase() || '.jpg';
    // Normalize extensions
    if (ext === '.jpeg') ext = '.jpg';
    const outputPath = path.join(OUTPUT_DIR, `${product.name}${ext}`);
    
    // Also try webp version for better compression
    const webpOutputPath = path.join(OUTPUT_DIR, `${product.name}.webp`);
    
    await downloadImage(highResUrl, outputPath);
    
    // If we got a jpg, convert to webp (we'll just download both for now)
    console.log(`  Source: ${imageUrl}`);
    
  } catch (err) {
    console.error(`  ✗ Error processing ${product.name}: ${err.message}`);
  }
}

async function main() {
  console.log('=== Scraping Kfibre Product Images ===\n');
  
  // Ensure output directory exists
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  
  for (const product of PRODUCTS) {
    await scrapeProduct(product);
  }
  
  console.log('\n=== Done ===');
}

main().catch(console.error);
