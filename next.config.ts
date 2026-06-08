import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Allow .md / .mdx alongside the usual page extensions.
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    // IGDB cover art is served from this host.
    remotePatterns: [{ protocol: "https", hostname: "images.igdb.com" }],
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
