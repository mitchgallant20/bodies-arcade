// Writes art/big-catch/fish/<species>.svg for every species in Big Catch, facing right in a
// 120 x 52 box with the fish spanning x = 4 to 116. Gradient bodies, a scale texture, finned
// rays and the markings that tell each species apart. Generated art: edit a species block below,
// or drop a hand-made PNG/SVG of the same name beside it and it takes over.
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const dir = join(root, "art", "big-catch", "fish");
mkdirSync(dir, { recursive: true });

// hh: half body height. head: 'point' | 'flat' | 'blunt' | 'sturgeon'. tail: 'fork' | 'deep' | 'round' | 'hetero'.
// dorsal: 'spiny' (two part, perch family) | 'back' (pike family, far back) | 'soft' | 'long' (burbot) | 'small'
const SP = {
  perch:     { hh: 15, head: "point", tail: "fork", dorsal: "spiny", top: "#5f7a1f", mid: "#d9a620", belly: "#f6e5a0", fin: "#e8742a", iris: "#f2c14e", mark: "bars", markCol: "#3f4c12", bars: 7 },
  sunfish:   { hh: 19, head: "blunt", tail: "round", dorsal: "spiny", top: "#5c6b2a", mid: "#e0982b", belly: "#ffd27a", fin: "#c9741f", iris: "#f2c14e", mark: "sunfish", markCol: "#2f6d8a" },
  rockbass:  { hh: 16, head: "point", tail: "round", dorsal: "spiny", top: "#4a3a1a", mid: "#8a6a30", belly: "#d9c08a", fin: "#6a4a20", iris: "#d83a2a", mark: "rows", markCol: "#2a1c08" },
  crappie:   { hh: 18, head: "point", tail: "fork", dorsal: "spiny", top: "#4a5a66", mid: "#a9b4bc", belly: "#eef2f5", fin: "#6a7a86", iris: "#e8e8e8", mark: "speckle", markCol: "#1d2a33" },
  bullhead:  { hh: 12, head: "flat", tail: "round", dorsal: "small", top: "#3a3a2c", mid: "#5a5a46", belly: "#d2caa0", fin: "#3a3a2c", iris: "#d8d8d8", mark: "mottle", markCol: "#262620", whiskers: 4 },
  walleye:   { hh: 12, head: "point", tail: "fork", dorsal: "spiny", top: "#55601c", mid: "#c0a648", belly: "#f3e8b8", fin: "#b89a48", iris: "#f0f0e0", mark: "saddles", markCol: "#4e4616", whitetip: true },
  sauger:    { hh: 11, head: "point", tail: "fork", dorsal: "spiny", top: "#4e4c2a", mid: "#9a955c", belly: "#e8e2b8", fin: "#8a8450", iris: "#e8e8d8", mark: "blotch", markCol: "#3a3820", spotdorsal: true },
  pike:      { hh: 10, head: "flat", tail: "round", dorsal: "back", top: "#2f5a1e", mid: "#5d8a3c", belly: "#dbe6aa", fin: "#6d7f3a", iris: "#f2c14e", mark: "beans", markCol: "#e9f0b8", teeth: true },
  catfish:   { hh: 13, head: "flat", tail: "fork", dorsal: "small", top: "#3e4c55", mid: "#5c6a72", belly: "#d9dedc", fin: "#3e4c55", iris: "#c8c8c8", mark: "none", whiskers: 6 },
  goldeye:   { hh: 14, head: "point", tail: "fork", dorsal: "soft", top: "#6b6a46", mid: "#c7b36b", belly: "#fff1c0", fin: "#b9a460", iris: "#f6c531", bigEye: true, mark: "none" },
  carp:      { hh: 16, head: "blunt", tail: "fork", dorsal: "long", top: "#6d4a10", mid: "#b07a2a", belly: "#f2d79a", fin: "#8a5a1a", iris: "#e6c050", mark: "scales", markCol: "#5a3a0a", whiskers: 2 },
  drum:      { hh: 17, head: "point", tail: "round", dorsal: "spiny", top: "#5a5868", mid: "#9c9aa8", belly: "#e9e8f0", fin: "#6c6a7a", iris: "#e0e0e8", mark: "lines", markCol: "#55536a", hump: true },
  sucker:    { hh: 13, head: "blunt", tail: "fork", dorsal: "soft", top: "#4a4a3a", mid: "#7a7a66", belly: "#dcdcc4", fin: "#5a5a48", iris: "#d8d8d8", mark: "none", downMouth: true },
  whitefish: { hh: 13, head: "blunt", tail: "fork", dorsal: "soft", top: "#6c7c88", mid: "#b9c4cc", belly: "#f6f9fb", fin: "#8898a4", iris: "#e8e8f0", mark: "none", adipose: true },
  tullibee:  { hh: 11, head: "point", tail: "fork", dorsal: "soft", top: "#5b6b80", mid: "#a9b7c8", belly: "#f0f5ff", fin: "#7c8ca0", iris: "#e8e8f0", mark: "none", adipose: true },
  burbot:    { hh: 11, head: "flat", tail: "round", dorsal: "long", top: "#3f3320", mid: "#6b5a3a", belly: "#d3c4a4", fin: "#4a3a22", iris: "#d0d0c0", mark: "mottle", markCol: "#2a2010", whiskers: 1, chin: true },
  smallmouth:{ hh: 15, head: "point", tail: "fork", dorsal: "spiny", top: "#3c4a1c", mid: "#7a8a3a", belly: "#e3e8b8", fin: "#5a6a2a", iris: "#d83a2a", mark: "bars", markCol: "#2c3812", bars: 8 },
  laketrout: { hh: 12, head: "point", tail: "deep", dorsal: "soft", top: "#34424a", mid: "#64747e", belly: "#e8eef1", fin: "#4e5e68", iris: "#e8e8e8", mark: "lightspots", markCol: "#dfe8ec", adipose: true },
  brook:     { hh: 13, head: "point", tail: "round", dorsal: "soft", top: "#1f3d28", mid: "#3f6a4a", belly: "#f3c57a", fin: "#e06a2a", iris: "#e8e8e8", mark: "brook", markCol: "#d8e8c0", adipose: true, whiteEdge: true },
  rainbow:   { hh: 13, head: "point", tail: "fork", dorsal: "soft", top: "#4a6a86", mid: "#8fb0c4", belly: "#f4f7fa", fin: "#7a93a8", iris: "#e8e8e8", mark: "rainbow", markCol: "#1d2a33", adipose: true },
  muskie:    { hh: 10, head: "flat", tail: "deep", dorsal: "back", top: "#7c8a4c", mid: "#aeb87e", belly: "#f3f3df", fin: "#d2562a", iris: "#f2c14e", mark: "mbars", markCol: "#34421f", teeth: true, finSpots: "#6e2410" },
  sturgeon:  { hh: 10, head: "sturgeon", tail: "hetero", dorsal: "back", top: "#4a4a52", mid: "#6a6a70", belly: "#d6d6da", fin: "#55555c", iris: "#d0d0d0", mark: "scutes", markCol: "#c9c9cf", whiskers: 4 },
};

const NX = 116, TX = 22, CY = 26;   // nose x, tail-junction x, centre line
function bodyPath(p) {
  const hh = p.hh, px = 62, tj = Math.max(3.5, hh * 0.3);
  let top;
  if (p.head === "flat") top = `M${NX} ${CY} C ${NX - 16} ${CY - hh * 0.35}, ${px + 22} ${CY - hh}, ${px} ${CY - hh}`;
  else if (p.head === "blunt") top = `M${NX} ${CY} C ${NX - 2} ${CY - hh * 0.8}, ${px + 20} ${CY - hh}, ${px} ${CY - hh}`;
  else if (p.head === "sturgeon") top = `M${NX + 2} ${CY + 1} C ${NX - 10} ${CY - hh * 0.5}, ${px + 24} ${CY - hh * 1.05}, ${px} ${CY - hh}`;
  else top = `M${NX} ${CY} C ${NX - 8} ${CY - hh * 0.6}, ${px + 18} ${CY - hh}, ${px} ${CY - hh}`;
  if (p.hump) top = `M${NX} ${CY} C ${NX - 6} ${CY - hh * 0.4}, ${px + 26} ${CY - hh * 1.15}, ${px + 4} ${CY - hh * 1.1} C ${px - 10} ${CY - hh * 1.05}, ${TX + 14} ${CY - tj}, ${TX} ${CY - tj}`;
  else top += ` C ${px - 24} ${CY - hh}, ${TX + 12} ${CY - tj}, ${TX} ${CY - tj}`;
  const bottomHH = hh * (p.head === "flat" || p.head === "sturgeon" ? 0.8 : 0.95);
  const bottom = ` L ${TX} ${CY + tj} C ${TX + 12} ${CY + tj}, ${px - 24} ${CY + bottomHH}, ${px} ${CY + bottomHH} C ${px + 18} ${CY + bottomHH}, ${NX - 6} ${CY + hh * 0.6}, ${NX} ${CY} Z`;
  return top + bottom;
}
function tailPath(p) {
  const hh = p.hh, tj = Math.max(3.5, hh * 0.3);
  if (p.tail === "round") return `M${TX + 2} ${CY - tj} C ${TX - 10} ${CY - hh * 0.9}, ${TX - 18} ${CY - hh * 0.6}, ${TX - 16} ${CY} C ${TX - 18} ${CY + hh * 0.6}, ${TX - 10} ${CY + hh * 0.9}, ${TX + 2} ${CY + tj} Z`;
  if (p.tail === "deep") return `M${TX + 2} ${CY - tj} L ${TX - 18} ${CY - hh * 1.25} L ${TX - 8} ${CY} L ${TX - 18} ${CY + hh * 1.25} L ${TX + 2} ${CY + tj} Z`;
  if (p.tail === "hetero") return `M${TX + 2} ${CY - tj} C ${TX - 6} ${CY - hh * 0.9}, ${TX - 14} ${CY - hh * 1.5}, ${TX - 18} ${CY - hh * 1.4} L ${TX - 9} ${CY + 1} L ${TX - 14} ${CY + hh * 0.9} L ${TX + 2} ${CY + tj} Z`;
  return `M${TX + 2} ${CY - tj} C ${TX - 8} ${CY - hh * 0.8}, ${TX - 14} ${CY - hh * 1.05}, ${TX - 16} ${CY - hh * 1.05} L ${TX - 8} ${CY} L ${TX - 16} ${CY + hh * 1.05} C ${TX - 14} ${CY + hh * 1.05}, ${TX - 8} ${CY + hh * 0.8}, ${TX + 2} ${CY + tj} Z`;
}
function fin(points, col, rays, opacity = 0.92, root = 0) {
  // points: polygon, base first and last; rays fan from the base. root sinks the base into the
  // body (positive = down for a back fin, negative for a belly fin) so no gap shows at the join.
  points = points.map((q, i) => (i === 0 || i === points.length - 1) ? [q[0], q[1] + root] : q);
  const d = "M" + points.map((q) => q.join(" ")).join(" L ") + " Z";
  let r = "";
  if (rays) { const [bx, by] = points[0], [ex, ey] = points[points.length - 1]; for (let i = 1; i <= rays; i++) { const t = i / (rays + 1); const [mx, my] = points[1]; const ax = bx + (ex - bx) * t, ay = by + (ey - by) * t; r += `<line x1="${ax.toFixed(1)}" y1="${ay.toFixed(1)}" x2="${(ax + (mx - ax) * 0.9).toFixed(1)}" y2="${(ay + (my - ay) * 0.9).toFixed(1)}" stroke="rgba(0,0,0,.18)" stroke-width=".7"/>`; } }
  return `<path d="${d}" fill="${col}" opacity="${opacity}" stroke="rgba(0,0,0,.25)" stroke-width=".6" stroke-linejoin="round"/>${r}`;
}
function fins(p, id) {
  const hh = p.hh, px = 62, out = [];
  const top = (x) => CY - hh * (p.hump ? 1.1 : 1) + Math.abs(x - px) * 0.08;    // rough back line
  const bot = (x) => CY + hh * 0.95 - Math.abs(x - px) * 0.08;
  // Dorsal
  if (p.dorsal === "spiny") {
    out.push(fin([[px + 20, top(px + 20)], [px + 10, top(px + 10) - hh * 0.9], [px - 4, top(px - 4) - hh * 0.55], [px - 6, top(px - 6)]], p.fin, 6, 0.92, hh * 0.8));
    out.push(fin([[px - 8, top(px - 8)], [px - 14, top(px - 14) - hh * 0.6], [px - 28, top(px - 28) - hh * 0.3], [px - 30, top(px - 30)]], p.fin, 5, 0.92, hh * 0.8));
  } else if (p.dorsal === "back") {
    out.push(fin([[TX + 26, top(TX + 26)], [TX + 20, top(TX + 20) - hh * 1.1], [TX + 4, top(TX + 4) - hh * 0.5], [TX + 2, top(TX + 2)]], p.fin, 6, 0.92, hh * 0.8));
  } else if (p.dorsal === "long") {
    out.push(fin([[px + 18, top(px + 18)], [px + 10, top(px + 10) - hh * 0.75], [TX + 6, top(TX + 6) - hh * 0.35], [TX + 4, top(TX + 4)]], p.fin, 10, 0.92, hh * 0.8));
  } else if (p.dorsal === "small") {
    out.push(fin([[px + 14, top(px + 14)], [px + 8, top(px + 8) - hh * 0.8], [px - 2, top(px - 2) - hh * 0.3], [px - 4, top(px - 4)]], p.fin, 3, 0.92, hh * 0.8));
  } else {
    out.push(fin([[px + 12, top(px + 12)], [px + 4, top(px + 4) - hh * 0.75], [px - 10, top(px - 10) - hh * 0.35], [px - 12, top(px - 12)]], p.fin, 5, 0.92, hh * 0.8));
  }
  if (p.adipose) out.push(`<path d="M${TX + 16} ${top(TX + 16) + 0.5} q 3 -4 7 -0.5 z" fill="${p.fin}" opacity=".9"/>`);
  // Anal
  if (p.dorsal === "long" || p.chin) out.push(fin([[px - 2, bot(px - 2)], [px - 10, bot(px - 10) + hh * 0.5], [TX + 6, bot(TX + 6) + hh * 0.3], [TX + 4, bot(TX + 4)]], p.fin, 8, 0.92, -hh * 0.8));
  else if (p.dorsal === "back") out.push(fin([[TX + 24, bot(TX + 24)], [TX + 18, bot(TX + 18) + hh * 0.9], [TX + 6, bot(TX + 6) + hh * 0.4], [TX + 4, bot(TX + 4)]], p.fin, 4, 0.92, -hh * 0.8));
  else out.push(fin([[px - 16, bot(px - 16)], [px - 22, bot(px - 22) + hh * 0.6], [px - 32, bot(px - 32) + hh * 0.3], [px - 34, bot(px - 34)]], p.fin, 4, 0.92, -hh * 0.8));
  // Pelvic
  out.push(fin([[px + 2, bot(px + 2) - 1], [px - 6, bot(px - 6) + hh * 0.55], [px - 14, bot(px - 14) + hh * 0.25], [px - 12, bot(px - 12) - 1]], p.fin, 3, 0.92, -hh * 0.8));
  return out.join("\n");
}
function pectoral(p) {
  const hh = p.hh, x = 84, y = CY + hh * 0.2;
  return fin([[x, y], [x - 10, y + hh * 0.75], [x - 20, y + hh * 0.5], [x - 14, y + hh * 0.1]], p.fin, 4, 0.95);
}
function markings(p, id) {
  const hh = p.hh, px = 62, out = [];
  const bodyTop = (x) => CY - hh + Math.abs(x - px) * 0.06;
  if (p.mark === "bars" || p.mark === "mbars") {
    const n = p.bars || 8;
    for (let i = 0; i < n; i++) { const x = 100 - i * (74 / n), h = (i % 2 ? 1.25 : 0.9) * hh * (p.mark === "mbars" ? 1.2 : 1.1), w = p.mark === "mbars" ? 2.6 : 3.4;
      out.push(`<path d="M${x} ${bodyTop(x) + 1} q ${-w} ${h / 2} ${-1.5} ${h}" stroke="${p.markCol}" stroke-width="${w}" stroke-linecap="round" fill="none" opacity=".75"/>`); }
  }
  if (p.mark === "beans") for (let i = 0; i < 14; i++) { const x = 100 - i * 5.6, y = CY + ((i % 3) - 1) * hh * 0.5 + (i % 2) * 1.5; out.push(`<ellipse cx="${x}" cy="${y}" rx="2.8" ry="1.3" fill="${p.markCol}" opacity=".85"/>`); }
  if (p.mark === "saddles") for (let i = 0; i < 5; i++) { const x = 92 - i * 15; out.push(`<path d="M${x} ${bodyTop(x) + 0.5} q -4 ${hh * 0.5} -8 ${hh * 0.9} q 5 -2 10 0 q 3 -${hh * 0.5} -2 -${hh * 0.9} z" fill="${p.markCol}" opacity=".7"/>`); }
  if (p.mark === "blotch") for (let i = 0; i < 6; i++) { const x = 96 - i * 13, y = CY - hh * 0.3 + (i % 2) * hh * 0.5; out.push(`<ellipse cx="${x}" cy="${y}" rx="5" ry="${hh * 0.32}" fill="${p.markCol}" opacity=".6"/>`); }
  if (p.mark === "rows") for (let r = 0; r < 4; r++) for (let i = 0; i < 9; i++) { const x = 98 - i * 7.4, y = CY - hh * 0.5 + r * hh * 0.38; out.push(`<circle cx="${x}" cy="${y}" r="1.1" fill="${p.markCol}" opacity=".8"/>`); }
  if (p.mark === "speckle" || p.mark === "rainbow") for (let i = 0; i < 40; i++) { const x = 30 + ((i * 37) % 76), y = CY - hh * 0.95 + ((i * 53) % 100) / 100 * hh * (p.mark === "rainbow" ? 1.0 : 1.7); out.push(`<circle cx="${x}" cy="${y.toFixed(1)}" r="${(0.7 + (i % 3) * 0.35).toFixed(2)}" fill="${p.markCol}" opacity=".7"/>`); }
  if (p.mark === "rainbow") out.push(`<path d="M${TX + 6} ${CY + 1} Q 70 ${CY - 1} ${NX - 14} ${CY + 2}" stroke="#e06a8a" stroke-width="${hh * 0.45}" stroke-linecap="round" fill="none" opacity=".55"/>`);
  if (p.mark === "lightspots") for (let i = 0; i < 46; i++) { const x = 28 + ((i * 41) % 80), y = CY - hh * 0.9 + ((i * 59) % 100) / 100 * hh * 1.6; out.push(`<circle cx="${x}" cy="${y.toFixed(1)}" r="${(0.9 + (i % 2) * 0.5).toFixed(2)}" fill="${p.markCol}" opacity=".8"/>`); }
  if (p.mark === "brook") { for (let i = 0; i < 9; i++) { const x = 96 - i * 8; out.push(`<path d="M${x} ${bodyTop(x) + 0.8} q 2 2 -1 4 q -2 2 1 4" stroke="${p.markCol}" stroke-width="1" fill="none" opacity=".8"/>`); }
    for (let i = 0; i < 9; i++) { const x = 92 - i * 8.2, y = CY + ((i % 2) * 2 - 1) * hh * 0.25; out.push(`<circle cx="${x}" cy="${y}" r="1.7" fill="#7fb4e6" opacity=".9"/><circle cx="${x}" cy="${y}" r="1" fill="#e23c2c"/>`); } }
  if (p.mark === "sunfish") { for (let i = 0; i < 5; i++) out.push(`<path d="M${104 - i * 2} ${CY - 6 + i * 3} q -6 1 -10 ${i % 2 ? 2 : -1}" stroke="${p.markCol}" stroke-width="1.2" fill="none" opacity=".8"/>`);
    out.push(`<ellipse cx="${88}" cy="${CY - 3}" rx="3.2" ry="2.2" fill="#111"/><ellipse cx="${87}" cy="${CY - 3}" rx="1.6" ry="1.2" fill="#c0392b" opacity=".8"/>`);
    for (let i = 0; i < 24; i++) { const x = 34 + ((i * 29) % 60), y = CY - hh * 0.8 + ((i * 47) % 100) / 100 * hh * 1.6; out.push(`<circle cx="${x}" cy="${y.toFixed(1)}" r=".9" fill="#7a3a10" opacity=".55"/>`); } }
  if (p.mark === "mottle") for (let i = 0; i < 26; i++) { const x = 28 + ((i * 43) % 80), y = CY - hh * 0.9 + ((i * 61) % 100) / 100 * hh * 1.5; out.push(`<ellipse cx="${x}" cy="${y.toFixed(1)}" rx="${(2 + (i % 3)).toFixed(1)}" ry="${(1.2 + (i % 2)).toFixed(1)}" fill="${p.markCol}" opacity=".45"/>`); }
  if (p.mark === "lines") for (let i = 0; i < 9; i++) { const x = 96 - i * 8; out.push(`<path d="M${x} ${bodyTop(x) + 1} q -2 ${hh * 0.9} -3 ${hh * 1.6}" stroke="${p.markCol}" stroke-width=".9" fill="none" opacity=".5"/>`); }
  if (p.mark === "scales") for (let r = 0; r < 4; r++) for (let i = 0; i < 10; i++) { const x = 100 - i * 7.2 - (r % 2) * 3.6, y = CY - hh * 0.6 + r * hh * 0.4; out.push(`<path d="M${x - 3} ${y} a 3 3 0 0 0 6 0" stroke="${p.markCol}" stroke-width=".9" fill="none" opacity=".6"/>`); }
  if (p.mark === "scutes") { for (let i = 0; i < 9; i++) { const x = 98 - i * 8.4; out.push(`<path d="M${x} ${bodyTop(x) + 1.2} l 2.4 3 l -4.8 0 z" fill="${p.markCol}"/><path d="M${x} ${CY - 1} l 2 2.2 l -4 0 z" fill="${p.markCol}" opacity=".9"/><path d="M${x + 4} ${CY + hh * 0.55} l 1.8 2 l -3.6 0 z" fill="${p.markCol}" opacity=".8"/>`); } }
  return out.join("\n");
}
function head(p) {
  const hh = p.hh, out = [];
  const ex = p.head === "flat" || p.head === "sturgeon" ? 96 : 98, ey = CY - hh * (p.head === "flat" ? 0.35 : 0.3), er = p.bigEye ? 4.2 : Math.max(2.4, hh * 0.22);
  // Gill plate
  const gx = p.head === "flat" ? 86 : 88;
  out.push(`<path d="M${gx} ${CY - hh * 0.85} q -6 ${hh * 0.85} 0 ${hh * 1.7}" stroke="rgba(0,0,0,.28)" stroke-width="1.2" fill="none"/>`);
  if (p.head === "sturgeon") {
    out.push(`<path d="M${NX + 2} ${CY + 1} L ${NX - 10} ${CY - 3} L ${NX - 10} ${CY + 5} Z" fill="rgba(0,0,0,.15)"/>`);
    for (let i = 0; i < 4; i++) out.push(`<line x1="${NX - 6 - i * 2.2}" y1="${CY + 4}" x2="${NX - 6 - i * 2.2}" y2="${CY + 10}" stroke="#3a3a40" stroke-width="1"/>`);
  }
  // Mouth
  if (p.downMouth) out.push(`<path d="M${NX - 1} ${CY + 3} q -4 3 -8 2" stroke="rgba(0,0,0,.6)" stroke-width="1.2" fill="none" stroke-linecap="round"/>`);
  else if (p.head === "flat") out.push(`<path d="M${NX - 1} ${CY + 0.5} L ${NX - 20} ${CY + hh * 0.45}" stroke="rgba(0,0,0,.6)" stroke-width="1.2" stroke-linecap="round"/>`);
  else out.push(`<path d="M${NX - 1} ${CY + 0.5} q -5 1 -8 ${hh * 0.35}" stroke="rgba(0,0,0,.6)" stroke-width="1.2" fill="none" stroke-linecap="round"/>`);
  if (p.teeth) for (let i = 0; i < 5; i++) { const x = NX - 4 - i * 3.6, y = CY + 0.6 + i * (hh * 0.09); out.push(`<path d="M${x} ${y} l -0.9 -2.6 l 1.8 0 z" fill="#fff"/>`); }
  // Whiskers
  if (p.whiskers) { const n = p.whiskers; for (let i = 0; i < n; i++) { const side = i % 2 ? 1 : -1, k = Math.floor(i / 2); const x0 = p.head === "sturgeon" ? NX - 8 : NX - 4 - k * 3, y0 = p.head === "sturgeon" ? CY + 6 : CY + 1 + k * 1.5;
    out.push(`<path d="M${x0} ${y0} q ${side * 6 + 4} ${4 + k * 3} ${side * 10 + 6} ${8 + k * 2}" stroke="rgba(20,20,20,.75)" stroke-width="1" fill="none" stroke-linecap="round"/>`); } }
  if (p.chin) out.push(`<path d="M${NX - 10} ${CY + hh * 0.75} q 0 5 -2 7" stroke="rgba(20,20,20,.75)" stroke-width="1.2" fill="none" stroke-linecap="round"/>`);
  // Eye
  out.push(`<circle cx="${ex}" cy="${ey}" r="${er}" fill="${p.iris}"/><circle cx="${ex}" cy="${ey}" r="${er}" fill="none" stroke="rgba(0,0,0,.5)" stroke-width=".6"/><circle cx="${ex + 0.4}" cy="${ey}" r="${er * 0.5}" fill="#111"/><circle cx="${ex + er * 0.35}" cy="${ey - er * 0.35}" r="${er * 0.25}" fill="#fff"/>`);
  return out.join("\n");
}
function svgFor(id, p) {
  const hh = p.hh, body = bodyPath(p), tail = tailPath(p);
  const whiteTip = p.whitetip ? `<path d="M${TX - 16} ${CY + hh * 1.05} C ${TX - 14} ${CY + hh * 1.05}, ${TX - 10} ${CY + hh * 0.8}, ${TX - 4} ${CY + hh * 0.4} L ${TX - 9} ${CY + hh * 0.95} Z" fill="#fff" opacity=".9"/>` : "";
  const finSpots = p.finSpots ? [[TX + 14, CY - hh * 1.6], [TX + 10, CY - hh * 1.2], [TX + 14, CY + hh * 1.3], [TX - 12, CY - hh * 0.6], [TX - 12, CY + hh * 0.6], [TX - 8, CY]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="1.1" fill="${p.finSpots}"/>`).join("") : "";
  const whiteEdge = p.whiteEdge ? `<path d="M${62 + 2} ${CY + hh * 0.95 - 1} L ${62 - 6} ${CY + hh * 0.95 + hh * 0.55}" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/><path d="M${84} ${CY + hh * 0.2} L ${84 - 10} ${CY + hh * 0.2 + hh * 0.75}" stroke="#fff" stroke-width="1.4" stroke-linecap="round"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 52" width="120" height="52">
<!-- ${id}: generated by scripts/art/fish.mjs. Replace with hand-made art of the same box (fish spans x 4 to 116, facing right). -->
<defs>
  <linearGradient id="${id}-body" x1="0" y1="${CY - hh}" x2="0" y2="${CY + hh}" gradientUnits="userSpaceOnUse">
    <stop offset="0" stop-color="${p.top}"/><stop offset=".45" stop-color="${p.mid}"/><stop offset=".72" stop-color="${p.belly}"/><stop offset="1" stop-color="${p.belly}"/>
  </linearGradient>
  <pattern id="${id}-scale" width="4" height="3" patternUnits="userSpaceOnUse"><path d="M0 1.5 a2 2 0 0 0 4 0" fill="none" stroke="rgba(0,0,0,.14)" stroke-width=".5"/></pattern>
  <clipPath id="${id}-clip"><path d="${body}"/></clipPath>
</defs>
<!-- back fins, tail -->
${fins(p, id)}
<path d="${tail}" fill="${p.fin}" stroke="rgba(0,0,0,.25)" stroke-width=".6" stroke-linejoin="round"/>
${[0.25, 0.5, 0.75].map((t) => `<line x1="${TX + 1}" y1="${CY}" x2="${TX - 15}" y2="${(CY - hh * 1.0 + hh * 2.0 * t).toFixed(1)}" stroke="rgba(0,0,0,.18)" stroke-width=".7"/>`).join("")}
${whiteTip}${finSpots}
<!-- body -->
<path d="${body}" fill="url(#${id}-body)" stroke="rgba(0,0,0,.35)" stroke-width=".8" stroke-linejoin="round"/>
<g clip-path="url(#${id}-clip)">
  <rect x="0" y="0" width="120" height="52" fill="url(#${id}-scale)" opacity=".9"/>
  ${markings(p, id)}
  <path d="M${NX - 14} ${CY - hh * 0.75} Q 70 ${CY - hh * 0.95} ${TX + 10} ${CY - hh * 0.5}" stroke="rgba(255,255,255,.35)" stroke-width="1.6" fill="none" stroke-linecap="round"/>
</g>
${head(p)}
${pectoral(p)}
</svg>
`;
}
const manifest = {};
for (const [id, p] of Object.entries(SP)) { writeFileSync(join(dir, `${id}.svg`), svgFor(id, p)); manifest[id] = { len: 0.93 }; }
writeFileSync(join(dir, "manifest.part.json"), JSON.stringify(manifest, null, 1));
console.log("wrote", Object.keys(SP).length, "fish");
