import { useRef, type ReactNode } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { followCardLink, isExternal, linkProps } from "./cardLink";

/** Where a tile leads: an external URL (opens in a new tab) or an in-page anchor like `#projects`. */
export type BentoLink = { href: string; label: string };

/**
 * Card shell for every tile on the board, with an optional icon + title header. With `link`, the whole
 * card is clickable and the header shows an arrow (↗ external, ↓ section further down the page).
 */
export function Bento({ title, icon, link, children }: { title?: string; icon?: ReactNode; link?: BentoLink; children: ReactNode }) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const Arrow = link && isExternal(link.href) ? ArrowUpRight : ArrowDown;

  return (
    <div
      onClick={link ? (e) => followCardLink(e, linkRef.current) : undefined}
      className={`group rounded-3xl border border-black/10 bg-white/70 p-5 shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:shadow-none ${
        link
          ? "cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:border-sky-400/50 hover:shadow-lg hover:shadow-sky-400/10 dark:hover:border-sky-400/40"
          : ""
      }`}
    >
      {(title || link) && (
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {icon}
            {title && <h2 className="text-xl font-semibold">{title}</h2>}
          </div>
          {link && (
            <a
              ref={linkRef}
              {...linkProps(link.href)}
              aria-label={link.label}
              title={link.label}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-slate-500 transition group-hover:bg-sky-500/10 group-hover:text-sky-600 focus-visible:outline-2 focus-visible:outline-sky-500 dark:text-white/60 dark:group-hover:text-sky-300"
            >
              <Arrow className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
