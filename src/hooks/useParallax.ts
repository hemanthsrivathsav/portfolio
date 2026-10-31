import { useEffect, useRef } from "react";

/** Moves the element up by up to `distance` px over the first `range` px of page scroll. */
export function useParallax<T extends HTMLElement>(distance: number, range: number) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      el.style.transform = `translateY(${(-distance * Math.min(window.scrollY, range)) / range}px)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [distance, range]);

  return ref;
}
