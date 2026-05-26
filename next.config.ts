import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    trailingSlash: true,
    devIndicators: false,
    images: {
        unoptimized: true,
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
        ],
    },
};

export default nextConfig;


