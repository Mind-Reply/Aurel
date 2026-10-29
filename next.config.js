/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
  },
  // When deploying from monorepo root with rootDirectory = apps/aurel,
  // or from repo root treating apps/aurel as source.
}

module.exports = nextConfig
