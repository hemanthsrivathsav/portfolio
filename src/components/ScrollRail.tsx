import { Children, createContext, use, useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { softSurface, subtleText } from "../styles";

const RailCloneContext = createContext(false);
/**
 * True inside the extra copies a rail adds to fill its loop. Copies stay clickable but are hidden from
 * screen readers, so cards should drop their `id`s and take their links/iframes out of the tab order.
 */
export const useIsRailClone = () => use(RailCloneContext);

const reducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Circular, snap-scrolling row of cards with a heading and prev/next buttons: after the last card comes
 * the first again, in both directions. With `autoPlayMs` it advances on its own and pauses while the
 * pointer is over it, while a card has focus, while it is off-screen, or once the viewer presses pause
 * or clicks into an embedded post. Autoplay starts paused for viewers who ask for reduced motion.
 *
 * The loop works without cloning cards (which would duplicate ids and reload embeds): before each step
 * the cards are rotated with CSS `order` so the current card has exactly one card before it, and the
 * scroll position is corrected so nothing visibly moves. Then it scrolls one card either way. That
 * needs the cards after the next one to fill the view; when there are too few for that, inert copies
 * are added (see `useIsRailClone`).
 */
export function ScrollRail({
  title,
  description,
  autoPlayMs,
  children,
}: {
  title: string;
  description?: ReactNode;
  autoPlayMs?: number;
  children: ReactNode;
}) {
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [scrollable, setScrollable] = useState(false);
  const [copies, setCopies] = useState(1);
  const slides = Children.toArray(children);
  const [paused, setPaused] = useState(reducedMotion);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(false);

  const step = useCallback((dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el || el.children.length < 2) return;

    // Cards in on-screen order, and the one currently at the left edge.
    const items = [...el.children].map((c) => c as HTMLElement).sort((a, b) => a.offsetLeft - b.offsetLeft);
    const current = items.reduce((best, item) =>
      Math.abs(item.offsetLeft - el.scrollLeft) < Math.abs(best.offsetLeft - el.scrollLeft) ? item : best
    );
    const f = items.indexOf(current);
    const x = current.offsetLeft - el.scrollLeft;

    // Rotate so `current` is second, then undo the shift that caused.
    items.forEach((item, j) => (item.style.order = String((j - f + 1 + items.length) % items.length)));
    el.scrollTo({ left: current.offsetLeft - x, behavior: "instant" });

    const target = items[(f + dir + items.length) % items.length];
    requestAnimationFrame(() => el.scrollTo({ left: target.offsetLeft, behavior: reducedMotion() ? "instant" : "smooth" }));
  }, []);

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const update = () => {
      const originals = [...el.children].slice(0, slides.length) as HTMLElement[];
      if (!originals.length) return;
      const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
      const widths = originals.map((li) => li.offsetWidth);
      const setWidth = widths.reduce((a, w) => a + w + gap, 0);
      const widest = Math.max(...widths);
      const fits = setWidth - gap <= el.clientWidth + 2;
      setScrollable(!fits);
      // Smallest number of sets where everything after the two leading cards still fills the view.
      let k = 1;
      while (!fits && k < 6 && k * setWidth - 2 * (widest + gap) < el.clientWidth) k++;
      setCopies(k);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [slides.length]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!autoPlayMs || !el) return;

    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);

    // Pointer events stop reaching this page while the pointer is over an iframe, so instead of
    // pointerleave we watch where the pointer lands next on this page.
    const onPointerOver = (e: PointerEvent) => setHovered(el.contains(e.target as Node));
    // Clicking into an embedded post moves focus into its iframe, which blurs the window. (Opening a
    // card's link in a new tab also blurs it, but leaves focus on the link, so that doesn't pause.)
    const onWindowBlur = () =>
      requestAnimationFrame(() => {
        const active = document.activeElement;
        if (active instanceof HTMLIFrameElement && el.contains(active)) setPaused(true);
      });

    document.addEventListener("pointerover", onPointerOver);
    window.addEventListener("blur", onWindowBlur);
    return () => {
      io.disconnect();
      document.removeEventListener("pointerover", onPointerOver);
      window.removeEventListener("blur", onWindowBlur);
    };
  }, [autoPlayMs]);

  const running = !!autoPlayMs && scrollable && !paused && !hovered && !focused && visible;
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => step(1), autoPlayMs);
    return () => window.clearInterval(id);
  }, [running, autoPlayMs, step]);

  const control = `grid h-9 w-9 place-items-center rounded-full transition ${softSurface}`;

  return (
    <div role="region" aria-roledescription="carousel" aria-label={title}>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold">{title}</h2>
          {description && <div className={`mt-1 ${subtleText}`}>{description}</div>}
        </div>
        {scrollable && (
          <div className="flex gap-2">
            {autoPlayMs && (
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                className={control}
                aria-label={paused ? `Play ${title} slideshow` : `Pause ${title} slideshow`}
              >
                {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
              </button>
            )}
            <button type="button" onClick={() => step(-1)} className={control} aria-label={`Previous ${title}`}>
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => step(1)} className={control} aria-label={`Next ${title}`}>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* No `scroll-smooth` here: the instant scroll correction in `step` must not animate. */}
      <ul
        ref={scrollerRef}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
        }}
        className="no-scrollbar relative -my-2 flex snap-x snap-mandatory gap-5 overflow-x-auto py-2"
      >
        {slides.map((slide, i) => (
          <li key={i} className="flex shrink-0 snap-start">
            {slide}
          </li>
        ))}
        {Array.from({ length: copies - 1 }, (_, copy) =>
          slides.map((slide, i) => (
            <li key={`clone-${copy}-${i}`} className="flex shrink-0 snap-start" aria-hidden>
              <RailCloneContext value={true}>{slide}</RailCloneContext>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
