import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { verdictLabel } from "@/components/Verdict";

// Rewind is the neighborhood video store, 9pm on a Friday in 1996. VHS
// tracking lines, a hand-labeled cassette, "BE KIND — REWIND." The 90s and
// 2000s stuff revisited with grown eyes (§5). Magenta night.

const VHS_BG =
  "radial-gradient(85% 50% at 50% -8%, rgba(214,71,143,0.18), transparent 60%)," +
  "radial-gradient(60% 40% at 10% 100%, rgba(64,156,255,0.10), transparent 60%)," +
  "linear-gradient(180deg, #20102a 0%, #170b20 55%, #0e0716 100%)";

const MAGENTA = "#d6478f";
const CYAN = "#5ad8e6";
const TEXT = "#f0e6da";
const SOFT = "#b39bc4";

// A hand-labeled VHS cassette — the centerpiece, drawn in the site's print
// language (like the café badge), not clip-art.
function Cassette({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 240 150" className={className} aria-hidden="true">
      {/* shell */}
      <rect x="8" y="10" width="224" height="130" rx="8" fill="#171120" stroke={MAGENTA} strokeWidth="2.5" />
      <rect x="20" y="22" width="200" height="106" rx="5" fill="none" stroke={MAGENTA} strokeWidth="1.2" opacity="0.5" />
      {/* reels */}
      <circle cx="78" cy="64" r="22" fill="none" stroke={TEXT} strokeWidth="2.2" opacity="0.9" />
      <circle cx="162" cy="64" r="22" fill="none" stroke={TEXT} strokeWidth="2.2" opacity="0.9" />
      <circle cx="78" cy="64" r="8" fill={MAGENTA} opacity="0.9" />
      <circle cx="162" cy="64" r="8" fill={MAGENTA} opacity="0.9" />
      {/* tape window between reels */}
      <path d="M100 64h40" stroke={TEXT} strokeWidth="1.4" opacity="0.5" />
      {/* spine sticker — handwritten label */}
      <rect x="34" y="98" width="172" height="26" rx="3" fill="#efe6d2" />
      <text
        x="120"
        y="116"
        textAnchor="middle"
        fontSize="13"
        fill="#1c1418"
        style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontWeight: 600 }}
      >
        rewind · mixtape vol. 9X
      </text>
      {/* REC dot */}
      <circle cx="34" cy="38" r="4" fill="#e74c3c" />
      <text x="44" y="42" fontSize="10" fill={TEXT} style={{ fontFamily: "var(--font-mono)" }} opacity="0.8">
        REC
      </text>
    </svg>
  );
}

function formatDate(date: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function RewindColumn({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ background: VHS_BG, color: TEXT }}>
      {/* Faint scanlines + a tracking band drifting down the whole screen. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.45) 0px, rgba(0,0,0,0.45) 1px, transparent 1px, transparent 4px)",
        }}
      />
      <div
        aria-hidden="true"
        className="tracking-band pointer-events-none absolute inset-x-0 z-0 h-10"
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(90,216,230,0.12) 30%, rgba(255,255,255,0.18) 50%, rgba(214,71,143,0.12) 70%, transparent)",
        }}
      />

      {/* ---- Hero ---- */}
      <section className="relative z-10 mx-auto max-w-3xl px-5 pb-12 pt-20 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.35em]" style={{ color: MAGENTA }}>
          ◀◀ Nostalgia retrospectives
        </p>
        <h1 className="vhs-jitter mt-3 font-poster text-7xl uppercase tracking-tight ink-press sm:text-8xl" style={{ color: TEXT }}>
          Rewind
        </h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em]" style={{ color: CYAN, opacity: 0.85 }}>
          PLAY ▶ SP 0:00:00
        </p>
        <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed" style={{ color: SOFT }}>
          The 90s and 2000s stuff, pulled off the shelf and looked at with grown
          eyes. What held up, what didn&apos;t, and what it really meant.
        </p>

        {/* The cassette + the sticker. */}
        <div className="reveal relative mx-auto mt-10 w-60 sm:w-64" style={{ animationDelay: "0.15s" }}>
          <Cassette className="w-full" />
          <span
            className="absolute -right-8 -top-4 rounded-[3px] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.15em]"
            style={{
              backgroundColor: MAGENTA,
              color: "#1c0f18",
              transform: "rotate(8deg)",
              boxShadow: "inset 0 0 0 2px rgba(240,230,218,0.4)",
            }}
          >
            Be kind — rewind
          </span>
        </div>
      </section>

      {/* ---- The shelf (posts as rental cards) ---- */}
      <section className="relative z-10 mx-auto max-w-3xl px-5 pb-24 pt-8">
        <h2
          className="mb-2 flex items-baseline justify-between border-b-2 pb-3"
          style={{ borderColor: MAGENTA }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: MAGENTA }}>
            The tapes
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: SOFT }}>
            {posts.length} on the shelf
          </span>
        </h2>

        {posts.length > 0 ? (
          <ul>
            {posts.map((post, i) => (
              <li key={post.slug} className="border-b border-white/10">
                <Link
                  href={`/posts/${post.slug}`}
                  className="group flex items-center gap-4 px-1 py-5 transition-colors hover:bg-white/[0.04]"
                >
                  {/* VHS spine — numbered, magenta edge. */}
                  <span
                    className="flex h-14 w-7 shrink-0 items-center justify-center rounded-sm border font-mono text-[10px]"
                    style={{
                      borderColor: "rgba(214,71,143,0.5)",
                      backgroundColor: "rgba(214,71,143,0.10)",
                      color: MAGENTA,
                      writingMode: "vertical-rl",
                    }}
                  >
                    VOL.{String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-body text-2xl font-semibold leading-tight transition-colors group-hover:text-[#d6478f]" style={{ color: TEXT }}>
                      {post.title}
                    </span>
                    {post.excerpt && (
                      <span className="mt-1 block max-w-xl font-body text-sm" style={{ color: SOFT }}>
                        {post.excerpt}
                      </span>
                    )}
                    <span className="mt-2 flex flex-wrap items-center gap-x-3 font-mono text-[10px] uppercase tracking-wide" style={{ color: SOFT }}>
                      {post.date && <span>Recorded {formatDate(post.date)}</span>}
                      {post.readingTime && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{post.readingTime}</span>
                        </>
                      )}
                      {post.verdict && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span style={{ color: MAGENTA }}>{verdictLabel(post.verdict)}</span>
                        </>
                      )}
                    </span>
                  </span>
                  <span
                    className="shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] opacity-0 transition-opacity group-hover:opacity-100"
                    style={{ color: CYAN }}
                    aria-hidden="true"
                  >
                    Press play ▶
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="rounded-lg border border-dashed px-6 py-16 text-center"
            style={{ borderColor: "rgba(214,71,143,0.35)" }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.35em]" style={{ color: CYAN, opacity: 0.85 }}>
              ▶ Tracking…
            </p>
            <p className="mt-4 font-body text-xl italic" style={{ color: SOFT }}>
              All tapes are checked out. First retrospective hits the shelf
              soon.
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: SOFT, opacity: 0.7 }}>
              Please rewind before returning
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
