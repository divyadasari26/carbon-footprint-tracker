"use client";

import { useState } from "react";
import type { StatsData } from "@/types";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Trees,
  Car,
  Calendar,
  Zap,
  HelpCircle,
  Percent,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface StatsGridProps {
  stats: StatsData;
}

export function StatsGrid({ stats }: StatsGridProps) {
  const [showEquivalent, setShowEquivalent] = useState<boolean>(false);

  const trendIcon = {
    improving: <TrendingDown className="h-5 w-5 text-emerald-500" />,
    worsening: <TrendingUp className="h-5 w-5 text-rose-500" />,
    stable: <Minus className="h-5 w-5 text-amber-500" />,
  }[stats.trend];

  const trendText = {
    improving: "Improving",
    worsening: "Worsening",
    stable: "Stable",
  }[stats.trend];

  const trendColorClass = {
    improving: "text-emerald-500 dark:text-emerald-400 bg-emerald-500/10",
    worsening: "text-rose-500 dark:text-rose-400 bg-rose-500/10",
    stable: "text-amber-500 dark:text-amber-400 bg-amber-500/10",
  }[stats.trend];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-charcoal-700 dark:text-carbon-text font-display">
          Environmental Impact Summary
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-charcoal-400 dark:text-carbon-muted">
            Equivalent Impact
          </span>
          <button
            onClick={() => setShowEquivalent(!showEquivalent)}
            aria-checked={showEquivalent}
            role="switch"
            aria-label="Toggle equivalent environmental impact view"
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 ${
              showEquivalent ? "bg-leaf-500" : "bg-charcoal-200 dark:bg-carbon-surface"
            }`}
          >
            <span
              aria-hidden="true"
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                showEquivalent ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total CO2 Card */}
        <div className="stat-card p-5 relative overflow-hidden dark:bg-carbon-card dark:border-carbon-surface bg-white border border-mist-200 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start w-full">
            <span className="text-sm font-medium text-charcoal-400 dark:text-carbon-muted">
              Total Carbon Footprint
            </span>
            <div className="p-2 bg-leaf-500/10 text-leaf-500 rounded-xl">
              <Zap className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-charcoal-700 dark:text-carbon-text font-display">
              {stats.totalCo2}
            </span>
            <span className="text-sm text-charcoal-400 dark:text-carbon-muted font-medium">
              kg CO₂
            </span>
          </div>
          <p className="mt-2 text-xs text-charcoal-400 dark:text-carbon-muted">
            Cumulative total over last 30 days
          </p>
        </div>

        {/* Daily Average Card */}
        <div className="stat-card p-5 relative overflow-hidden dark:bg-carbon-card dark:border-carbon-surface bg-white border border-mist-200 rounded-2xl shadow-sm">
          <div className="flex justify-between items-start w-full">
            <span className="text-sm font-medium text-charcoal-400 dark:text-carbon-muted">
              Daily Average
            </span>
            <div className="p-2 bg-sage-500/10 text-sage-500 rounded-xl">
              <Calendar className="h-5 w-5" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-charcoal-700 dark:text-carbon-text font-display">
              {stats.dailyAverage}
            </span>
            <span className="text-sm text-charcoal-400 dark:text-carbon-muted font-medium">
              kg CO₂/day
            </span>
          </div>
          <p className="mt-2 text-xs text-charcoal-400 dark:text-carbon-muted">
            Target limit is 10.0 kg/day
          </p>
        </div>

        {/* Dynamic Card: Trees/Cars vs Projected Monthly */}
        <AnimatePresence mode="wait">
          {!showEquivalent ? (
            <motion.div
              key="projected"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="stat-card p-5 relative overflow-hidden dark:bg-carbon-card dark:border-carbon-surface bg-white border border-mist-200 rounded-2xl shadow-sm"
            >
              <div className="flex justify-between items-start w-full">
                <span className="text-sm font-medium text-charcoal-400 dark:text-carbon-muted">
                  Projected Monthly
                </span>
                <div className="p-2 bg-earth-500/10 text-earth-500 rounded-xl font-bold">
                  <Percent className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-charcoal-700 dark:text-carbon-text font-display">
                  {stats.projectedMonthly}
                </span>
                <span className="text-sm text-charcoal-400 dark:text-carbon-muted font-medium">
                  kg CO₂
                </span>
              </div>
              <p className="mt-2 text-xs text-charcoal-400 dark:text-carbon-muted">
                Calculated monthly forecast
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="equivalents-trees"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="stat-card p-5 relative overflow-hidden dark:bg-carbon-card dark:border-carbon-surface bg-white border border-mist-200 rounded-2xl shadow-sm"
            >
              <div className="flex justify-between items-start w-full">
                <span className="text-sm font-medium text-charcoal-400 dark:text-carbon-muted">
                  Ecosystem Credit
                </span>
                <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-xl">
                  <Trees className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400 font-display">
                  {stats.treesEquiv}
                </span>
                <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
                  saplings
                </span>
              </div>
              <p className="mt-2 text-xs text-charcoal-400 dark:text-carbon-muted">
                Trees needed to offset emissions (1 yr)
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Card 2: Trend vs Cars Equiv */}
        <AnimatePresence mode="wait">
          {!showEquivalent ? (
            <motion.div
              key="trend"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="stat-card p-5 relative overflow-hidden dark:bg-carbon-card dark:border-carbon-surface bg-white border border-mist-200 rounded-2xl shadow-sm"
            >
              <div className="flex justify-between items-start w-full">
                <span className="text-sm font-medium text-charcoal-400 dark:text-carbon-muted">
                  30-Day Trend
                </span>
                <div className={`p-2 rounded-xl ${trendColorClass}`}>
                  {trendIcon}
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-extrabold text-charcoal-700 dark:text-carbon-text font-display">
                  {trendText}
                </span>
              </div>
              <p className="mt-2 text-xs text-charcoal-400 dark:text-carbon-muted flex items-center gap-1">
                {stats.reductionPercentage > 0 ? (
                  <>
                    <span className="font-semibold text-emerald-500">
                      {stats.reductionPercentage}% reduction
                    </span>{" "}
                    vs last fortnight
                  </>
                ) : (
                  "Stabilized emission patterns"
                )}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="equivalents-cars"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="stat-card p-5 relative overflow-hidden dark:bg-carbon-card dark:border-carbon-surface bg-white border border-mist-200 rounded-2xl shadow-sm"
            >
              <div className="flex justify-between items-start w-full">
                <span className="text-sm font-medium text-charcoal-400 dark:text-carbon-muted">
                  Driving Parallel
                </span>
                <div className="p-2 bg-amber-500/10 text-amber-500 rounded-xl">
                  <Car className="h-5 w-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400 font-display">
                  {stats.carsEquiv}
                </span>
                <span className="text-sm text-amber-600 dark:text-amber-400 font-medium">
                  miles
                </span>
              </div>
              <p className="mt-2 text-xs text-charcoal-400 dark:text-carbon-muted">
                Equivalent gas car miles driven
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
