"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Lock } from "lucide-react";
import { useGamification } from "@/context/GamificationContext";
import { formatPoints, getNextBadge } from "@/lib/points-engine";
import confetti from "canvas-confetti";

export function GamificationDisplay() {
  const { points, badges, triggerConfetti, setTriggerConfetti } =
    useGamification();

  const unlockedBadges = badges.filter((b) => b.unlocked);
  const lockedBadges = badges.filter((b) => !b.unlocked);
  const nextBadge = getNextBadge(points, badges);

  // Fire confetti on badge unlock
  useEffect(() => {
    if (!triggerConfetti) return;

    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ["#2D6A4F", "#52B788", "#D4A373", "#FEFAE0"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ["#2D6A4F", "#52B788", "#D4A373", "#FEFAE0"],
      });

      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();
    setTimeout(() => setTriggerConfetti(false), duration);
  }, [triggerConfetti, setTriggerConfetti]);

  return (
    <div className="glass-card space-y-5">
      {/* Points header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal-300 dark:text-carbon-muted">
            Eco Points
          </h3>
          <motion.div
            className="flex items-baseline gap-1"
            key={points}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
          >
            <span className="font-display text-4xl font-bold text-leaf-500">
              {formatPoints(points)}
            </span>
            <Star
              className="h-5 w-5 text-amber-400"
              fill="currentColor"
              aria-hidden="true"
            />
          </motion.div>
        </div>

        {/* Next badge progress */}
        {nextBadge && (
          <div className="text-right">
            <p className="text-xs text-charcoal-300 dark:text-carbon-muted">
              Next: {nextBadge.badge.name}
            </p>
            <div className="mt-1 h-2 w-24 overflow-hidden rounded-full bg-mist-200 dark:bg-carbon-surface">
              <motion.div
                className="h-full rounded-full bg-gradient-sage"
                initial={{ width: 0 }}
                animate={{ width: `${nextBadge.progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
            <p className="mt-0.5 text-[10px] text-charcoal-200 dark:text-carbon-muted">
              {nextBadge.progress}%
            </p>
          </div>
        )}
      </div>

      {/* Unlocked badges */}
      <div>
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-charcoal-300 dark:text-carbon-muted">
          Earned Badges ({unlockedBadges.length})
        </h4>
        <div className="flex flex-wrap gap-2">
          <AnimatePresence>
            {unlockedBadges.map((badge) => (
              <motion.div
                key={badge.id}
                className="group relative flex items-center gap-1.5 rounded-xl border border-sage-200 bg-sage-50 px-3 py-1.5 dark:border-sage-800 dark:bg-sage-900/30"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                title={badge.description}
              >
                <span className="text-lg" role="img" aria-label={badge.name}>
                  {badge.icon}
                </span>
                <span className="text-xs font-medium text-sage-700 dark:text-sage-300">
                  {badge.name}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Locked badges preview */}
      {lockedBadges.length > 0 && (
        <div>
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-charcoal-300 dark:text-carbon-muted">
            Upcoming ({lockedBadges.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {lockedBadges.slice(0, 4).map((badge) => (
              <div
                key={badge.id}
                className="flex items-center gap-1.5 rounded-xl border border-mist-200 bg-mist-50 px-3 py-1.5 opacity-60 dark:border-carbon-surface dark:bg-carbon-card"
                title={`${badge.name} — ${badge.pointsRequired} points needed`}
              >
                <Lock className="h-3 w-3 text-charcoal-200 dark:text-carbon-muted" aria-hidden="true" />
                <span className="text-xs text-charcoal-300 dark:text-carbon-muted">
                  {badge.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
