import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    domains: ["thewidercollective.com", "twc-assets.sgp1.digitaloceanspaces.com"],
  },
  trailingSlash: true,
};

export default nextConfig;
