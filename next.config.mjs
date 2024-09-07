/** @type {import('next').NextConfig} */
const nextConfig = {
    // ... any existing configuration ...
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'replicate.com',
        },
        {
          protocol: 'https',
          hostname: 'replicate.delivery',
        },
      ],
    },
  };
  
  export default nextConfig;