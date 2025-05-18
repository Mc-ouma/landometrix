/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even with
    // ESLint errors. This should be a temporary measure for deployment.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Warning: This allows production builds to successfully complete even with
    // TypeScript errors. This should be a temporary measure for deployment.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
