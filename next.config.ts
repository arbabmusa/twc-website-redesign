import type { NextConfig } from "next";

const TWC_OS = "https://the-wider-collective-os.vercel.app";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    domains: ["thewidercollective.com", "twc-assets.sgp1.digitaloceanspaces.com"],
  },
  trailingSlash: true,
  async rewrites() {
    return [
      { source: "/app", destination: `${TWC_OS}/app` },
      { source: "/app/:path*", destination: `${TWC_OS}/app/:path*` },
      { source: "/portal", destination: `${TWC_OS}/portal` },
      { source: "/portal/:path*", destination: `${TWC_OS}/portal/:path*` },
      { source: "/login", destination: `${TWC_OS}/login` },
      { source: "/logout", destination: `${TWC_OS}/logout` },
      { source: "/inactive", destination: `${TWC_OS}/inactive` },
      { source: "/onboarding-required", destination: `${TWC_OS}/onboarding-required` },
      { source: "/api/webhooks/:path*", destination: `${TWC_OS}/api/webhooks/:path*` },
    ];
  },
};

export default nextConfig;
