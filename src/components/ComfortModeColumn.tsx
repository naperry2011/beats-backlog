import Link from "next/link";
import type { PostMeta } from "@/lib/posts";
import { verdictLabel } from "@/components/Verdict";

// Comfort Mode is a coffee house. Warm espresso-and-latte palette, a hand-
// stamped roaster badge, coffee-ring stains, and the recs served like a menu
// board. The tired-dad café (§5). Music & anime home base.

const CAFE_BG =
  "radial-gradient(70% 45% at 50% 0%, rgba(169,113,47,0.18), transparent 60%)," +
  "linear-gradient(180deg, #efe3c4 0%, #e9dbb7 60%, #e3d3aa 100%)";

const ESPRESSO = "#3a2a1c";
const CARAMEL = "#a9712f";

// A coffee-ring stain — a rough, hand-left circle, never a clean line.
function CoffeeRing({ id, className }: { id: string; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <filter id={`stain-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="7" />
        </filter>
      </defs>
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke={ESPRESSO}
        strokeWidth="3.5"
        filter={`url(#stain-${id})`}
      />
    </svg>
  );
}

// The roaster stamp — curved text around a coffee bean. The custom emblem.
function CafeBadge({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <path id="cmTop" d="M30 104 A70 70 0 0 1 170 104" />
        <path id="cmBottom" d="M158 100 A58 58 0 0 1 42 100" />
      </defs>
      <circle cx="100" cy="100" r="84" fill="none" stroke={ESPRESSO} strokeWidth="2" />
      <circle cx="100" cy="100" r="74" fill="none" stroke={ESPRESSO} strokeWidth="4" />
      <circle cx="100" cy="100" r="67" fill="none" stroke={ESPRESSO} strokeWidth="1" strokeDasharray="1.5 4" opacity="0.7" />

      <text fill={ESPRESSO} fontSize="13" letterSpacing="3" style={{ fontFamily: "var(--font-mono)" }}>
        <textPath href="#cmTop" startOffset="50%" textAnchor="middle">
          COMFORT MODE · CAFÉ
        </textPath>
      </text>
      <text fill={ESPRESSO} fontSize="11" letterSpacing="3" style={{ fontFamily: "var(--font-mono)" }}>
        <textPath href="#cmBottom" startOffset="50%" textAnchor="middle">
          SERVING COZY · EST. 2026
        </textPath>
      </text>

      {/* coffee bean */}
      <g transform="rotate(-18 100 102)">
        <ellipse cx="100" cy="102" rx="14" ry="21" fill={ESPRESSO} />
        <path d="M100 84 C92 94, 92 110, 100 120" stroke="#f5edd7" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      </g>
      <circle cx="64" cy="100" r="2" fill={ESPRESSO} />
      <circle cx="136" cy="100" r="2" fill={ESPRESSO} />
    </svg>
  );
}

const MENU = [
  { name: "Cozy games", note: "for the easy nights" },
  { name: "Comfort anime", note: "for the rough days" },
  { name: "The playlist", note: "for the background hum" },
];

function Leader() {
  return (
    <span
      aria-hidden="true"
      className="mx-3 -translate-y-1 flex-1 border-b border-dotted"
      style={{ borderColor: "rgba(58,42,28,0.35)" }}
    />
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

export function ComfortModeColumn({ posts }: { posts: PostMeta[] }) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background: CAFE_BG, color: ESPRESSO }}
    >
      {/* Coffee-ring stains, left like a regular at the counter. */}
      <CoffeeRing id="a" className="pointer-events-none absolute right-6 top-24 h-28 w-28 opacity-[0.12]" />
      <CoffeeRing id="b" className="pointer-events-none absolute -left-6 top-[420px] h-40 w-40 opacity-[0.08]" />
      <CoffeeRing id="c" className="pointer-events-none absolute right-10 bottom-24 h-24 w-24 opacity-[0.10]" />

      {/* ---- Storefront ---- */}
      <section className="relative mx-auto max-w-2xl px-5 pb-10 pt-16 text-center">
        <CafeBadge className="mx-auto w-36 sm:w-40" />

        <div
          className="mt-8 border-2 bg-[#f5edd7]/55 px-6 py-8 sm:px-10"
          style={{ borderColor: ESPRESSO }}
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.35em]" style={{ color: CARAMEL }}>
            Pull up a stool · open late
          </p>
          <h1 className="mt-3 font-poster text-6xl uppercase tracking-tight ink-press sm:text-7xl">
            Comfort Mode
          </h1>
          <p className="mx-auto mt-5 max-w-xl font-body text-lg leading-relaxed" style={{ color: "#6f5a40" }}>
            The tired-dad recs. Cozy games, comfort anime, and the playlist for a
            rough day — the stuff that asks nothing of you and gives back anyway.
          </p>
          <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: "#6f5a40" }}>
            Open — when the day&apos;s been long
          </p>
        </div>
      </section>

      {/* ---- The house menu ---- */}
      <section className="relative mx-auto max-w-2xl px-5 py-10">
        <h2 className="mb-5 text-center font-mono text-xs uppercase tracking-[0.4em]" style={{ color: CARAMEL }}>
          ☕ The House Menu
        </h2>
        <ul className="mx-auto max-w-lg">
          {MENU.map((m) => (
            <li key={m.name} className="flex items-baseline py-3 font-body text-lg">
              <span className="font-semibold">{m.name}</span>
              <Leader />
              <span className="italic" style={{ color: "#6f5a40" }}>
                {m.note}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---- Fresh pours (the posts) ---- */}
      <section className="relative mx-auto max-w-2xl px-5 pb-20">
        <h2
          className="mb-2 flex items-baseline justify-between border-b-2 pb-3"
          style={{ borderColor: ESPRESSO }}
        >
          <span className="font-mono text-xs uppercase tracking-[0.3em]" style={{ color: CARAMEL }}>
            Fresh pours
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "#6f5a40" }}>
            {posts.length} on the board
          </span>
        </h2>

        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post.slug} className="border-b" style={{ borderColor: "rgba(58,42,28,0.18)" }}>
                <Link href={`/posts/${post.slug}`} className="group block py-6">
                  <div className="flex items-baseline">
                    <h3 className="font-body text-2xl font-semibold leading-tight transition-colors group-hover:text-[#a9712f]">
                      {post.title}
                    </h3>
                    <Leader />
                    {post.readingTime && (
                      <span className="shrink-0 font-mono text-[11px] uppercase tracking-wide" style={{ color: "#6f5a40" }}>
                        {post.readingTime}
                      </span>
                    )}
                  </div>
                  {post.excerpt && (
                    <p className="mt-2 max-w-xl font-body" style={{ color: "#6f5a40" }}>
                      {post.excerpt}
                    </p>
                  )}
                  <p className="mt-2 flex flex-wrap items-center gap-x-3 font-mono text-[11px] uppercase tracking-wide" style={{ color: "#6f5a40" }}>
                    {post.date && <span>{formatDate(post.date)}</span>}
                    {post.verdict && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span style={{ color: CARAMEL }}>{verdictLabel(post.verdict)}</span>
                      </>
                    )}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center py-16 text-center">
            <CoffeeRing id="empty" className="h-16 w-16 opacity-30" />
            <p className="mt-5 font-body text-xl italic" style={{ color: "#6f5a40" }}>
              Beans still grinding — first cup soon.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
