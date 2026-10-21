
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.ngrok-free.app",
    "*.ngrok-free.dev",
    "*.ngrok.io",
  ],

  async redirects() {
    return [
      {
        source: "/:path*",
        destination: "https://thesynchubcreativecenter.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
