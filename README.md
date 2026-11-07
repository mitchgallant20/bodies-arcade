# Bodie's Arcade

Retro mini games and picture books that teach sight words, as one installable iPhone web app. Two wings and a parent room:

- **Arcade.** Purple Turtles (a Commodore 64 remake), the Sight Word Shootout, and Big Catch (a Manitoba fishing game with five lakes, a tackle shop, a fish book and Master Angler badges), each playable plain or in word mode.
- **Reading Room.** Bodie's Books: Level 1 and Level 2 picture books, tap-to-hear, Flash Cards, and the parent Guide.
- **Dad's Corner.** PIN-gated progress, settings and the Guide.

The full spec is `docs/HANDOFF.md`. The finished single-file apps it builds on live in `legacy/`.

## Run it

```
npm install
npm run dev
```

Open http://localhost:3000. The games live at `/play/purple-turtles.html`, `/play/bodies-books.html` and `/play/big-catch.html` (generated from `legacy/` and `games/` on every build).

## Test it

```
npm test            # engine logic (vitest)
npm run build       # static export to out/
npm run test:e2e    # device-size smoke tests against out/ (playwright)
```

## Put it on an iPhone

1. Deploy (below) and open the URL in **Safari** on the phone.
2. Tap **Share**, then **Add to Home Screen**, then **Add**.
3. Open it from the icon. It runs full screen and keeps working with no signal.

A one-time card on the home page walks through the same steps.

## Deploy

The app is a static export (`out/`), so any static host works.

- **GitHub Pages.** Push to `main`. `.github/workflows/pages.yml` builds, tests and publishes to `https://<owner>.github.io/<repo>/`. In the repo settings, set Pages to "GitHub Actions" once.
- **Vercel.** Import the repo; no settings needed. Vercel serves `out/`.

## Status

Phase 1 shell: installable PWA, offline, both legacy apps wired in, contracts and word lists with tests, device smoke tests. Next: port Purple Turtles and the Shootout to the `GameModule` contract, then the word engine (Phase 2). See the build log at the end of `docs/HANDOFF.md`.
