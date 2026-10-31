import { createContext, use, useRef, useState, type PointerEvent, type ReactNode } from "react";
import type { BentoLayout, XY } from "../hooks/useBentoLayout";

const GRID = 16;
const DRAG_THRESHOLD = 4; // px of movement before a press becomes a drag (so clicks still work)

export const BoardContext = createContext<BentoLayout | null>(null);

const snap = (n: number) => Math.round(n / GRID) * GRID;
const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));
const translate = ({ x, y }: XY) => `translate(${x}px, ${y}px)`;

export function DraggableItem({
  itemKey,
  id,
  className = "",
  children,
}: {
  itemKey: string;
  id?: string;
  className?: string;
  children: ReactNode;
}) {
  const board = use(BoardContext);
  if (!board) throw new Error("DraggableItem must be rendered inside <BoardContext>");
  const { boardRef, positions, setPositions, baseline, boardSize, abs } = board;

  const ref = useRef<HTMLDivElement>(null);
  const drag = useRef<{ pointerId: number; startX: number; startY: number; origin: XY; moved: boolean } | null>(null);
  const suppressClick = useRef(false);
  const [dragging, setDragging] = useState(false);

  const box = baseline[itemKey];
  const floating = abs && box;
  // Saved positions can come from a wider window; keep the tile on the board.
  const saved = positions[itemKey] ?? box ?? { x: 0, y: 0 };
  const pos = box ? { x: clamp(saved.x, 0, boardSize.w - box.w), y: clamp(saved.y, 0, boardSize.h - box.h) } : saved;

  // While dragging, the transform is written straight to the DOM so React doesn't re-render every move.
  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    suppressClick.current = false;
    if (!floating || e.button !== 0 || (e.target as Element).closest("button, input, textarea, select")) return;
    drag.current = { pointerId: e.pointerId, startX: e.clientX, startY: e.clientY, origin: pos, moved: false };
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.pointerId !== e.pointerId || !ref.current) return;
    const dx = e.clientX - d.startX;
    const dy = e.clientY - d.startY;
    if (!d.moved) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      d.moved = true;
      e.currentTarget.setPointerCapture(e.pointerId);
      document.body.style.userSelect = "none";
      setDragging(true);
    }
    ref.current.style.transform = translate({ x: d.origin.x + dx, y: d.origin.y + dy });
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>, commit: boolean) => {
    const d = drag.current;
    if (!d || d.pointerId !== e.pointerId) return;
    drag.current = null;
    if (!d.moved) return;
    document.body.style.userSelect = "";
    setDragging(false);
    suppressClick.current = true; // the click that follows a drag shouldn't open links

    const el = ref.current;
    const boardEl = boardRef.current;
    let next = d.origin;
    if (commit && el && boardEl) {
      next = {
        x: clamp(snap(d.origin.x + e.clientX - d.startX), 0, boardEl.clientWidth - el.offsetWidth),
        y: clamp(snap(d.origin.y + e.clientY - d.startY), 0, boardEl.clientHeight - el.offsetHeight),
      };
      setPositions((p) => ({ ...p, [itemKey]: next }));
    }
    // Set explicitly: if the position didn't change, React won't touch the style we mutated.
    if (el) el.style.transform = translate(next);
  };

  return (
    <div
      ref={ref}
      id={id}
      data-key={itemKey}
      className={`${className} ${floating ? `touch-none ${dragging ? "z-40 cursor-grabbing" : "cursor-grab"}` : ""}`}
      style={
        floating ? { position: "absolute", left: 0, top: 0, width: box.w, height: box.h, transform: translate(pos) } : undefined
      }
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={(e) => endDrag(e, true)}
      onPointerCancel={(e) => endDrag(e, false)}
      onClickCapture={(e) => {
        if (!suppressClick.current) return;
        suppressClick.current = false;
        e.preventDefault();
        e.stopPropagation();
      }}
      // Links and images are natively draggable, which would hijack the pointer.
      onDragStart={(e) => floating && e.preventDefault()}
    >
      {children}
    </div>
  );
}
