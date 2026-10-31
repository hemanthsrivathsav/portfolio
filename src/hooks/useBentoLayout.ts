import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { readStorage, useLocalStorageState, writeStorage } from "./useLocalStorageState";

export type XY = { x: number; y: number };
export type Positions = Record<string, XY>;
/** Box of each item as laid out by the CSS grid, relative to the board. */
export type Baseline = Record<string, XY & { w: number; h: number }>;

const LAYOUT_KEY = "bento-layout-v2";
const SAVED_LAYOUT_KEY = "bento-layout-saved-v2";

const isPositions = (v: unknown): v is Positions => typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * Lets the CSS grid place the bento items, measures where they landed, then switches them to absolute
 * positioning so they can be dragged around. Re-measures whenever the board's width changes.
 * When `enabled` is false (touch devices) the grid is left alone.
 */
export function useBentoLayout(enabled: boolean) {
  const boardRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useLocalStorageState<Positions>(LAYOUT_KEY, {}, isPositions);
  const [baseline, setBaseline] = useState<Baseline>({});
  const [boardSize, setBoardSize] = useState({ w: 0, h: 0 });
  const [abs, setAbs] = useState(false);

  const capture = useCallback(() => {
    const board = boardRef.current;
    // Only meaningful while items are still in grid flow.
    if (!board || board.dataset.abs === "true") return;
    const next: Baseline = {};
    for (const el of board.querySelectorAll<HTMLElement>(":scope > [data-key]")) {
      next[el.dataset.key!] = { x: el.offsetLeft, y: el.offsetTop, w: el.offsetWidth, h: el.offsetHeight };
    }
    setBaseline(next);
    setBoardSize({ w: board.clientWidth, h: board.offsetHeight });
    setAbs(true);
  }, []);

  const remeasure = useCallback(() => {
    flushSync(() => setAbs(false));
    capture();
  }, [capture]);

  useLayoutEffect(() => {
    const container = boardRef.current?.parentElement;
    if (!enabled || !container) return;
    capture();

    let width = container.clientWidth;
    let raf = 0;
    const ro = new ResizeObserver(() => {
      // Height changes are caused by our own re-layout; only width affects the grid.
      if (container.clientWidth === width) return;
      width = container.clientWidth;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(remeasure);
    });
    ro.observe(container);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [enabled, capture, remeasure]);

  /** Restores the saved layout, or the original grid if nothing was saved. */
  const resetLayout = useCallback(() => {
    const saved = readStorage(SAVED_LAYOUT_KEY);
    setPositions(isPositions(saved) ? saved : {});
  }, [setPositions]);

  const saveLayout = useCallback(() => {
    const out: Positions = {};
    for (const [key, box] of Object.entries(baseline)) {
      const p = positions[key] ?? box;
      out[key] = { x: Math.round(p.x), y: Math.round(p.y) };
    }
    writeStorage(SAVED_LAYOUT_KEY, out);
  }, [baseline, positions]);

  return { boardRef, positions, setPositions, baseline, boardSize, abs, resetLayout, saveLayout };
}

export type BentoLayout = ReturnType<typeof useBentoLayout>;
