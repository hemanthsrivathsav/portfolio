import type { ReactNode } from "react";
import { Moon, Sparkles, Sun } from "lucide-react";
import type { BgLevel, Theme } from "../types";

const LEVEL_LABEL: Record<BgLevel, string> = { low: "Low", mid: "Mid", high: "High" };

function DockButton({ title, onClick, children }: { title: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 hover:bg-black/5 dark:hover:bg-white/10"
    >
      {children}
    </button>
  );
}

function Separator() {
  return <span aria-hidden="true" className="h-6 w-px bg-black/10 dark:bg-white/10" />;
}

export function Dock({
  bgLevel,
  onCycleBg,
  theme,
  onToggleTheme,
}: {
  bgLevel: BgLevel;
  onCycleBg: () => void;
  theme: Theme;
  onToggleTheme: () => void;
}) {
  const isLight = theme === "light";

  return (
    <nav aria-label="Display settings" className="fixed left-1/2 top-4 z-30 -translate-x-1/2">
      <div className="flex items-center gap-2 rounded-3xl border border-black/10 bg-white/70 p-2 shadow-lg backdrop-blur-sm dark:border-white/15 dark:bg-black/40">
        <DockButton title="Toggle background intensity" onClick={onCycleBg}>
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:block">Background: {LEVEL_LABEL[bgLevel]}</span>
        </DockButton>

        <Separator />

        <DockButton title="Switch theme" onClick={onToggleTheme}>
          {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          <span className="hidden sm:block">{isLight ? "Dark" : "Light"} mode</span>
        </DockButton>
      </div>
    </nav>
  );
}
