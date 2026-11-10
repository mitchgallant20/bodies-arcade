# Big Catch art

Everything the fishing game shows can be swapped for hand-made art without touching the game.
Drop a file in here, run `npm run art` (or just `npm run build`), and the game uses it. Anything
missing falls back to the drawn version, so you can replace one fish at a time.

## How it works

- `manifest.src.json` lists every slot and its anchors. `scripts/render-sprites.mjs` renders each
  slot to `public/sprites/big-catch/` at 2x and writes the manifest the game loads.
- For each slot the renderer looks for `<slot>.png` first, then `<slot>.svg`. A PNG you drop in
  beside the generated SVG wins. Make PNGs at exactly 2x the sizes below, with a transparent
  background.
- The generated SVGs come from `scripts/art/*.mjs`. They are a starting point and a size guide,
  not precious. Hand-edit an SVG, or regenerate everything with `node scripts/art/fish.mjs` and so on.

## The slots

| Slot | File | Size (1x units, make PNGs at 2x) | Notes |
| --- | --- | --- | --- |
| Fish | `fish/<species>.svg` | 120 x 52 | Facing right. The fish body spans x = 4 to 116 (the manifest's `len` 0.93). Species ids: perch, sunfish, rockbass, crappie, bullhead, walleye, sauger, pike, catfish, goldeye, carp, drum, sucker, whitefish, tullibee, burbot, smallmouth, laketrout, brook, rainbow, muskie, sturgeon, greenback (Lake Winnipeg's emerald walleye). |
| Bodie | `bodie/<pose>.svg` | 64 x 72 | Poses: idle, charge (wind-up), cast, wait, bite, fight, cheer. Boots at `feet` [32,70]. `hand` is where the rod handle sits; the game draws the rod and line from there, so leave the rod out. Facing right. |
| Boats | `boats/canoe.svg`, `boats/tin.svg` | 110 x 32, 120 x 40 | `seat` is where Bodie's boots go, `water` is the waterline y. Bow to the right. |
| Lake shores | `lakes/<lake>-far.svg` | 960 x 120 | The far shore, bottom edge on the waterline, tiles sideways. Keep landmarks inside x = 0 to 480: narrow phones only see that half. Lakes: dock, red, winnipeg, whiteshell, low. An optional `lakes/<lake>-near.png` slot is reserved for a foreground layer. |

## Style guide (if you generate art with an image model)

- Flat, clean, slightly rounded illustration. Two or three tones per colour, soft shading, no
  outlines heavier than a hairline. Think a modern kids' nature book, not pixel art and not photo-real.
- Transparent background, PNG, nothing cropped at the edges, no drop shadows (the game adds
  shadows and reflections).
- Fish: side view, facing right, true to the species (a walleye's white tail tip, a muskie's
  bars and red fins, a brook trout's red spots with blue halos), colours a little brighter than life.
- Bodie: about 8, Jets blue jacket with a white stripe, red toque with a white band and pom,
  dark hair, dark pants, black boots. Same face in every pose; the expression changes.
- Shores: dark blue-green silhouettes in three depths, so they sit under a dawn, noon or dusk sky.

A prompt that has worked as a starting point: "flat vector illustration of a <species> fish,
side view facing right, children's nature book style, soft two-tone shading, bright natural
colours, transparent background, no outline, no shadow, centred, fills the frame".
