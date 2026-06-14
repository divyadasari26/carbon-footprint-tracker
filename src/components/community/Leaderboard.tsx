"use client";

import React, { useState } from "react";
import { MOCK_LEADERBOARD } from "@/data/mock-leaderboard";
import { Award, Flame, Leaf, Trophy } from "lucide-react";

export function Leaderboard() {
  const [sortBy, setSortBy] = useState<"points" | "co2">("points");

  const sortedLeaderboard = [...MOCK_LEADERBOARD].sort((a, b) => {
    if (sortBy === "points") {
      return b.points - a.points;
    } else {
      return b.co2Reduced - a.co2Reduced;
    }
  });

  // Re-assign ranks based on the sort order
  const rankedLeaderboard = sortedLeaderboard.map((item, index) => ({
    ...item,
    rank: index + 1,
  }));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-charcoal-700 dark:text-carbon-text font-display flex items-center gap-2">
          <Trophy className="h-5 w-5 text-amber-500" />
          Community Leaderboard
        </h3>
        <div className="flex bg-mist-100 dark:bg-carbon-surface p-0.5 rounded-lg border border-mist-200 dark:border-carbon-surface">
          <button
            onClick={() => setSortBy("points")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              sortBy === "points"
                ? "bg-white text-leaf-500 shadow-sm dark:bg-carbon-card dark:text-sage-400"
                : "text-charcoal-400 dark:text-carbon-muted hover:text-charcoal-600"
            }`}
          >
            By Points
          </button>
          <button
            onClick={() => setSortBy("co2")}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              sortBy === "co2"
                ? "bg-white text-leaf-500 shadow-sm dark:bg-carbon-card dark:text-sage-400"
                : "text-charcoal-400 dark:text-carbon-muted hover:text-charcoal-600"
            }`}
          >
            By CO₂ Saved
          </button>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-mist-200 dark:border-carbon-surface bg-white dark:bg-carbon-card shadow-sm">
        <div className="max-h-[360px] overflow-y-auto custom-scrollbar divide-y divide-mist-100 dark:divide-carbon-surface">
          {rankedLeaderboard.map((user) => {
            const isSelf = user.isCurrentUser;
            const isTop3 = user.rank <= 3;

            return (
              <div
                key={user.name}
                className={`flex items-center justify-between p-3.5 transition-colors ${
                  isSelf
                    ? "bg-leaf-500/5 dark:bg-leaf-950/20 font-semibold"
                    : "hover:bg-mist-50/50 dark:hover:bg-carbon-surface/30"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* Rank Badge */}
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                      user.rank === 1
                        ? "bg-amber-500 text-white"
                        : user.rank === 2
                        ? "bg-slate-300 text-slate-800"
                        : user.rank === 3
                        ? "bg-amber-700 text-white"
                        : "text-charcoal-400 dark:text-carbon-muted"
                    }`}
                  >
                    {user.rank}
                  </span>

                  {/* Avatar & Name */}
                  <span className="text-xl" role="img" aria-label="user avatar">
                    {user.avatar}
                  </span>
                  <span
                    className={`truncate text-sm ${
                      isSelf
                        ? "text-leaf-600 dark:text-sage-300"
                        : "text-charcoal-600 dark:text-carbon-text"
                    }`}
                  >
                    {user.name} {isSelf && <span className="text-[10px] text-leaf-500 font-normal">(You)</span>}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-medium text-charcoal-400 dark:text-carbon-muted">
                  {/* Streak */}
                  {user.streak > 0 && (
                    <span className="flex items-center gap-0.5 text-amber-600 dark:text-amber-400" title={`${user.streak} day streak`}>
                      <Flame className="h-3.5 w-3.5 fill-current" />
                      {user.streak}d
                    </span>
                  )}

                  {/* Value */}
                  {sortBy === "points" ? (
                    <span className="font-bold text-charcoal-600 dark:text-carbon-text">
                      {user.points.toLocaleString()} pts
                    </span>
                  ) : (
                    <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                      <Leaf className="h-3.5 w-3.5" />
                      {user.co2Reduced} kg
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
export default Leaderboard;
