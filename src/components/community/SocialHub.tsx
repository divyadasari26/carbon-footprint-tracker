"use client";

import React, { useState } from "react";
import { Leaderboard } from "./Leaderboard";
import { MOCK_CHALLENGES } from "@/data/mock-challenges";
import type { Challenge } from "@/types";
import { useGamification } from "@/context/GamificationContext";
import {
  Users,
  Share2,
  Twitter,
  Linkedin,
  Calendar,
  CheckCircle2,
  Flame,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";

export function SocialHub() {
  const { points, streak, checkBadges } = useGamification();
  const [challenges, setChallenges] = useState<Challenge[]>(MOCK_CHALLENGES);
  const [activeTab, setActiveTab] = useState<"leaderboard" | "challenges" | "share">("leaderboard");

  const handleJoinChallenge = (id: string) => {
    setChallenges((prev) =>
      prev.map((ch) => {
        if (ch.id === id) {
          return {
            ...ch,
            joined: true,
            participants: ch.participants + 1,
          };
        }
        return ch;
      })
    );
  };

  const handleShare = async () => {
    const shareData = {
      title: "My Carbon Footprint Milestone",
      text: `I've earned ${points} eco points and reached a ${streak}-day streak on the Carbon Footprint Tracker! Can you beat my score?`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(
          `${shareData.text} Check it out here: ${shareData.url}`
        );
        alert("Share text copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy share text:", err);
      }
    }
  };

  const shareText = encodeURIComponent(
    `I've earned ${points} eco points and reached a ${streak}-day streak on the Carbon Footprint Tracker! Join me in cutting carbon emissions. 🌍`
  );
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${encodeURIComponent(
    "https://ecotracker.vercel.app"
  )}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    "https://ecotracker.vercel.app"
  )}`;

  return (
    <div className="glass-card p-6 dark:bg-carbon-card dark:border-carbon-surface bg-white border border-mist-200 rounded-2xl shadow-sm space-y-6">
      {/* Navigation Tabs */}
      <div className="flex border-b border-mist-200 dark:border-carbon-surface">
        {(["leaderboard", "challenges", "share"] as const).map((tab) => {
          const label = {
            leaderboard: "Leaderboard",
            challenges: "Challenges",
            share: "Share Impact",
          }[tab];

          const active = activeTab === tab;

          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 pb-3 text-sm font-semibold transition-all border-b-2 -mb-[2px] ${
                active
                  ? "border-leaf-500 text-leaf-500 font-bold dark:text-sage-400 dark:border-sage-400"
                  : "border-transparent text-charcoal-400 dark:text-carbon-muted hover:text-charcoal-600"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="min-h-[350px]">
        {activeTab === "leaderboard" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
          >
            <Leaderboard />
          </motion.div>
        )}

        {activeTab === "challenges" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-charcoal-700 dark:text-carbon-text font-display">
                Active Community Challenges
              </h3>
              <span className="text-xs text-charcoal-400 dark:text-carbon-muted">
                Complete challenges to earn big bonus points
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 max-h-[360px] overflow-y-auto custom-scrollbar pr-1">
              {challenges.map((ch) => (
                <div
                  key={ch.id}
                  className="p-4 rounded-xl border border-mist-200 dark:border-carbon-surface bg-mist-50/50 dark:bg-carbon-surface/20 flex flex-col justify-between gap-3"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-charcoal-700 dark:text-carbon-text font-display">
                        {ch.title}
                      </h4>
                      <p className="text-xs text-charcoal-400 dark:text-carbon-muted mt-1 leading-relaxed">
                        {ch.description}
                      </p>
                    </div>
                    <span className="text-[10px] font-bold bg-amber-500/10 text-amber-600 dark:text-amber-400 dark:bg-amber-500/20 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                      +{ch.reward} PTS
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-charcoal-400 dark:text-carbon-muted border-t border-mist-100 dark:border-carbon-surface pt-3">
                    <div className="flex items-center gap-1">
                      <Users className="h-3.5 w-3.5" />
                      <span>
                        {ch.participants} / {ch.maxParticipants} joined
                      </span>
                    </div>

                    {ch.joined ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <CheckCircle2 className="h-4 w-4" />
                        Joined
                      </span>
                    ) : (
                      <button
                        onClick={() => handleJoinChallenge(ch.id)}
                        className="bg-leaf-500 hover:bg-leaf-600 text-white font-bold py-1 px-3.5 rounded-lg text-[11px] transition-all"
                      >
                        Join
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "share" && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.15 }}
            className="flex flex-col items-center justify-center text-center py-8 px-4 space-y-6"
          >
            <div className="relative">
              <div className="p-6 bg-leaf-500/10 dark:bg-leaf-950/20 text-leaf-500 dark:text-sage-400 rounded-full">
                <Share2 className="h-12 w-12" />
              </div>
              <span className="absolute -bottom-2 -right-2 bg-amber-500 text-white rounded-full p-1.5 shadow">
                <Award className="h-5 w-5" />
              </span>
            </div>

            <div className="space-y-2 max-w-sm">
              <h4 className="text-base font-extrabold text-charcoal-700 dark:text-carbon-text font-display">
                Spread the Green Message
              </h4>
              <p className="text-xs text-charcoal-400 dark:text-carbon-muted leading-relaxed">
                Invite friends and colleagues to join. Share your achievements and inspire others to lower their carbon footprints!
              </p>
            </div>

            {/* Micro stats display */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-xs p-3 bg-mist-50 dark:bg-carbon-surface rounded-xl">
              <div className="flex flex-col items-center">
                <span className="text-[10px] uppercase font-bold text-charcoal-400 dark:text-carbon-muted">
                  Total Points
                </span>
                <span className="text-lg font-black text-charcoal-700 dark:text-carbon-text">
                  {points}
                </span>
              </div>
              <div className="flex flex-col items-center border-l border-mist-200 dark:border-carbon-card">
                <span className="text-[10px] uppercase font-bold text-charcoal-400 dark:text-carbon-muted">
                  Active Streak
                </span>
                <span className="text-lg font-black text-amber-500 flex items-center gap-0.5">
                  <Flame className="h-4 w-4 fill-current" />
                  {streak} days
                </span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 w-full">
              <button onClick={handleShare} className="btn-primary py-2 px-5 rounded-lg text-xs font-bold gap-2">
                <Share2 className="h-4 w-4" />
                Share Achievement
              </button>
              <a
                href={twitterUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary py-2 px-5 rounded-lg text-xs font-bold gap-2 text-sky-600 border-sky-200 hover:bg-sky-50 dark:border-sky-800 dark:hover:bg-sky-950/20"
              >
                <Twitter className="h-4 w-4 fill-current" />
                Twitter/X
              </a>
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary py-2 px-5 rounded-lg text-xs font-bold gap-2 text-indigo-700 border-indigo-200 hover:bg-indigo-50 dark:border-indigo-800 dark:hover:bg-indigo-950/20"
              >
                <Linkedin className="h-4 w-4 fill-current" />
                LinkedIn
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
export default SocialHub;
