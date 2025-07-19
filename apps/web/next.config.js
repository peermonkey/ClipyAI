/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeFonts: false, // Disable font optimization to avoid network issues during build
  },
  env: {
    NEXT_TELEMETRY_DISABLED: '1',
  },
}

module.exports = nextConfig