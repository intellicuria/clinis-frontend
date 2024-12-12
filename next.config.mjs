
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
              value: '(?<username>.*)\\.clinis\\.io',
            },
          ],
          destination: '/doctor/:username/:path*',
        },
      ],
    }
  },
  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig
