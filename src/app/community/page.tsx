"use client";

import React from "react";
import { SocialHub } from "@/components/community/SocialHub";
import { Users } from "lucide-react";

export default function CommunityPage() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="border-b border-mist-200 dark:border-carbon-surface pb-5">
        <h1 className="text-2xl font-extrabold text-charcoal-700 dark:text-carbon-text font-display flex items-center gap-2">
          <Users className="h-6 w-6 text-leaf-500" />
          Community Hub
        </h1>
        <p className="text-xs text-charcoal-400 dark:text-carbon-muted mt-1">
          Stay connected with friends, join active challenges, and see where you rank on the eco leaderboard.
        </p>
      </div>

      <SocialHub />
    </div>
  );
}
