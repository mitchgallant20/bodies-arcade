// Writes art/big-catch/lakes/<lake>-far.svg (the far shore, 960 x 120, tiles sideways, waterline at
// the bottom edge) and art/big-catch/boats/{canoe,tin}.svg. Shores are dark silhouettes in three
// tones so they sit right under any sky, dawn to dusk; the game dims them at night.
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const lakesDir = join(root, "art", "big-catch", "lakes"), boatsDir = join(root, "art", "big-catch", "boats");
mkdirSync(lakesDir, { recursive: true }); mkdirSync(boatsDir, { recursive: true });

const W = 960, H = 120;
let seed = 7; const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };

function hills(amp, base, col, freq, phase) {
  let d = `M0 ${H}`;
  for (let x = 0; x <= W; x += 16) { const y = H - base - Math.abs(Math.sin(x * freq + phase)) * amp - Math.sin(x * freq * 2.7 + phase) * amp * 0.25; d += ` L${x} ${y.toFixed(1)}`; }
  return `<path d="${d} L${W} ${H} Z" fill="${col}"/>`;
}
function conifer(x, y, h, col) { const w = h * 0.42; return `<path d="M${x} ${y} L${x - w} ${y} L${x - w * 0.6} ${y - h * 0.45} L${x - w * 0.8} ${y - h * 0.45} L${x - w * 0.3} ${y - h * 0.78} L${x - w * 0.45} ${y - h * 0.78} L${x} ${y - h} L${x + w * 0.45} ${y - h * 0.78} L${x + w * 0.3} ${y - h * 0.78} L${x + w * 0.8} ${y - h * 0.45} L${x + w * 0.6} ${y - h * 0.45} L${x + w} ${y} Z" fill="${col}"/>`; }
function leafy(x, y, h, col) { return `<rect x="${x - 1}" y="${y - h * 0.5}" width="2" height="${h * 0.5}" fill="${col}"/><ellipse cx="${x}" cy="${y - h * 0.62}" rx="${h * 0.42}" ry="${h * 0.4}" fill="${col}"/>`; }
function treeline(y, count, hMin, hMax, col, leafyShare = 0) {
  let out = ""; for (let i = 0; i < count; i++) { const x = (i / count) * W + rnd() * (W / count), h = hMin + rnd() * (hMax - hMin); out += rnd() < leafyShare ? leafy(x, y, h, col) : conifer(x, y, h, col); } return out;
}
function birds(n, y) { let out = ""; for (let i = 0; i < n; i++) { const x = 60 + rnd() * (W - 120), yy = y + rnd() * 20; out += `<path d="M${x - 5} ${yy} q 2.5 -3 5 0 q 2.5 -3 5 0" stroke="rgba(255,255,255,.75)" stroke-width="1.2" fill="none"/>`; } return out; }

const T = { far: "#2b3b5c", mid: "#1f2c46", near: "#141f33", rock: "#6f6761", rockDk: "#4d4642", wood: "#5a3a22", red: "#c0392b", light: "#ffe08a", white: "#e9e6df" };

const LAKES = {
  dock: () => `${hills(38, 22, T.far, 0.011, 1.2)}${hills(24, 12, T.mid, 0.017, 3.1)}
${treeline(H, 70, 16, 30, T.near, 0.25)}
<!-- the cottage across the bay -->
<g transform="translate(300 0)"><rect x="0" y="${H - 28}" width="40" height="28" fill="#7a4324"/><path d="M-4 ${H - 28} L20 ${H - 44} L44 ${H - 28} Z" fill="${T.red}"/><rect x="26" y="${H - 42}" width="6" height="10" fill="#3a2a1a"/>
<rect x="8" y="${H - 22}" width="9" height="8" fill="${T.light}"/><rect x="24" y="${H - 22}" width="9" height="8" fill="${T.light}"/><rect x="-10" y="${H - 6}" width="60" height="4" fill="${T.wood}"/><rect x="-14" y="${H - 4}" width="20" height="4" fill="${T.wood}"/></g>
${birds(3, 28)}`,
  red: () => `${hills(6, 30, T.far, 0.02, 0)}
<rect x="0" y="${H - 30}" width="${W}" height="30" fill="${T.mid}"/>
${treeline(H - 20, 40, 26, 44, T.near, 0.85)}
<!-- the bridge -->
<g><rect x="300" y="${H - 22}" width="${W - 300}" height="4" fill="#2a2a3a"/>${Array.from({ length: 23 }, (_, i) => `<path d="M${300 + i * 28} ${H - 18} a 14 14 0 0 1 28 0" stroke="#2a2a3a" stroke-width="3" fill="none"/>`).join("")}
${Array.from({ length: 24 }, (_, i) => `<rect x="${299 + i * 28}" y="${H - 18}" width="3" height="18" fill="#2a2a3a"/>`).join("")}
${Array.from({ length: 8 }, (_, i) => `<rect x="${340 + i * 84}" y="${H - 34}" width="2" height="12" fill="#2a2a3a"/><circle cx="${341 + i * 84}" cy="${H - 35}" r="2" fill="${T.light}"/>`).join("")}</g>
<!-- muddy bank with grass -->
<path d="M0 ${H} L0 ${H - 10} Q 120 ${H - 14} 240 ${H - 6} L 300 ${H} Z" fill="#6b5330"/>${Array.from({ length: 30 }, (_, i) => `<path d="M${i * 9} ${H - 8} l 2 -8 l 2 8" stroke="#3f5a2a" stroke-width="1.2" fill="none"/>`).join("")}`,
  winnipeg: () => `<rect x="0" y="${H - 8}" width="${W}" height="8" fill="${T.far}"/>
<!-- the lighthouse -->
<g transform="translate(405 0)"><path d="M-9 ${H - 6} L-6 ${H - 62} L6 ${H - 62} L9 ${H - 6} Z" fill="${T.white}"/><rect x="-7" y="${H - 48}" width="14" height="10" fill="${T.red}"/><rect x="-8" y="${H - 28}" width="16" height="10" fill="${T.red}"/>
<rect x="-8" y="${H - 68}" width="16" height="7" fill="#3a3a44"/><rect x="-6" y="${H - 66}" width="12" height="5" fill="${T.light}"/><path d="M-9 ${H - 68} L0 ${H - 76} L9 ${H - 68} Z" fill="#3a3a44"/><rect x="-14" y="${H - 8}" width="28" height="4" fill="#3a3a44"/></g>
<!-- a laker on the horizon -->
<g transform="translate(600 0)"><rect x="0" y="${H - 14}" width="90" height="8" fill="#2a2f3a"/><rect x="62" y="${H - 24}" width="18" height="10" fill="#3a3f4a"/><rect x="70" y="${H - 30}" width="4" height="6" fill="#3a3f4a"/><rect x="8" y="${H - 18}" width="40" height="4" fill="#3a3f4a"/></g>
<!-- a sailboat -->
<g transform="translate(150 0)"><path d="M-10 ${H - 8} L 10 ${H - 8} L 7 ${H - 3} L -8 ${H - 3} Z" fill="#2a2f3a"/><rect x="-0.5" y="${H - 36}" width="1.2" height="28" fill="#2a2f3a"/><path d="M0 ${H - 34} L 8 ${H - 10} L 0 ${H - 10} Z" fill="${T.white}"/><path d="M-1 ${H - 30} L -7 ${H - 10} L -1 ${H - 10} Z" fill="${T.white}"/></g>
${birds(6, 30)}`,
  whiteshell: () => `${hills(44, 30, T.far, 0.012, 0.6)}
<!-- granite -->
<path d="M300 ${H} L300 ${H - 20} L340 ${H - 34} L390 ${H - 28} L440 ${H - 42} L500 ${H - 36} L540 ${H - 22} L${W} ${H - 30} L${W} ${H} Z" fill="${T.rock}"/>
<path d="M340 ${H - 34} L390 ${H - 28} L380 ${H - 10} L340 ${H - 6} Z" fill="${T.rockDk}" opacity=".6"/><path d="M440 ${H - 42} L500 ${H - 36} L480 ${H - 8} L430 ${H - 4} Z" fill="${T.rockDk}" opacity=".5"/>
${hills(18, 10, T.mid, 0.02, 2)}
${treeline(H, 55, 22, 40, T.near, 0.1)}
${[330, 430, 510, 600, 760, 880].map((x) => conifer(x, H - 30, 26, T.near)).join("")}
${birds(2, 24)}`,
  low: () => `${hills(30, 18, T.far, 0.009, 2.4)}
${treeline(H, 50, 14, 24, T.mid, 0.1)}
<!-- islands -->
${[[160, 60], [420, 44], [640, 70], [880, 50]].map(([x, w]) => `<ellipse cx="${x}" cy="${H}" rx="${w}" ry="10" fill="${T.near}"/>${[-0.6, -0.2, 0.2, 0.6].map((k) => conifer(x + k * w, H - 6, 18 + Math.abs(k) * 6, T.near)).join("")}`).join("")}
<!-- a cabin on the big island with a light on -->
<g transform="translate(420 0)"><rect x="-10" y="${H - 20}" width="22" height="12" fill="#4a3220"/><path d="M-13 ${H - 20} L1 ${H - 29} L15 ${H - 20} Z" fill="#2a1c10"/><rect x="-4" y="${H - 17}" width="5" height="5" fill="${T.light}"/></g>
${birds(4, 26)}`,
};
for (const [id, fn] of Object.entries(LAKES)) {
  seed = id.length * 31 + 7;
  writeFileSync(join(lakesDir, `${id}-far.svg`), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
<!-- ${id} far shore, generated by scripts/art/lakes.mjs. Tiles sideways; the bottom edge is the waterline. -->
${fn()}
</svg>
`);
}

// Boats: 1 unit = 1 world px. "seat" is where Bodie's boots go; "water" is the waterline y.
writeFileSync(join(boatsDir, "canoe.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 110 32" width="110" height="32">
<!-- canoe: seat [62,18], waterline 20 -->
<path d="M4 10 Q 40 30 70 29 Q 96 28 108 10 L 98 14 L 62 17 L 20 15 Z" fill="#b8402a"/>
<path d="M12 14 Q 40 27 70 26 Q 92 25 102 14 L 98 16 L 62 19 L 22 17 Z" fill="#8c2e1e" opacity=".55"/>
<path d="M4 10 Q 50 20 108 10" stroke="#e8c27a" stroke-width="2.4" fill="none" stroke-linecap="round"/>
<rect x="30" y="13" width="18" height="3" rx="1" fill="#e8c27a"/><rect x="60" y="13" width="18" height="3" rx="1" fill="#e8c27a"/>
<path d="M14 6 L 10 28" stroke="#e8c27a" stroke-width="2.2" stroke-linecap="round"/><path d="M9 27 q 2 6 4 0 z" fill="#e8c27a"/>
</svg>
`);
writeFileSync(join(boatsDir, "tin.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 40" width="120" height="40">
<!-- tin boat: seat [70,22], waterline 26 -->
<path d="M6 12 L 112 12 L 104 32 L 16 32 Z" fill="#b9bcc4"/>
<path d="M6 12 L 112 12 L 110 16 L 8 16 Z" fill="#dfe2e8"/>
<rect x="6" y="16" width="106" height="3.5" fill="#1b4fa0"/>
<path d="M16 32 L 104 32 L 100 30 L 20 30 Z" fill="#7d818a"/>
<rect x="22" y="19" width="26" height="6" rx="1.5" fill="#55596a"/><rect x="60" y="19" width="26" height="6" rx="1.5" fill="#55596a"/>
<rect x="0" y="6" width="9" height="24" rx="2" fill="#2a2a33"/><rect x="2" y="0" width="5" height="8" rx="1.5" fill="#555"/><rect x="1" y="28" width="7" height="6" fill="#444"/>
<rect x="92" y="4" width="2" height="8" fill="#444"/><path d="M94 4 L 104 6 L 94 8 Z" fill="#c0392b"/>
</svg>
`);
console.log("wrote 5 lakes and 2 boats");
