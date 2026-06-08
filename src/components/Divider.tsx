// The needle-drop — a rough sumi brush sweep, never a clean corporate line
// (blueprint §6). The turbulence filter roughens the stroke into dry-brush ink.
export function Divider() {
  return (
    <div className="my-14 flex items-center justify-center" aria-hidden="true">
      <svg width="320" height="26" viewBox="0 0 320 26" fill="none">
        <defs>
          <filter id="brush" x="-5%" y="-40%" width="110%" height="180%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.018 0.16"
              numOctaves="2"
              seed="7"
              result="n"
            />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="9" />
          </filter>
        </defs>
        <path
          d="M6 14 C 60 6, 110 20, 160 12 S 270 6, 314 13"
          stroke="var(--color-ink)"
          strokeWidth="7"
          strokeLinecap="round"
          filter="url(#brush)"
          opacity="0.92"
        />
        <circle cx="160" cy="13" r="3.4" fill="var(--color-vermillion)" />
      </svg>
    </div>
  );
}
