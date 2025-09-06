import React, { useEffect, useMemo, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

/** Position maps persisted in localStorage */
export type Positions = Record<string, { x: number; y: number }>;
/** Baseline measured from initial grid layout */
export type Baseline = Record<string, { x: number; y: number; w: number; h: number }>;

type XY = { x: number; y: number };

export function DraggableItem({
  itemKey,
  className = "",
  htmlId,
  children,
  boardRef,
  positions,
  setPositions,
  abs,
  baseline,
  grid = 16,
}: {
  itemKey: string;
  className?: string;
  htmlId?: string;
  children: React.ReactNode;
  boardRef: React.RefObject<HTMLDivElement>;
  positions: Positions;
  setPositions: React.Dispatch<React.SetStateAction<Positions>>;
  abs: boolean;
  baseline: Baseline;
  grid?: number;
}) {
  // Detect “touch / coarse” pointers → mobile/tablet
  const isCoarse = useMemo(
    () => (typeof window !== "undefined" ? window.matchMedia?.("(pointer: coarse)")?.matches : false),
    []
  );

  // ----- initial position from persisted or baseline -----
  const startBase = baseline[itemKey];
  const start = positions[itemKey] ?? (startBase ? { x: startBase.x, y: startBase.y } : { x: 0, y: 0 });

  const x = useMotionValue(start.x);
  const y = useMotionValue(start.y);

  const ref = useRef<HTMLDivElement | null>(null);
  const startRef = useRef<XY>({ x: start.x, y: start.y });

  // Sync with external updates (e.g., Reset)
  useEffect(() => {
    const b = baseline[itemKey];
    const p = positions[itemKey] ?? (b ? { x: b.x, y: b.y } : undefined);
    if (p) {
      x.set(p.x);
      y.set(p.y);
      startRef.current = { x: p.x, y: p.y };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [positions[itemKey]?.x, positions[itemKey]?.y, baseline[itemKey]?.x, baseline[itemKey]?.y]);

  // ----- helpers -----
  const snap = (n: number) => Math.round(n / grid) * grid;

  const clampToBoard = (nx: number, ny: number) => {
    const board = boardRef.current;
    const el = ref.current;
    if (!board || !el) return { x: nx, y: ny };

    const br = board.getBoundingClientRect();
    const w = (el as HTMLElement).offsetWidth;
    const h = (el as HTMLElement).offsetHeight;

    // account for current transform
    const currentX = x.get();
    const currentY = y.get();

    const er = el.getBoundingClientRect();
    const baseLeft = er.left - br.left - currentX;
    const baseTop = er.top - br.top - currentY;

    const minX = -baseLeft;
    const minY = -baseTop;
    const maxX = br.width - w - baseLeft;
    const maxY = br.height - h - baseTop;

    return {
      x: Math.max(minX, Math.min(maxX, nx)),
      y: Math.max(minY, Math.min(maxY, ny)),
    };
  };

  const setPos = (xy: XY) => setPositions((p) => ({ ...p, [itemKey]: xy }));

  // During measuring phase we return static nodes so the grid lays them out
  if (!abs) {
    return (
      <div id={htmlId} data-key={itemKey} className={className}>
        {children}
      </div>
    );
  }

  // On mobile/coarse pointers, disable drag entirely; keep scroll smooth
  const dragEnabled = !isCoarse;

  return (
    <motion.div
      ref={ref}
      id={htmlId}
      data-key={itemKey}
      className={className + (dragEnabled ? " cursor-grab active:cursor-grabbing" : "")}
      style={{
        x,
        y,
        // allow native scrolling on touch devices; no special handling needed if drag disabled
        touchAction: dragEnabled ? "none" : "pan-y",
        position: "absolute",
        left: 0,
        top: 0,
        width: baseline[itemKey]?.w,
        height: baseline[itemKey]?.h,
      }}
      drag={dragEnabled}
      dragMomentum={false}
      dragElastic={0.12}
      whileDrag={dragEnabled ? { zIndex: 40 } : undefined}
      onDragStart={() => {
        startRef.current = { x: x.get(), y: y.get() };
      }}
      onDrag={(e, info) => {
        // keep our custom tracking so snapping/clamping is consistent
        const nextX = startRef.current.x + info.offset.x;
        const nextY = startRef.current.y + info.offset.y;
        x.set(nextX);
        y.set(nextY);
      }}
      onDragEnd={(e, info) => {
        const rawX = startRef.current.x + info.offset.x;
        const rawY = startRef.current.y + info.offset.y;
        const nx = snap(rawX);
        const ny = snap(rawY);
        const clamped = clampToBoard(nx, ny);
        x.set(clamped.x);
        y.set(clamped.y);
        setPos(clamped);
      }}
    >
      {children}
    </motion.div>
  );
}
