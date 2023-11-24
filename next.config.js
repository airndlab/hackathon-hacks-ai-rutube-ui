/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  generateBuildId: () => {
    return process.env.GIT_SHA || (new Date()).toISOString();
  },
};
module.exports = nextConfig;
