import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  // PAGE WARS: a static single-page app in public/page-war. Real files (assets) are served first;
  // every other path under /page-war (e.g. invite links /page-war/r/CODE) loads the app's index.html.
  async rewrites() {
    return [
      { source: "/page-war", destination: "/page-war/index.html" },
      { source: "/page-war/:path*", destination: "/page-war/index.html" },
    ];
  },
  async headers() {
    return [
      {
        source: "/page-war/assets/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default withMDX(nextConfig);
