"use client";

import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import type { ThemeContextType } from "@/types";

/* ═══════════════════════════════════════
   useTheme Hook
   Convenience wrapper for ThemeContext
   ═══════════════════════════════════════ */

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
