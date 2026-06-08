// The masthead showpiece: an ukiyo-e scene — a vinyl record as the rising sun
// over a seigaiha sea, with ink clouds and birds. The literal crossroads of
// games, anime, and music (the lofi/woodblock lineage, §2/§6).

function SunRecord() {
  return (
    <div className="pointer-events-none relative aspect-square w-full">
      {/* Rising-sun ray burst. */}
      <div
        className="animate-spin-slow absolute inset-0 rounded-full"
        style={{
          background:
            "repeating-conic-gradient(from 0deg, var(--color-ochre) 0deg 7deg, transparent 7deg 15deg)",
          WebkitMaskImage: "radial-gradient(circle, #000 52%, transparent 74%)",
          maskImage: "radial-gradient(circle, #000 52%, transparent 74%)",
          opacity: 0.55,
        }}
      />
      {/* The vinyl. */}
      <svg viewBox="0 0 200 200" className="animate-spin-slow absolute inset-0">
        <defs>
          <radialGradient id="sheen" cx="38%" cy="34%" r="75%">
            <stop offset="0%" stopColor="#2a2520" />
            <stop offset="55%" stopColor="#181410" />
            <stop offset="100%" stopColor="#0d0a08" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="72" fill="url(#sheen)" />
        {Array.from({ length: 13 }).map((_, i) => (
          <circle
            key={i}
            cx="100"
            cy="100"
            r={30 + i * 3.2}
            fill="none"
            stroke="#3a3128"
            strokeWidth="0.5"
            opacity="0.8"
          />
        ))}
        <circle cx="100" cy="100" r="24" fill="var(--color-ochre)" />
        <circle
          cx="100"
          cy="100"
          r="24"
          fill="none"
          stroke="var(--color-vermillion)"
          strokeWidth="2"
        />
        <circle cx="100" cy="100" r="2.4" fill="var(--color-paper)" />
      </svg>
    </div>
  );
}

// Two little ink birds in the distance.
function Birds({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 80 40" className={className} aria-hidden="true">
      <path
        d="M4 18 q 8 -9 16 0 q 8 -9 16 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M50 26 q 6 -7 12 0 q 6 -7 12 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

export function Hero() {
  return (
    <section
      className="relative overflow-hidden border-b-2 border-ink"
      style={{
        background:
          "radial-gradient(120% 80% at 50% 95%, rgba(194,150,47,0.22), transparent 55%)," +
          "linear-gradient(180deg, var(--color-paper) 0%, #efe2c0 60%, #ecdcb4 100%)",
      }}
    >
      {/* Drifting ink clouds. */}
      <div className="halftone pointer-events-none absolute -right-8 top-10 h-40 w-72 rounded-full text-ink opacity-[0.06] blur-[1px]" />
      <Birds className="pointer-events-none absolute right-10 top-16 w-24 text-ink/40 sm:right-24" />
      <Birds className="pointer-events-none absolute left-8 top-28 hidden w-16 text-ink/30 sm:block" />

      {/* Copy — sits in clear sky above the sea. */}
      <div className="relative z-20 mx-auto max-w-3xl px-5 pt-16 text-center sm:pt-24">
        <p className="reveal tape inline-block px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-ink">
          Est. 2026 — a writing-first joint
        </p>

        <h1 className="mt-7 font-body text-ink">
          <span
            className="reveal block text-4xl italic leading-[1.05] sm:text-5xl"
            style={{ animationDelay: "0.08s" }}
          >
            Comfort, nostalgia,
          </span>
          <span
            className="reveal mt-2 block font-poster text-6xl uppercase leading-[0.9] tracking-tight text-vermillion ink-press sm:text-8xl"
            style={{ animationDelay: "0.16s" }}
          >
            &amp; limited hours
          </span>
        </h1>

        <p
          className="reveal mx-auto mt-6 max-w-xl font-body text-lg leading-relaxed text-ink-soft"
          style={{ animationDelay: "0.24s" }}
        >
          Video games, anime, and music — from a 90s kid with the little one
          finally asleep down the hall. No hype, no scores. Just what&apos;s
          worth your nights.
        </p>

        <div
          className="reveal mt-8 flex items-center justify-center gap-5"
          style={{ animationDelay: "0.32s" }}
        >
          <a
            href="#latest"
            className="border-2 border-ink bg-ink px-5 py-2.5 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:border-vermillion hover:bg-vermillion"
          >
            Start the spin
          </a>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-soft">
            Side A · 33⅓
          </span>
        </div>
      </div>

      {/* The scene — rising sun over the sea. */}
      <div className="relative mt-10 h-[260px] sm:h-[340px]">
        <div
          className="reveal absolute bottom-[78px] left-1/2 w-[230px] -translate-x-1/2 sm:bottom-[96px] sm:w-[320px]"
          style={{ animationDelay: "0.2s" }}
        >
          {/* Warm sun glow behind the record. */}
          <div
            className="absolute inset-0 scale-[1.4] rounded-full blur-2xl"
            style={{ background: "rgba(194,150,47,0.28)" }}
          />
          <SunRecord />
        </div>

        {/* The seigaiha sea — layered for depth, covers the sun's base. */}
        <div className="absolute inset-x-0 bottom-0">
          <div
            className="seigaiha h-14 text-indigo opacity-80"
            style={{ backgroundSize: "60px 30px" }}
          />
          <div
            className="seigaiha -mt-3 h-16 text-indigo opacity-90"
            style={{ backgroundSize: "84px 42px" }}
          />
          <div
            className="seigaiha -mt-3 h-20 text-indigo-deep"
            style={{ backgroundSize: "116px 58px" }}
          />
        </div>
      </div>
    </section>
  );
}
