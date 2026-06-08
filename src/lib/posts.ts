import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";

// One of the five record-flavored verdicts (blueprint §5). Never a number.
export type VerdictId =
  | "heavy-rotation"
  | "worth-the-spin"
  | "b-side"
  | "one-and-done"
  | "skip-the-album";

// The optional "Pour" breakdown that sits under a Verdict.
export interface Pour {
  mood?: string;
  timeToFinish?: string;
  pairWith?: string;
  worthIt?: string;
}

// The Nightcap's three picks — one game, one anime, one track (§5).
export interface Nightcap {
  game?: string;
  anime?: string;
  track?: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  column: string;
  excerpt: string;
  verdict?: VerdictId;
  pour?: Pour;
  nightcap?: Nightcap;
  readingTime: string;
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function readPost(fileName: string): PostMeta {
  const slug = fileName.replace(/\.mdx?$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? String(data.date) : "",
    column: data.column ?? "",
    excerpt: data.excerpt ?? "",
    verdict: data.verdict as VerdictId | undefined,
    pour: data.pour as Pour | undefined,
    nightcap: data.nightcap as Nightcap | undefined,
    readingTime: readingTime(content).text,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostsByColumn(columnId: string): PostMeta[] {
  return getAllPosts().filter((p) => p.column === columnId);
}

export function getPostBySlug(slug: string): PostMeta | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}
