/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@alarabi/database", "@alarabi/arabic-utils", "@alarabi/curriculum"],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
