import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even with
    // ESLint errors. This should be a temporary measure for deployment.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
