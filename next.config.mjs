import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // FIX: Modern formats add kiye
    formats: ['image/avif', 'image/webp'],
    
    // Remote patterns (Same as before)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  // FIX: Experimental optimization features
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion'],
  },
};

export default withPWA(nextConfig);