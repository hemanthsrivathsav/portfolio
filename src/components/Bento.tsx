import React, { type HTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";

export function Bento({ children, className = "", theme = "dark", ...rest }: { children: ReactNode; className?: string; theme?: "dark" | "light" } & HTMLAttributes<HTMLDivElement>) {
  const isLight = theme === "light";
  return (
    <motion.div
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className={`rounded-3xl p-5 backdrop-blur-md border ${isLight ? "bg-white/70 border-black/10 shadow-sm" : "bg-white/5 border-white/10"} ${className}`}
      {...rest}
    >
      {children}
    </motion.div>
  );
}