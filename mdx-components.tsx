import type { MDXComponents } from "mdx/types";
import { Verdict } from "@/components/Verdict";
import { ThePour } from "@/components/ThePour";
import { Divider } from "@/components/Divider";

// Components made available to every MDX post. Authors can drop
// <Verdict>, <ThePour> and <Divider> straight into a post body.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Verdict,
    ThePour,
    Divider,
    ...components,
  };
}
