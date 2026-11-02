// Thin, safe localStorage access. Phase 1 reads the legacy apps' own keys
// (bb:* from Bodie's Books, bpt_* from Purple Turtles). Dexie replaces this in Phase 2.
const ok = () => typeof window !== "undefined" && "localStorage" in window;

export function getItem(key: string): string | null {
  try { return ok() ? window.localStorage.getItem(key) : null; } catch { return null; }
}
export function setItem(key: string, value: string): void {
  try { if (ok()) window.localStorage.setItem(key, value); } catch { /* storage blocked: ignore */ }
}
export function removeItem(key: string): void {
  try { if (ok()) window.localStorage.removeItem(key); } catch { /* ignore */ }
}
export function getJSON<T>(key: string, fallback: T): T {
  const raw = getItem(key);
  if (raw === null) return fallback;
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}
export function keysWithPrefix(prefix: string): string[] {
  try {
    if (!ok()) return [];
    const out: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(prefix)) out.push(k);
    }
    return out;
  } catch { return []; }
}
