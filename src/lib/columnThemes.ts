// Per-column identity. Each column gets its own mood, accent, monogram seal,
// voice, and a signature "stamp" so it feels alive and distinct — while staying
// in family. The Nightcap and Comfort Mode have their own bespoke components.

export type Mood = "paper" | "night";

export interface ColumnTheme {
  mood: Mood;
  accent: string; // primary accent (hex)
  glow: string; // rgba used for the background bloom
  kicker: string; // short uppercase tag
  monogram: string; // initials struck in the seal
  manifesto: string; // a sentence or two, in voice
  listLabel: string; // heading above the posts
  emptyLine: string; // themed empty state
  stamp: string; // big faint watermark word/phrase
}

export const COLUMN_THEMES: Record<string, ColumnTheme> = {
  "the-backlog": {
    mood: "night",
    accent: "#e0a72e",
    glow: "rgba(224,167,46,0.16)",
    kicker: "Gaming home base",
    monogram: "TB",
    manifesto:
      "Not the games I never finished — the conversations I started as a kid and never hung up. FF7, Resident Evil, Silent Hill, Metal Gear. Picking the controller back up, in public.",
    listLabel: "The pile",
    emptyLine: "Save file's loading. First continue soon.",
    stamp: "Continue?",
  },
  "worth-your-hours": {
    mood: "paper",
    accent: "#b23a25",
    glow: "rgba(178,58,37,0.16)",
    kicker: "Reviews, dad-filtered",
    monogram: "WYH",
    manifesto:
      "Rated by the only currency that matters now: time spent versus payoff. No 1–10, no stars — just whether it earns your limited hours. The Verdict caps every one.",
    listLabel: "The reviews",
    emptyLine: "On the clock. First verdict soon.",
    stamp: "Worth it?",
  },
  rewind: {
    mood: "night",
    accent: "#d6478f",
    glow: "rgba(214,71,143,0.18)",
    kicker: "Nostalgia retrospectives",
    monogram: "RW",
    manifesto:
      "The 90s and 2000s stuff, pulled off the shelf and looked at with grown eyes. What held up, what didn't, and what it really meant. Be kind — rewind.",
    listLabel: "The tapes",
    emptyLine: "Tracking… first tape soon.",
    stamp: "Rewind",
  },
  "respect-due": {
    mood: "night",
    accent: "#d9b24a",
    glow: "rgba(217,178,74,0.16)",
    kicker: "Homage",
    monogram: "RD",
    manifesto:
      "The culture gets borrowed from constantly; the ones who built it rarely get the honor. Here's why this mattered — and still does. Pour one out.",
    listLabel: "The honors",
    emptyLine: "First honor, coming.",
    stamp: "Respect",
  },
  "next-round": {
    mood: "night",
    accent: "#e0552f",
    glow: "rgba(224,85,47,0.18)",
    kicker: "Hold the door open",
    monogram: "NR",
    manifesto:
      "Eyes and a platform for who's coming up — new and emerging creators, artists, and devs from the culture. The door gets held open here.",
    listLabel: "On the rise",
    emptyLine: "Spotlight's warming up.",
    stamp: "New blood",
  },
  "on-tap": {
    mood: "paper",
    accent: "#a8741a",
    glow: "rgba(168,116,26,0.18)",
    kicker: "What's coming, dad-filtered",
    monogram: "OT",
    manifesto:
      "The windshield to The Backlog's rear-view. Not a hype calendar — just what's actually worth your limited hours when it lands.",
    listLabel: "On the tap list",
    emptyLine: "Nothing pouring yet. Check the taps soon.",
    stamp: "Next pour",
  },
};

export function getColumnTheme(id: string): ColumnTheme | undefined {
  return COLUMN_THEMES[id];
}
