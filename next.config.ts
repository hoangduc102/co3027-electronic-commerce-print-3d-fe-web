import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Bật standalone mode cho Docker deployment
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com", // YouTube
      },
      {
        protocol: "https",
        hostname: "images-na.ssl-images-amazon.com", // Amazon
      },
      {
        protocol: "https",
        hostname: "**.ssl-images-amazon.com",
      },
      {
        protocol: "https",
        hostname: "www.shutterstock.com", // Add this
      },
    ],
  },
};

export default nextConfig;
