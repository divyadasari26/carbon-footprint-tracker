import type { ActivityCategory, EmissionFactor, Activity, DailyDataPoint } from "@/types";
import { EMISSION_FACTORS, EQUIVALENTS, DAILY_BUDGET_KG } from "./constants";

/* ═══════════════════════════════════════
   Carbon Calculator Utility
   ═══════════════════════════════════════ */

/**
 * Get emission factor for a given category and subcategory.
 * Returns null if no matching factor is found.
 */
export function getEmissionFactor(
  category: ActivityCategory,
  subcategory: string
): EmissionFactor | null {
  return (
    EMISSION_FACTORS.find(
      (ef) => ef.category === category && ef.subcategory === subcategory
    ) ?? null
  );
}

/**
 * Get all emission factors for a given category.
 */
export function getFactorsByCategory(
  category: ActivityCategory
): EmissionFactor[] {
  return EMISSION_FACTORS.filter((ef) => ef.category === category);
}

/**
 * Calculate CO₂ emissions for a given activity.
 *
 * @param category - The activity category
 * @param subcategory - Specific subcategory (e.g., "car_gasoline")
 * @param amount - Amount in the factor's unit
 * @returns CO₂ in kg, or 0 if factor not found
 */
export function calculateEmission(
  category: ActivityCategory,
  subcategory: string,
  amount: number
): number {
  if (amount < 0) return 0;
  if (!Number.isFinite(amount)) return 0;

  const factor = getEmissionFactor(category, subcategory);
  if (!factor) return 0;

  return Math.round(factor.factor * amount * 1000) / 1000;
}

/**
 * Calculate equivalent impact metrics from CO₂ amount.
 */
export function calculateEquivalent(
  co2Kg: number,
  type: "trees" | "cars" | "flights" | "phones"
): { value: number; label: string } {
  if (co2Kg <= 0 || !Number.isFinite(co2Kg)) {
    return { value: 0, label: getEquivalentLabel(type, 0) };
  }

  let value: number;

  switch (type) {
    case "trees":
      value = co2Kg / EQUIVALENTS.TREE_ABSORPTION_KG_PER_YEAR;
      break;
    case "cars":
      value = co2Kg / EQUIVALENTS.CAR_EMISSION_KG_PER_YEAR;
      break;
    case "flights":
      value = co2Kg / EQUIVALENTS.FLIGHT_KG;
      break;
    case "phones":
      value = co2Kg / EQUIVALENTS.PHONE_CHARGE_KG;
      break;
    default:
      value = 0;
  }

  return {
    value: Math.round(value * 100) / 100,
    label: getEquivalentLabel(type, value),
  };
}

function getEquivalentLabel(
  type: "trees" | "cars" | "flights" | "phones",
  value: number
): string {
  const rounded = Math.round(value * 10) / 10;
  switch (type) {
    case "trees":
      return `${rounded} tree${rounded !== 1 ? "s" : ""} planted for a year`;
    case "cars":
      return `${rounded} car${rounded !== 1 ? "s" : ""} off the road for a year`;
    case "flights":
      return `${rounded} short-haul flight${rounded !== 1 ? "s" : ""}`;
    case "phones":
      return `${rounded.toLocaleString()} phone charge${rounded !== 1 ? "s" : ""}`;
  }
}

/**
 * Calculate total CO₂ from an array of activities.
 */
export function totalCo2(activities: Activity[]): number {
  return activities.reduce((sum, a) => sum + a.co2Amount, 0);
}

/**
 * Calculate daily average CO₂ from activities over a date range.
 */
export function dailyAverageCo2(
  activities: Activity[],
  days: number = 30
): number {
  if (days <= 0) return 0;
  const total = totalCo2(activities);
  return Math.round((total / days) * 100) / 100;
}

/**
 * Get best (lowest CO₂) day from daily data.
 */
export function getBestDay(
  dailyData: DailyDataPoint[]
): { date: string; amount: number } | null {
  if (dailyData.length === 0) return null;
  return dailyData.reduce((best, day) =>
    day.co2 < best.co2 ? day : best
  , { date: dailyData[0].date, amount: dailyData[0].co2, co2: dailyData[0].co2 }) as unknown as { date: string; amount: number };
}

/**
 * Project monthly impact based on recent activity trends.
 * Uses exponentially weighted moving average of last 7 days.
 */
export function projectMonthlyImpact(activities: Activity[]): number {
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const recentActivities = activities.filter(
    (a) => new Date(a.timestamp) >= sevenDaysAgo
  );

  if (recentActivities.length === 0) return 0;

  const dailyTotals: Record<string, number> = {};
  recentActivities.forEach((a) => {
    const day = a.timestamp.split("T")[0];
    dailyTotals[day] = (dailyTotals[day] || 0) + a.co2Amount;
  });

  const dailyValues = Object.values(dailyTotals);
  if (dailyValues.length === 0) return 0;

  // Weighted average giving more weight to recent days
  let weightedSum = 0;
  let weightTotal = 0;
  dailyValues.forEach((val, i) => {
    const weight = Math.pow(0.9, dailyValues.length - 1 - i);
    weightedSum += val * weight;
    weightTotal += weight;
  });

  const weightedDailyAvg = weightedSum / weightTotal;
  return Math.round(weightedDailyAvg * 30 * 100) / 100;
}

/**
 * Calculate remaining daily budget.
 */
export function remainingBudget(
  todayCo2: number,
  budget: number = DAILY_BUDGET_KG
): number {
  return Math.max(0, budget - todayCo2);
}

/**
 * Get budget status color based on usage percentage.
 */
export function getBudgetStatus(
  used: number,
  budget: number = DAILY_BUDGET_KG
): "safe" | "warning" | "danger" {
  const percentage = (used / budget) * 100;
  if (percentage < 60) return "safe";
  if (percentage < 85) return "warning";
  return "danger";
}

/**
 * Group activities by date for chart data.
 */
export function groupActivitiesByDate(
  activities: Activity[],
  days: number = 30
): DailyDataPoint[] {
  const now = new Date();
  const result: DailyDataPoint[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const dateStr = date.toISOString().split("T")[0];

    const dayActivities = activities.filter(
      (a) => a.timestamp.split("T")[0] === dateStr
    );

    result.push({
      date: dateStr,
      co2: Math.round(totalCo2(dayActivities) * 100) / 100,
      budget: DAILY_BUDGET_KG,
      points: dayActivities.reduce((sum, a) => sum + a.points, 0),
    });
  }

  return result;
}
