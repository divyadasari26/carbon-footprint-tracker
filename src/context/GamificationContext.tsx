"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  useEffect,
} from "react";
import type { Badge, Pledge, GamificationContextType } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useDailyStreak } from "@/hooks/useDailyStreak";
import { checkBadgeUnlocks, getNextBadge } from "@/lib/points-engine";
import { BADGE_DEFINITIONS, DEFAULT_PLEDGES } from "@/lib/constants";

const GamificationContext =
  createContext<GamificationContextType | null>(null);

export function GamificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [points, setPoints] = useLocalStorage<number>(
    "carbon-tracker-points",
    120
  );
  const [badges, setBadges] = useLocalStorage<Badge[]>(
    "carbon-tracker-badges",
    BADGE_DEFINITIONS.map((b) =>
      b.id === "first-log"
        ? { ...b, unlocked: true, unlockedAt: new Date().toISOString() }
        : b
    )
  );
  const [pledges, setPledges] = useLocalStorage<Pledge[]>(
    "carbon-tracker-pledges",
    DEFAULT_PLEDGES
  );
  const [triggerConfetti, setTriggerConfetti] = useState(false);
  const { streak } = useDailyStreak();

  const addPoints = useCallback(
    (amount: number) => {
      setPoints((prev) => prev + amount);
    },
    [setPoints]
  );

  const checkBadges = useCallback((): Badge[] => {
    const newBadges = checkBadgeUnlocks(points, badges);
    if (newBadges.length > 0) {
      setBadges((prev) =>
        prev.map((b) => {
          const unlocked = newBadges.find((nb) => nb.id === b.id);
          return unlocked ?? b;
        })
      );
      setTriggerConfetti(true);
    }
    return newBadges;
  }, [points, badges, setBadges]);

  // Auto-check badges when points change
  useEffect(() => {
    checkBadges();
  }, [points]); // eslint-disable-line react-hooks/exhaustive-deps

  const joinPledge = useCallback(
    (pledgeId: string) => {
      setPledges((prev) =>
        prev.map((p) =>
          p.id === pledgeId
            ? { ...p, communityParticipants: p.communityParticipants + 1 }
            : p
        )
      );
    },
    [setPledges]
  );

  const updatePledgeProgress = useCallback(
    (pledgeId: string, amount: number) => {
      setPledges((prev) =>
        prev.map((p) => {
          if (p.id !== pledgeId) return p;
          const newReduction = p.currentReduction + amount;
          const completed = newReduction >= p.targetReduction;
          if (completed && !p.completed) {
            // Award completion bonus
            setPoints((pts) => pts + 100);
            setTriggerConfetti(true);
          }
          return {
            ...p,
            currentReduction: Math.min(newReduction, p.targetReduction),
            completed,
          };
        })
      );
    },
    [setPledges, setPoints]
  );

  const value = useMemo(
    (): GamificationContextType => ({
      points,
      streak,
      badges,
      pledges,
      addPoints,
      checkBadges,
      joinPledge,
      updatePledgeProgress,
      triggerConfetti,
      setTriggerConfetti,
    }),
    [
      points,
      streak,
      badges,
      pledges,
      addPoints,
      checkBadges,
      joinPledge,
      updatePledgeProgress,
      triggerConfetti,
    ]
  );

  return (
    <GamificationContext.Provider value={value}>
      {children}
    </GamificationContext.Provider>
  );
}

export function useGamification(): GamificationContextType {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error(
      "useGamification must be used within a GamificationProvider"
    );
  }
  return context;
}
