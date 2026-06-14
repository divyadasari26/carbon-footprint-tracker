"use client";

import React from "react";
import { useActivities } from "@/context/ActivityContext";
import { useCarbonCalc } from "@/hooks/useCarbonCalc";
import { StatsGrid } from "@/components/analytics/StatsGrid";
import { TrackerLineChart } from "@/components/analytics/TrackerLineChart";
import { BarChart3, ShieldAlert } from "lucide-react";

export default function AnalyticsPage() {
  const { activities } = useActivities();
  const { stats, dailyData } = useCarbonCalc(activities);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-mist-200 dark:border-carbon-surface pb-5">
        <div>
          <h1 className="text-2xl font-extrabold text-charcoal-700 dark:text-carbon-text font-display flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-leaf-500" />
            My Eco Tracker
          </h1>
          <p className="text-xs text-charcoal-400 dark:text-carbon-muted mt-1">
            Analyze your carbon emissions trends, energy consumption patterns, and eco-points performance
          </p>
        </div>
      </div>

      {/* Main Content */}
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 border-2 border-dashed border-mist-300 dark:border-carbon-surface rounded-2xl bg-white dark:bg-carbon-card text-center">
          <ShieldAlert className="h-10 w-10 text-charcoal-300 dark:text-carbon-muted mb-3" />
          <h3 className="font-bold text-charcoal-600 dark:text-carbon-text font-display">No Activities Logged Yet</h3>
          <p className="text-xs text-charcoal-400 dark:text-carbon-muted mt-1 max-w-sm">
            Go to the main dashboard to record your first green activity. Your 30-day chart will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          <StatsGrid stats={stats} />
          <TrackerLineChart data={dailyData} />
        </div>
      )}
    </div>
  );
}
