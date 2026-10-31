import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { softSurface, subtleText } from "../styles";

/** A slide without `src` renders `alt` as a text placeholder (e.g. "Coming soon"). */
export type Slide = { alt: string; src?: string; href?: string };

const SLIDE_W = 192;
const SLIDE_H = 128;
// Browsers without `scrollend` (or a smooth scroll cut short by the user) still need to unlock.
const SCROLL_END_FALLBACK_MS = 600;

/**
 * Looping, snap-scrolling image strip with prev/next controls. Three copies of the slides are rendered
 * and the view is always kept inside the middle copy, so wrapping around is an invisible jump.
 */
export function Carousel({ title, slides }: { title: string; slides: Slide[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const index = useRef(0); // slide that is centred, or being scrolled to
  const targetLeft = useRef(0);
  const animating = useRef(false);
  const fallbackTimer = useRef(0);

  const n = slides.length;
  const loops = n > 1;
  const copies = loops ? 3 : 1;

  const geometry = useCallback(() => {
    const el = scrollerRef.current;
    const track = el?.firstElementChild;
    if (!el || !track || track.children.length < 2) return null;
    const first = track.children[0] as HTMLElement;
    const pitch = (track.children[1] as HTMLElement).offsetLeft - first.offsetLeft;
    const start = first.offsetLeft - (el.clientWidth - first.offsetWidth) / 2; // scrollLeft that centres slide 0
    return { el, pitch, start };
  }, []);

  const scrollToSlide = useCallback(
    (i: number, behavior: ScrollBehavior) => {
      const g = geometry();
      if (!g) return;
      index.current = i;
      targetLeft.current = g.start + i * g.pitch;
      g.el.scrollTo({ left: targetLeft.current, behavior });
    },
    [geometry]
  );

  // Track the centred slide after manual scrolling and pull the view back into the middle copy.
  const sync = useCallback(() => {
    const g = geometry();
    if (!g) return;
    const i = Math.round((g.el.scrollLeft - g.start) / g.pitch);
    const shift = !loops ? 0 : i < n ? n : i >= 2 * n ? -n : 0;
    if (shift) g.el.scrollLeft += shift * g.pitch;
    index.current = i + shift;
  }, [geometry, loops, n]);

  useLayoutEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    scrollToSlide(loops ? n : 0, "instant");
    const ro = new ResizeObserver(() => {
      if (!animating.current) scrollToSlide(index.current, "instant");
    });
    ro.observe(el);
    return () => {
      ro.disconnect();
      window.clearTimeout(fallbackTimer.current);
    };
  }, [loops, n, scrollToSlide]);

  const finish = () => {
    animating.current = false;
    window.clearTimeout(fallbackTimer.current);
    sync();
  };

  const onScrollEnd = () => {
    const el = scrollerRef.current;
    // Ignore the scrollend from the instant wrap jump; wait for the smooth scroll to land.
    if (animating.current && el && Math.abs(el.scrollLeft - targetLeft.current) > 2) return;
    finish();
  };

  const step = (dir: 1 | -1) => {
    const g = geometry();
    if (!g) return;
    let to = index.current + dir;
    if (loops) {
      const shift = to < n ? n : to >= 2 * n ? -n : 0;
      if (shift) {
        g.el.scrollLeft += shift * g.pitch; // same slide in the middle copy, so nothing visibly moves
        to += shift;
      }
    } else {
      to = Math.max(0, Math.min(n - 1, to));
    }
    animating.current = true;
    window.clearTimeout(fallbackTimer.current);
    fallbackTimer.current = window.setTimeout(finish, SCROLL_END_FALLBACK_MS);
    requestAnimationFrame(() => scrollToSlide(to, "smooth"));
  };

  const navButton = `grid h-8 w-8 place-items-center rounded-full disabled:opacity-40 ${softSurface}`;

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <div className="flex gap-2">
          <button type="button" onClick={() => step(-1)} disabled={!loops} className={navButton} aria-label={`Previous ${title.toLowerCase()} slide`}>
            ‹
          </button>
          <button type="button" onClick={() => step(1)} disabled={!loops} className={navButton} aria-label={`Next ${title.toLowerCase()} slide`}>
            ›
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        onScroll={() => !animating.current && sync()}
        onScrollEnd={onScrollEnd}
        className="no-scrollbar relative snap-x snap-mandatory overflow-x-auto"
      >
        <div className={`flex gap-3 ${loops ? "" : "justify-center"}`}>
          {Array.from({ length: copies }, (_, copy) =>
            slides.map((slide, i) => <SlideCard key={`${copy}-${i}`} slide={slide} clone={loops && copy !== 1} />)
          )}
        </div>
      </div>
    </div>
  );
}

function SlideCard({ slide, clone }: { slide: Slide; clone: boolean }) {
  const [failed, setFailed] = useState(false);
  const className =
    "flex shrink-0 snap-center items-center justify-center overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/10 dark:bg-white/10";
  const style = { width: SLIDE_W, height: SLIDE_H };

  const content =
    slide.src && !failed ? (
      <img
        src={slide.src}
        alt={slide.alt}
        loading="lazy"
        decoding="async"
        draggable={false}
        onError={() => setFailed(true)}
        className="max-h-full max-w-full object-contain transition-transform duration-300 hover:scale-[1.03]"
      />
    ) : (
      <span className={`px-3 text-center text-sm ${subtleText}`}>{slide.src ? `${slide.alt} (image unavailable)` : slide.alt}</span>
    );

  // Clones exist only for the looping effect; keep them out of the accessibility tree and tab order.
  return slide.href ? (
    <a href={slide.href} target="_blank" rel="noopener noreferrer" className={className} style={style} aria-hidden={clone || undefined} tabIndex={clone ? -1 : undefined}>
      {content}
    </a>
  ) : (
    <div className={className} style={style} aria-hidden={clone || undefined}>
      {content}
    </div>
  );
}
