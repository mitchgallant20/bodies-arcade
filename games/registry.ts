// The cabinet row. Phase 1 serves the proven legacy games as full pages under /play;
// the GameModule port (games/purple-turtles, games/shootout) replaces `href` with `module`.
import type { GameModule } from "./types";

export type CabinetStatus = "ready" | "soon";

export interface Cabinet {
  id: string;
  title: string; // marquee text
  blurb: string; // grade 2 reading level
  orientation: GameModule["orientation"];
  supportsReadingMode: boolean;
  status: CabinetStatus;
  href?: string; // Phase 1: the page that runs the game
  readingHref?: string; // same page with word mode on
  bestKey?: string; // localStorage key holding the best score (legacy)
  stats?: { label: string; key: string; suffix?: string }[]; // other numbers the cabinet shows
  phase: string;
}

export const CABINETS: Cabinet[] = [
  {
    id: "purple-turtles",
    title: "PURPLE TURTLES",
    blurb: "Hop the turtles. Grab the pucks. Bring them home.",
    orientation: "landscape-preferred",
    supportsReadingMode: true,
    status: "ready",
    href: "/play/purple-turtles.html",
    readingHref: "/play/purple-turtles.html#reading",
    bestKey: "bpt_best",
    phase: "Phase 1",
  },
  {
    id: "shootout",
    title: "SIGHT WORD SHOOTOUT",
    blurb: "Hear a word. Shoot it in the net.",
    orientation: "any",
    supportsReadingMode: true,
    status: "ready",
    href: "/play/bodies-books.html#game",
    phase: "Phase 1",
  },
  {
    id: "fishing",
    title: "BIG CATCH",
    blurb: "Cast. Wait for the bite. Reel in the big one!",
    orientation: "landscape-preferred",
    supportsReadingMode: true,
    status: "ready",
    href: "/play/big-catch.html",
    readingHref: "/play/big-catch.html#reading",
    stats: [
      { label: "Fish", key: "bbc_fish" },
      { label: "Biggest", key: "bbc_bigcm", suffix: " cm" },
    ],
    phase: "Phase 3",
  },
  {
    id: "canoe",
    title: "CANOE RAPIDS",
    blurb: "Paddle fast. Miss the rocks. Get the coins!",
    orientation: "landscape-preferred",
    supportsReadingMode: true,
    status: "ready",
    href: "/play/canoe-rapids.html",
    readingHref: "/play/canoe-rapids.html#reading",
    bestKey: "bcr_best",
    stats: [{ label: "Stars", key: "bcr_stars", suffix: "/24" }],
    phase: "Phase 3",
  },
];
