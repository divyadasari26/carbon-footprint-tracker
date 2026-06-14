"use client";

import React from "react";
import { ThemeProvider } from "./ThemeContext";
import { ActivityProvider } from "./ActivityContext";
import { GamificationProvider } from "./GamificationContext";

/* ═══════════════════════════════════════
   AppProvider — Composed Provider Wrapper
   ═══════════════════════════════════════ */

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <ActivityProvider>
        <GamificationProvider>{children}</GamificationProvider>
      </ActivityProvider>
    </ThemeProvider>
  );
}
