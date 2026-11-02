"use client";
import { useEffect } from "react";
import { withBase } from "@/lib/base";

/** Registers the offline service worker (public/sw.js) in production builds. */
export default function RegisterSw() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register(withBase("/sw.js"), { scope: withBase("/") }).catch(() => {});
  }, []);
  return null;
}
