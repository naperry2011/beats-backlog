import type { Metadata } from "next";
import { Anton, Newsreader, Space_Mono } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

// Wordmark + poster labels — Anton is a heavy woodtype/letterpress face, used
// big and uppercase for the gig-poster punch. PLACEHOLDER for final pick (§7).
const poster = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--ff-poster",
  display: "swap",
});

// Titles + body — a warm, readable serif with real italics for long reads (§7).
const body = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--ff-body",
  display: "swap",
});

// Labels / kickers — monospace for the liner-notes / turntable edge (§7).
const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--ff-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Beats and Backlog",
  description:
    "A writing-first corner for video games, anime, and music — comfort, nostalgia, and limited hours.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poster.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
