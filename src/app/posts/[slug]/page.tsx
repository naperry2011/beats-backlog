import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { getColumn } from "@/lib/columns";
import { Verdict } from "@/components/Verdict";
import { ThePour } from "@/components/ThePour";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return { title: `${post.title} — Beats and Backlog`, description: post.excerpt };
}

function formatDate(date: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { default: Body } = await import(
    `../../../../content/posts/${slug}.mdx`
  );
  const column = getColumn(post.column);

  return (
    <article className="mx-auto max-w-3xl px-5 py-14">
      <header className="mb-10 border-b-2 border-ink pb-8">
        {column && (
          <Link
            href={`/columns/${column.id}`}
            className="brush-link font-mono text-[11px] uppercase tracking-[0.25em] text-ochre hover:text-vermillion"
          >
            {column.name}
          </Link>
        )}
        <h1 className="mt-4 font-body text-4xl font-semibold leading-[1.08] text-ink sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
          {formatDate(post.date)}
          {post.readingTime && ` · ${post.readingTime}`}
        </p>
      </header>

      <div className="prose prose-lg max-w-none font-body text-ink prose-headings:font-display prose-headings:text-ink prose-a:text-vermillion prose-strong:text-ink prose-blockquote:border-l-ochre prose-blockquote:text-ink-soft">
        <Body />
      </div>

      {post.verdict && <Verdict verdict={post.verdict} />}
      {post.pour && <ThePour pour={post.pour} />}
    </article>
  );
}
