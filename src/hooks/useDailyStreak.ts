"use client";

import { useCallback } from "react";
import { useLocalStorage } from "./useLocalStorage";

/* ═══════════════════════════════════════
   useDailyStreak Hook
   Tracks consecutive daily logging streaks
   ═══════════════════════════════════════ */

function getDateString(date: Date = new Date()): string {
  return date.toISOString().split("T")[0];
}

function daysBetween(date1: string, date2: string): number {
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();
  return Math.floor(Math.abs(d2 - d1) / (24 * 60 * 60 * 1000));
}

interface StreakData {
  count: number;
  lastDate: string;
  longestStreak: number;
}

export function useDailyStreak(): {
  streak: number;
  longestStreak: number;
  recordActivity: () => void;
  resetStreak: () => void;
} {
  const [streakData, setStreakData] = useLocalStorage<StreakData>(
    "carbon-tracker-streak",
    {
      count: 0,
      lastDate: "",
      longestStreak: 0,
    }
  );

  const recordActivity = useCallback(() => {
    const today = getDateString();

    setStreakData((prev) => {
      // Already logged today
      if (prev.lastDate === today) return prev;

      const yesterday = getDateString(
        new Date(Date.now() - 24 * 60 * 60 * 1000)
      );

      let newCount: number;
      if (prev.lastDate === yesterday) {
        // Consecutive day
        newCount = prev.count + 1;
      } else if (prev.lastDate === "") {
        // First ever log
        newCount = 1;
      } else {
        // Streak broken
        newCount = 1;
      }

      return {
        count: newCount,
        lastDate: today,
        longestStreak: Math.max(prev.longestStreak, newCount),
      };
    });
  }, [setStreakData]);

  const resetStreak = useCallback(() => {
    setStreakData({ count: 0, lastDate: "", longestStreak: 0 });
  }, [setStreakData]);

  // Check if streak should be broken (no activity yesterday)
  const today = getDateString();
  const yesterday = getDateString(
    new Date(Date.now() - 24 * 60 * 60 * 1000)
  );

  const currentStreak =
    streakData.lastDate === today || streakData.lastDate === yesterday
      ? streakData.count
      : 0;

  return {
    streak: currentStreak,
    longestStreak: streakData.longestStreak,
    recordActivity,
    resetStreak,
  };
}
