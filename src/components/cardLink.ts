import type { MouseEvent } from "react";

export const isExternal = (href: string) => /^https?:\/\//.test(href);

/** Props for an `<a>` that opens external URLs in a new tab and follows in-page anchors normally. */
export const linkProps = (href: string) =>
  isExternal(href) ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };

/**
 * Makes a click anywhere on a card follow the card's main link. The link itself stays a real `<a>`
 * (for keyboard and screen-reader users); this only extends its click target. Clicks on other links,
 * buttons, dropdowns or embeds keep their own behavior, and so does selecting text.
 */
export function followCardLink(e: MouseEvent<HTMLElement>, link: HTMLAnchorElement | null) {
  if (!link || e.defaultPrevented) return;
  if ((e.target as Element).closest("a, button, summary, input, select, textarea, label, iframe")) return;
  if (window.getSelection()?.toString()) return;
  link.click();
}
