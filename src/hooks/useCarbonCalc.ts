"use client";

import { useMemo } from "react";
import type { Activity, StatsData, DailyDataPoint } from "@/types";
import {
  totalCo2,
  dailyAverageCo2,
  projectMonthlyImpact,
  calculateEquivalent,
  groupActivitiesByDate,
} from "@/lib/carbon-calculator";

/* ═══════════════════════════════════════
   useCarbonCalc Hook
   Memoized calculation pipeline
   ═══════════════════════════════════════ */

export function useCarbonCalc(activities: Activity[]): {
  stats: StatsData;
  dailyData: DailyDataPoint[];
} {
  const dailyData = useMemo(
    () => groupActivitiesByDate(activities, 30),
    [activities]
  );

  const stats = useMemo((): StatsData => {
    const total = totalCo2(activities);
    const avg = dailyAverageCo2(activities, 30);
    const projected = projectMonthlyImpact(activities);

    // Find best and worst days
    const daysWithActivity = dailyData.filter((d) => d.co2 > 0);
    const bestDay =
      daysWithActivity.length > 0
        ? daysWithActivity.reduce((best, day) =>
            day.co2 < best.co2 ? day : best
          )
        : { date: new Date().toISOString().split("T")[0], co2: 0 };

    const worstDay =
      daysWithActivity.length > 0
        ? daysWithActivity.reduce((worst, day) =>
            day.co2 > worst.co2 ? day : worst
          )
        : { date: new Date().toISOString().split("T")[0], co2: 0 };

    // Calculate trend
    const firstHalf = dailyData.slice(0, 15);
    const secondHalf = dailyData.slice(15);
    const firstAvg =
      firstHalf.reduce((s, d) => s + d.co2, 0) /
      Math.max(firstHalf.length, 1);
    const secondAvg =
      secondHalf.reduce((s, d) => s + d.co2, 0) /
      Math.max(secondHalf.length, 1);

    let trend: "improving" | "stable" | "worsening";
    const diff = ((secondAvg - firstAvg) / Math.max(firstAvg, 0.01)) * 100;
    if (diff < -5) trend = "improving";
    else if (diff > 5) trend = "worsening";
    else trend = "stable";

    const reduction =
      firstAvg > 0
        ? Math.round(((firstAvg - secondAvg) / firstAvg) * 100)
        : 0;

    return {
      totalCo2: Math.round(total * 100) / 100,
      dailyAverage: avg,
      bestDay: { date: bestDay.date, amount: bestDay.co2 },
      worstDay: { date: worstDay.date, amount: worstDay.co2 },
      treesEquiv: calculateEquivalent(total, "trees").value,
      carsEquiv: calculateEquivalent(total, "cars").value,
      projectedMonthly: projected,
      trend,
      reductionPercentage: reduction,
    };
  }, [activities, dailyData]);

  return { stats, dailyData };
}
