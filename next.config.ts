import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        path: false,
        os: false,
        worker_threads: false,
      };
    }
    config.externals.push("pino-pretty", "encoding");
    return config;
  },
  // Externalize problematic packages
  serverExternalPackages: [
    "pino",
    "pino-pretty",
    "thread-stream",
  ],
};

export default nextConfig;
