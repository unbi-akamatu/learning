/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // ✅ 追加！
  images: {
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
