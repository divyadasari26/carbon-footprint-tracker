"use client";

import React from "react";
import { motion } from "framer-motion";
import { Flame, Trophy } from "lucide-react";

interface DailyStreakCounterProps {
  streak: number;
  longestStreak?: number;
}

export function DailyStreakCounter({
  streak,
  longestStreak,
}: DailyStreakCounterProps) {
  const streakLevel =
    streak >= 30
      ? { color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/30", label: "Legendary" }
      : streak >= 14
        ? { color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/30", label: "On Fire" }
        : streak >= 7
          ? { color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/30", label: "Hot Streak" }
          : streak >= 3
            ? { color: "text-sage-500", bg: "bg-sage-50 dark:bg-sage-950/30", label: "Warming Up" }
            : { color: "text-charcoal-300", bg: "bg-mist-50 dark:bg-carbon-surface", label: "Getting Started" };

  return (
    <motion.div
      className={`glass-card flex items-center gap-4 ${streakLevel.bg}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <motion.div
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${streakLevel.bg}`}
        animate={streak > 0 ? { scale: [1, 1.1, 1] } : {}}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <Flame
          className={`h-7 w-7 ${streakLevel.color}`}
          aria-hidden="true"
        />
      </motion.div>

      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <motion.span
            className={`font-display text-3xl font-bold ${streakLevel.color}`}
            key={streak}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {streak}
          </motion.span>
          <span className="text-sm text-charcoal-400 dark:text-carbon-muted">
            {streak === 1 ? "day" : "days"}
          </span>
        </div>
        <p className="text-xs font-medium text-charcoal-300 dark:text-carbon-muted">
          {streakLevel.label}
        </p>
      </div>

      {longestStreak !== undefined && longestStreak > 0 && (
        <div className="flex flex-col items-center gap-1 rounded-xl bg-white/50 px-3 py-2 dark:bg-carbon-dark/50">
          <Trophy className="h-4 w-4 text-amber-500" aria-hidden="true" />
          <span className="text-xs font-bold text-charcoal-400 dark:text-carbon-muted">
            {longestStreak}
          </span>
          <span className="text-[10px] text-charcoal-300 dark:text-carbon-muted">
            Best
          </span>
        </div>
      )}
    </motion.div>
  );
}
