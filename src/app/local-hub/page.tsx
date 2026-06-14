"use client";

import React from "react";
import { LocalHub } from "@/components/map/LocalHub";
import { MapPin } from "lucide-react";

export default function LocalHubPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="border-b border-mist-200 dark:border-carbon-surface pb-5">
        <h1 className="text-2xl font-extrabold text-charcoal-700 dark:text-carbon-text font-display flex items-center gap-2">
          <MapPin className="h-6 w-6 text-leaf-500" />
          Local Infrastructure Hub
        </h1>
        <p className="text-xs text-charcoal-400 dark:text-carbon-muted mt-1">
          Explore local eco-stations, charging facilities, public transit systems, and recycling depots near your region.
        </p>
      </div>

      <LocalHub />
    </div>
  );
}
