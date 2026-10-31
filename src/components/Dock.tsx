import { useEffect, useState, type ReactNode } from "react";
import { Check, Moon, RotateCcw, Save, Sparkles, Sun } from "lucide-react";
import type { BgLevel, Theme } from "../types";

const LEVEL_LABEL: Record<BgLevel, string> = { low: "Low", mid: "Mid", high: "High" };

function DockButton({ title, onClick, className = "inline-flex", children }: { title: string; onClick: () => void; className?: string; children: ReactNode }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`${className} items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 hover:bg-black/5 dark:hover:bg-white/10`}
    >
      {children}
    </button>
  );
}

function Separator({ className = "" }: { className?: string }) {
  return <span aria-hidden="true" className={`h-6 w-px bg-black/10 dark:bg-white/10 ${className}`} />;
}

export function Dock({
  bgLevel,
  onCycleBg,
  theme,
  onToggleTheme,
  showLayoutControls,
  onReset,
  onSave,
}: {
  bgLevel: BgLevel;
  onCycleBg: () => void;
  theme: Theme;
  onToggleTheme: () => void;
  showLayoutControls: boolean;
  onReset: () => void;
  onSave: () => void;
}) {
  const isLight = theme === "light";
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!saved) return;
    const t = window.setTimeout(() => setSaved(false), 1500);
    return () => window.clearTimeout(t);
  }, [saved]);

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

        {/* Layout controls only make sense where tiles can be dragged (not on touch / small screens). */}
        {showLayoutControls && (
          <>
            <Separator className="hidden sm:block" />
            <DockButton
              title="Save layout"
              className="hidden sm:inline-flex"
              onClick={() => {
                onSave();
                setSaved(true);
              }}
            >
              {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
              <span>{saved ? "Saved" : "Save layout"}</span>
            </DockButton>

            <Separator className="hidden sm:block" />
            <DockButton title="Reset layout" className="hidden sm:inline-flex" onClick={onReset}>
              <RotateCcw className="h-4 w-4" />
              <span>Reset layout</span>
            </DockButton>
          </>
        )}
      </div>
    </nav>
  );
}
