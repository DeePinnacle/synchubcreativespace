
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "*.ngrok-free.app",
    "*.ngrok-free.dev",
    "*.ngrok.io",
  ],

  async redirects() {
    if (process.env.ENABLE_OLD_URL_REDIRECT !== "true") {
      return [];
    }

    return [
      {
        source: "/:path*",
        destination:
          "https://thesynchubcreativecenter.com/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
