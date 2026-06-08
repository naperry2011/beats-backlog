import type { VerdictId } from "@/lib/posts";

// The Verdict — the one-line, scannable signal that caps a review.
// Never a number or a star (blueprint §5).
const VERDICTS: Record<VerdictId, { label: string; blurb: string }> = {
  "heavy-rotation": {
    label: "Heavy rotation",
    blurb: "Drop everything, this is the one.",
  },
  "worth-the-spin": {
    label: "Worth the spin",
    blurb: "Solid; give it your nights.",
  },
  "b-side": {
    label: "B-side",
    blurb: "Flawed, but there are gems in here.",
  },
  "one-and-done": {
    label: "One and done",
    blurb: "Fine, but don't lose sleep over it.",
  },
  "skip-the-album": {
    label: "Skip the album",
    blurb: "Your hours are better spent elsewhere.",
  },
};

export function verdictLabel(id: VerdictId): string {
  return VERDICTS[id]?.label ?? "";
}

export function Verdict({ verdict }: { verdict: VerdictId }) {
  const v = VERDICTS[verdict];
  if (!v) return null;

  return (
    <aside className="relative my-10 overflow-hidden border-2 border-ink bg-paper-deep px-6 py-6">
      <div className="halftone pointer-events-none absolute -right-6 -top-6 h-28 w-28 text-vermillion opacity-15" />
      <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ink-soft">
        The Verdict
      </p>
      <p className="mt-2 font-poster text-4xl uppercase leading-none tracking-tight text-vermillion ink-press sm:text-5xl">
        {v.label}
      </p>
      <p className="mt-3 font-body text-lg italic text-ink-soft">{v.blurb}</p>
    </aside>
  );
}
