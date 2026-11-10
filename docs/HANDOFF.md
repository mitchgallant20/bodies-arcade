# Bodie's Arcade: Build Handoff

Version 1, November 2026. Written for the coding agent working in this repo (Claude Code or Codex) and for Mitch as the product owner.

## 0. How to use this document

1. Put this file at `docs/HANDOFF.md` and the two files in `legacy/` next to it. Reference both from `CLAUDE.md` (or `AGENTS.md`) so every session reads them.
2. Work the phases in Section 18 in order. Each phase has a "done when" list. Do not start the next phase until the current one passes on a real iPhone.
3. The legacy HTML files are the source of truth for game feel, book content, word lists and the parent Guide. Port them; do not redesign them from scratch.
4. When something here is unclear or conflicts with the code, ask Mitch. Section 20 lists the open decisions with the default to use if no answer comes.
5. Keep this document current. When a decision changes, edit it here in the same PR.

## 1. The brief

One app, installed on an iPhone or iPad, with two wings and a parent room:

- **Arcade.** Retro mini games (first: Purple Turtles, a remake of the 1983 Commodore 64 game) that can run in reading mode, where sight words gate the action.
- **Reading Room.** The existing "Bodie's Books" app: picture books about Bodie's own life, sight-word highlighting, tap-to-hear, Flash Cards, Sight Word Shootout.
- **Dad's Corner.** PIN-gated. Progress, settings, the parent Guide, and an approval queue for anything AI writes.

Underneath both wings is one shared **word engine** that tracks every sight word, schedules when it comes back, and decides when a level unlocks. AI proposes stories, next words and a weekly summary; Dad approves.

### Who it is for

- Bodie, grade 3, behind on reading and especially sight words. Reads word by word; frustration is the main enemy. Loves hockey (plays for Phoenix Flames Red, U9), the Jets, Sea Bears, Riders, Blue Jays, Raptors, Team Canada, Messi, fishing, canoeing, the outdoors, Metallica.
- Mitch, who runs the sessions, approves content and reads the dashboard.
- Devices: iPhone (primary, landscape for games), iPad, occasionally a laptop.

## 2. Non-negotiables

These come from the parent Guide in Bodie's Books and from the way the games were designed. They override any shortcut.

1. **Errors in reading tasks never cost a life, a point or a star.** A wrong word pick shakes, greys out, the word is spoken again, and he tries again. Only game-mechanic mistakes (missing a turtle) cost lives.
2. **End on a win.** Sessions end on a success screen, never on a failure. The app ends a session; the kid never "fails out" of one.
3. **Sessions are capped.** 10 to 12 minutes for a full session, about 3 for a quick run. No "one more level" pressure after the cap.
4. **Dad approves everything AI writes before Bodie sees it.** No exceptions, including word choices that change a gate.
5. **Free play is never the price of reading.** The arcade is always playable. A completed session earns cosmetics (a new cabinet skin, confetti, a badge), not access.
6. **No ads, no third-party analytics, no accounts for Bodie.** One family, one kid record, one Dad PIN. Keep the data model simple enough to delete in one query.
7. **Offline first.** Everything but AI calls must work with no signal (at the rink, in the truck).
8. **Bodie-facing copy reads at a grade 1 to 2 level.** Short words, short sentences, big type. Dad-facing copy is plain. No em dashes anywhere in app copy or docs.
9. **Landscape is a first-class layout for games.** Portrait is first-class for reading. Both must work on an iPhone with the notch on either side.

## 3. What already exists

Two finished single-file web apps live in `legacy/`. Treat them as specifications with running code attached.

### `legacy/purple-turtles.html` (Bodie's Purple Turtles)

- 320x200 canvas playfield, pixel sprites drawn from string maps, C64-style bleeps via Web Audio, Press Start 2P + Fredoka.
- Mechanics: home dock, four bobbing purple turtles, far dock with a pile of gear. Hop one position at a time (arrow keys, A/D, two HOP paddles, or tap either half of the pond). Five trips per level. Turtles dive on their own; a fish swims under a turtle as the one warning. Early levels let one turtle dive at a time, later two, then three. Three lives, extra life every second level cleared.
- Level themes rotate through his teams: pucks, baseballs, basketballs, soccer balls, footballs, gold medals.
- Layout already handles iPhone portrait (screen on top, paddles below) and landscape (tall paddles either side, screen sized to height). HUD, status line, pause and settings all live inside the screen.
- **Reading mode is built in** (`READING` config object, off by default). At the far dock he hears a word (speech synthesis) and taps the matching sign from three choices before he can pick up the gear. Wrong picks never cost a life; right picks are +50.
- Exposes `window.BodieGame` (`reading.enable`, `reading.setWords`, `on(event, cb)`, `getState()`, `start()`) and emits events: `game_start`, `pickup`, `delivery`, `level_up`, `splash`, `game_over`, `word_prompt`, `word_correct`, `word_wrong`. It also `postMessage`s the same events to a parent frame. In the port, replace the global and postMessage with the `GameModule` contract in Section 7.
- iOS details already solved and worth keeping: audio context unlock on first tap, one-time silent `speechSynthesis` unlock, `touch-action` rules, no text-selection callouts, safe-area padding, `height: 100%` rather than `100vh`, pause on `visibilitychange`.

### `legacy/bodies-books.html` (Bodie's Books)

- Light, readable theme: Fredoka display, Lexend body (chosen for readability), big centred text, one picture per page. Has a proper light and dark theme.
- **Library.** 20 Level 1 books (`BOOKS` array, ids `allabout`, `bigfish`, `flames`, `seabears`, `canada`, `soccer`, `baseball`, `camp`, `rocks`, `icefish`, `jets`, `riders`, `bigshot`, `hoops`, `snowday`, `tourney`, `bike`, `seadoo`, `dock`, `golf`) and Level 2 versions of the same stories (`L2SRC` rows: `[id, title, sourceBookId, words[], pages[]]`, reusing the Level 1 art). Page text uses `|` as a line break.
- **Book format.** `{ id, title, color, words: [...sight words to highlight], cover(): svgString, pages: [{ t, alt, art(): svgString }] }`.
- **Art kit.** `A.*` functions that return SVG strings (sun, cloud, grass, tree, water, rink, net, goal, puck, stick, ball, football, baseball, bat, basketball, hoop, fish, splash, canoe, paddle, rod and more), plus `B()` (the Bodie figure with poses, faces, jerseys) and `person()`. Port this as a typed scene kit. AI-written stories pick scenes from a catalogue built on it; AI never emits raw SVG.
- **Reader.** Tap any word to hear it. `abc` button highlights sight words (the `SIGHT` set is the Dolch 220 list). "Read this page to me". Progress bar, Back/Next, star screen at the end, per-book best stars.
- **Sight Word Shootout.** Hockey rink, three nets with words, shooter, goalie saves on a miss. Two modes: Listen and shoot (he hears the word) and Read and shoot (word at centre ice, he reads it aloud, Dad confirms). Ten shots per game. Decks: Rookie, Pro, All-Star, Grade 3, Grade 3 Stretch (Appendix A). A word earns a gold star after three first-try goals; a miss takes one back.
- **Flash Cards.** One-handed phone layout, big card, swipe right "Got it" or left "Not yet". Not yet is never a fail: the card is spoken and comes back a few cards later; every session ends with every card read. Flip for the word in a hockey sentence. Stars grow once per day per word; three good days = gold star. Missed words go to "My practice pile" until read on the first try. Weekly day dots.
- **Guide.** Parent-facing: why two levels, the "stuck words" finger test (0 to 1 easy, 2 to 3 just right, 4+ too hard), three-night routine (echo, take turns, he drives), prompts when stuck, signs of progress checklist, goals through November, winter break and spring, protecting the love of reading, when to talk to the teacher. Port verbatim into Dad's Corner; the checklists persist.
- Storage keys to be aware of (all `localStorage`, origin-bound, so they will not migrate automatically): `bb:page:*`, `bb:done:*`, `bb:wm:*` (word stars), `bb:gbest:*`, `bb:gdeck`, `bb:gmode`, `bb:games`, `bb:fcdeck`, `bb:fcsize`, `bb:fcwarm`, `bb:fcauto`, `bb:sw`, `bb:tab`, `bb:<checkboxId>` (Guide checks). Purple Turtles uses `bpt_best`, `bpt_sound`, `bpt_reading`.

## 4. Architecture and stack (decided)

- **Next.js (App Router, TypeScript)** on **Vercel**. Same shape as Mitch's other projects so Codex and Claude Code can both drive it.
- **PWA first.** Installable from Safari's Share menu, full screen, offline. Native wrapper (Capacitor) is Phase 5, same codebase.
- **Supabase** (Postgres) for durable progress and the content library, behind a thin repository layer. **Local-first**: all reads and writes go to IndexedDB (Dexie) and sync to Supabase when online. The app must boot and play with the server down.
- **Claude API** via Next.js route handlers only (keys never ship to the client). Model ID lives in an env var; default to a current Sonnet-class model.
- **Rendering.** Purple Turtles stays canvas 2D with its own loop. New cabinets may use canvas or DOM; no game engine dependency unless a cabinet truly needs one. Books stay DOM + inline SVG.
- **State.** Plain React state plus a small store (Zustand) for the session and engine; no Redux.
- **Testing.** Vitest for the engine and session logic (pure TypeScript, no DOM). Playwright for the device-size smoke tests in Section 19.
- **Fonts.** Google Fonts (Fredoka, Lexend, Press Start 2P) self-hosted via `next/font` so they work offline.

## 5. Repo layout (proposed; adjust if the repo already differs)

```
app/
  layout.tsx                 shell, theme, PWA meta, safe areas
  page.tsx                   home: Arcade | Reading Room | Dad
  arcade/page.tsx            cabinet row
  arcade/[game]/page.tsx     mounts a GameModule full screen
  reading/page.tsx           shelf (Level 1, Level 2), Cards, Shootout entry
  reading/book/[id]/page.tsx reader
  reading/cards/page.tsx
  reading/fluency/page.tsx   read-aloud check (Phase 4)
  session/page.tsx           guided session runner (Phase 2)
  dad/page.tsx               PIN gate, dashboard, settings, guide, approvals
  api/ai/story/route.ts
  api/ai/next-words/route.ts
  api/ai/summary/route.ts
lib/
  engine/                    word engine (pure TS, unit tested)
  session/                   session shapes and runner logic (pure TS)
  speech/                    speak(), unlock, voice picking, recognition adapter
  audio/                     tiny synth used by cabinets
  db/                        Dexie schema, Supabase client, sync
  ai/                        prompt builders, validators, approval queue
games/
  registry.ts                list of GameModules
  purple-turtles/            port of legacy game
  shootout/                  port from Bodie's Books
  fishing/                   Phase 3
  canoe/                     Phase 3
reading/
  books/                     book data (TS), scene kit, Bodie figure
  cards/
  guide/                     Guide content as MDX or TS
components/                  shared UI (buttons, HUD strip, PIN pad, toasts)
public/
  manifest.webmanifest, icons/, splash/
supabase/migrations/
legacy/                      the two original HTML files, read-only reference
docs/HANDOFF.md              this file
```

## 6. Information architecture

- `/` Home. Big two-door cabinet: ARCADE, READING ROOM. Small lock icon for Dad. If a session is scheduled today and not done, a "Today's run" button sits between the doors (optional; see Section 20).
- `/arcade` Cabinets as a row of arcade machines. Each shows a marquee, best score, and a "word mode" toggle state. Locked cabinets show "coming soon", never "locked until you read".
- `/arcade/purple-turtles` and friends. Full-screen game. Landscape layout when the phone is sideways.
- `/reading` Shelf with tabs: Level 1, Level 2, Cards, Shootout, (Phase 4) Read to Me.
- `/session` The guided run (Section 10). Launched from Home or Dad's Corner.
- `/dad` PIN pad, then tabs: Today, Words, Books, Settings, Guide, Approvals.

## 7. Shared contracts

Put these in `lib/engine/types.ts` and `games/types.ts`. Every cabinet implements `GameModule`. The engine is the only thing that writes word progress.

```ts
// games/types.ts
export interface GameModule {
  id: string;                       // 'purple-turtles'
  title: string;                    // marquee text
  blurb: string;                    // one line, grade 2 reading level
  orientation: 'any' | 'landscape-preferred';
  supportsReadingMode: boolean;
  mount(el: HTMLElement, ctx: GameContext): GameHandle;
}

export interface GameContext {
  readingMode: boolean;
  draw: (n: number) => Promise<WordDraw>;     // ask the engine for words
  speak: (text: string) => Promise<void>;     // phone voice, already unlocked
  report: (ev: GameEvent) => void;            // every event goes through here
  settings: { sound: boolean; reducedMotion: boolean };
  session?: { phase: 'warmup' | 'play' | 'free'; budgetMs: number; onBudgetEnd: () => void };
}

export interface GameHandle { pause(): void; resume(): void; destroy(): void; }

export type GameEvent =
  | { type: 'game_start' }
  | { type: 'word_prompt';  word: string; options?: string[]; modality: Modality }
  | { type: 'word_correct'; word: string; tries: number; ms: number; modality: Modality; helped: boolean }
  | { type: 'word_wrong';   word: string; picked?: string; modality: Modality }
  | { type: 'score';        delta: number }
  | { type: 'level_up';     level: number }
  | { type: 'life_lost' }
  | { type: 'game_over';    score: number; durationMs: number };

export type Modality = 'hear-pick' | 'read-pick' | 'read-aloud';
// hear-pick: hears the word, taps it (he can do alone)
// read-pick: sees the word, picks the match (alone)
// read-aloud: reads it out loud, Dad confirms (together). Counts most.

export interface WordDraw { due: Word[]; known: Word[]; fresh: Word[]; }
export interface Word { id: string; text: string; listId: string; state: WordState; }
```

```ts
// lib/engine/types.ts
export type WordState = 'new' | 'learning' | 'known' | 'star';

export interface WordRecord {
  wordId: string;
  state: WordState;
  box: 0 | 1 | 2 | 3 | 4;          // Leitner box, 0 = practice pile
  nextDueAt: string;               // ISO date
  lastSeenAt?: string;
  firstTryDays: string[];          // distinct days with a first-try correct
  errors: number;
  avgMs?: number;                  // response time, hear-pick/read-pick only
  helpedCount: number;             // speaker tapped before answering
}

export interface Engine {
  draw(opts: { count: number; mix?: { known: number; fresh: number }; listIds?: string[] }): WordDraw;
  record(ev: GameEvent, modality?: Modality): void;
  due(date?: Date): Word[];
  practicePile(): Word[];
  candidatesToIntroduce(n: number): Word[];     // AI may re-rank these, never add to them
  listProgress(listId: string): { total: number; known: number; star: number };
  gates(): { unlockedLists: string[]; nextGate: { listId: string; need: number; have: number } | null };
}
```

The Purple Turtles port maps its existing events onto `GameEvent` one to one (`word_correct` already carries `tries`; add `ms` and `modality: 'hear-pick'`).

## 8. Data model

Supabase tables (mirror the same shapes in Dexie):

- `kids` (id, name, created_at). One row. Designed so a second kid is possible later.
- `word_lists` (id, name, sub, order). The five decks in Appendix A, plus a `dolch` list used for highlighting.
- `words` (id, text, list_id, order, confusable_group nullable). Confusable groups: there/their/they're, was/saw, where/were, then/than, of/off, on/no.
- `word_state` (kid_id, word_id, state, box, next_due_at, last_seen_at, first_try_days text[], errors, avg_ms, helped_count).
- `sessions` (id, kid_id, shape, started_at, ended_at, minutes, phases jsonb, ended_on_win bool).
- `events` (id, kid_id, session_id nullable, game_id, type, word_id nullable, payload jsonb, at). Append-only. Everything in Dad's Corner is derived from this plus `word_state`.
- `books` (id, title, level 1|2, color, words text[], pages jsonb, source 'hand'|'ai', status 'approved'|'pending'|'rejected', created_at, approved_at).
- `book_progress` (kid_id, book_id, best_stars, last_page, completed_count).
- `fluency_runs` (id, kid_id, passage_id, wcpm, accuracy, transcript, duration_s, at).
- `settings` (kid_id, dad_pin_hash, session_minutes int default 11, quick_minutes int default 3, free_play 'always'|'after-session' default 'always', lists_enabled text[], voice_name, sound bool).
- `approvals` (id, kind 'story'|'next-words'|'summary', payload jsonb, status, created_at, decided_at).

Rules:
- The client never writes `word_state` directly. It calls `engine.record(ev)`, which writes locally and queues a sync.
- Sync is last-write-wins per row with `updated_at`; the engine is deterministic given the event log, so a full rebuild from `events` is the recovery path.
- One SQL `delete from events where kid_id = ...` chain must remove everything about the kid.

## 9. Word engine spec

### States and gates

- `new`: never shown.
- `learning`: shown at least once.
- `known`: read correctly on the **first try on three distinct days** (same rule as the existing stars). Any modality counts, but `read-aloud` counts double (one read-aloud first-try day = two days of credit, capped at the three needed).
- `star`: `known` and survived box 4 (a correct answer when it came due at the 21-day interval).
- A miss on a `known` word drops it to `learning` with box 0 (practice pile). It needs one first-try day to return to `known`. A miss on a `star` word drops it to `known`, box 2.
- **List gate:** the next list unlocks when 90% of the current list is `known` or better. Lists in order: rookie, pro, allstar, grade3, grade3plus. Dad can unlock any list manually in Settings.

### Scheduling (Leitner)

Boxes and intervals: 0 = practice pile (comes back in the same session, after 3 to 5 other cards), 1 = 1 day, 2 = 3 days, 3 = 7 days, 4 = 21 days.

- Correct, first try, not helped: box + 1 (max 4), `nextDueAt` = today + interval(box).
- Correct after a retry, or helped (speaker tapped first): box stays, `nextDueAt` = today + 1 day.
- Wrong: box = 0, `errors` + 1, added to practice pile.
- A word can only gain first-try-day credit once per calendar day (America/Winnipeg), matching the existing Flash Cards rule.

### Drawing words for a game

`draw({count, mix})` returns, in priority order:
1. Practice pile words (box 0), up to 30% of the count.
2. Due words (nextDueAt <= today), oldest due first.
3. Known words as filler to reach the `known` share (default 80%).
4. Fresh words (`new` or `learning` with fewer than 3 exposures) for the remaining share (default 20%), never more than 3 fresh words in one draw.
- Distractors for hear-pick and read-pick: prefer the word's confusable group, then words of similar length from the same list, then anything. Never show two words from the same confusable group as the target in one session for a `learning` word (it muddles them); do pair them for `known` words (it sharpens them).

### What counts most

Priority of evidence, highest first: `read-aloud` first try > `read-pick` first try > `hear-pick` first try > retries. Dad's dashboard shows the modality mix so "he knows 60 words" is not mistaken for "he can read 60 words".

Unit tests required: box transitions, three-distinct-days rule, double credit for read-aloud, 90% gate, draw mix ratios, confusable rules, same-day cap, timezone boundaries.

## 10. Session spec

A session is a scripted run through the app with a timer. The runner lives in `lib/session/` and is pure logic; pages render its phases.

### Full run (default 11 minutes)

1. **Warm-up, 3 min.** One cabinet in word mode using only `known` and due words. Ends when the budget ends (the game shows a "nice warm-up!" banner at a safe moment, never mid-jump).
2. **New words, 2 min.** Two or three Flash Cards from `candidatesToIntroduce` (or the AI-approved list). Each: hear it, see it big, see it in a sentence, say it. No scoring.
3. **Play, 4 min.** Cabinet of his choice in word mode, 80/20 mix. Score counts.
4. **Cool-down, 2 min.** One Level 1 book on his own, or one Level 2 book "together" (Dad present toggle). Tap-to-hear allowed.
5. **Win screen.** Stars earned today, one word that just turned gold if any, confetti. Then back to free play.

### Quick run (default 3 minutes)

Six Flash Cards from the due list, practice pile first. Ends on the last card read; no timer pressure shown to Bodie.

### Rules

- The timer is Dad-visible and Bodie-invisible. Bodie sees a progress bar of "stops" (4 dots), not minutes.
- One full session per day counts toward the week dots; extra runs are fine and still record words.
- If Bodie quits mid-session, record what happened and show nothing negative. The day dot stays empty until a full run finishes.
- Reading-mode prompts inside games are rate-limited: at most one word prompt per 20 seconds of play, so the game stays a game.

## 11. Fluency check (Phase 4)

Purpose: the one number that says whether his reading level is rising. Dad-facing only.

- Passages: 60 to 120 words, built from approved books or AI stories, tagged with level.
- Flow: Dad taps Start, Bodie reads aloud, Dad taps Stop (or 60 seconds elapse). Recognition runs during the read.
- Recognition adapter: Web Speech API (`webkitSpeechRecognition`, `continuous`, `interimResults`) in Safari; `@capacitor-community/speech-recognition` under Capacitor. Both are imperfect on kid voices, so:
  - Align the transcript to the passage with a word-level diff (Levenshtein over tokens, case and punctuation stripped). Correct = matched; substitutions, omissions = errors; insertions ignored.
  - WCPM = correct words / minutes read. Accuracy = correct / passage words read.
  - Dad can tap words in the review screen to flip a mis-recognition before saving. Save stores the corrected count.
- Show Bodie stars and "faster than last time" only. Never a number.
- Dad's chart: WCPM over time with a reference band for grade 3 (Hasbrouck and Tindal 2017, 50th percentile: about 83 WCPM in fall, 97 winter, 112 spring; 25th percentile roughly 59, 79, 91). Label it "reference, not a test".

## 12. AI features and guardrails

All AI calls go through `app/api/ai/*` route handlers using the official Anthropic SDK. Every output is validated in code before it reaches the approval queue, and nothing reaches Bodie without Dad approving it in `/dad/approvals`.

### 12.1 Story generator (`/api/ai/story`)

Input: `{ level: 1 | 2, interest: string, knownWords: string[], newWords: string[], names: ['Bodie','Dad', ...], existingTitles: string[] }`.

Prompt rules (put them in `lib/ai/prompts/story.ts`):
- Level 1: 8 to 10 pages, one sentence per page, 4 to 8 words, present tense, mostly sight words.
- Level 2: the same story told with 2 or 3 sentences per page, 15 to 25 words, past tense, -ed and -ing endings, dialogue.
- Vocabulary: only `knownWords` + `newWords` + `names` + a small fixed allow-list of nouns for the interest (puck, net, rink, fish, canoe, lake, etc., maintained in code). Each `newWord` must appear at least twice.
- Output JSON: `{ title, pages: [{ text, scene: { template, props } }] }` where `scene.template` is one of the catalogue ids built on the scene kit (e.g. `rink-shot`, `dock-fishing`, `canoe-lake`, `field-kick`). AI never emits SVG.
- Tone: Bodie is the hero, Dad shows up, things go a little wrong then right. No scary content, no losing streaks, no moralising.

Validator (code, not AI): every token in every page must be in the allowed set after stripping punctuation; page counts and lengths within limits; template ids exist; title unique. Fail = regenerate once, then surface the failure to Dad with the reason.

### 12.2 Next words (`/api/ai/next-words`)

Input: `engine.candidatesToIntroduce(8)` plus the kid's last 30 days of `word_wrong` events and confusable groups. Output: an ordered pick of 3 with one-line reasons ("'their' pairs with 'there', which he knows; introduce together"). The AI may only reorder or drop from the candidates. Validated by set membership.

### 12.3 Weekly summary (`/api/ai/summary`)

Input: computed stats only (words known/star by list, minutes, sessions, modality mix, top missed words, fluency trend). Output: 120 to 180 words for Dad, plus one concrete thing to try this week, chosen from the Guide's own prompts. The summary may not mention anything not in the stats object. Store it; optionally email it (Phase 5 or later).

### 12.4 Guardrails

- AI never changes a gate, a box, a star or a setting. It proposes; the engine and Dad decide.
- No AI call during a Bodie session (latency and content control). Generate ahead of time; cache.
- Strip any instruction-like text from AI output before display (defensive; stories are plain prose).
- Log every prompt and response to `approvals.payload` so a bad story can be traced.
- Rate limit: 20 generations a day. Cost at that rate is a few dollars a month.

## 13. Arcade cabinets

### Port: Purple Turtles (Phase 1)

- Move the canvas loop, sprites, audio and layout into `games/purple-turtles/` with `mount()` creating the DOM it needs inside the given element and `destroy()` tearing down listeners and the RAF loop.
- Replace `window.BodieGame` and `postMessage` with `ctx.report` and `ctx.draw`. Replace the internal Dolch list with engine draws (the game keeps a local queue of 10 words and refills).
- Keep `#reading`-style quick toggles out; reading mode comes from `ctx.readingMode`.
- Add haptics hook points (`onHop`, `onSplash`, `onDelivery`) that no-op on web and call Capacitor Haptics in Phase 5.
- Keep the in-screen HUD, status strip and pause/settings sheet; swap the settings sheet's grown-up notes for a link to Dad's Corner.

### Port: Sight Word Shootout (Phase 1, from Bodie's Books)

Same rules as the legacy version (ten shots, listen mode and read mode, goalie saves on a miss). Read mode reports `modality: 'read-aloud'` with Dad confirming via the Score/Save buttons. Stars now come from the engine, not local counters.

### New cabinet: Big Catch (Phase 3, shipped 2026-11-07)

Replaces the earlier "Fishing for Words" sketch. A progression fishing game first (that is what makes him come back), with word mode layered on top. Source: `games/fishing/big-catch.html`, built into `public/play/big-catch.html`.

- **Core loop (three phases that feed each other).** Hold to cast (a swinging power meter sets distance; distance sets the zone: weeds, middle, deep). Wait while fish shadows swim in a side-on "aquarium" cut of the lake, so depth is something he can see. The shadows are the fish: which species swim by depends on the lake, the time of day and the weather, rare fish keep to the far 60% of the water, and the one that bites is one of the fish near the lure (right lure, right depth, close by), at the size you saw, so with the Fish Finder he can pick a fish and cast to it; nibbles bob the bobber, a real bite dunks it and the fish gets one generous tap window (and usually comes back once if he misses). The fight is a threshold fight: hold to reel, let go when the fish runs. Two big colour-coded bars (fish to net, line tension). Red for too long snaps the line; no lives, no points lost, the status just says what to do next time.
- **World.** Seven waters plus the ice, each with its own scene, fish list and legend: The Dock (home lake), Red River (catfish), Lake Winnipeg (greenbacks, no plain walleye), Whiteshell (lake trout, bass), Lake of the Woods (muskie, fished from a boat), Wabigoon (Dryden muskie water, a lodge and a float plane) and Clearwater Lake (The Pas, limestone cliffs, giant lake trout). Lakes unlock on fish caught, kinds caught, coins and Master Anglers, shown as chips he can read. Bigger water rolls bigger fish. **Ice Season** is the endgame: it unlocks only when every non-winter badge is earned and every one of the 23 fish is in the book. The six ice badges never count toward that: the Badges panel shows them in their own "Ice badges" section with a note, the count up top is the count that opens the ice (x / 44), and the locked Ice Season card lists the badges still to get by name. On the ice the wind-up picks a depth (shallow, middle, deep) instead of a distance, the jig drops through a hole beside the shack, holding lifts it, the jig trails bubbles on the way down, the fish fights under the hole, snow replaces rain and the northern lights come out at night. Ice fish: perch, greenback, sauger, pike, burbot, whitefish, tullibee, crappie, lake trout. Six winter badges (Ice Angler, Hard Water, Ice Greenback, Eelpout Night, Ice Giant, Flag Up!) sit outside the unlock count. **Ice gear.** The shop grows an Ice tab that only exists on the ice (every open-water lure still works down the hole). Three ice lures, with their own fish table (`ICE_WANT`): Tungsten Jig (drops fast; perch, crappie, tullibee), Rattle Spoon (greenbacks, walleye, sauger; flashes), Jigging Minnow (swims a circle; pike, lake trout). Three pieces of gear: the Flasher (a sonar bar per depth band beside the hole that lights when a fish in that band is near), Hand Warmers (15% faster pulling on the ice) and the **Tip-Up**, a second line in a second hole 96 units out with a minnow on it. Every 16 to 34 seconds a fish near that hole may take the minnow (`TIP_WANT`: pike, burbot, greenback, lake trout): the flag springs up, a FLAG UP! TAP! button appears and the fish has eleven seconds of Bodie's free time before it lets go. Tapping the flag reels his own line in (not counted), walks him over (`iceOff`), and the fight starts on the tip-up line, hand over hand with no rod (PULL). The catch card says TIP-UP!, then he walks back and the tip-up is set again. Leaving the ice drops an ice lure for his best regular one and resets the tip-up.
- **Day.** Each day is 15 casts from 6 AM to 9 PM (20 with the Headlamp); the sky, the sun and the bite tables move with the clock, and the weather (sun, cloud, rain) shifts which fish bite, Black Bass style. A day ends on a summary card that is always a win ("Sleepy fish" on a zero day), then NEW DAY.
- **Gear.** Lures pick the depth and the fish (worm, spinner, spoon, jig, crankbait, frog, stink bait, glow jig, big sucker). Rods cast farther and hold a stronger line. Reels pull faster. Extras: Lucky Hat, Fish Finder (shadows become real fish), Big Net, Headlamp. Rods and reels never downgrade. The **Wizard Rig** is the one lure that is never sold: it is handed over the moment all four word mode badges are in (Word Hook, Word Champ, Full Jar, Bait Shop). A spinner blade over a two-hook pickerel spreader with a bell sinker. It fishes every depth (two bands off still counts 70%), every fish wants it at least as much as its favourite lure, bites come 10 points more often and sooner, and it flashes at night so the night penalty is off. In the shop it shows as EARN IT with the four badge chips; a full jar's free lure never hands it out.
- **Records.** 23 species (the Greenback is Lake Winnipeg's own walleye) with a Fish Book (silhouettes until caught, count and best length), 30 badges, and Master Angler tags at Manitoba's real minimum lengths (walleye 71 cm, pike 104, channel catfish 88.9, lake trout 89, sturgeon 109, and so on), so the game's biggest goals are ones he could chase for real.
- **Word mode v2** (`#reading`, or the toggle; shipped 2026-11-10). Words come from the app's lists: `scripts/adapt-legacy.mjs` inlines `LISTS` and `CONFUSABLE_GROUPS` from `lib/engine/lists.ts` into the page at build (the Dolch 92 is the fallback). He is on the first list that is not 90% known (known = 3 book stars in `bb:wm:<word>`, or three right in a row in the game); earlier lists feed review words back in. Each pick is weighted: +2 if missed in the last three days, +0.5 never met, -0.6 gold in the books, -0.3 solid in the game, and the last five words are nearly excluded. Distractors prefer the confusable groups (from any list), then same first letter or same length. Two tasks: (1) hear-pick at the bite, as before: wrong pick shakes, greys out, the word is spoken again, the fish waits; right pick hooks the fish with a WORD BONUS and, first try, a worm in the jar. (2) Spell the fish, optional, from a SPELL IT button on the catch card: names of six letters or fewer are spelled from shuffled tiles (the letters plus two extras) into dashed slots; longer names ask for the first letter from three tiles. Wrong taps shake and cost nothing; after two misses on a slot the right tile glows. Done: 5 coins, a worm, and the fish name spoken. SKIP always works. The bait jar holds 10 worms; a full jar is a free lure he does not own, or 60 coins when he has them all (badges Full Jar, Bait Shop). Per-word results live in `bbc_words` ({right, wrong, streak, last}); fishing never writes book stars. Dad's Corner, Words tab, shows a Big Catch card: words right, misses, jars, worms, the words missed this week and the words solid in the game. Posts `word_prompt`, `word_correct` (with `firstTry`), `word_wrong` with the modality (`hear-pick`, `spell`, `first-letter`) and still honours `window.BodieGame.reading.setWords()` from a parent page.
- **Save.** `bbc_save` (JSON) plus `bbc_fish`, `bbc_bigcm`, `bbc_bigsp` for the cabinet marquee. START OVER in the pause sheet needs two taps.
- **Full-screen world (3b, 2026-11-09).** No cabinet on the play page. The lake fills the viewport edge to edge through a camera: world units are W x 300 (W is picked once at boot so a wide phone gets more water, 480 to 720), in landscape the camera is a steady wide shot (the whole world, lake bed included, fits above the control band, so nothing is cropped and the chips never cover the deep water) that only shakes on hook, run, snap and landing; in portrait the world is zoomed 1.3x with a gentle follow cam anchored on the dock. Zoom punches were tried and removed after the first play: they cropped the bottom and read as the picture changing shape. Parallax: clouds and sun far, shoreline mid with a wobbling reflection in the water, foreground reeds near. Ambient life: a far fish jumps every 9 to 20 s, dragonflies by day, fireflies at night, a loon on the big water, chimney smoke at the cottage, a sweeping lighthouse beam. Bodie is a 2 px sprite with poses: idle, wind-up, cast, wait, hooked (hop), fight (crouch, lean, spinning reel) and cheer. HUD, menu and status are glass chips over the water; the reel button is a round glass thumb target bottom-right (red was tried first; too loud over the water). The arcade row still shows the cabinet look.
- **Spots and boats (3b).** Every lake has three spots: Shore (dock), the Weeds (Canoe, 2000 coins; shallow fish x1.6, bass and pike, lily pads) and the Drop-off (Tin Boat, 6000; deep fish x1.6, rare x1.3, +0.08 size roll, the bottom falls away). Bodie fishes from the boat, 70 or 135 world px farther out, so the far water is in reach with any rod. Spots are picked in the LAKES panel; the HUD time line shows the spot. Lake of the Woods is always fished from a boat.
- **Size medals (3b).** Bronze, silver (35% up the species range), gold (60%), giant (85%) per species, shown in the Fish Book and tagged on the card with 15 / 30 / 60 bonus coins the first time. Badges: Gold Rush (5 golds), Giant!, Giant Hunter (5 giants). Older saves get medals for the best fish already in the book.
- **Fish of the Day (3b).** One species per real calendar day, hashed from the date over the lakes he has opened, shown on the title screen and in the status at the start of a day. The first one caught that day pays triple coins and a FISH OF THE DAY tag. Badge: Day Fish (3 times).
- **Art pipeline (3b).** `art/big-catch/` holds the source art (SVG, or a PNG dropped beside it, which wins), `manifest.src.json` the slots and anchors, and `scripts/render-sprites.mjs` renders it all at 2x to `public/sprites/big-catch/` with the manifest the game loads (runs on `prebuild`; `npm run art` regenerates the generated SVGs too). The game loads sprites asset by asset and falls back to the drawn version for anything missing, so it runs with no art, offline, or mid-load. First art set, all generated by `scripts/art/*.mjs` and meant to be replaced one file at a time: Bodie in seven poses (the rod and line stay code-drawn from a `hand` anchor), all 22 fish with gradient bodies, scale texture, fin rays and species markings, two boats, and a far-shore layer per lake (silhouettes in three tones with the lake's landmarks, tiling sideways). `art/big-catch/ART.md` is the brief for making or generating replacement art.
- **Looks (2026-11-10).** A Looks tab in the shop: six outfits for Bodie (Classic, Jets, Riders, Blue Jays, Sunset, Camo), each a full sprite set generated by `scripts/art/bodie-poses.mjs` under `art/big-catch/bodie/<outfit>/`, plus a Pup who sits behind him and barks at a catch, Dock Lights that glow after dark, and Bodie's Flag (a purple B pennant). None of it changes the fishing. Badge: Dressed Up.
- **Derby (2026-11-10).** DERBY on the title screen: pass and play, Bodie fishes ten casts, then Dad fishes ten on the same lake with the same gear. Two events, most fish and biggest fish; 2-0 or 1-0 wins, 1-1 is a tie. Dad fishes as a guest: his catches count for the derby and nothing else (no book, coins, badges or fish of the day). The record (Bodie, Dad, ties) lives in `S.derby` and shows on the title. Badge: Derby Champ (beat Dad once), which also means the ice cannot be unlocked without beating Dad.
- **Sound (2026-11-10).** All synthesized in WebAudio, no files. An ambient layer under the effects: water lap (bandpassed noise with a slow swell), wind, rain or snow hiss, ice groan, with loons on the wild lakes every 25 to 60 s, crickets at dusk and night, frogs at the Dock and in the Weeds after dusk, gulls on Lake Winnipeg by day, and ice creaks in winter. The line sings while a fish runs (a filtered sawtooth with vibrato that opens with tension). Three catch jingles: common, big, and a legend fanfare for Master Anglers and rarity-5 fish. A looping chip tune on the title screen. A second toggle in the pause sheet, "Lake sounds and music", separate from the effects; both persist. Everything ducks when the page is hidden.
- **Controls.** The round reel button (bottom-right) and the water itself; SPACE on a keyboard. Four menu chips bottom-left: SHOP, FISH, BADGES, LAKES, with a red dot when something new is waiting. The catch card covers the button; KEEP FISHING, a tap on the water behind the card, or SPACE carries on after the hold.

### New cabinet: Canoe Rapids (Phase 3)

- Top-down river scroller. Gates of two or three buoys ahead, each with a word; steer (tilt or two paddles) through the buoy that matches the spoken word. Missing a gate bumps a rock and spins the canoe (lose time, not a life). Deer, beaver and a fishing Dad on the banks as scenery. Three rapids per run.
- Modality: `hear-pick`, with `read-pick` mode showing the target on a sign at the bow.

### Cabinet rules

- Every cabinet must run with `readingMode: false` as a plain game, and with `true` as a reading game, from one codebase.
- Must pass the plugin harness: a fake `GameContext` that counts events and asserts `game_over` fires, `destroy()` clears listeners, and no word prompt fires more often than the session rate limit.
- Must render in portrait and landscape at iPhone sizes, with paddles or controls reachable by thumbs.

## 14. Reading Room

- Port the book data to TypeScript (`reading/books/data.ts`) keeping ids, titles, colours, words and page text exactly. Port the scene kit and `B()` figure to typed functions returning SVG strings; wrap in a `<Scene>` component.
- Reader: keep tap-to-hear, `abc` highlighting, "read to me", progress, stars. Sight-word highlighting uses the Dolch list plus any word in an enabled list.
- Flash Cards: port the swipe/flip interaction; the deck comes from `engine.due()` and the practice pile; "Got it"/"Not yet" report `read-aloud` events with `helped` set if the speaker was tapped first.
- Shelf: Level 1, Level 2, Level 3, and (Phase 4) "New stories" for approved AI books, marked with a small "new" tag. Pending AI books are invisible here.
- (Phase 4) Read to Me: the fluency check, launched by Dad.

### Book levels

| Level | Pages | Per page | Tense and shape | Source |
|---|---|---|---|---|
| 1 | 12 | 1 sentence, 4 to 8 words | present, mostly sight words | `legacy/` `BOOKS` |
| 2 | 12 to 16 | 2 to 3 sentences, 8 to 25 words | past, -ed and -ing, dialogue | `legacy/` `L2SRC` (same stories as Level 1, same art) and `content/books/` |
| 3 | 12 | 3 to 4 sentences, 25 to 35 words | past, dialogue, sequence words (first, then, after, finally, until, because) | `content/books/l3-*.js`, all new stories with their own art |

Level 3 pages lean on the grade3 and grade3plus lists (Appendix A) and each book's `words` chips are drawn from them where they fit. The reader uses the `l3` class: type one notch smaller than Level 2, picture a little shorter, so a 35-word page fits an iPhone without scrolling. Keep new Level 3 books inside these ranges; the smoke test enforces 20 to 40 words a page and at least 12 pages.

## 15. Dad's Corner

- PIN pad (4 digits, hashed, 30-minute unlock, no biometrics in PWA). Three wrong tries = 60-second wait.
- **Today:** today's run status, minutes this week, the day dots, "Start a full run / quick run" buttons.
- **Words:** per list: total / known / star, the practice pile, confusable groups with error counts, modality mix. Tap a word for its history.
- **Books:** completion and stars per book; approvals queue for AI stories with full preview; regenerate or reject with a reason.
- **Fluency:** WCPM and accuracy over time with the reference band (Phase 4).
- **Settings:** session lengths, free-play rule, enabled lists, manual unlock, voice choice (list the phone's English voices; default en-CA if present), sound, reset options (with a typed confirmation, since `confirm()` is unreliable).
- **Guide:** the parent Guide verbatim, with the persisted checklists and tallies.
- **Weekly summary:** latest AI summary and the archive.

## 16. iOS and PWA requirements

Phase 1 (PWA):
- `manifest.webmanifest`: name "Bodie's Arcade", short_name "Arcade", `display: standalone`, `orientation: any`, `background_color` and `theme_color` from the arcade palette, 192/512 icons, maskable icon.
- `<meta name="apple-mobile-web-app-capable" content="yes">`, `apple-mobile-web-app-status-bar-style: black-translucent`, `apple-touch-icon` 180px, `viewport` with `viewport-fit=cover`, iOS splash images optional.
- Service worker (Serwist or next-pwa): precache the app shell, fonts, book data and scene kit; runtime-cache nothing from the API; an offline fallback route. Verify the installed app opens with airplane mode on.
- Safe areas on every edge: `env(safe-area-inset-*)` for paddles, HUD, bottom bars. The notch can be on the left or right in landscape.
- Touch: `touch-action: none` on game surfaces, `manipulation` on buttons, `-webkit-touch-callout: none`, `user-select: none` on play surfaces, `overscroll-behavior: none` on the body, inputs at 16px or larger so Safari does not zoom.
- Sizing: `height: 100%` chain, never `100vh`; recompute the game stage on `resize`, `orientationchange` and `visualViewport.resize` (the Purple Turtles `layout()` does this already).
- Audio: create and resume the AudioContext on the first tap; one-time silent `speechSynthesis.speak()` unlock on that same tap; iOS mutes Web Audio when the ring/silent switch is off, and that cannot be fixed in a PWA (say so in Settings).
- Storage: Dexie for everything; Safari can evict site data for sites not used in 7 days, installed web apps are safer, Supabase sync is the real safety net.
- No `alert`, `confirm`, `prompt`. No `window.open`. No downloads.
- Install flow: a one-time "Add to Home Screen" card with the Safari Share icon, shown only in Safari when not installed (`navigator.standalone === false`).

Phase 5 (Capacitor):
- `@capacitor/ios`, `@capacitor/haptics` (hop, land, splash, goal), `@capacitor/local-notifications` (optional "reading time" reminder set by Dad), `@capacitor/screen-orientation` (lock landscape on cabinets that prefer it), `@capacitor-community/speech-recognition`, `@capacitor/status-bar`.
- Set `AVAudioSession` category to `playback` in `AppDelegate` so bleeps play with the ringer off.
- Build in Xcode on the Mac. Apple Developer Program required (99 USD a year). Distribute by TestFlight to family devices (builds expire after 90 days; re-upload) or publish free in the Kids category (no third-party analytics or ads, parental gate on outbound links, privacy policy URL).
- Keep the web build working; Capacitor wraps `out/` from `next build` with static export, so avoid server components that need a server at runtime except the `/api/ai/*` routes, which the native app calls over HTTPS at the Vercel URL.

## 17. Design language

Two wings, two moods, one family.

**Arcade (from Purple Turtles).** Night-purple cabinet around a bright pond. Tokens: bg `#150f30`, cabinet `#241a56`, cabinet edge `#4a35a8`, screen bezel `#0a0720`, text `#f5f0ff`, muted `#b7a9ea`, accent red `#ff4a3d` (shadow `#9a1e17`), turtle purple `#b07cf5`, good `#58e070`, warn yellow `#ffd23f`, bad `#ff6b6b`. Display: Press Start 2P for HUD and marquees only. Body: Fredoka. Single theme by design (it is a dark cabinet). Buttons are chunky with a hard 5 to 6px drop shadow that presses down.

**Reading Room (from Bodie's Books).** Light and calm. Tokens: bg `#eaf2f8`, panel `#ffffff`, text `#152338`, muted `#5c6c83`, line `#cbd8e4`, accent `#e2422b`, sun `#f6b73c`, sight-word highlight `#fff1b8` with a `#f6b73c` underline, go-green `#23894a`. Display: Fredoka. Body: Lexend (readability). Full light and dark themes using the token structure in the legacy file.

**Shared rules.** Big tap targets (44px minimum, 60px for anything Bodie hits in play). Big type for Bodie. One accent per screen. Semantic colours (good/warn/bad) are separate from the accent. Motion is short and purposeful; respect `prefers-reduced-motion`. Copy: short, specific, kind. Praise the move, not just the answer ("You went back and fixed it. That's what good readers do."). No em dashes.

## 18. Phases and "done when"

### Phase 1: Shell and port
- Next.js app with the routes in Section 6, PWA installable, fonts self-hosted.
- Purple Turtles and Shootout as `GameModule`s; Books, Flash Cards and the Guide ported with the same content.
- Progress stored locally (Dexie) with the engine stubbed to the legacy star rules.
- Done when: installed on an iPhone from Safari; opens full screen; Purple Turtles plays in landscape with sound; a book reads with tap-to-hear; Shootout and Cards record stars; airplane mode still boots the app; Lighthouse PWA checks pass; zero console errors on the device matrix.

### Phase 2: Word engine and sessions
- Engine per Section 9 with unit tests; Supabase schema per Section 8 with sync.
- Session runner per Section 10; Dad's Corner Today, Words, Settings, Guide.
- Done when: a full run completes end to end on an iPhone; word states survive a reinstall (via Supabase); dashboard numbers match a hand count from the event log; tests green.

### Phase 3: New cabinets
- Big Catch (shipped as a play page, see Section 13), then Canoe Rapids, each passing the plugin harness and device matrix.
- Done when: both are playable in plain and reading mode, with a best-score marquee, and Bodie picks them on his own.

### Phase 4: AI
- Story generator with validator and approvals; next-words; weekly summary; fluency check with chart.
- Done when: a generated Level 1 story about hockey passes validation, is approved in Dad's Corner, appears on the shelf, and reads correctly; a fluency run records WCPM; a weekly summary is produced from a week of real events.

### Phase 5: Native
- Capacitor wrap, haptics, orientation lock, notifications, speech plugin, audio session.
- Done when: TestFlight build runs on two family iPhones with the above working, and the web build still deploys.

## 19. Test checklist and device matrix

Run before closing any phase:

- iPhone (Safari, then installed PWA): portrait and landscape, notch left and right. Nothing clipped, no horizontal scroll, paddles under thumbs, HUD readable.
- iPad: both orientations.
- Desktop Chrome at 1280x800 and a short wide window (1000x500) for the landscape path with a keyboard.
- Reduced motion on. Dark mode on (Reading Room). Sound off then on. Airplane mode.
- Playwright smoke: boot each route at 390x664, 844x390, 1024x768 with no console errors and `scrollWidth === clientWidth`.
- Engine tests green. Plugin harness green for every cabinet.
- A five-minute play test with Bodie. Watch for: taps that do nothing, text he cannot read, a moment that felt like failing.

## 20. Open decisions (defaults in bold)

1. Free play rule: **always available**, or only after the day's session. (Section 2 reasoning.)
2. Session length default: **11 minutes** full, **3** quick.
3. Dad's Corner gate: **4-digit PIN**, or a magic link to Mitch's email.
4. Dad's "together" toggle: **manual toggle at session start**, or inferred from read-aloud mode.
5. Second kid support: **schema allows it, UI does not** until asked.
6. Fluency recognition engine: **Web Speech in Safari**, Capacitor plugin later.
7. Email the weekly summary: **no** for now; show in Dad's Corner.
8. Khan Academy: **link-outs from Dad's Corner only** (grade 2 and 3 Reading and Vocabulary units), with a parent check-off; no embedding, no content copied.
9. Extra content sources (Dolch and Fry lists are public domain; CKLA and UFLI decodables are free to use with their own terms): **Dolch and Fry only in v1**; review the others' terms before importing text.
10. Name: **Bodie's Arcade** for the app; the Reading Room keeps "Bodie's Books" as its shelf title.

## Appendix A: word lists

Order and gating follow this sequence. Keep the exact words; they match the stars Bodie has already earned.

- **rookie** (The first 40 sight words): a and away big blue can come down find for funny go help here I in is it jump little look make me my not one play red run said see the three to two up we where yellow you
- **pro** (The next 52 words): all am are at ate be black brown but came did do eat four get good have he into like must new no now on our out please pretty ran ride saw say she so soon that there they this too under want was well went what white who will with yes
- **allstar** (Grade 1 and 2 words): after again an any as ask by could every fly from give going had has her him his how just know let live may of old once open over put round some stop take thank them then think walk were when always around because been before best both call does fast first found gave green its made many off or pull read right sing sit sleep tell their these those upon us use very which why work would write your
- **grade3** (The grade 3 sight words): about better bring carry clean cut done draw drink eight fall far full got grow hold hot hurt if keep kind laugh light long much myself never only own pick seven shall show six small start ten today together try warm
- **grade3plus** (Grade 3 Stretch): above almost along answer became below between different during early enough finally friend group half heard important learn minute often people piece question really second sometimes special sure thought through toward until whole without young world
- **dolch** (highlight-only): the 220-word Dolch set in `legacy/bodies-books.html` (`var SIGHT`).

## Appendix B: event names (stable, used by the dashboard)

`game_start`, `word_prompt`, `word_correct`, `word_wrong`, `score`, `level_up`, `life_lost`, `game_over`, `book_opened`, `page_read`, `word_tapped` (tap-to-hear), `book_finished`, `card_got`, `card_not_yet`, `session_started`, `session_phase`, `session_finished`, `fluency_run`.

## Appendix C: legacy mapping cheat sheet

| Legacy | New home |
|---|---|
| `purple-turtles.html` game loop, sprites, audio, layout() | `games/purple-turtles/` |
| `READING` config and word choice overlay | `ctx.readingMode` + engine draws |
| `window.BodieGame` events | `ctx.report(GameEvent)` |
| `BOOKS`, `L2SRC`, `LEVEL2`, `SIGHT` | `reading/books/data.ts`, `lib/engine/lists.ts` |
| `A.*` art kit, `B()`, `person()` | `reading/books/scene-kit.ts` |
| Shootout (`DECKS`, modes, stars) | `games/shootout/` + engine |
| Flash Cards (deck, swipe, practice pile) | `reading/cards/` + engine |
| Guide cards and checklists | `reading/guide/` rendered in `/dad` |
| `bb:*`, `bpt_*` localStorage | Dexie tables; no automatic migration (different origin) |

## Build log

Newest first. One entry per phase or notable decision. Keep it short.

### 2026-11-07: Big Catch, the fishing cabinet

- New cabinet, built from scratch as a single-file play page in `games/fishing/big-catch.html` and wrapped into `public/play/big-catch.html` by `scripts/adapt-legacy.mjs` (same head, fonts and HOME behaviour as the legacy pages; the script now takes a source directory). Replaces the "Fishing for Words" sketch; the design is in Section 13.
- Design notes borrowed on purpose: lures that work by depth, time of day and weather, and a day that runs sunrise to sunset (The Black Bass); visible fish shadows and a journal that fills in (Animal Crossing); a hold-to-reel tension fight tuned forgiving (Stardew Valley, Zelda); discovery unlocking new water and a shop where every upgrade changes what you can catch (Ridiculous Fishing). Master Angler lengths are the real Manitoba minimums.
- Cabinet row: `Cabinet.stats` lets a cabinet show its own numbers (Big Catch shows fish caught and biggest in cm from `bbc_fish` and `bbc_bigcm`). Service worker precache bumped to `arcade-v2` with the new play page. Smoke test boots the page at all three sizes, makes one cast, and checks the cabinet's PLAY and WORD MODE links.
- Tuning as shipped: bite chance 0.55 to 0.95 by lure, time and weather; bite window 1.0 to 1.5 s plus 0.25 with the Big Net; one free second chance on a missed bite most of the time; a perch lands by just holding, a walleye needs one rest, a big pike runs about four times, a muskie about five. Master Angler lands about one catch in twenty five on the home lake, more on the big lakes. Each day is roughly four minutes of play.
- Not yet done: the `GameModule` port (it runs as a play page like the others), the plugin harness, haptics beyond `navigator.vibrate`, and a real play test with Bodie.
- 2026-11-08 fixes from the first real play: the whole page is now unselectable (iPhone was grabbing SHOP / LAKES / the fish name during tap-reeling and throwing up the Copy bar over the fight and the catch card), and the catch card holds before it can be closed, then 1.0 s / 1.8 s, cut on 2026-11-10 to 0.2 s / 0.36 s, with KEEP FISHING dimmed until then. Observed: he tap-reels rather than holding; the fight still works that way, just slower.
- 2026-11-08, later: with the Fish Finder on he saw a sturgeon turn into a whitefish on its way to the lure. The bite used to roll a species and repaint the nearest shadow. Now the shadows are the bite pool: spawned by rarity (1, .75, .5, .3, .18), time of day and weather; rare fish (rarity 3+) enter from the far side and never come inside 40% of the water; the bite picks among the fish present by lure affinity x time x weather x depth match (1 / .35 / .08 by bands off) x nearness, and keeps that fish's species and length. Bite chance is 0.55 + 0.12 per unit of that attraction, capped at 0.95. `window.BodieGame.shadows` and `.pending` are exposed for tests.
- 2026-11-09: the muskie has its own painter (light gold-green body with dark vertical bars, rust red speckled fins, deep pointed tail, long toothed jaw, gold eye) and the pike's spots are now light beans on a dark body, so the two read apart at a glance on the finder and the card. Observed after two days: 390 fish, a 160 cm sturgeon, 7800 coins unspent; the economy and the species list are exhausted, so the next work is new goals, not tuning.
- 2026-11-09, Phase 3b (the big polish pass): full-screen world with a camera, parallax and reflections; Bodie with poses; boats and three spots per lake; size medals; Fish of the Day. Design detail is in Section 13. Real clock and real weather were considered and parked; the day cycle stays in game time. Not done: a sprite pipeline for hand-made art (everything is still drawn in code), cosmetics for Bodie, word mode v2.
- 2026-11-09, later: the sprite pipeline (Section 13, "Art pipeline") with a first generated art set for Bodie, the fish, the boats and the lake shores. Service worker precache bumped to `arcade-v3` with the sprite manifest. Next art step is replacing the generated files with hand-made or image-model art per `art/big-catch/ART.md`; word mode v2 is queued after that.
- 2026-11-10: the Greenback, a Lake Winnipeg-only species (a walleye in every way but colour and rarity: emerald over gold, rarity 3, same 71 cm Master Angler). Lake Winnipeg now holds greenbacks and no plain walleye, and the greenback is its legend fish. Badges: Greenback, Green Master. 23 species. The catch card hold was cut to a fifth (200 ms, 360 ms for the exciting ones) after it felt long in play.
- 2026-11-10, later: Wabigoon and Clearwater Lake; Ice Season as the all-badges, all-fish endgame with depth-pick jigging through a hole (Section 13, "World"); word mode v2 on the app's real lists with a spell task and the bait jar (Section 13, "Word mode v2"); Dad's Corner Big Catch word report. Lakes that add no new species get no header in the Fish Book.
- 2026-11-10, Purple Turtles interface update (owner's request): the pond fills the screen, the cabinet chrome is gone, the hop zones are the whole sides of the pond with a glass arrow where the thumb rests, fireflies drift over the glow around the playfield, and each hop gives the pond a tiny bump. Done entirely as a skin in `scripts/adapt-legacy.mjs` (extra CSS plus a small script that wraps the global `hop()`); `legacy/purple-turtles.html` is untouched and the game logic, playfield and word mode are exactly as before. Portrait and tablets keep the pond on top with the hop pads below it.
- 2026-11-10, later: Looks (outfits, pup, dock lights, flag), the Dad vs Bodie derby, and the sound layer (Section 13). 75 sprites now render from `art/big-catch`.
- 2026-11-10, play session fix: the ice badges were already excluded from the Ice Season unlock, but the Badges panel counted them (x / 49) and showed them in the same grid, so it looked like the ice could never open. Badges now split into the main set and an "Ice badges" section with a note, the count matches the unlock, the locked Ice Season card lists the badges still to get, and the SPELL IT button carries the bait jar count.
- 2026-11-10, later: the Wizard Rig, the ultimate lure, earned by finishing every word mode badge (Section 13, "Gear").
- 2026-11-10, later: ice gear. An Ice tab in the shop on the ice only: three ice lures, the Flasher, Hand Warmers and the Tip-Up, a real second line with a flag to run to (Section 13, "Ice gear"). Flag Up! winter badge.

### 2026-11-05: Level 3, nine new stories

- New Level 3 shelf (tab, note, `LEVEL3` array, `l3` reader class), all injected by `scripts/adapt-legacy.mjs`; the legacy file is still untouched. The `/reading/` shelf in the shell links to it.
- Nine all-new books in `content/books/l3-*.js`, twelve pages each, 25 to 35 words a page: Goalie for a Day, Fog on the Lake, The Night the Lights Went Out, Buzzer Beater, The Fishing Derby, The Free Kick, Pond Hockey, The Broken Stick, Under the Stars. Bodie is the hero, Dad and his sister show up, things go a little wrong then right, no moralising. Each book's "big words" chips come from the grade 3 and stretch lists where they fit.
- Shared Level 3 props (fog, candles, flashlight beam, aurora, headlights, broken stick, boots-for-goals and so on) live in `content/books/_l3-kit.js`, built on the legacy art kit.
- Level definitions are now written down in Section 14. Smoke test walks every page of every Level 3 book and checks the word range.

### 2026-11-05: First new book, and where new books live

- Added "The Big Comeback", a 16-page Level 2 book about the Jets' 5-4 overtime win in Montreal on November 3, 2026 (down 4-0 in the third, Bauer's Gordie Howe hat trick, Connor twice off Scheifele, Samberg in OT, nine-game winless streak over). Bodie and Dad watch it on TV. Real names are kept so he reads the ones he hears on the broadcast.
- New books go in `content/books/*.js`, one per file, same shape as the legacy entries, pushed onto `BOOKS` or `LEVEL2`. `scripts/adapt-legacy.mjs` inlines them into the play page before `ALL` is built, so `legacy/` stays read-only and the TypeScript port (Section 14) will read both locations. Until that port, this is the home for hand-written stories.
- Level 2 pages in the legacy books run 8 to 18 words; this one runs 16 to 24, on purpose ("a little longer"). Keep new Level 2 books in that range.
- Smoke test walks every page of the new book and checks the Level 2 shelf card.
- Updates do not touch progress: stars, bests and saved pages live in `localStorage` on the phone, keyed by origin, so a deploy to the same URL keeps them. Moving to a new domain (Vercel, custom domain, the Capacitor shell) would start from zero; the Dexie plus Supabase sync in Phase 2 is the fix.

### 2026-11-02: Shell fixes after first review

- Home's READING ROOM door now goes to `/reading/` (the shelf), matching the Arcade door and the IA in Section 6. The shelf deep-links into the legacy page by tab, so Bodie lands on Level 1, Cards or the Shootout in one tap.
- Coming-soon cabinets lost their "Phase 3" chip (build jargon on a Bodie-facing screen, rule 8). The marquee reads "TITLE" then "COMING SOON" on its own line.
- `npm run typecheck` runs `next typegen` first so it passes on a fresh clone; before, it failed on the generated `LayoutProps` type until a build had run.
- Two smoke tests added: the home doors point at the two wing routes, and the cabinet row carries no phase labels.
- Still open from the review: verify airplane mode on a real iPhone for second-level routes (chunks are cached on first fetch, not precached), and the light-theme jump when the Shootout opens from the dark Arcade (resolves with the GameModule port).

### 2026-11-02: Phase 1 shell (first cut)

- Repo scaffolded with Next.js 16 (App Router, TypeScript), **static export** (`output: 'export'`) so the same `out/` deploys to Vercel or GitHub Pages today and wraps in Capacitor in Phase 5. GitHub Pages needs a base path; `NEXT_PUBLIC_BASE_PATH` handles it and the workflow sets it.
- PWA: `manifest.webmanifest`, 192/512/maskable/apple-touch icons, hand-written `public/sw.js` (precache shell, play pages, fonts, icons; network-first pages with offline fallback; cache-first assets). Fonts self-hosted in `public/fonts/` (latin subsets) and shared by the shell and both play pages.
- The two legacy apps run **unchanged** as full pages at `/play/*.html`, generated from `legacy/` by `scripts/adapt-legacy.mjs` (wraps as standalone documents, swaps Google Fonts for the local copies, adds a HOME button, adds `#l1 #l2 #cards #game #guide` deep links to Bodie's Books). This is the pragmatic first step; the `GameModule` port of Purple Turtles and the Shootout into `games/` is the next piece of Phase 1.
- Contracts from Section 7 are in `games/types.ts` and `lib/engine/types.ts`. Appendix A lists are in `lib/engine/lists.ts` with Vitest coverage (sizes, no overlap, Dolch 220, confusables).
- Dad's Corner (Phase 1 scope): 4-digit PIN (SHA-256 hash, 30-minute unlock, 3 misses = 60-second wait), Today, Words, Settings and Guide tabs reading the legacy `bb:*` and `bpt_*` keys directly, so progress Bodie already earned shows up. No Dexie yet; that lands with the engine in Phase 2.
- Playwright smoke in `tests/smoke.spec.ts` boots every route at 390x664, 844x390 and 1024x768 with no console errors, no failed requests and no sideways scroll.
- Open point for Phase 4: static export has no server, so `app/api/ai/*` route handlers will need either Vercel without static export (drop `output: 'export'`, keep the native app pointed at the Vercel URL) or a separate small function. Decide when Phase 4 starts.
