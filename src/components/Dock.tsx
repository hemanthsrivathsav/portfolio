import React from "react";
import { Sparkles, Sun, Moon, RotateCcw, Save } from "lucide-react";

export function Dock({
  bgLevel,
  onCycleBg,
  theme,
  onToggleTheme,
  onReset,
  onSave,
}: {
  bgLevel: "low" | "mid" | "high";
  onCycleBg: () => void;
  theme: "dark" | "light";
  onToggleTheme: () => void;
  onReset: () => void;
  onSave: () => void;
}) {
  const isLight = theme === "light";
  const sep = "w-px h-6 bg-white/10";

  return (
    <div className="fixed left-1/2 -translate-x-1/2 top-4 z-30">
      <div
        className={`flex items-center gap-2 rounded-3xl border backdrop-blur px-2 py-2 shadow-lg ${
          isLight ? "border-black/10 bg-white/70" : "border-white/15 bg-black/40"
        }`}
      >
        {/* Background intensity */}
        <button
          onClick={onCycleBg}
          className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 ${
            isLight ? "hover:bg-black/5" : "hover:bg-white/10"
          }`}
          title="Toggle background intensity"
        >
          <Sparkles className="h-4 w-4" />
          <span className="hidden sm:block">
            Background: {bgLevel[0].toUpperCase() + bgLevel.slice(1)}
          </span>
        </button>

        <div className={`${sep}`} />

        {/* Theme */}
        <button
          onClick={onToggleTheme}
          className={`inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 ${
            isLight ? "hover:bg-black/5" : "hover:bg-white/10"
          }`}
          title="Switch theme"
        >
          {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          <span className="hidden sm:block">{isLight ? "Dark" : "Light"} mode</span>
        </button>

        {/* Save / Reset — hidden on mobile */}
        <div className="hidden sm:block w-px h-6 bg-white/10" />

        <button
          onClick={onSave}
          className={`hidden sm:inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 ${
            isLight ? "hover:bg-black/5" : "hover:bg-white/10"
          }`}
          title="Save layout"
        >
          <Save className="h-4 w-4" />
          <span>Save layout</span>
        </button>

        <div className="hidden sm:block w-px h-6 bg-white/10" />

        <button
          onClick={onReset}
          className={`hidden sm:inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5 ${
            isLight ? "hover:bg-black/5" : "hover:bg-white/10"
          }`}
          title="Reset layout"
        >
          <RotateCcw className="h-4 w-4" />
          <span>Reset layout</span>
        </button>
      </div>
    </div>
  );
}
 