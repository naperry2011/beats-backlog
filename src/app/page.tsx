import Link from "next/link";
import { getAllPosts, getPostsByColumn } from "@/lib/posts";
import { COLUMNS, getColumn } from "@/lib/columns";
import { PostCard } from "@/components/PostCard";
import { Hero } from "@/components/Hero";
import { verdictLabel } from "@/components/Verdict";

export default function Home() {
  const posts = getAllPosts();
  const nightcap = getPostsByColumn("the-nightcap")[0];
  const nightcapColumn = getColumn("the-nightcap");
  const recent = posts.filter((p) => p.slug !== nightcap?.slug).slice(0, 6);

  return (
    <>
      <Hero />

      {/* NOW SPINNING — the signature ritual gets the marquee slot. */}
      <section className="border-b-2 border-ink bg-paper-deep">
        <div className="mx-auto max-w-5xl px-5 py-12">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-vermillion opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-vermillion" />
            </span>
            <h2 className="font-mono text-xs uppercase tracking-[0.3em] text-ink-soft">
              Now Spinning — The Nightcap
            </h2>
          </div>

          {nightcap ? (
            <article className="mt-6 grid gap-6 md:grid-cols-[auto_1fr] md:items-baseline">
              <span className="font-poster text-7xl leading-none text-vermillion/25">
                ♪
              </span>
              <div>
                <h3 className="font-body text-3xl font-semibold leading-tight sm:text-4xl">
                  <Link
                    href={`/posts/${nightcap.slug}`}
                    className="text-ink transition-colors hover:text-vermillion"
                  >
                    {nightcap.title}
                  </Link>
                </h3>
                {nightcap.excerpt && (
                  <p className="mt-3 max-w-2xl font-body text-lg text-ink-soft">
                    {nightcap.excerpt}
                  </p>
                )}
                <div className="mt-4 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-wide text-ink-soft">
                  <span>{nightcap.readingTime}</span>
                  {nightcap.verdict && (
                    <span className="hanko rounded-[3px] px-2 py-0.5 text-paper">
                      {verdictLabel(nightcap.verdict)}
                    </span>
                  )}
                  <Link
                    href="/columns/the-nightcap"
                    className="brush-link hover:text-ink"
                  >
                    All Nightcaps →
                  </Link>
                </div>
              </div>
            </article>
          ) : (
            <p className="mt-4 max-w-2xl font-body text-lg text-ink-soft">
              {nightcapColumn?.tagline} The signature ritual lands here weekly —
              one game, one anime, one track for your wind-down.
            </p>
          )}
        </div>
      </section>

      {/* LATEST — editorial stack. */}
      <section id="latest" className="mx-auto max-w-5xl px-5 py-16">
        <div className="mb-2 flex items-baseline justify-between border-b-2 border-ink pb-3">
          <h2 className="font-poster text-3xl uppercase tracking-tight text-ink">
            Latest
          </h2>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
            From the booth
          </span>
        </div>

        {recent.length > 0 ? (
          <div>
            {recent.map((post, i) => (
              <PostCard key={post.slug} post={post} index={i + 1} />
            ))}
          </div>
        ) : (
          <p className="pt-8 font-body text-lg text-ink-soft">
            Lounge&apos;s open. First posts are on the way.
          </p>
        )}
      </section>

      {/* THE COLUMNS — album back-cover tracklist. */}
      <section className="border-t-2 border-ink bg-indigo-deep text-paper">
        <div className="mx-auto max-w-5xl px-5 py-16">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="font-poster text-3xl uppercase tracking-tight">
              The Columns
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60">
              A-side / B-side
            </span>
          </div>

          <ol className="grid gap-x-10 gap-y-1 sm:grid-cols-2">
            {COLUMNS.map((c, i) => (
              <li key={c.id} className="border-t border-paper/20">
                <Link
                  href={`/columns/${c.id}`}
                  className="group flex items-baseline gap-4 py-4"
                >
                  <span className="font-mono text-sm text-ochre">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="font-body text-xl font-semibold transition-colors group-hover:text-ochre">
                      {c.name}
                    </span>
                    <span className="mt-0.5 block font-mono text-[11px] uppercase tracking-wide text-paper/55">
                      {c.tagline}
                    </span>
                  </span>
                  <span className="font-mono text-paper/40 transition-transform group-hover:translate-x-1 group-hover:text-ochre">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
