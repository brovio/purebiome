/**
 * Next.js config for GitHub Pages deployment with custom domain
 * This is a STATIC export config - no backend required
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  
  // Images must be unoptimized for static export
  images: {
    unoptimized: true,
  },

  // Required for static export with trailing slashes
  trailingSlash: true,

  // Ignore TypeScript and ESLint errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Skip env validation for static build
  env: {
    SKIP_ENV_VALIDATION: 'true',
    STATIC_EXPORT: 'true',
  },
}

module.exports = nextConfig
