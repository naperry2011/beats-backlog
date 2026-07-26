// The masthead showpiece: an ukiyo-e scene — a vinyl record as the rising sun
// over a seigaiha sea, with ink clouds and birds. The literal crossroads of
// games, anime, and music (the lofi/woodblock lineage, §2/§6).
//
// Composed as a split so the record shares the first screen with the copy
// instead of sitting a scroll below it. The sea runs full-bleed under both and
// crosses in front of the record's base, the way the horizon should.

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
        {/* The speed, printed on the label the way a real 12-inch carries it. */}
        <text
          x="100"
          y="114"
          textAnchor="middle"
          fill="var(--color-ink)"
          fontSize="7"
          letterSpacing="0.5"
          opacity="0.75"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          33⅓
        </text>
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
      <div className="halftone pointer-events-none absolute -right-8 top-8 h-40 w-72 rounded-full text-ink opacity-[0.06] blur-[1px]" />
      <Birds className="pointer-events-none absolute left-6 top-10 w-16 text-ink/30 sm:left-10 sm:w-20" />
      <Birds className="pointer-events-none absolute right-8 top-24 hidden w-14 text-ink/25 lg:block" />

      <div className="mx-auto max-w-5xl px-5 pb-32 pt-12 sm:pb-36 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
          {/* Copy — sits in clear sky, left of the sun. */}
          <div className="relative z-20">
            <p className="reveal tape inline-block px-3 py-1 font-mono text-[11px] uppercase tracking-[0.25em] text-ink">
              Est. 2026 · a writing-first joint
            </p>

            <h1 className="mt-6 font-body text-ink">
              <span
                className="reveal block pb-1 text-3xl italic leading-[1.12] sm:text-4xl lg:text-5xl"
                style={{ animationDelay: "0.08s" }}
              >
                Comfort, nostalgia,
              </span>
              <span
                className="reveal ink-press mt-1 block font-poster text-5xl uppercase leading-[0.9] tracking-tight text-vermillion sm:text-6xl lg:text-7xl"
                style={{ animationDelay: "0.16s" }}
              >
                &amp; limited hours
              </span>
            </h1>

            <p
              className="reveal mt-5 max-w-md font-body text-lg leading-relaxed text-ink-soft"
              style={{ animationDelay: "0.24s" }}
            >
              Video games, anime, and music, from a 90s kid with the little one
              finally asleep. No hype, no scores.
            </p>

            <div
              className="reveal mt-8"
              style={{ animationDelay: "0.32s" }}
            >
              <a
                href="#latest"
                className="inline-block border-2 border-ink bg-ink px-6 py-3 font-mono text-xs uppercase tracking-[0.2em] text-paper transition-all hover:border-vermillion hover:bg-vermillion active:translate-y-px"
              >
                Start the spin
              </a>
            </div>
          </div>

          {/* The sun. Drops into the sea below on wide screens. */}
          <div className="relative z-0 lg:-mb-20">
            <div
              className="reveal relative mx-auto w-[220px] sm:w-[270px] lg:mr-0 lg:w-[330px]"
              style={{ animationDelay: "0.2s" }}
            >
              {/* Warm sun glow behind the record. */}
              <div
                className="absolute inset-0 scale-[1.4] rounded-full blur-2xl"
                style={{ background: "rgba(194,150,47,0.28)" }}
              />
              <SunRecord />
            </div>
          </div>
        </div>
      </div>

      {/* The seigaiha sea — layered for depth, crosses in front of the sun. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <div
          className="seigaiha h-12 text-indigo opacity-80"
          style={{ backgroundSize: "60px 30px" }}
        />
        <div
          className="seigaiha -mt-3 h-14 text-indigo opacity-90"
          style={{ backgroundSize: "84px 42px" }}
        />
        <div
          className="seigaiha -mt-3 h-16 text-indigo-deep"
          style={{ backgroundSize: "116px 58px" }}
        />
      </div>
    </section>
  );
}
