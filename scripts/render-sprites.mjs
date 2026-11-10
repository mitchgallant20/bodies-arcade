// Renders the Big Catch art in art/big-catch/ to public/sprites/big-catch/ and writes the manifest
// the game loads. Source art is SVG (authored in world units: 1 unit = 1 world pixel) or a PNG
// dropped in beside the SVG with the same name, which wins. Everything renders at SCALE x so it
// stays crisp on a 2x or 3x phone. Run: node scripts/render-sprites.mjs
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, rmSync } from "node:fs";
import { join, dirname, basename, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "art", "big-catch");
const out = join(root, "public", "sprites", "big-catch");
const SCALE = 2;

const manifestSrc = JSON.parse(readFileSync(join(src, "manifest.src.json"), "utf8"));
const manifest = { version: manifestSrc.version || 1, scale: SCALE, fish: {}, bodie: {}, boats: {}, lakes: {} };

rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });

async function render(rel) {
  // rel like "fish/walleye". Prefer a hand-made PNG beside the SVG.
  const png = join(src, rel + ".png"), svg = join(src, rel + ".svg");
  const dest = join(out, rel + ".png");
  mkdirSync(dirname(dest), { recursive: true });
  let img;
  if (existsSync(png)) img = sharp(png);
  else if (existsSync(svg)) {
    const text = readFileSync(svg, "utf8");
    const m = text.match(/viewBox="([\d.\s-]+)"/);
    if (!m) throw new Error(`${rel}.svg needs a viewBox`);
    const [, , w] = m[1].trim().split(/\s+/).map(Number);
    // Density so the viewBox width lands at w*SCALE pixels (sharp treats the SVG at 72 dpi)
    const density = Math.round(72 * (w * SCALE) / w);
    img = sharp(Buffer.from(text), { density });
  } else return null;
  const buf = await img.png({ compressionLevel: 9 }).toBuffer();
  writeFileSync(dest, buf);
  const meta = await sharp(buf).metadata();
  return { src: rel + ".png", w: meta.width, h: meta.height };
}

const scaled = (pt) => pt && [pt[0] * SCALE, pt[1] * SCALE];
let count = 0;
for (const [sp, spec] of Object.entries(manifestSrc.fish || {})) {
  const r = await render(`fish/${sp}`); if (!r) continue;
  manifest.fish[sp] = { ...r, len: (spec.len || 1) }; count++;   // len: fraction of the image width the fish body spans
}
for (const [pose, spec] of Object.entries(manifestSrc.bodie || {})) {
  const r = await render(`bodie/${pose}`); if (!r) continue;
  manifest.bodie[pose] = { ...r, feet: scaled(spec.feet), hand: scaled(spec.hand) }; count++;
}
for (const [id, spec] of Object.entries(manifestSrc.boats || {})) {
  const r = await render(`boats/${id}`); if (!r) continue;
  manifest.boats[id] = { ...r, seat: scaled(spec.seat), water: (spec.water || 0) * SCALE }; count++;
}
for (const [id, spec] of Object.entries(manifestSrc.lakes || {})) {
  const far = await render(`lakes/${id}-far`);
  const near = await render(`lakes/${id}-near`);
  if (!far && !near) continue;
  manifest.lakes[id] = { far, near, waterline: ((spec && spec.waterline) || 0) * SCALE }; count += (far ? 1 : 0) + (near ? 1 : 0);
}
writeFileSync(join(out, "manifest.json"), JSON.stringify(manifest, null, 1));
console.log(`rendered ${count} sprites to public/sprites/big-catch (scale ${SCALE})`);
