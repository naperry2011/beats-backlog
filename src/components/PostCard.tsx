import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import type { PostArt } from "@/lib/art";
import { getColumn } from "@/lib/columns";
import { PostArtwork } from "@/components/PostArtwork";
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

// A record in the crate: the sleeve, then the hand-written card behind it. No
// container box — the sleeve's own frame is the only edge this needs.
//
// `lead` turns the card on its side for the case where it is the only one in
// the row, so a lone post reads as a feature instead of a third of a grid.
export function PostCard({
  post,
  art,
  layout = "stack",
  sizes = "(min-width: 640px) 45vw, 90vw",
  priority = false,
}: {
  post: PostMeta;
  art: PostArt | null;
  layout?: "stack" | "lead";
  sizes?: string;
  priority?: boolean;
}) {
  const column = getColumn(post.column);
  const lead = layout === "lead";

  return (
    <article className="group">
      <Link
        href={`/posts/${post.slug}`}
        className={
          lead
            ? "grid items-center gap-7 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-9"
            : "block"
        }
      >
        <PostArtwork
          art={art}
          column={post.column}
          title={post.title}
          sizes={sizes}
          priority={priority}
          className="transition-transform duration-300 group-hover:-translate-y-1"
        />

        <div>
          <p
            className={`font-mono text-[11px] uppercase tracking-[0.22em] text-ochre ${lead ? "" : "mt-4"}`}
          >
            {column?.name ?? post.column}
          </p>
          <h3
            className={`mt-2 font-body font-semibold leading-tight text-ink transition-colors group-hover:text-vermillion ${lead ? "text-3xl" : "text-2xl"}`}
          >
            {post.title}
          </h3>
          {post.excerpt && (
            <p
              className={`mt-2 font-body leading-relaxed text-ink-soft ${lead ? "max-w-xl text-lg" : ""}`}
            >
              {post.excerpt}
            </p>
          )}
          <p className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
            {post.date && <span>{formatDate(post.date)}</span>}
            {post.readingTime && <span>{post.readingTime}</span>}
            {post.verdict && (
              <span className="font-bold text-vermillion">
                {verdictLabel(post.verdict)}
              </span>
            )}
          </p>
        </div>
      </Link>
    </article>
  );
}
