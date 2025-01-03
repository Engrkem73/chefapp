/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    if (config.resolve.fallback) {
      config.resolve.fallback.punycode = false;
      config.resolve.fallback['node:punycode'] = false;
    }
    return config;
  }
};

module.exports = nextConfig;
