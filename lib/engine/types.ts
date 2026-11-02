// Word engine contract (docs/HANDOFF.md, Sections 7 and 9). Pure TypeScript, no DOM.
import type { GameEvent, Modality, Word, WordDraw } from "@/games/types";

export type WordState = "new" | "learning" | "known" | "star";

export interface WordRecord {
  wordId: string;
  state: WordState;
  box: 0 | 1 | 2 | 3 | 4; // Leitner box, 0 = practice pile
  nextDueAt: string; // ISO date
  lastSeenAt?: string;
  firstTryDays: string[]; // distinct days with a first-try correct
  errors: number;
  avgMs?: number; // response time, hear-pick/read-pick only
  helpedCount: number; // speaker tapped before answering
}

export interface Engine {
  draw(opts: { count: number; mix?: { known: number; fresh: number }; listIds?: string[] }): WordDraw;
  record(ev: GameEvent, modality?: Modality): void;
  due(date?: Date): Word[];
  practicePile(): Word[];
  candidatesToIntroduce(n: number): Word[]; // AI may re-rank these, never add to them
  listProgress(listId: string): { total: number; known: number; star: number };
  gates(): {
    unlockedLists: string[];
    nextGate: { listId: string; need: number; have: number } | null;
  };
}
