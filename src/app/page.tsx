"use client";

import React from "react";
import { useActivities } from "@/context/ActivityContext";
import { useGamification } from "@/context/GamificationContext";
import { CarbonBudgetRing } from "@/components/dashboard/CarbonBudgetRing";
import { DailyStreakCounter } from "@/components/dashboard/DailyStreakCounter";
import { GamificationDisplay } from "@/components/dashboard/GamificationDisplay";
import { PledgeDashboard } from "@/components/dashboard/PledgeDashboard";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { ActivityLogger } from "@/components/activity/ActivityLogger";
import { EcoAssistant } from "@/components/assistant/EcoAssistant";
import { Leaf, Award, Compass, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { activities, todayCo2, dailyBudget } = useActivities();
  const { points, streak } = useGamification();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-forest p-6 sm:p-8 text-white shadow-lg dark:bg-gradient-dark">
        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
            <Leaf className="h-3.5 w-3.5 text-sage-300" />
            Hackathon Production Build v1.0.0
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight">
            Welcome back to your Carbon Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-sage-100/90 leading-relaxed max-w-md">
            Every green action you record contributes to our community pledge. Keep up the streak and earn badges!
          </p>
        </div>
        <div className="absolute right-4 bottom-4 opacity-10 hidden md:block">
          <Leaf className="h-48 w-48" />
        </div>
      </section>

      {/* Grid of Core Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Progress Ring & Streak */}
        <div className="space-y-6 lg:col-span-1">
          <CarbonBudgetRing used={todayCo2} budget={dailyBudget} />
          <DailyStreakCounter streak={streak} />
          <EcoAssistant />
        </div>

        {/* Center/Right Column: Logger & Gamification */}
        <div className="space-y-6 lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ActivityLogger />
            <GamificationDisplay />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <PledgeDashboard />
            <ActivityFeed activities={activities} />
          </div>
        </div>
      </div>
    </div>
  );
}
