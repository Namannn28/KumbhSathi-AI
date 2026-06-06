import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.yourdomain.com",
      },
      {
        protocol: "https",
        hostname: "vercel.blob.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com", // Google Photos
      },
      {
        protocol: "https",
        hostname: "*.cloudinary.com", // Cloudinary for Kumbh images
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client"],
  },
  headers: async () => {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-store, max-age=0",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
