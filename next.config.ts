import type { NextConfig } from "next";

// Static export: the whole app is plain files, so it runs on Vercel, GitHub Pages,
// or inside a Capacitor shell (Phase 5) with no server. Set NEXT_PUBLIC_BASE_PATH
// when hosting under a sub-path (GitHub Pages serves at /<repo>/).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
