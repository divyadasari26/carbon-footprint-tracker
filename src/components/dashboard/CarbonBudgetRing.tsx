"use client";

import React from "react";
import { motion } from "framer-motion";
import { getBudgetStatus } from "@/lib/carbon-calculator";

interface CarbonBudgetRingProps {
  used: number;
  budget: number;
}

export function CarbonBudgetRing({ used, budget }: CarbonBudgetRingProps) {
  const percentage = Math.min((used / budget) * 100, 100);
  const remaining = Math.max(budget - used, 0);
  const status = getBudgetStatus(used, budget);

  // SVG circle math
  const size = 200;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percentage / 100) * circumference;

  const statusColors = {
    safe: { stroke: "#52B788", bg: "rgba(82,183,136,0.1)", text: "text-sage-500" },
    warning: { stroke: "#EAB308", bg: "rgba(234,179,8,0.1)", text: "text-amber-500" },
    danger: { stroke: "#EF4444", bg: "rgba(239,68,68,0.1)", text: "text-red-500" },
  };

  const colors = statusColors[status];

  return (
    <div className="glass-card flex flex-col items-center gap-4 p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal-300 dark:text-carbon-muted">
        Daily Carbon Budget
      </h3>

      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90"
          role="progressbar"
          aria-valuenow={Math.round(percentage)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Daily carbon budget: ${remaining.toFixed(1)} kg remaining of ${budget} kg`}
        >
          {/* Background track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-mist-200 dark:text-carbon-surface"
          />
          {/* Progress arc */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={colors.stroke}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={`font-display text-3xl font-bold ${colors.text}`}
            key={remaining.toFixed(1)}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {remaining.toFixed(1)}
          </motion.span>
          <span className="text-xs text-charcoal-300 dark:text-carbon-muted">
            kg CO₂ left
          </span>
          <span className="mt-1 text-[10px] text-charcoal-200 dark:text-carbon-muted">
            of {budget} kg budget
          </span>
        </div>
      </div>

      {/* Status bar */}
      <div
        className="flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium"
        style={{ backgroundColor: colors.bg, color: colors.stroke }}
      >
        <span className="h-2 w-2 rounded-full" style={{ backgroundColor: colors.stroke }} />
        {status === "safe" && "On track! 🌿"}
        {status === "warning" && "Getting close ⚡"}
        {status === "danger" && "Over budget! 🔴"}
      </div>
    </div>
  );
}
