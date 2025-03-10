/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  env: {
    NEWT_CDN_API_TOKEN: process.env.NEWT_CDN_API_TOKEN,
    NEWT_SPACE_UID: process.env.NEWT_SPACE_UID,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
