import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Allow .md / .mdx alongside the usual page extensions.
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    remotePatterns: [
      // IGDB game cover art.
      { protocol: "https", hostname: "images.igdb.com" },
      // AniList anime cover art.
      { protocol: "https", hostname: "s4.anilist.co" },
      // iTunes album artwork (is1–is5 CDN shards).
      { protocol: "https", hostname: "**.mzstatic.com" },
    ],
  },
};

// Plugins are passed in string form so they serialize for Turbopack
// (Next 16's default bundler). remark-frontmatter strips the YAML block
// from the rendered output; gray-matter reads the same YAML for listings.
const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm"], ["remark-frontmatter"]],
  },
});

export default withMDX(nextConfig);
