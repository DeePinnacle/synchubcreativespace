import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows the Next.js 16 dev server to serve /_next/* assets (JS, CSS,
  // HMR) when the app is accessed through the ngrok tunnel during Paystack
  // webhook testing, not just localhost. Wildcard covers ngrok's random
  // subdomain per session so you don't have to edit this every restart.
  allowedDevOrigins: ["*.ngrok-free.app", "*.ngrok-free.dev", "*.ngrok.io"],
};

export default nextConfig;