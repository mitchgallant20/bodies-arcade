// Writes art/big-catch/bodie/<pose>.svg: one character, seven poses. 1 unit = 1 world pixel;
// the game draws him 64 wide by 72 tall with his boots on the dock at feet=[32,70]. The rod and
// line are drawn by the game from the "hand" anchor, so no rod here. Edit the shapes below or
// replace any pose with a hand-made SVG or PNG of the same name; the manifest keeps the anchors.
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const dir = join(root, "art", "big-catch", "bodie");
mkdirSync(dir, { recursive: true });

const C = { skin: "#f3c9a2", skinDk: "#d9a67c", hair: "#3a2415", toque: "#d6413a", toqueDk: "#a8302a", pom: "#fff8ee",
  jacket: "#2458b8", jacketDk: "#163d8a", stripe: "#ffffff", pants: "#2c3764", pantsDk: "#1d2548", boot: "#232323", sole: "#555", cheek: "rgba(230,110,110,.45)" };

// Arm: from shoulder (sx,sy) toward hand (hx,hy); sleeve plus a mitten.
function arm(sx, sy, hx, hy, w = 7, front = true) {
  const col = front ? C.jacket : C.jacketDk;
  return `<line x1="${sx}" y1="${sy}" x2="${hx}" y2="${hy}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>
<circle cx="${hx}" cy="${hy}" r="${w / 2 + 0.6}" fill="${C.skin}"/>`;
}
function legs(crouch) {
  // Straight legs, or bent knees when he is dug in on a fish
  if (!crouch) return `
<rect x="22" y="46" width="9" height="20" rx="3" fill="${C.pantsDk}"/>
<rect x="32" y="46" width="9" height="20" rx="3" fill="${C.pants}"/>
<rect x="20" y="63" width="12" height="7" rx="2.5" fill="${C.boot}"/><rect x="20" y="68" width="12" height="2" fill="${C.sole}"/>
<rect x="32" y="63" width="12" height="7" rx="2.5" fill="${C.boot}"/><rect x="32" y="68" width="12" height="2" fill="${C.sole}"/>`;
  return `
<path d="M24 50 L17 60 L22 66" stroke="${C.pantsDk}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<path d="M38 50 L45 60 L40 66" stroke="${C.pants}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
<rect x="14" y="63" width="13" height="7" rx="2.5" fill="${C.boot}"/><rect x="14" y="68" width="13" height="2" fill="${C.sole}"/>
<rect x="36" y="63" width="13" height="7" rx="2.5" fill="${C.boot}"/><rect x="36" y="68" width="13" height="2" fill="${C.sole}"/>`;
}
function torsoAndHead(face, lean) {
  // lean rotates the upper body about the hips (32,48)
  return `<g transform="rotate(${lean} 32 48)">
<rect x="19" y="27" width="26" height="23" rx="6" fill="${C.jacket}"/>
<rect x="19" y="27" width="8" height="23" rx="6" fill="${C.jacketDk}" opacity=".55"/>
<rect x="19" y="36" width="26" height="4" fill="${C.stripe}"/>
<line x1="35" y1="29" x2="35" y2="48" stroke="${C.jacketDk}" stroke-width="1.2"/>
<rect x="26" y="25" width="12" height="5" rx="2" fill="${C.jacketDk}"/>
<!-- head -->
<rect x="20" y="9" width="25" height="20" rx="8" fill="${C.skin}"/>
<rect x="20" y="9" width="7" height="20" rx="8" fill="${C.skinDk}" opacity=".35"/>
<path d="M20 15 Q22 10 30 10 Q40 9 45 15 L45 12 Q40 6 32 6 Q24 6 20 12 Z" fill="${C.hair}"/>
<rect x="18" y="3" width="29" height="10" rx="5" fill="${C.toque}"/>
<rect x="18" y="3" width="9" height="10" rx="5" fill="${C.toqueDk}" opacity=".5"/>
<rect x="18" y="10" width="29" height="4" rx="1.5" fill="${C.pom}"/>
<circle cx="33" cy="3" r="3.6" fill="${C.pom}"/>
${face}
</g>`;
}
const faces = {
  calm: `<circle cx="31" cy="19" r="1.6" fill="#222"/><circle cx="40" cy="19" r="1.6" fill="#222"/><circle cx="31.6" cy="18.4" r=".5" fill="#fff"/><circle cx="40.6" cy="18.4" r=".5" fill="#fff"/>
<path d="M34 24 Q37.5 26.5 41 24" stroke="#5a2a1a" stroke-width="1.3" fill="none" stroke-linecap="round"/><ellipse cx="42" cy="22" rx="2.2" ry="1.2" fill="${C.cheek}"/>`,
  focus: `<circle cx="31" cy="19" r="1.6" fill="#222"/><circle cx="40" cy="19" r="1.6" fill="#222"/><path d="M29 16 L33 17 M38 17 L42 16" stroke="#3a2415" stroke-width="1.2" stroke-linecap="round"/>
<path d="M35 24.5 L41 24.5" stroke="#5a2a1a" stroke-width="1.3" stroke-linecap="round"/>`,
  wow: `<circle cx="31" cy="19" r="2.2" fill="#222"/><circle cx="40" cy="19" r="2.2" fill="#222"/><circle cx="31.8" cy="18.2" r=".7" fill="#fff"/><circle cx="40.8" cy="18.2" r=".7" fill="#fff"/>
<ellipse cx="38" cy="25" rx="2.2" ry="2.6" fill="#5a2a1a"/><ellipse cx="42" cy="22" rx="2.2" ry="1.2" fill="${C.cheek}"/>`,
  grit: `<circle cx="31" cy="19" r="1.6" fill="#222"/><circle cx="40" cy="19" r="1.6" fill="#222"/><path d="M29 16.5 L33 17.5 M38 17.5 L42 16.5" stroke="#3a2415" stroke-width="1.4" stroke-linecap="round"/>
<rect x="34" y="23.5" width="7" height="2.4" rx="1" fill="#fff" stroke="#5a2a1a" stroke-width=".8"/>`,
  joy: `<path d="M29 19.5 Q31 17 33 19.5 M38 19.5 Q40 17 42 19.5" stroke="#222" stroke-width="1.6" fill="none" stroke-linecap="round"/>
<path d="M33 23.5 Q37.5 28.5 42 23.5 Z" fill="#5a2a1a"/><path d="M34.5 24.2 Q37.5 26 40.5 24.2 Z" fill="#f66"/><ellipse cx="43" cy="22" rx="2.2" ry="1.2" fill="${C.cheek}"/><ellipse cx="28" cy="22" rx="2" ry="1.1" fill="${C.cheek}"/>`,
};

// pose: lean (deg), crouch, face, front hand, back hand (null = hangs down), hand = rod anchor
const POSES = {
  idle:   { lean: 0,  crouch: false, face: "calm",  front: [46, 44], back: [23, 46], hand: [46, 44] },
  charge: { lean: -8, crouch: false, face: "focus", front: [45, 31], back: [27, 19], hand: [27, 19] },
  cast:   { lean: 8,  crouch: false, face: "focus", front: [55, 28], back: [22, 44], hand: [55, 28] },
  wait:   { lean: 0,  crouch: false, face: "calm",  front: [50, 38], back: [23, 46], hand: [50, 38] },
  bite:   { lean: 2,  crouch: false, face: "wow",   front: [51, 33], back: [20, 40], hand: [51, 33] },
  fight:  { lean: -9, crouch: true,  face: "grit",  front: [50, 35], back: [45, 40], hand: [50, 35] },
  cheer:  { lean: 0,  crouch: false, face: "joy",   front: [50, 13], back: [16, 13], hand: [50, 13] },
};

const anchors = {};
for (const [name, p] of Object.entries(POSES)) {
  const shoulderF = [41, 32], shoulderB = [23, 32];
  // Shoulders move with the lean; approximate by rotating them about the hips
  const rot = (pt) => { const a = p.lean * Math.PI / 180, cx = 32, cy = 48; const dx = pt[0] - cx, dy = pt[1] - cy; return [cx + dx * Math.cos(a) - dy * Math.sin(a), cy + dx * Math.sin(a) + dy * Math.cos(a)]; };
  const sf = rot(shoulderF), sb = rot(shoulderB);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 72" width="64" height="72">
<!-- Bodie, ${name}. Generated by scripts/art/bodie-poses.mjs; safe to replace with hand-made art of the same size. -->
${arm(sb[0], sb[1], p.back[0], p.back[1], 7, false)}
${legs(p.crouch)}
${torsoAndHead(faces[p.face], p.lean)}
${arm(sf[0], sf[1], p.front[0], p.front[1], 7, true)}
</svg>
`;
  writeFileSync(join(dir, `${name}.svg`), svg);
  anchors[name] = { feet: [32, 70], hand: p.hand };
}
writeFileSync(join(dir, "anchors.json"), JSON.stringify(anchors, null, 1));
console.log("wrote", Object.keys(POSES).length, "poses");
