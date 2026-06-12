import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { verdictLabel } from "@/components/Verdict";

// Respect Due is a hall of honor after hours — candlelight, brass and gold,
// a glass raised for the ones who built it (§5). The culture gets borrowed
// from constantly; here, it gets the honor.

const HALL_BG =
  "radial-gradient(60% 38% at 50% 8%, rgba(217,178,74,0.16), transparent 65%)," +
  "radial-gradient(120% 90% at 50% 110%, rgba(0,0,0,0.6), transparent 60%)," +
  "linear-gradient(180deg, #191117 0%, #120c12 55%, #0b070c 100%)";

const GOLD = "#d9b24a";
const TEXT = "#efe4cd";
const SOFT = "#a8977f";

// A lit candle, drawn in the site's print language. The flame flickers.
function Candle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 110" className={className} aria-hidden="true">
      {/* halo */}
      <circle cx="30" cy="26" r="17" fill={GOLD} opacity="0.12" />
      {/* flame — flickers via CSS on the group */}
      <g className="flicker">
        <path
          d="M30 12c6 8 7 13 0 18-7-5-6-10 0-18z"
          fill={GOLD}
        />
        <path
          d="M30 19c2.6 3.6 3 6-0 8.4-3-2.4-2.6-4.8 0-8.4z"
          fill="#f6ead0"
        />
      </g>
      {/* wick + wax */}
      <line x1="30" y1="30" x2="30" y2="36" stroke={TEXT} strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M20 38h20v52a4 4 0 01-4 4H24a4 4 0 01-4-4z"
        fill="none"
        stroke={GOLD}
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      {/* a wax drip */}
      <path d="M22 38c0 7 3 9 3 14a3 3 0 11-6 0" fill="none" stroke={GOLD} strokeWidth="1.4" opacity="0.7" />
    </svg>
  );
}

// A raised lowball glass — pour one out.
function RaisedGlass({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 56 64" className={className} aria-hidden="true">
      <g transform="rotate(-14 28 32)">
        <path
          d="M14 14h28l-3 32a4 4 0 01-4 3.5H21a4 4 0 01-4-3.5z"
          fill="none"
          stroke={GOLD}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path
          d="M16 30h24l-1.4 16a4 4 0 01-4 3.5H21.4a4 4 0 01-4-3.5z"
          fill={GOLD}
          opacity="0.4"
        />
      </g>
      {/* the pour, hitting the floor */}
      <path d="M10 56c3 1.5 7 1.5 10 0" stroke={GOLD} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function formatDate(date: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function RespectDueColumn({ posts }: { posts: PostMeta[] }) {
  return (
    <div className="relative w-full overflow-hidden" style={{ background: HALL_BG, color: TEXT }}>
      {/* ---- Hero ---- */}
      <section className="relative mx-auto max-w-3xl px-5 pb-12 pt-20 text-center">
        <div className="reveal mb-7 flex items-end justify-center gap-6">
          <RaisedGlass className="w-10 opacity-80" />
          <Candle className="w-14" />
          <RaisedGlass className="w-10 -scale-x-100 opacity-80" />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>
          Homage · pour one out
        </p>
        <h1 className="mt-3 font-poster text-6xl uppercase tracking-tight ink-press sm:text-7xl" style={{ color: TEXT }}>
          Respect Due
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed" style={{ color: SOFT }}>
          The culture gets borrowed from constantly; the ones who built it
          rarely get the honor. Here&apos;s why this mattered — and still does.
        </p>
      </section>

      {/* ---- The wall (posts as plaques) ---- */}
      <section className="relative mx-auto max-w-3xl px-5 pb-24 pt-8">
        <h2
          className="mb-6 flex items-baseline justify-between border-b-2 pb-3"
          style={{ borderColor: GOLD }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: GOLD }}>
            The honors
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: SOFT }}>
            {posts.length} on the wall
          </span>
        </h2>

        {posts.length > 0 ? (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="group block border-2 p-1 transition-shadow duration-300 hover:shadow-[0_0_50px_-12px_rgba(217,178,74,0.45)]"
                  style={{ borderColor: "rgba(217,178,74,0.45)" }}
                >
                  {/* inner rule — the double frame of a brass plaque */}
                  <div
                    className="border px-6 py-7 text-center transition-colors group-hover:bg-white/[0.02]"
                    style={{ borderColor: "rgba(217,178,74,0.25)" }}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: GOLD }}>
                      Honored {formatDate(post.date)}
                    </p>
                    <h3 className="mt-3 font-body text-3xl font-semibold leading-tight transition-colors group-hover:text-[#d9b24a]" style={{ color: TEXT }}>
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="mx-auto mt-3 max-w-xl font-body italic" style={{ color: SOFT }}>
                        {post.excerpt}
                      </p>
                    )}
                    <p className="mt-4 flex items-center justify-center gap-3 font-mono text-[10px] uppercase tracking-wide" style={{ color: SOFT }}>
                      {post.readingTime && <span>{post.readingTime}</span>}
                      {post.verdict && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span style={{ color: GOLD }}>{verdictLabel(post.verdict)}</span>
                        </>
                      )}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div
            className="border-2 px-6 py-16 text-center"
            style={{ borderColor: "rgba(217,178,74,0.35)" }}
          >
            <Candle className="mx-auto w-12" />
            <p className="mt-5 font-body text-xl italic" style={{ color: SOFT }}>
              The first honor is being engraved.
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: SOFT, opacity: 0.7 }}>
              The candle stays lit
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
