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
    title: "FISHING FOR WORDS",
    blurb: "Tap the fish with your word. Reel it in!",
    orientation: "landscape-preferred",
    supportsReadingMode: true,
    status: "soon",
    phase: "Phase 3",
  },
  {
    id: "canoe",
    title: "CANOE RAPIDS",
    blurb: "Steer through the buoy that matches.",
    orientation: "landscape-preferred",
    supportsReadingMode: true,
    status: "soon",
    phase: "Phase 3",
  },
];
