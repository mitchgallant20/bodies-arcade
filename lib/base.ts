/** Path prefix the app is hosted under ("" on Vercel, "/bodies-arcade" on GitHub Pages). */
export const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Prefix a root-relative path for plain <a>, manifest and asset URLs (next/link does this itself). */
export const withBase = (path: string): string => `${BASE}${path}`;
