// src/components/CertificatesCarousel.tsx
import React, {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  useImperativeHandle,
  useCallback,
} from "react";
import { motion } from "framer-motion";

export type CertCarouselHandle = { prev: () => void; next: () => void };

type Props = {
  images: string[];                   // e.g. Accredible PNG + local images
  links?: (string | undefined)[];     // optional click-through targets, same index as images
  isLight: boolean;
  controlsRef?: React.Ref<CertCarouselHandle>; // expose prev/next to parent (for header-aligned buttons)
  showButtons?: boolean;              // set true to render internal buttons (default false)
  slideWidth?: number;                // px – defaults to 192 (Tailwind w-48)
  slideHeight?: number;               // px – defaults to 128 (Tailwind h-32)
};

export function CertificatesCarousel({
  images,
  links = [],
  isLight,
  controlsRef,
  showButtons = false,
  slideWidth = 192,
  slideHeight = 128,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Guard: sanitize inputs
  const srcs = images.filter(Boolean);
  const N = srcs.length;
  if (N === 0) return null;

  // For seamless looping render 3× the list; map 0..3N-1 → 0..N-1
  const idx3 = useMemo(() => Array.from({ length: 3 * N }, (_, i) => i % N), [N]);

  // Keep “current slide” anchored in the middle copy [N..2N-1]
  const [centerIdx, setCenterIdx] = useState(Math.max(N, 0));
  const scrollingRef = useRef(false);     // true during programmatic smooth scroll
  const boundsRef = useRef({ min: 0, max: 0 }); // min/max left for middle copy

  const centerByIdx = useCallback((i: number, behavior: ScrollBehavior = "auto") => {
    const el = containerRef.current;
    const track = trackRef.current;
    if (!el || !track) return;
    const child = track.children[i] as HTMLElement | undefined;
    if (!child) return;
    const left = child.offsetLeft - (el.clientWidth - child.offsetWidth) / 2;
    el.scrollTo({ left, behavior });
  }, []);

  const computeBounds = useCallback(() => {
    const el = containerRef.current;
    const track = trackRef.current;
    if (!el || !track || N < 1) return;
    const firstMid = track.children[N] as HTMLElement;
    const lastMid = track.children[2 * N - 1] as HTMLElement;
    if (!firstMid || !lastMid) return;
    const min = firstMid.offsetLeft - (el.clientWidth - firstMid.offsetWidth) / 2;
    const max = lastMid.offsetLeft - (el.clientWidth - lastMid.offsetWidth) / 2;
    boundsRef.current = { min, max };
  }, [N]);

  // Initialize centered on first item in middle copy; observe size changes
  useLayoutEffect(() => {
    setCenterIdx(N);
    centerByIdx(N, "auto");
    computeBounds();

    const ro = new ResizeObserver(() => {
      if (scrollingRef.current) return; // don't fight smooth scroll
      computeBounds();
      centerByIdx(centerIdx, "auto");
    });
    if (containerRef.current) ro.observe(containerRef.current);
    if (trackRef.current) ro.observe(trackRef.current);

    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [N, centerByIdx, computeBounds]);

  // Recompute once images finish loading to avoid flicker
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const imgs = Array.from(track.querySelectorAll("img"));
    const check = () => {
      if (imgs.every((im) => (im as HTMLImageElement).complete)) {
        computeBounds();
        centerByIdx(centerIdx, "auto");
      }
    };
    imgs.forEach((im) => {
      const img = im as HTMLImageElement;
      if (img.complete) return;
      img.addEventListener("load", check, { once: true });
      img.addEventListener("error", check, { once: true });
    });
    check();
  }, [centerIdx, N, centerByIdx, computeBounds]);

  // Keep within middle segment on manual scroll
  const onScroll = useCallback(() => {
    if (scrollingRef.current || N < 2) return;
    const el = containerRef.current;
    if (!el) return;
    const { min, max } = boundsRef.current;
    const tol = 8;
    if (el.scrollLeft < min - tol) {
      const ni = centerIdx + N;
      setCenterIdx(ni);
      centerByIdx(ni, "auto");
    } else if (el.scrollLeft > max + tol) {
      const ni = centerIdx - N;
      setCenterIdx(ni);
      centerByIdx(ni, "auto");
    }
  }, [N, centerIdx, centerByIdx]);

  // One-step left/right; always recenters exactly one slide
  const step = useCallback((dir: 1 | -1) => {
    if (N < 2) return;

    // mark programmatic scrolling BEFORE any scrollTo's
    scrollingRef.current = true;

    setCenterIdx((i) => {
      let next = i + dir;

      // Pre-wrap into middle segment
      if (next < N) {
        next += N;
        centerByIdx(next, "auto"); // jump instantly to same item in middle copy
      } else if (next >= 2 * N) {
        next -= N;
        centerByIdx(next, "auto");
      }

      // Smoothly center to the next slide (next tick to avoid fighting layout)
      requestAnimationFrame(() => {
        centerByIdx(next, "smooth");
      });

      return next;
    });

    // turn off the programmatic flag on scroll end (or after a fallback timeout)
    const el = containerRef.current;
    const clearFlag = () => {
      scrollingRef.current = false;
      computeBounds();
    };

    // Some browsers expose 'scrollend' on elements; fall back to a timer otherwise
    const supportsScrollEnd = "onscrollend" in window || "onscrollend" in (HTMLElement.prototype as any);

    if (el && supportsScrollEnd) {
      const handler = () => {
        el.removeEventListener("scrollend", handler as any);
        clearFlag();
      };
      el.addEventListener("scrollend", handler as any, { once: true });
    } else {
      window.setTimeout(clearFlag, 450); // fallback duration ≈ smooth scroll time
    }
  }, [N, centerByIdx, computeBounds]);

  // Expose controls to parent
  useImperativeHandle(controlsRef, () => ({ prev: () => step(-1), next: () => step(1) }), [step]);

  const Arrow = ({ dir, label }: { dir: 1 | -1; label: string }) => (
    <button
      type="button"
      onClick={() => step(dir)}
      disabled={N < 2}
      className={`h-8 w-8 grid place-items-center rounded-full border ${
        isLight
          ? "border-black/10 bg-white hover:bg-black/5 disabled:opacity-40"
          : "border-white/15 bg-white/10 hover:bg-white/20 disabled:opacity-40"
      }`}
      aria-label={label}
    >
      {dir === -1 ? "‹" : "›"}
    </button>
  );

  return (
    <div>
      {showButtons && (
        <div className="flex gap-2 mb-3 justify-end">
          <Arrow dir={-1} label="Previous" />
          <Arrow dir={1} label="Next" />
        </div>
      )}

      <div
        ref={containerRef}
        onScroll={onScroll}
        className="overflow-x-auto no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <div ref={trackRef} className="flex gap-3">
          {idx3.map((origIdx, i) => {
            const src = srcs[origIdx];
            const href = links?.[origIdx];

            const Slide = (
              <div
                className={`snap-center shrink-0 rounded-xl border ${
                  isLight ? "border-black/10 bg-white" : "border-white/10 bg-white/10"
                } flex items-center justify-center overflow-hidden`}
                style={{ width: slideWidth, height: slideHeight }}
              >
                <motion.img
                  src={src}
                  alt={`Certificate ${origIdx + 1}`}
                  className="max-h-full max-w-full object-contain"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 260, damping: 20 }}
                  draggable={false}
                  onDragStart={(e) => e.preventDefault()}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = "/certs/fallback.jpg";
                  }}
                  style={{ WebkitUserDrag: "none" }}
                />
              </div>
            );

            return href ? (
              <a key={`a-${i}-${src}`} href={href} target="_blank" rel="noreferrer">
                {Slide}
              </a>
            ) : (
              <div key={`d-${i}-${src}`}>{Slide}</div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
