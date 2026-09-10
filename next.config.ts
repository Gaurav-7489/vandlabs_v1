import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'images', hostname: '**' },
      { protocol: 'https', hostname: '**' }
    ],
    formats: ['image/avif', 'image/webp']
  }
}

export default nextConfig
