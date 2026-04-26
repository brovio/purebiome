#!/bin/bash
# Build script for static export with pre-build verification

set -e

echo "🔍 Verifying static export compatibility..."
node ../../scripts/verify-static-export.mjs

echo "📦 Copying GitHub Pages config..."
cp next.config.github.js next.config.js

echo "🏗️  Building static site..."
NEXT_PUBLIC_DEMO_MODE=true STATIC_EXPORT=true pnpm run build

echo "✅ Build complete! Output in ./dist"
