"use client";

import React, {
  createContext,
  useContext,
  useCallback,
  useMemo,
} from "react";
import type { Activity, ActivityContextType, DailyDataPoint } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import {
  totalCo2,
  groupActivitiesByDate,
} from "@/lib/carbon-calculator";
import { calculateActivityPoints } from "@/lib/points-engine";
import { DAILY_BUDGET_KG } from "@/lib/constants";
import { MOCK_ACTIVITIES } from "@/data/mock-activities";

const ActivityContext = createContext<ActivityContextType | null>(null);

export function ActivityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activities, setActivities] = useLocalStorage<Activity[]>(
    "carbon-tracker-activities",
    MOCK_ACTIVITIES
  );

  const todayStr = new Date().toISOString().split("T")[0];

  const todayActivities = useMemo(
    () =>
      activities.filter(
        (a) => a.timestamp.split("T")[0] === todayStr
      ),
    [activities, todayStr]
  );

  const todayCo2 = useMemo(
    () => Math.round(totalCo2(todayActivities) * 100) / 100,
    [todayActivities]
  );

  const dailyHistory = useMemo(
    () => groupActivitiesByDate(activities, 30),
    [activities]
  );

  const addActivity = useCallback(
    (input: Omit<Activity, "id" | "timestamp" | "points">) => {
      const points = calculateActivityPoints(input.co2Amount, input.category);
      const newActivity: Activity = {
        ...input,
        id: `act-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        timestamp: new Date().toISOString(),
        points,
      };
      setActivities((prev) => [newActivity, ...prev]);
    },
    [setActivities]
  );

  const removeActivity = useCallback(
    (id: string) => {
      setActivities((prev) => prev.filter((a) => a.id !== id));
    },
    [setActivities]
  );

  const clearActivities = useCallback(() => {
    setActivities([]);
  }, [setActivities]);

  const value = useMemo(
    (): ActivityContextType => ({
      activities,
      todayActivities,
      todayCo2,
      dailyBudget: DAILY_BUDGET_KG,
      addActivity,
      removeActivity,
      clearActivities,
      dailyHistory,
    }),
    [
      activities,
      todayActivities,
      todayCo2,
      addActivity,
      removeActivity,
      clearActivities,
      dailyHistory,
    ]
  );

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}

export function useActivities(): ActivityContextType {
  const context = useContext(ActivityContext);
  if (!context) {
    throw new Error(
      "useActivities must be used within an ActivityProvider"
    );
  }
  return context;
}
