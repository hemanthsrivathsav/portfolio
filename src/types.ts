export type Theme = "dark" | "light";
export type BgLevel = "low" | "mid" | "high";

export const BG_LEVELS: readonly BgLevel[] = ["low", "mid", "high"];

export const isTheme = (v: unknown): v is Theme => v === "dark" || v === "light";
export const isBgLevel = (v: unknown): v is BgLevel => BG_LEVELS.includes(v as BgLevel);
