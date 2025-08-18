/** @type {import('next').NextConfig} */
const nextConfig = {

  eslint: {
    // Ignore ESLint errors during production builds
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "utfs.io",
        port: "",
      },
    ],

    domains: ['images.unsplash.com', 'www.hp.com','i.dell.com', 'dlcdnwebimgs.asus.com'],
  },
};

export default nextConfig;
