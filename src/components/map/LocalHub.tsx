"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import the map component to disable Server-Side Rendering (SSR)
// Leaflet requires the browser window object to render properly.
const LocalHubMap = dynamic(
  () => import("./LocalHubMap").then((mod) => mod.LocalHubMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[500px] w-full flex-col items-center justify-center rounded-2xl border border-mist-200 bg-white/80 dark:border-carbon-surface dark:bg-carbon-card/80">
        <Loader2 className="h-10 w-full animate-spin text-leaf-500" />
        <span className="mt-2 text-sm text-charcoal-400 dark:text-carbon-muted">
          Loading interactive eco map...
        </span>
      </div>
    ),
  }
);

export function LocalHub() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-charcoal-700 dark:text-carbon-text font-display">
          Local Green Infrastructure Hub
        </h2>
        <p className="text-xs text-charcoal-400 dark:text-carbon-muted">
          Find recycling drop-offs, subway/train stations, bike shares, and EV chargers near you.
        </p>
      </div>
      <LocalHubMap />
    </div>
  );
}
export default LocalHub;
