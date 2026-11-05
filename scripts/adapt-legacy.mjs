// Builds public/play/*.html from legacy/*.html. The legacy files are the read-only
// source of truth (docs/HANDOFF.md, Section 3); this script only wraps them as
// standalone pages, swaps Google Fonts for the self-hosted copies, and adds a way home.
// Runs automatically before `next build` (see package.json "prebuild").
import { existsSync, readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const src = join(root, "legacy");
const out = join(root, "public", "play");
mkdirSync(out, { recursive: true });

// New books live in content/books/*.js (one book per file, same shape as the legacy BOOKS and
// LEVEL2 entries, pushed onto those arrays). They are inlined into Bodie's Books right before
// ALL is built, so the page's art kit is in scope. The legacy file itself stays untouched.
const booksDir = join(root, "content", "books");
const extraBooks = existsSync(booksDir)
  ? readdirSync(booksDir).filter((f) => f.endsWith(".js")).sort()
      .map((f) => {
        const js = readFileSync(join(booksDir, f), "utf8");
        if (/<\/script/i.test(js)) throw new Error(`content/books/${f}: must not contain </script>`);
        return `\n/* ---- content/books/${f} ---- */\n${js}`;
      }).join("")
  : "";

const head = (themeColor) => `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<meta name="theme-color" content="${themeColor}">
<meta name="robots" content="noindex, nofollow">
<link rel="manifest" href="../manifest.webmanifest">
<link rel="apple-touch-icon" href="../icons/apple-touch-icon.png">
<link rel="icon" href="../icons/icon.svg" type="image/svg+xml">
<link rel="stylesheet" href="../fonts/fonts.css">
<style>
html{padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
[hidden]{display:none!important}
img{max-width:100%}
a.btn{text-decoration:none;display:inline-flex;align-items:center;justify-content:center}
#title a[data-home]{position:absolute;left:10px;bottom:10px;min-height:0;padding:7px 11px;font-size:8px;line-height:1;z-index:2}
.ba-home{display:inline-flex;align-items:center;gap:6px;min-height:36px;padding:6px 14px;border-radius:999px;
  background:var(--panel,#241a56);color:inherit;border:2px solid var(--line,#4a35a8);font:600 15px/1 var(--display,Fredoka,sans-serif);
  text-decoration:none;margin:0 0 10px;touch-action:manipulation}
.ba-home:focus-visible{outline:3px solid var(--accent,#ff4a3d);outline-offset:2px}
</style>
`;

const homeScript = `<script>
(function(){
  // Back to the arcade shell. history.back() keeps the installed app's stack intact;
  // the href is the fallback when the play page was opened directly.
  var links=document.querySelectorAll('[data-home]');
  for(var i=0;i<links.length;i++)links[i].addEventListener('click',function(e){
    if(history.length>1&&document.referrer){e.preventDefault();history.back();}
  });
})();
</script>
`;

function wrap(name, themeColor, transform, extraCss = "") {
  let html = readFileSync(join(src, name), "utf8");
  html = html.replace(/<link rel="preconnect"[^>]*>\s*/g, "");
  html = html.replace(/<link rel="stylesheet" href="https:\/\/fonts\.googleapis\.com[^"]*">\s*/g, "");
  if (html.includes("fonts.googleapis.com")) throw new Error(`${name}: Google Fonts link still present`);
  const cut = html.indexOf("</style>") + "</style>".length;
  const headPart = html.slice(0, cut) + (extraCss ? `\n<style>\n${extraCss}\n</style>` : "");
  const bodyPart = transform(html.slice(cut));
  const page = `${head(themeColor)}${headPart}\n</head>\n<body>${bodyPart}\n${homeScript}</body>\n</html>\n`;
  writeFileSync(join(out, name), page);
  console.log(`play/${name} ${(page.length / 1024).toFixed(0)} KB`);
}

function mustReplace(body, pattern, replacement, what) {
  const next = body.replace(pattern, replacement);
  if (next === body) throw new Error(`${what}: pattern not found in legacy file`);
  return next;
}

wrap("purple-turtles.html", "#150f30", (body) => {
  // Title screen and pause sheet get a HOME button; the grown-up notes point at Dad's Corner.
  body = mustReplace(body, /(<span class="best" id="bestTitle"><\/span>)/,
    `$1\n        <a class="btn ghost" href="../" data-home>HOME</a>`, "title HOME button");
  body = mustReplace(body, /(<button class="btn ghost" id="titleBtn" type="button">TITLE<\/button>)/,
    `$1\n            <a class="btn ghost" href="../" data-home>HOME</a>`, "pause HOME button");
  body = mustReplace(body, /<p class="fine">Based on Purple Turtles[\s\S]*?<\/p>/,
    `<p class="fine">Based on Purple Turtles (Quicksilva, 1983, Commodore 64). Grown-ups: scores, settings and the reading guide live in <a href="../dad/" style="color:inherit">Dad's Corner</a>.</p>`,
    "grown-up note");
  return body;
});

wrap("bodies-books.html", "#eaf2f8", (body) => {
  body = mustReplace(body, /(<div class="lib-head">)/,
    `$1\n      <a class="ba-home" href="../" data-home aria-label="Back to Bodie's Arcade">&#8962; Arcade</a>`, "shelf home link");
  // Hash deep links to shelf tabs (l1, l2, game, cards, guide) alongside the existing book ids.
  body = mustReplace(body, "else if(findBook(h))openBook(h);",
    "else if(findBook(h))openBook(h);\n  else if(NOTES[h])setTab(h);", "tab deep link");
  // Level 3 shelf: a third tab, its note, a LEVEL3 array for content/books to push onto,
  // the level badge and reader class for any level, and a wider ALL.
  body = mustReplace(body, /(<button class="tab" role="tab" id="tab-l2"[^>]*>Level 2<\/button>)/,
    `$1\n      <button class="tab" role="tab" id="tab-l3" data-tab="l3" aria-selected="false">Level 3</button>`, "Level 3 tab");
  body = mustReplace(body, "l2:'The same stories, with more words on each page. Try the Level 1 book first as a warm up.',",
    "l2:'The same stories, with more words on each page. Try the Level 1 book first as a warm up.',l3:'All new stories, with a few sentences on every page. Read one together first, then try it on your own.',",
    "Level 3 note");
  body = mustReplace(body, "shelf.innerHTML=(tab==='l2'?LEVEL2:BOOKS).map(",
    "shelf.innerHTML=(tab==='l3'?LEVEL3:tab==='l2'?LEVEL2:BOOKS).map(", "Level 3 shelf");
  body = mustReplace(body, "(b.level===2?'<span class=\"lvl\">LEVEL 2</span>':'')",
    "(b.level>=2?'<span class=\"lvl\">LEVEL '+b.level+'</span>':'')", "level badge");
  body = mustReplace(body, "(b.level===2?'Big words I read':'Words I can read')",
    "(b.level>=2?'Big words I read':'Words I can read')", "done label");
  body = mustReplace(body, "reader.classList.toggle('l2',b.level===2);",
    "reader.classList.toggle('l2',b.level===2);reader.classList.toggle('l3',b.level===3);", "reader level class");
  // Extra books from content/books/, inlined before ALL so findBook and the shelves see them.
  // A function replacement keeps "$" in the book source literal.
  body = mustReplace(body, "var ALL=BOOKS.concat(LEVEL2);",
    () => `var LEVEL3=[];${extraBooks}\nvar ALL=BOOKS.concat(LEVEL2,LEVEL3);`, "extra books hook");
  return body;
}, `/* Level 3 reader: a few sentences a page, so the picture gives up a little height and the type steps down one notch. */
#reader.l3 .txt{align-items:flex-start}
#reader.l3 .txt p{font:500 clamp(19px,4.8vw,28px)/1.5 var(--body);max-width:34ch;text-wrap:pretty;margin:auto 0}
#reader.l3 .art{width:min(100%,calc(30vh * 400 / 260))}
/* Six tabs no longer fit one row on an iPhone; let them wrap instead of clipping "Guide". */
@media (max-width:430px){.tabs{flex-wrap:wrap;border-radius:24px}.tab{flex:1 1 auto}}`);
