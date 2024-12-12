
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.pexels.com",
      "images.unsplash.com",
      "secure.gravatar.com",
      "amazonaws.com",
      "clinisio-backend.s3.ap-south-1.amazonaws.com",
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: 'clinis.io',
            },
          ],
          destination: '/:path*',
        },
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: '(?<subdomain>.*?)\\.[^\\.]+\\.[^\\.]+$',
            },
          ],
          destination: '/doctor/:subdomain/:path*',
        },
      ],
    }
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  assetPrefix: process.env.NEXT_PUBLIC_ASSET_PREFIX || '',
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
}

export default nextConfig
