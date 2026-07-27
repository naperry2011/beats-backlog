// The eight columns from the blueprint (§5). Data-driven so nav and
// column-landing pages stay in sync with a single source of truth.

export interface Column {
  id: string;
  name: string;
  tagline: string;
  description: string;
}

export const COLUMNS: Column[] = [
  {
    id: "the-nightcap",
    name: "The Nightcap",
    tagline: "One game, one anime, one track for your wind-down.",
    description:
      "The signature weekly ritual — all three pillars in one habit, never a blank page. A drink before bed.",
  },
  {
    id: "the-backlog",
    name: "The Backlog",
    tagline: "Working through the pile, in public.",
    description:
      "Not games I haven't finished — continuing conversations you started as a kid. FF7, Resident Evil, Silent Hill, Metal Gear.",
  },
  {
    id: "comfort-mode",
    name: "Comfort Mode",
    tagline: "The tired-dad recs.",
    description:
      "Cozy games, comfort anime, the playlist for a rough day. Music and anime home base.",
  },
  {
    id: "worth-your-hours",
    name: "Worth Your Hours?",
    tagline: "Reviews rated by time-vs-payoff, not hype.",
    description:
      "For busy adults. The Verdict caps every one — no numbers, no stars, ever.",
  },
  {
    id: "rewind",
    name: "Rewind",
    tagline: "Records, revisited.",
    description:
      "Music retrospectives. Albums pulled back out of the crate and played with grown ears.",
  },
  {
    id: "respect-due",
    name: "Respect Due",
    tagline: "Homage to the ones who built it.",
    description: "Here's why this mattered, and still does.",
  },
  {
    id: "next-round",
    name: "Next Round",
    tagline: "Eyes and a platform for who's coming up.",
    description: "New and emerging creators, artists, devs from the culture.",
  },
  {
    id: "on-tap",
    name: "On Tap",
    tagline: "What's coming, dad-filtered.",
    description:
      "The windshield to The Backlog's rear-view — what's actually worth your limited hours when it lands.",
  },
];

const COLUMN_MAP = new Map(COLUMNS.map((c) => [c.id, c]));

export function getColumn(id: string): Column | undefined {
  return COLUMN_MAP.get(id);
}
