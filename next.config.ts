import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/ai-workflow/:path*",
        destination: "/legacy/ai-workflow/:path*",
        permanent: false,
      },
      {
        source: "/session0/:path*",
        destination: "/legacy/session0/:path*",
        permanent: false,
      },
      {
        source: "/mogakil/:path*",
        destination: "/legacy/mogakil/:path*",
        permanent: false,
      },
    ];
  },
};
export default nextConfig;
