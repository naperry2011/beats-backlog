import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import type { Column } from "@/lib/columns";
import type { ColumnTheme } from "@/lib/columnThemes";
import { ColumnSeal } from "@/components/ColumnSeal";
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

// Mood-driven class tokens so each column can be warm paper or late-night.
const TOKENS = {
  paper: {
    text: "text-ink",
    soft: "text-ink-soft",
    rule: "border-ink/15",
    hover: "hover:bg-paper-deep/40",
    cardTitleHover: "group-hover:text-vermillion",
  },
  night: {
    text: "text-[#efe6d2]",
    soft: "text-[#c5b7df]",
    rule: "border-white/10",
    hover: "hover:bg-white/[0.04]",
    cardTitleHover: "",
  },
} as const;

export function ColumnLayout({
  column,
  posts,
  theme,
}: {
  column: Column;
  posts: PostMeta[];
  theme: ColumnTheme;
}) {
  const t = TOKENS[theme.mood];

  const background =
    theme.mood === "night"
      ? `radial-gradient(80% 50% at 50% -8%, ${theme.glow}, transparent 60%),` +
        "linear-gradient(180deg, #181230 0%, #120d24 55%, #0c0820 100%)"
      : `radial-gradient(75% 45% at 50% 0%, ${theme.glow}, transparent 60%),` +
        "var(--color-paper)";

  return (
    <div
      className={`relative w-full overflow-hidden ${t.text}`}
      style={{ background }}
    >
      {/* ---- Hero ---- */}
      <section className="relative overflow-hidden px-5 pb-12 pt-20">
        {/* Big faint signature stamp. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-4 -top-2 select-none font-poster text-[7rem] uppercase leading-none tracking-tight sm:text-[10rem]"
          style={{ color: theme.accent, opacity: 0.08 }}
        >
          {theme.stamp}
        </span>

        <div className="relative mx-auto max-w-3xl text-center">
          <ColumnSeal
            name={column.name}
            monogram={theme.monogram}
            accent={theme.accent}
            className="mx-auto w-32 sm:w-36"
          />
          <p
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.35em]"
            style={{ color: theme.accent }}
          >
            {theme.kicker}
          </p>
          <h1 className="mt-3 font-poster text-6xl uppercase tracking-tight ink-press sm:text-7xl">
            {column.name}
          </h1>
          <p className={`mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed ${t.soft}`}>
            {theme.manifesto}
          </p>
        </div>
      </section>

      {/* ---- The posts ---- */}
      <section className="mx-auto max-w-3xl px-5 pb-20">
        <h2
          className={`mb-2 flex items-baseline justify-between border-b-2 pb-3 ${t.rule}`}
          style={{ borderColor: theme.accent }}
        >
          <span
            className="font-mono text-xs uppercase tracking-[0.3em]"
            style={{ color: theme.accent }}
          >
            {theme.listLabel}
          </span>
          <span className={`font-mono text-[10px] uppercase tracking-[0.2em] ${t.soft}`}>
            {posts.length} {posts.length === 1 ? "entry" : "entries"}
          </span>
        </h2>

        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post.slug} className={`border-b ${t.rule}`}>
                <Link
                  href={`/posts/${post.slug}`}
                  className={`group block px-2 py-6 transition-colors ${t.hover}`}
                >
                  <h3 className={`font-body text-2xl font-semibold leading-tight transition-colors ${t.cardTitleHover}`}>
                    {post.title}
                  </h3>
                  {post.excerpt && (
                    <p className={`mt-2 max-w-2xl font-body ${t.soft}`}>
                      {post.excerpt}
                    </p>
                  )}
                  <p className={`mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-wide ${t.soft}`}>
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
                        <span style={{ color: theme.accent }}>
                          {verdictLabel(post.verdict)}
                        </span>
                      </>
                    )}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center px-2 py-16 text-center">
            <div
              className="h-12 w-12 rounded-full border border-dashed"
              style={{ borderColor: theme.accent, opacity: 0.5 }}
              aria-hidden="true"
            />
            <p className={`mt-5 font-body text-xl italic ${t.soft}`}>
              {theme.emptyLine}
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
