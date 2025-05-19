import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "content.airhex.com",
        },
        
      ],
    },
};

export default nextConfig;
