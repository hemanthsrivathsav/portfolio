import React, { useEffect, useRef, useState } from "react";

export default function Particles({
  level = "low",
  theme = "dark" as "dark" | "light",
}: {
  level?: "low" | "mid" | "high";
  theme?: "dark" | "light";
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true, desynchronized: true })!;
    let width = 0,
      height = 0,
      raf = 0;
    let gradient: CanvasGradient;

    const isReduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    const setSize = () => {
      width = (canvas.width = Math.floor(window.innerWidth * dpr));
      height = (canvas.height = Math.floor(window.innerHeight * dpr));
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      gradient = ctx.createLinearGradient(0, 0, width, height);
      if (theme === "dark") {
        gradient.addColorStop(0, "#0ea5e9");
        gradient.addColorStop(1, "#7c3aed");
      } else {
        gradient.addColorStop(0, "#60a5fa");
        gradient.addColorStop(1, "#a78bfa");
      }
    };

    const levelFactor = level === "low" ? 0.7 : level === "high" ? 1.8 : 1.0;
    const speedFactor = level === "low" ? 0.7 : level === "high" ? 1.5 : 1.0;

    const baseCount =
      typeof window !== "undefined" && window.innerWidth < 640
        ? 40
        : typeof window !== "undefined" && window.innerWidth < 1024
        ? 70
        : 110;

    const PARTICLES = isReduced ? 0 : Math.min(240, Math.round(baseCount * levelFactor));

    const nodes = Array.from({ length: PARTICLES }, () => ({
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 800),
      y: Math.random() * (typeof window !== "undefined" ? window.innerHeight : 600),
      vx: (Math.random() - 0.5) * 0.45 * speedFactor,
      vy: (Math.random() - 0.5) * 0.45 * speedFactor,
    }));

    const LINK_DIST = 150 * dpr;
    const MAX_LINKS = 3;

    let hue = 210,
      last = 0;
    const FPS = 30,
      FRAME = 1000 / FPS;

    const mouse = { x: -9999, y: -9999 };
    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const draw = (t: number) => {
      if (isReduced) return;
      if (t - last < FRAME) {
        raf = requestAnimationFrame(draw);
        return;
      }
      last = t;
      hue = (hue + 0.35) % 360;

      ctx.clearRect(0, 0, width, height);

      ctx.fillStyle = gradient;
      ctx.globalAlpha = theme === "dark" ? 0.07 : 0.02;
      ctx.fillRect(0, 0, width, height);
      ctx.globalAlpha = 1;

      const w = typeof window !== "undefined" ? window.innerWidth : width;
      const h = typeof window !== "undefined" ? window.innerHeight : height;

      for (const n of nodes) {
        const dxm = n.x - mouse.x,
          dym = n.y - mouse.y;
        const d2 = dxm * dxm + dym * dym;
        if (d2 < 38000) {
          const f = 0.05 / Math.max(1, d2);
          n.vx += dxm * f * 1200;
          n.vy += dym * f * 1200;
        }
        n.vx += (Math.random() - 0.5) * 0.015 * speedFactor;
        n.vy += (Math.random() - 0.5) * 0.015 * speedFactor;

        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        n.vx *= 0.992;
        n.vy *= 0.992;
      }

      const links = new Array(nodes.length).fill(0);
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          if (links[i] >= MAX_LINKS && links[j] >= MAX_LINKS) continue;
          const a = nodes[i],
            b = nodes[j];
          const dx = a.x - b.x,
            dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DIST) {
            const alpha = 1 - dist / LINK_DIST;
            const strokeAlpha = Math.max(0.15, Math.min(theme === "dark" ? 0.5 : 0.9, alpha * (theme === "dark" ? 0.5 : 0.9)));
            const sat = theme === "dark" ? 80 : 95;
            const light = theme === "dark" ? 72 : 28;
            ctx.strokeStyle = `hsla(${hue}, ${sat}%, ${light}%, ${strokeAlpha})`;
            ctx.lineWidth = theme === "dark" ? 1 : 1.4;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
            links[i]++;
            links[j]++;
          }
        }
      }

      if (theme === "light") {
        ctx.shadowColor = `hsla(${hue},90%,35%,0.35)`;
        ctx.shadowBlur = 4;
        ctx.fillStyle = `hsla(${hue},85%,18%,0.95)`;
      } else {
        ctx.shadowColor = `hsla(${hue},90%,70%,0.25)`;
        ctx.shadowBlur = 6;
        ctx.fillStyle = `hsla(${hue},90%,95%,0.95)`;
      }
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, theme === "dark" ? 1.6 : 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };

    setSize();
    draw(0);
    window.addEventListener("resize", setSize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", setSize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [dpr, level, theme]);

  useEffect(() => {
    setDpr(1);
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
