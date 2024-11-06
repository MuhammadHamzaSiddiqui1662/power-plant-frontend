/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "localhost",
      "power-plant-2a6a23ab8691.herokuapp.com",
      "api.pwrplant.ca",
    ],
  },
  cssModules: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
