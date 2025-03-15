import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.1.1:3000/:path*", // Replace with your Linux machine's IP and port
      },
    ];
  },
};

export default nextConfig;
