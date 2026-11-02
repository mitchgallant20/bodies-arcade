"use client";
import { useRef, useSyncExternalStore } from "react";

const noop = () => () => {};

/**
 * Reads a browser-only value (localStorage, navigator) once on the client.
 * Returns null during prerender and hydration, then the value. Bump `version` to re-read.
 */
export function useClientValue<T>(read: () => T, version = 0): T | null {
  const ref = useRef<{ version: number; value: T } | null>(null);
  return useSyncExternalStore(
    noop,
    () => {
      if (!ref.current || ref.current.version !== version) ref.current = { version, value: read() };
      return ref.current.value;
    },
    () => null,
  );
}
