import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com', // allow your hero image host
      'images.unsplash.com',   
      "i.pravatar.cc"    // allow Unsplash images
    ],
  },
  reactStrictMode: true,
};

export default nextConfig;
