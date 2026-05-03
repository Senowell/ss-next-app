import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

let strapiHostname = "";
if (API_URL) {
  try {
    strapiHostname = new URL(API_URL).hostname;
  } catch {
    strapiHostname = "";
  }
}

const imageDomains = strapiHostname ? [strapiHostname] : [];

const nextConfig: NextConfig = {
  images: {
    domains: imageDomains,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
    ],
  },
};

export default nextConfig;
