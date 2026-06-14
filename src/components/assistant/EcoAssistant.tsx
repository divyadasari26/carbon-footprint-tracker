"use client";

import React, { useState, useMemo } from "react";
import { useActivities } from "@/context/ActivityContext";
import { useSpeechSynthesis } from "@/hooks/useSpeechSynthesis";
import { ECO_TIPS } from "@/data/eco-tips";
import { CATEGORY_CONFIG } from "@/lib/constants";
import type { ActivityCategory } from "@/types";
import {
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function EcoAssistant() {
  const { activities } = useActivities();
  const { isSpeaking, speak, stop } = useSpeechSynthesis();
  const [currentIndex, setCurrentIndex] = useState(0);

  // 1. Identify the user's highest emission category to make advice context-aware
  const highestCategory = useMemo(() => {
    if (!activities || activities.length === 0) return "transport";

    const totals: Record<string, number> = {};
    activities.forEach((act) => {
      totals[act.category] = (totals[act.category] || 0) + act.co2Amount;
    });

    let maxCat: ActivityCategory = "transport";
    let maxVal = -1;

    (Object.keys(totals) as ActivityCategory[]).forEach((cat) => {
      if (totals[cat] > maxVal) {
        maxVal = totals[cat];
        maxCat = cat;
      }
    });

    return maxCat;
  }, [activities]);

  // 2. Sort tips so that tips corresponding to the highest emission category appear first
  const sortedTips = useMemo(() => {
    const highPriority = ECO_TIPS.filter((t) => t.category === highestCategory);
    const lowPriority = ECO_TIPS.filter((t) => t.category !== highestCategory);
    return [...highPriority, ...lowPriority];
  }, [highestCategory]);

  const currentTip = sortedTips[currentIndex];

  const handleNext = () => {
    if (isSpeaking) stop();
    setCurrentIndex((prev) => (prev + 1) % sortedTips.length);
  };

  const handlePrev = () => {
    if (isSpeaking) stop();
    setCurrentIndex((prev) => (prev - 1 + sortedTips.length) % sortedTips.length);
  };

  const handleSpeak = () => {
    if (isSpeaking) {
      stop();
    } else {
      const speechText = `${currentTip.title}. ${currentTip.body}. Under the category ${CATEGORY_CONFIG[currentTip.category].label}, this action has a ${currentTip.impact} impact on carbon reduction.`;
      speak(speechText);
    }
  };

  const catConfig = CATEGORY_CONFIG[currentTip.category];

  return (
    <div className="glass-card p-6 dark:bg-carbon-card dark:border-carbon-surface bg-white border border-mist-200 rounded-2xl shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-mist-100 dark:border-carbon-surface pb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-sage-500/10 text-sage-600 dark:text-sage-400 rounded-xl">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-charcoal-700 dark:text-carbon-text font-display flex items-center gap-1.5">
              Eco-Assistant Sage <Sparkles className="h-4 w-4 text-amber-500" />
            </h3>
            <p className="text-xs text-charcoal-400 dark:text-carbon-muted">
              Personalized guidance for a low-carbon lifestyle
            </p>
          </div>
        </div>
      </div>

      {/* Context Banner */}
      {activities.length > 0 && (
        <div className="text-xs px-3 py-2 bg-leaf-500/5 border border-leaf-500/10 text-leaf-700 dark:text-sage-300 dark:bg-leaf-950/20 rounded-xl">
          Sage recommendation: Your primary carbon contributor is{" "}
          <strong className="underline decoration-wavy decoration-earth-400">
            {catConfig.label}
          </strong>. Take a look at these tips to reduce your footprint!
        </div>
      )}

      {/* Carousel Card */}
      <div className="relative overflow-hidden min-h-[170px] bg-mist-50 dark:bg-carbon-surface rounded-xl p-5 flex flex-col justify-between">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTip.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="space-y-2"
          >
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold uppercase tracking-wider text-charcoal-400 dark:text-carbon-muted flex items-center gap-1">
                <span className="text-base">{currentTip.icon}</span>{" "}
                {catConfig.label}
              </span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  currentTip.impact === "high"
                    ? "bg-rose-500/10 border-rose-500/20 text-rose-500"
                    : currentTip.impact === "medium"
                    ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
                    : "bg-blue-500/10 border-blue-500/20 text-blue-500"
                }`}
              >
                {currentTip.impact.toUpperCase()} IMPACT
              </span>
            </div>
            <h4 className="text-base font-extrabold text-charcoal-700 dark:text-carbon-text font-display">
              {currentTip.title}
            </h4>
            <p className="text-xs text-charcoal-500 dark:text-carbon-muted leading-relaxed">
              {currentTip.body}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Carousel controls */}
        <div className="flex justify-between items-center mt-4 pt-3 border-t border-mist-200/50 dark:border-carbon-card/50">
          <div className="flex gap-1">
            {sortedTips.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (isSpeaking) stop();
                  setCurrentIndex(idx);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex
                    ? "w-4 bg-leaf-500"
                    : "w-1.5 bg-charcoal-200 dark:bg-carbon-card"
                }`}
                aria-label={`Go to tip ${idx + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSpeak}
              className={`p-1.5 rounded-lg border transition-all ${
                isSpeaking
                  ? "bg-rose-500/10 border-rose-500/20 text-rose-500"
                  : "bg-white border-mist-300 text-charcoal-500 dark:bg-carbon-card dark:border-carbon-surface dark:text-carbon-text hover:bg-mist-100"
              }`}
              title={isSpeaking ? "Stop speaking" : "Listen to tip"}
              aria-label={isSpeaking ? "Stop speaking" : "Listen to tip"}
            >
              {isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <div className="flex gap-1">
              <button
                onClick={handlePrev}
                className="p-1.5 bg-white border border-mist-300 text-charcoal-500 dark:bg-carbon-card dark:border-carbon-surface dark:text-carbon-text hover:bg-mist-100 rounded-lg"
                aria-label="Previous tip"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 bg-white border border-mist-300 text-charcoal-500 dark:bg-carbon-card dark:border-carbon-surface dark:text-carbon-text hover:bg-mist-100 rounded-lg"
                aria-label="Next tip"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EcoAssistant;
