// @ts-check

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  images: {
    domains: [
      "images.pexels.com",
      "images.unsplash.com",
      "secure.gravatar.com",
      "amazonaws.com",
      "clinisio-backend.s3.ap-south-1.amazonaws.com",
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // compiler: {
  //   // Enables the styled-components SWC transform
  //   styledComponents: true
  // }
};

export default nextConfig;
