import { useEffect, useState } from "react";

// Storage can throw (private mode, quota, blocked cookies); persistence is best-effort everywhere.
export function readStorage(key: string): unknown {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? undefined : JSON.parse(raw);
  } catch {
    return undefined;
  }
}

export function writeStorage(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

/** `useState` mirrored to localStorage. Stored values that fail `isValid` are ignored. */
export function useLocalStorageState<T>(key: string, fallback: T, isValid: (v: unknown) => v is T) {
  const [value, setValue] = useState<T>(() => {
    const stored = readStorage(key);
    return isValid(stored) ? stored : fallback;
  });

  useEffect(() => writeStorage(key, value), [key, value]);

  return [value, setValue] as const;
}
