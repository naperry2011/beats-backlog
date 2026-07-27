import type { Pour } from "@/lib/posts";

// "The Pour" — the liner-notes breakdown that sits under the Verdict (§5).
const ROWS: { key: keyof Pour; label: string }[] = [
  { key: "mood", label: "Mood" },
  { key: "timeToFinish", label: "Time to finish" },
  { key: "pairWith", label: "Pair with" },
  { key: "worthIt", label: "Worth your hours?" },
];

export function ThePour({ pour }: { pour: Pour }) {
  const rows = ROWS.filter((r) => pour[r.key]);
  if (rows.length === 0) return null;

  return (
    <aside className="my-10 border-2 border-ink">
      <p className="border-b-2 border-ink bg-ink px-4 py-2 font-mono text-[11px] uppercase tracking-[0.3em] text-ochre">
        The Pour · liner notes
      </p>
      <dl className="divide-y divide-ink/15 bg-card">
        {rows.map((r) => (
          <div key={r.key} className="flex gap-4 px-4 py-3 text-sm">
            <dt className="w-36 shrink-0 font-mono uppercase tracking-wide text-ink-soft">
              {r.label}
            </dt>
            <dd className="font-body text-base text-ink">{pour[r.key]}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}
