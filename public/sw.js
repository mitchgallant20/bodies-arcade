/* Bodie's Arcade service worker. Offline first (HANDOFF Section 2, rule 7).
   Precaches the shell, both play pages, fonts and icons on install, then keeps every
   same-origin file it has served fresh in the background. Nothing from /api/ is cached. */
const VERSION = "arcade-v1";
const SHELL = [
  "./", "./arcade/", "./reading/", "./dad/", "./offline/",
  "./play/purple-turtles.html", "./play/bodies-books.html",
  "./manifest.webmanifest",
  "./fonts/fonts.css",
  "./fonts/fredoka-500-latin.woff2", "./fonts/fredoka-600-latin.woff2", "./fonts/fredoka-700-latin.woff2",
  "./fonts/lexend-500-latin.woff2", "./fonts/lexend-700-latin.woff2", "./fonts/press-start-2p-400-latin.woff2",
  "./icons/icon.svg", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(VERSION).then((cache) => cache.addAll(SHELL)).then(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return; // fonts and icons are local; nothing else to cache
  if (url.pathname.includes("/api/")) return; // AI routes are never cached

  if (request.mode === "navigate") {
    // Pages: network first so updates land, cache second, offline page last.
    event.respondWith(
      fetch(request)
        .then((res) => { putCopy(request, res.clone()); return res; })
        .catch(async () => (await caches.match(request)) || (await caches.match("./offline/")) || Response.error()),
    );
    return;
  }

  // Everything else (chunks, fonts, play pages fetched by script): cache first, refresh in the background.
  event.respondWith(
    caches.match(request).then((cached) => {
      const refresh = fetch(request).then((res) => { putCopy(request, res.clone()); return res; }).catch(() => cached);
      return cached || refresh;
    }),
  );
});

function putCopy(request, response) {
  if (!response || !response.ok) return;
  caches.open(VERSION).then((cache) => cache.put(request, response)).catch(() => {});
}
