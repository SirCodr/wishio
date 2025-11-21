import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverExternalPackages: ['@playwright/browser-chromium']
  }
}

export default nextConfig
