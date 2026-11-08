import path from "node:path";
import { loadEnvConfig } from "@next/env";
import type { NextConfig } from "next";

loadEnvConfig(path.resolve(process.cwd(), "../.."), true, console, true);
console.log("ENV CHECK:", process.cwd(), process.env.DATABASE_URL ? "found" : "missing");

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["@hookrelay/shared"],
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
