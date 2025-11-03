import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  // Bật standalone mode cho Docker deployment
  output: "standalone",
};

export default nextConfig;
