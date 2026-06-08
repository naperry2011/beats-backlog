// A hand-stamped seal — the column name curved over the top, the brand curved
// under the bottom, the column's monogram struck in the middle. Same printed-
// mark language as the café badge and the Nerddom medallion. One per page.

export function ColumnSeal({
  name,
  monogram,
  accent,
  label = "Beats & Backlog",
  className,
}: {
  name: string;
  monogram: string;
  accent: string;
  label?: string;
  className?: string;
}) {
  const monoSize = monogram.length >= 3 ? 32 : 46;

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <defs>
        <path id="seal-top" d="M30 104 A70 70 0 0 1 170 104" />
        <path id="seal-bottom" d="M158 100 A58 58 0 0 1 42 100" />
      </defs>

      <circle cx="100" cy="100" r="84" fill="none" stroke={accent} strokeWidth="2" />
      <circle cx="100" cy="100" r="74" fill="none" stroke={accent} strokeWidth="4" />
      <circle
        cx="100"
        cy="100"
        r="67"
        fill="none"
        stroke={accent}
        strokeWidth="1"
        strokeDasharray="1.5 4"
        opacity="0.7"
      />

      <text fill={accent} fontSize="12" letterSpacing="2" style={{ fontFamily: "var(--font-mono)" }}>
        <textPath href="#seal-top" startOffset="50%" textAnchor="middle">
          {name.toUpperCase()}
        </textPath>
      </text>
      <text fill={accent} fontSize="10" letterSpacing="3" style={{ fontFamily: "var(--font-mono)" }}>
        <textPath href="#seal-bottom" startOffset="50%" textAnchor="middle">
          {label.toUpperCase()}
        </textPath>
      </text>

      <text
        x="100"
        y="102"
        textAnchor="middle"
        dominantBaseline="central"
        fill={accent}
        fontSize={monoSize}
        style={{ fontFamily: "var(--font-poster)" }}
      >
        {monogram}
      </text>

      <circle cx="64" cy="100" r="2" fill={accent} />
      <circle cx="136" cy="100" r="2" fill={accent} />
    </svg>
  );
}
