import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllSlugs, getPostBySlug } from "@/lib/posts";
import { getPostArt } from "@/lib/art";
import { getColumn } from "@/lib/columns";
import { PostArtwork } from "@/components/PostArtwork";
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
  return { title: `${post.title} · Beats and Backlog`, description: post.excerpt };
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
  const art = await getPostArt(post);

  return (
    <article className="mx-auto max-w-3xl px-5 py-12">
      {/* The sleeve: art on the right, the credits struck on the left. */}
      <header className="border-2 border-ink bg-paper-deep p-6 sm:p-8">
        <div className="grid gap-7 sm:grid-cols-[1fr_minmax(0,180px)] sm:items-start sm:gap-8">
          <div>
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
            {post.excerpt && (
              <p className="mt-4 font-body text-lg italic leading-relaxed text-ink-soft">
                {post.excerpt}
              </p>
            )}
            <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-ink/20 pt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
              <span>{formatDate(post.date)}</span>
              {post.readingTime && <span>{post.readingTime}</span>}
            </p>
          </div>

          <PostArtwork
            art={art}
            column={post.column}
            title={post.title}
            sizes="(min-width: 640px) 180px, 90vw"
            priority
            className="order-first sm:order-none"
          />
        </div>
      </header>

      <div className="article-body prose prose-lg mt-12 max-w-none font-body text-ink prose-headings:font-display prose-headings:text-ink prose-a:text-vermillion prose-strong:text-ink">
        <Body />
      </div>

      {post.verdict && <Verdict verdict={post.verdict} />}
      {post.pour && <ThePour pour={post.pour} />}

      {column && (
        <p className="mt-14 border-t-2 border-ink pt-6">
          <Link
            href={`/columns/${column.id}`}
            className="brush-link font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft hover:text-ink"
          >
            ← More from {column.name}
          </Link>
        </p>
      )}
    </article>
  );
}
