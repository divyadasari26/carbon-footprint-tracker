"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Users, CheckCircle2 } from "lucide-react";
import { useGamification } from "@/context/GamificationContext";

export function PledgeDashboard() {
  const { pledges, updatePledgeProgress } = useGamification();

  return (
    <div className="glass-card space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal-300 dark:text-carbon-muted">
          My Pledges
        </h3>
        <Target className="h-4 w-4 text-sage-400" aria-hidden="true" />
      </div>

      <div className="space-y-4">
        {pledges.map((pledge, i) => {
          const progress = Math.min(
            (pledge.currentReduction / pledge.targetReduction) * 100,
            100
          );

          return (
            <motion.div
              key={pledge.id}
              className="space-y-2 rounded-xl border border-mist-200 p-4 dark:border-carbon-surface"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-semibold text-charcoal-500 dark:text-carbon-text">
                      {pledge.title}
                    </h4>
                    {pledge.completed && (
                      <CheckCircle2
                        className="h-4 w-4 text-sage-500"
                        aria-label="Completed"
                      />
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-charcoal-300 dark:text-carbon-muted">
                    {pledge.description}
                  </p>
                </div>
              </div>

              {/* Individual progress */}
              <div>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-charcoal-400 dark:text-carbon-muted">
                    Your progress
                  </span>
                  <span className="font-medium text-leaf-500">
                    {pledge.currentReduction.toFixed(1)} / {pledge.targetReduction} kg
                  </span>
                </div>
                <div className="progress-track">
                  <motion.div
                    className={`progress-fill ${pledge.completed ? "!bg-sage-500" : ""}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.15 }}
                  />
                </div>
              </div>

              {/* Community progress */}
              <div className="flex items-center gap-3 text-xs text-charcoal-300 dark:text-carbon-muted">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" aria-hidden="true" />
                  <span>{pledge.communityParticipants.toLocaleString()}</span>
                </div>
                <div className="flex flex-1 items-center gap-2">
                  <span>Community:</span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-mist-200 dark:bg-carbon-surface">
                    <motion.div
                      className="h-full rounded-full bg-earth-400/60"
                      initial={{ width: 0 }}
                      animate={{ width: `${pledge.communityProgress}%` }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.5 + i * 0.1 }}
                    />
                  </div>
                  <span>{pledge.communityProgress}%</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
