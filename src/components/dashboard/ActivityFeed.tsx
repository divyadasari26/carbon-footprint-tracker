"use client";

import React from "react";
import { motion } from "framer-motion";
import { Car, Zap, UtensilsCrossed, Trash2, Droplets, ShoppingBag, Mic, Clock } from "lucide-react";
import type { Activity } from "@/types";
import { CATEGORY_CONFIG } from "@/lib/constants";

const ICON_MAP: Record<string, React.ElementType> = {
  Car, Zap, UtensilsCrossed, Trash2, Droplets, ShoppingBag,
};

interface ActivityFeedProps {
  activities?: Activity[];
  maxItems?: number;
}

export function ActivityFeed({ activities = [], maxItems = 8 }: ActivityFeedProps) {
  const displayed = activities.slice(0, maxItems);

  return (
    <div className="glass-card space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-charcoal-300 dark:text-carbon-muted">
          Recent Activity
        </h3>
        <Clock className="h-4 w-4 text-charcoal-200 dark:text-carbon-muted" aria-hidden="true" />
      </div>

      <ul className="space-y-1" role="list" aria-label="Recent carbon activities">
        {displayed.map((activity, i) => {
          const config = CATEGORY_CONFIG[activity.category];
          const Icon = ICON_MAP[config.icon] ?? Car;

          return (
            <motion.li
              key={activity.id}
              className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-mist-50 dark:hover:bg-carbon-surface"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              role="listitem"
            >
              <div
                className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-mist-100 dark:bg-carbon-surface ${config.color} dark:${config.darkColor}`}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-charcoal-500 dark:text-carbon-text">
                  {activity.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-charcoal-300 dark:text-carbon-muted">
                  <span>{config.label}</span>
                  {activity.source === "voice" && (
                    <span className="flex items-center gap-0.5">
                      <Mic className="h-2.5 w-2.5" aria-hidden="true" />
                      Voice
                    </span>
                  )}
                  <span>
                    {new Date(activity.timestamp).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-semibold text-charcoal-500 dark:text-carbon-text">
                  {activity.co2Amount.toFixed(1)} kg
                </p>
                <p className="text-xs text-sage-500">
                  +{activity.points} pts
                </p>
              </div>
            </motion.li>
          );
        })}
      </ul>

      {activities.length === 0 && (
        <div className="py-8 text-center text-sm text-charcoal-300 dark:text-carbon-muted">
          <span className="text-3xl">🌿</span>
          <p className="mt-2">No activities logged yet. Start tracking!</p>
        </div>
      )}
    </div>
  );
}
