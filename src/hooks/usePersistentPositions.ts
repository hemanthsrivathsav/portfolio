import { useEffect, useState } from "react";

export type XY = { x: number; y: number };
export type Positions = Record<string, XY>;

export function usePersistentPositions(key: string) {
  const [positions, setPositions] = useState<Positions>({});
  useEffect(() => {
    try {
      const saved = localStorage.getItem(key);
      if (saved) setPositions(JSON.parse(saved));
    } catch {}
  }, [key]);
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(positions));
    } catch {}
  }, [key, positions]);
  return [positions, setPositions] as const;
}