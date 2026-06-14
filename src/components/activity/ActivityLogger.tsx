"use client";

import React, { useState, useEffect } from "react";
import { useActivities } from "@/context/ActivityContext";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { calculateEmission } from "@/lib/carbon-calculator";
import { EMISSION_FACTORS } from "@/lib/constants";
import { exportActivitiesCSV } from "@/lib/csv-export";
import type { ActivityCategory } from "@/types";
import {
  Mic,
  MicOff,
  Plus,
  Download,
  Trash2,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ActivityLogger() {
  const { activities, addActivity } = useActivities();
  const {
    isListening,
    transcript,
    error: speechError,
    isSupported: isSpeechSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition();

  // Form states
  const [category, setCategory] = useState<ActivityCategory>("transport");
  const [subcategory, setSubcategory] = useState<string>("car_gasoline");
  const [amount, setAmount] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Subcategories filtered by category
  const activeSubcategories = EMISSION_FACTORS.filter(
    (ef) => ef.category === category
  );

  // Set default subcategory when category changes
  useEffect(() => {
    if (activeSubcategories.length > 0) {
      setSubcategory(activeSubcategories[0].subcategory);
    }
  }, [category]);

  // Voice recognition parsing logic
  useEffect(() => {
    if (!transcript) return;

    const lower = transcript.toLowerCase();
    
    // Extract number
    const matchNumber = lower.match(/\d+(\.\d+)?/);
    const parsedAmount = matchNumber ? parseFloat(matchNumber[0]) : 0;

    let detectedCategory: ActivityCategory | null = null;
    let detectedSubcategory: string = "";
    let detectedDesc = "";

    // Parse keywords to auto-fill form
    if (lower.includes("car") || lower.includes("drive") || lower.includes("driving") || lower.includes("km")) {
      detectedCategory = "transport";
      detectedSubcategory = "car_gasoline";
      if (lower.includes("electric") || lower.includes("ev")) {
        detectedSubcategory = "car_electric";
      } else if (lower.includes("diesel")) {
        detectedSubcategory = "car_diesel";
      }
      detectedDesc = `Drove ${parsedAmount || 10} km`;
    } else if (lower.includes("bus")) {
      detectedCategory = "transport";
      detectedSubcategory = "bus";
      detectedDesc = `Bus trip of ${parsedAmount || 5} km`;
    } else if (lower.includes("train")) {
      detectedCategory = "transport";
      detectedSubcategory = "train";
      detectedDesc = `Train journey of ${parsedAmount || 20} km`;
    } else if (lower.includes("electricity") || lower.includes("kwh") || lower.includes("power")) {
      detectedCategory = "energy";
      detectedSubcategory = "electricity";
      if (lower.includes("solar")) {
        detectedSubcategory = "solar";
      }
      detectedDesc = `Used ${parsedAmount || 15} kWh electricity`;
    } else if (lower.includes("beef") || lower.includes("steak") || lower.includes("meat")) {
      detectedCategory = "food";
      detectedSubcategory = "beef";
      detectedDesc = `Ate ${parsedAmount || 0.25} kg beef`;
    } else if (lower.includes("vegan") || lower.includes("meal")) {
      detectedCategory = "food";
      detectedSubcategory = "vegan_meal";
      detectedDesc = `Ate ${parsedAmount || 1} vegan meal`;
    } else if (lower.includes("trash") || lower.includes("waste") || lower.includes("garbage")) {
      detectedCategory = "waste";
      detectedSubcategory = "landfill";
      detectedDesc = `Discarded ${parsedAmount || 2} kg garbage`;
    } else if (lower.includes("recycle") || lower.includes("recycling")) {
      detectedCategory = "waste";
      detectedSubcategory = "recycled";
      detectedDesc = `Recycled ${parsedAmount || 1} kg trash`;
    } else if (lower.includes("shower")) {
      detectedCategory = "water";
      detectedSubcategory = "shower_5min";
      detectedDesc = `Took ${parsedAmount || 1} shower(s)`;
    } else if (lower.includes("clothing") || lower.includes("shirt") || lower.includes("buy")) {
      detectedCategory = "shopping";
      detectedSubcategory = "clothing_new";
      detectedDesc = `Bought new clothes`;
    }

    if (detectedCategory) {
      setCategory(detectedCategory);
      setSubcategory(detectedSubcategory);
      if (parsedAmount > 0) setAmount(parsedAmount);
      if (detectedDesc) setDescription(detectedDesc);
    }
  }, [transcript]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      resetTranscript();
      startListening();
    }
  };

  const handleLogActivity = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (amount <= 0 || isNaN(amount)) {
      setErrorMessage("Please enter a valid amount greater than 0.");
      return;
    }

    if (!description.trim()) {
      setErrorMessage("Please enter a short description of the activity.");
      return;
    }

    // Calculate emission CO2 amount
    const co2 = calculateEmission(category, subcategory, amount);

    addActivity({
      category,
      description: description.trim(),
      co2Amount: co2,
      source: transcript ? "voice" : "text",
    });

    // Reset inputs
    setAmount(0);
    setDescription("");
    resetTranscript();
  };

  const currentUnit = EMISSION_FACTORS.find(
    (ef) => ef.category === category && ef.subcategory === subcategory
  )?.unit || "units";

  return (
    <div className="glass-card p-6 dark:bg-carbon-card dark:border-carbon-surface bg-white border border-mist-200 rounded-2xl shadow-sm space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold text-charcoal-700 dark:text-carbon-text font-display">
            Log New Activity
          </h3>
          <p className="text-xs text-charcoal-400 dark:text-carbon-muted">
            Enter details or use microphone to dictate
          </p>
        </div>
        <button
          onClick={() => exportActivitiesCSV(activities)}
          className="btn-secondary py-1.5 px-3 rounded-lg text-xs gap-1.5"
          title="Export CSV data"
        >
          <Download className="h-3.5 w-3.5" />
          Export CSV
        </button>
      </div>

      <form onSubmit={handleLogActivity} className="space-y-4">
        {/* Voice Recognition Section */}
        {isSpeechSupported && (
          <div className="flex items-center gap-3 p-3 bg-mist-50 dark:bg-carbon-surface rounded-xl">
            <button
              type="button"
              onClick={toggleListening}
              className={`relative p-3 rounded-full flex items-center justify-center transition-all ${
                isListening
                  ? "bg-red-500 text-white animate-pulse"
                  : "bg-leaf-500 text-white hover:bg-leaf-600"
              }`}
              title={isListening ? "Stop listening" : "Dictate activity"}
            >
              {isListening && <span className="pulse-ring" />}
              {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-charcoal-500 dark:text-carbon-text">
                {isListening ? "Listening... Speak naturally" : "Dictate Activity"}
              </p>
              <p className="text-[11px] text-charcoal-400 dark:text-carbon-muted truncate">
                {transcript
                  ? `"${transcript}"`
                  : 'Try: "Log 5 kilometers driving" or "I ate beef today"'}
              </p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {(errorMessage || speechError) && (
          <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl text-xs">
            <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{errorMessage || `Speech recognition error: ${speechError}`}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Category */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-500 dark:text-carbon-muted">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as ActivityCategory)}
              className="input-field"
            >
              <option value="transport">🚗 Transport</option>
              <option value="energy">⚡ Energy</option>
              <option value="food">🍲 Food</option>
              <option value="waste">♻️ Waste</option>
              <option value="water">💧 Water</option>
              <option value="shopping">🛍️ Shopping</option>
            </select>
          </div>

          {/* Subcategory */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-charcoal-500 dark:text-carbon-muted">
              Source Detail
            </label>
            <select
              value={subcategory}
              onChange={(e) => setSubcategory(e.target.value)}
              className="input-field"
            >
              {activeSubcategories.map((ef) => (
                <option key={ef.subcategory} value={ef.subcategory}>
                  {ef.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          {/* Amount */}
          <div className="space-y-1 md:col-span-1">
            <label className="text-xs font-bold text-charcoal-500 dark:text-carbon-muted flex justify-between">
              <span>Amount</span>
              <span className="font-semibold text-leaf-500">Unit: {currentUnit}</span>
            </label>
            <input
              type="number"
              step="any"
              min="0"
              value={amount || ""}
              onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
              placeholder="0.0"
              className="input-field"
            />
          </div>

          {/* Description */}
          <div className="space-y-1 md:col-span-2">
            <label className="text-xs font-bold text-charcoal-500 dark:text-carbon-muted">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='e.g., "Commuted to workplace via train"'
              className="input-field"
            />
          </div>
        </div>

        {/* Submit */}
        <button type="submit" className="btn-primary w-full gap-2">
          <Plus className="h-4 w-4" />
          Log Activity
        </button>
      </form>
    </div>
  );
}
export default ActivityLogger;
