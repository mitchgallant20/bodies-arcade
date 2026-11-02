// Shared cabinet contract (docs/HANDOFF.md, Section 7). Every arcade cabinet implements
// GameModule. The word engine is the only thing that writes word progress.
import type { WordState } from "@/lib/engine/types";

export interface GameModule {
  id: string; // 'purple-turtles'
  title: string; // marquee text
  blurb: string; // one line, grade 2 reading level
  orientation: "any" | "landscape-preferred";
  supportsReadingMode: boolean;
  mount(el: HTMLElement, ctx: GameContext): GameHandle;
}

export interface GameContext {
  readingMode: boolean;
  draw: (n: number) => Promise<WordDraw>; // ask the engine for words
  speak: (text: string) => Promise<void>; // phone voice, already unlocked
  report: (ev: GameEvent) => void; // every event goes through here
  settings: { sound: boolean; reducedMotion: boolean };
  session?: {
    phase: "warmup" | "play" | "free";
    budgetMs: number;
    onBudgetEnd: () => void;
  };
}

export interface GameHandle {
  pause(): void;
  resume(): void;
  destroy(): void;
}

export type GameEvent =
  | { type: "game_start" }
  | { type: "word_prompt"; word: string; options?: string[]; modality: Modality }
  | { type: "word_correct"; word: string; tries: number; ms: number; modality: Modality; helped: boolean }
  | { type: "word_wrong"; word: string; picked?: string; modality: Modality }
  | { type: "score"; delta: number }
  | { type: "level_up"; level: number }
  | { type: "life_lost" }
  | { type: "game_over"; score: number; durationMs: number };

export type Modality = "hear-pick" | "read-pick" | "read-aloud";
// hear-pick: hears the word, taps it (he can do alone)
// read-pick: sees the word, picks the match (alone)
// read-aloud: reads it out loud, Dad confirms (together). Counts most.

export interface WordDraw {
  due: Word[];
  known: Word[];
  fresh: Word[];
}

export interface Word {
  id: string;
  text: string;
  listId: string;
  state: WordState;
}

export type { WordState };
