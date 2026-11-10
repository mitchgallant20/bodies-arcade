# Bodie's Arcade

One installable web app for an iPhone: an **Arcade** of retro mini games that can run in reading mode, a **Reading Room** (Bodie's Books), and a PIN-gated **Dad's Corner**. Built for one kid, Bodie (grade 3, catching up on sight words), and run by his dad, Mitch.

## Read these first, every session

1. `docs/HANDOFF.md` is the product spec and build plan. Work the phases in its Section 18 in order. Section 2 lists the non-negotiables; they override shortcuts.
2. `legacy/purple-turtles.html` and `legacy/bodies-books.html` are the finished single-file apps. They are the source of truth for game feel, book content, word lists and the parent Guide. **Read-only.** Port them; do not redesign them.

## Where things are

- `app/` Next.js App Router shell (static export). Routes: `/`, `/arcade`, `/reading`, `/dad`, `/offline`.
- `public/play/` **generated** by `scripts/adapt-legacy.mjs` (runs on `prebuild`) from `legacy/` and from the new cabinets in `games/*/`. Edit the sources and the script, never the output.
- `games/fishing/big-catch.html` the Big Catch fishing cabinet, written for the arcade (not a port) as the same kind of single-file fragment as the legacy pages. Design and tuning are in HANDOFF Section 13. Edit it directly, then run `node scripts/adapt-legacy.mjs`.
- `art/big-catch/` the game's art (SVG or PNG per slot, `manifest.src.json` for anchors, `ART.md` for the brief), rendered by `scripts/render-sprites.mjs` to `public/sprites/big-catch/` on `prebuild`. `npm run art` regenerates the generated SVGs (`scripts/art/*.mjs`) and renders. Commit the rendered output like `public/play/`.
- `content/books/*.js` **new books** for Bodie's Books, one per file, in the same shape as the legacy `BOOKS` and `LEVEL2` entries (push onto `LEVEL2` or `LEVEL3`; the page's art kit `A.*`, `B`, `D`, `person`, `mix`, `tvRoom` is in scope, plus `L3.*` props from `_l3-kit.js`). The adapt script inlines them, so the legacy file stays read-only. After adding one, run `node scripts/adapt-legacy.mjs` and commit the regenerated `public/play/bodies-books.html`. `content/books/jets-comeback.js` (Level 2) and `l3-01-goalie.js` (Level 3) are the worked examples. Level ranges are in HANDOFF Section 14, "Book levels".
- `games/types.ts`, `lib/engine/types.ts` the shared contracts from HANDOFF Section 7. `games/registry.ts` is the cabinet row.
- `lib/engine/lists.ts` the word lists (Appendix A) with unit tests beside it.
- `public/sw.js`, `public/manifest.webmanifest`, `public/icons/` the PWA pieces. `public/fonts/` self-hosted Fredoka, Lexend, Press Start 2P.
- `tests/smoke.spec.ts` Playwright device-size smoke (HANDOFF Section 19). `.github/workflows/pages.yml` deploys to GitHub Pages.

## Commands

```
npm run dev        # local dev server
npm run build      # regenerates public/play, then static export to out/
npm test           # vitest (engine logic)
npm run test:e2e   # playwright smoke against out/ (run build first)
npm run icons      # re-render public/icons/*.png from icon.svg
```

## Rules of the road

- Bodie-facing copy reads at a grade 1 to 2 level. Dad-facing copy is plain. **No em dashes** in app copy or docs.
- Errors in reading tasks never cost a life, a point or a star. Sessions end on a win. Free play is never the price of reading.
- No ads, no third-party analytics, no accounts for Bodie. No `alert`, `confirm`, `prompt`, `window.open`, downloads.
- Offline first. Anything new must work with the service worker and no signal.
- Keep `docs/HANDOFF.md` current: when a decision changes, edit it in the same PR. The "Build log" at the end records what each phase actually shipped.
- Deploy target: static files (`out/`). Vercel serves them as-is; GitHub Pages needs `NEXT_PUBLIC_BASE_PATH=/<repo>` (the workflow sets it). Phase 4 AI routes will need a server or edge function; see the build log note.
