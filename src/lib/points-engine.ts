import type { Activity, Badge, BadgeId } from "@/types";
import {
  POINTS_PER_KG_SAVED,
  STREAK_MULTIPLIERS,
  ACTION_POINTS,
  DAILY_BUDGET_KG,
  BADGE_DEFINITIONS,
} from "./constants";

/* ═══════════════════════════════════════
   Points & Gamification Engine
   ═══════════════════════════════════════ */

/**
 * Get the streak multiplier for a given streak length.
 */
export function getStreakMultiplier(streakDays: number): number {
  const thresholds = Object.keys(STREAK_MULTIPLIERS)
    .map(Number)
    .sort((a, b) => b - a);

  for (const threshold of thresholds) {
    if (streakDays >= threshold) {
      return STREAK_MULTIPLIERS[threshold.toString()];
    }
  }
  return 1.0;
}

/**
 * Calculate points earned for logging an activity.
 * Points scale with CO₂ reduction potential and streak multiplier.
 */
export function calculateActivityPoints(
  co2Amount: number,
  category: string,
  streakDays: number = 0
): number {
  const multiplier = getStreakMultiplier(streakDays);
  const basePoints = ACTION_POINTS.LOG_ACTIVITY;

  // Bonus for low-emission activities
  const savingsBonus =
    co2Amount < DAILY_BUDGET_KG / 4
      ? Math.round(
          (DAILY_BUDGET_KG / 4 - co2Amount) * POINTS_PER_KG_SAVED
        )
      : 0;

  return Math.round((basePoints + savingsBonus) * multiplier);
}

/**
 * Calculate bonus points for staying under budget.
 */
export function calculateBudgetBonus(
  todayCo2: number,
  budget: number = DAILY_BUDGET_KG
): number {
  if (todayCo2 >= budget) return 0;
  const percentage = ((budget - todayCo2) / budget) * 100;
  if (percentage > 50) return ACTION_POINTS.STAY_UNDER_BUDGET * 2;
  if (percentage > 25) return ACTION_POINTS.STAY_UNDER_BUDGET;
  return Math.round(ACTION_POINTS.STAY_UNDER_BUDGET * 0.5);
}

/**
 * Check which badges should be unlocked based on total points.
 * Returns array of newly unlocked badges.
 */
export function checkBadgeUnlocks(
  totalPoints: number,
  currentBadges: Badge[]
): Badge[] {
  const newlyUnlocked: Badge[] = [];

  for (const definition of BADGE_DEFINITIONS) {
    const existing = currentBadges.find((b) => b.id === definition.id);
    if (existing?.unlocked) continue;

    if (totalPoints >= definition.pointsRequired) {
      newlyUnlocked.push({
        ...definition,
        unlocked: true,
        unlockedAt: new Date().toISOString(),
      });
    }
  }

  return newlyUnlocked;
}

/**
 * Check if a specific badge should be unlocked based on custom criteria.
 */
export function checkSpecialBadge(
  badgeId: BadgeId,
  activities: Activity[],
  streakDays: number
): boolean {
  switch (badgeId) {
    case "first-log":
      return activities.length >= 1;
    case "week-streak":
      return streakDays >= 7;
    case "month-streak":
      return streakDays >= 30;
    case "energy-saver-pro":
      return (
        activities.filter((a) => a.category === "energy").length >= 50
      );
    case "waste-warrior": {
      const wasteReduction = activities
        .filter((a) => a.category === "waste")
        .reduce((sum, a) => sum + a.co2Amount, 0);
      return wasteReduction >= 100;
    }
    case "transit-champion":
      return (
        activities.filter((a) => a.category === "transport").length >= 30
      );
    case "century-club":
      return activities.length >= 100;
    default:
      return false;
  }
}

/**
 * Get the next badge the user is closest to unlocking.
 */
export function getNextBadge(
  totalPoints: number,
  currentBadges: Badge[]
): { badge: Badge; progress: number } | null {
  const locked = BADGE_DEFINITIONS.filter(
    (def) => !currentBadges.find((b) => b.id === def.id && b.unlocked)
  ).sort((a, b) => a.pointsRequired - b.pointsRequired);

  if (locked.length === 0) return null;

  const next = locked[0];
  const progress = Math.min(
    100,
    Math.round((totalPoints / next.pointsRequired) * 100)
  );

  return { badge: next, progress };
}

/**
 * Calculate total accumulated points from activities.
 */
export function totalPoints(activities: Activity[]): number {
  return activities.reduce((sum, a) => sum + a.points, 0);
}

/**
 * Format points with locale-aware number formatting.
 */
export function formatPoints(points: number): string {
  if (points >= 10000) {
    return `${(points / 1000).toFixed(1)}k`;
  }
  return points.toLocaleString();
}
