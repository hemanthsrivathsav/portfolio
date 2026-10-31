import type { ReactNode } from "react";

/** Card shell for every tile on the board, with an optional icon + title header. */
export function Bento({ title, icon, actions, children }: { title?: string; icon?: ReactNode; actions?: ReactNode; children: ReactNode }) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white/70 p-5 shadow-xs backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:shadow-none">
      {title && (
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            {icon}
            <h2 className="text-xl font-semibold">{title}</h2>
          </div>
          {actions}
        </div>
      )}
      {children}
    </div>
  );
}
