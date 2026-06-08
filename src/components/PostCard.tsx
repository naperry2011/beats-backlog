import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { getColumn } from "@/lib/columns";
import { verdictLabel } from "@/components/Verdict";

function formatDate(date: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function PostCard({
  post,
  index,
}: {
  post: PostMeta;
  index?: number;
}) {
  const column = getColumn(post.column);

  return (
    <article className="group grid grid-cols-[auto_1fr] gap-x-5 border-b border-ink/25 py-7 transition-colors hover:bg-paper-deep/40">
      {index != null && (
        <span className="font-mono text-sm leading-7 text-ink-soft/60">
          {String(index).padStart(2, "0")}
        </span>
      )}
      <div className={index == null ? "col-span-2" : ""}>
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ochre">
          {column?.name ?? post.column}
        </p>
        <h3 className="mt-2 font-body text-2xl font-semibold leading-tight sm:text-3xl">
          <Link
            href={`/posts/${post.slug}`}
            className="text-ink transition-colors group-hover:text-vermillion"
          >
            {post.title}
          </Link>
        </h3>
        {post.excerpt && (
          <p className="mt-2 max-w-2xl font-body text-ink-soft">
            {post.excerpt}
          </p>
        )}
        <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
          {post.date && <span>{formatDate(post.date)}</span>}
          {post.readingTime && (
            <>
              <span aria-hidden="true">·</span>
              <span>{post.readingTime}</span>
            </>
          )}
          {post.verdict && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-bold text-vermillion">
                {verdictLabel(post.verdict)}
              </span>
            </>
          )}
        </p>
      </div>
    </article>
  );
}
