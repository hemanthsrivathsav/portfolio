import { useEffect, useRef } from "react";
import type { BgLevel, Theme } from "../types";

type Node = { x: number; y: number; vx: number; vy: number };

const LEVELS: Record<BgLevel, { density: number; speed: number }> = {
  low: { density: 0.7, speed: 0.7 },
  mid: { density: 1, speed: 1 },
  high: { density: 1.8, speed: 1.5 },
};

const PALETTES = {
  dark: {
    gradient: ["#0ea5e9", "#7c3aed"],
    wash: 0.07,
    line: { sat: 80, light: 72, maxAlpha: 0.5, width: 1 },
    dot: { radius: 1.6, blur: 6, fill: (h: number) => `hsla(${h},90%,95%,0.95)`, glow: (h: number) => `hsla(${h},90%,70%,0.25)` },
  },
  light: {
    gradient: ["#60a5fa", "#a78bfa"],
    wash: 0.02,
    line: { sat: 95, light: 28, maxAlpha: 0.9, width: 1.4 },
    dot: { radius: 2.2, blur: 4, fill: (h: number) => `hsla(${h},85%,18%,0.95)`, glow: (h: number) => `hsla(${h},90%,35%,0.35)` },
  },
} satisfies Record<Theme, unknown>;

const MAX_PARTICLES = 240;
const LINK_DIST = 150;
const MAX_LINKS = 3;
const MIN_LINK_ALPHA = 0.15;
const ALPHA_STEPS = 8; // links are batched into this many opacity levels, one stroke() each
const REPEL_RADIUS_SQ = 38000;
const FRAME_MS = 1000 / 30;

const baseCount = (width: number) => (width < 640 ? 40 : width < 1024 ? 70 : 110);

/** Full-screen animated network background. Settings changes are applied without restarting the loop. */
export default function Particles({ level, theme }: { level: BgLevel; theme: Theme }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const settings = useRef({ level, theme });
  const repaint = useRef<() => void>(undefined);

  useEffect(() => {
    settings.current = { level, theme };
    repaint.current?.();
  }, [level, theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -1e4, y: -1e4 };
    const buckets: number[][] = Array.from({ length: ALPHA_STEPS }, () => []);
    let nodes: Node[] = [];
    let linkCounts = new Uint8Array(0);
    let w = 0;
    let h = 0;
    let hue = 210;
    let speed = LEVELS[settings.current.level].speed;
    let gradient: CanvasGradient | null = null;
    let gradientTheme: Theme | null = null;
    let raf = 0;
    let last = -Infinity;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // draw in CSS pixels
      gradientTheme = null;
      for (const n of nodes) {
        n.x = Math.min(n.x, w);
        n.y = Math.min(n.y, h);
      }
    };

    // Match the particle count and speed to the current level / viewport.
    const syncNodes = () => {
      const level = LEVELS[settings.current.level];
      if (level.speed !== speed) {
        for (const n of nodes) {
          n.vx *= level.speed / speed;
          n.vy *= level.speed / speed;
        }
        speed = level.speed;
      }
      const count = Math.min(MAX_PARTICLES, Math.round(baseCount(w) * level.density));
      while (nodes.length < count) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.45 * speed,
          vy: (Math.random() - 0.5) * 0.45 * speed,
        });
      }
      nodes.length = count;
      if (linkCounts.length !== count) linkCounts = new Uint8Array(count);
    };

    const step = () => {
      for (const n of nodes) {
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < REPEL_RADIUS_SQ) {
          const f = 60 / Math.max(1, d2);
          n.vx += dx * f;
          n.vy += dy * f;
        }
        n.vx += (Math.random() - 0.5) * 0.015 * speed;
        n.vy += (Math.random() - 0.5) * 0.015 * speed;
        n.x += n.vx;
        n.y += n.vy;
        // Bounce, clamping so particles can't get stuck outside after a resize.
        if (n.x < 0 || n.x > w) {
          n.x = Math.max(0, Math.min(w, n.x));
          n.vx *= -1;
        }
        if (n.y < 0 || n.y > h) {
          n.y = Math.max(0, Math.min(h, n.y));
          n.vy *= -1;
        }
        n.vx *= 0.992;
        n.vy *= 0.992;
      }
    };

    const paint = () => {
      syncNodes();
      const { theme } = settings.current;
      const palette = PALETTES[theme];

      if (gradientTheme !== theme) {
        gradient = ctx.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, palette.gradient[0]);
        gradient.addColorStop(1, palette.gradient[1]);
        gradientTheme = theme;
      }
      ctx.clearRect(0, 0, w, h);
      ctx.globalAlpha = palette.wash;
      ctx.fillStyle = gradient!;
      ctx.fillRect(0, 0, w, h);
      ctx.globalAlpha = 1;

      // Links: closer pairs are more opaque. Each node takes part in a few links at most.
      const { line } = palette;
      const alphaRange = line.maxAlpha - MIN_LINK_ALPHA;
      for (const b of buckets) b.length = 0;
      linkCounts.fill(0);
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          if (linkCounts[i] >= MAX_LINKS && linkCounts[j] >= MAX_LINKS) continue;
          const dx = a.x - nodes[j].x;
          const dy = a.y - nodes[j].y;
          const d2 = dx * dx + dy * dy;
          if (d2 >= LINK_DIST * LINK_DIST) continue;
          const alpha = Math.max(MIN_LINK_ALPHA, (1 - Math.sqrt(d2) / LINK_DIST) * line.maxAlpha);
          buckets[Math.round(((alpha - MIN_LINK_ALPHA) / alphaRange) * (ALPHA_STEPS - 1))].push(i, j);
          linkCounts[i]++;
          linkCounts[j]++;
        }
      }
      ctx.lineWidth = line.width;
      buckets.forEach((pairs, b) => {
        if (!pairs.length) return;
        const alpha = MIN_LINK_ALPHA + (b / (ALPHA_STEPS - 1)) * alphaRange;
        ctx.strokeStyle = `hsla(${hue},${line.sat}%,${line.light}%,${alpha})`;
        ctx.beginPath();
        for (let k = 0; k < pairs.length; k += 2) {
          const p = nodes[pairs[k]];
          const q = nodes[pairs[k + 1]];
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
        }
        ctx.stroke();
      });

      // Dots: one path, one fill.
      const { dot } = palette;
      ctx.shadowColor = dot.glow(hue);
      ctx.shadowBlur = dot.blur;
      ctx.fillStyle = dot.fill(hue);
      ctx.beginPath();
      for (const n of nodes) {
        ctx.moveTo(n.x + dot.radius, n.y);
        ctx.arc(n.x, n.y, dot.radius, 0, Math.PI * 2);
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const frame = (t: number) => {
      raf = requestAnimationFrame(frame);
      if (t - last < FRAME_MS) return;
      last = t;
      hue = (hue + 0.35) % 360;
      step();
      paint();
    };

    const onResize = () => {
      resize();
      if (reducedMotion) paint();
    };
    const onMouseMove = (e: MouseEvent) => {
      // The canvas is fixed at the viewport origin, so client coordinates are canvas coordinates.
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = mouse.y = -1e4;
    };

    resize();
    // With reduced motion, draw a single still frame (and redraw it when settings change).
    if (reducedMotion) {
      paint();
      repaint.current = paint;
    } else {
      raf = requestAnimationFrame(frame);
    }
    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);
    return () => {
      cancelAnimationFrame(raf);
      repaint.current = undefined;
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-0" />;
}
