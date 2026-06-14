/* ═══════════════════════════════════════
   Carbon Footprint Tracker — Type System
   ═══════════════════════════════════════ */

// ─── Activity ────────────────────────────
export type ActivityCategory =
  | "transport"
  | "energy"
  | "food"
  | "waste"
  | "water"
  | "shopping";

export type ActivitySource = "text" | "voice";

export interface Activity {
  id: string;
  category: ActivityCategory;
  description: string;
  co2Amount: number; // kg CO₂
  points: number;
  timestamp: string; // ISO 8601
  source: ActivitySource;
}

// ─── User Profile ────────────────────────
export interface UserProfile {
  name: string;
  avatar: string;
  points: number;
  streak: number;
  lastActiveDate: string; // ISO date string (YYYY-MM-DD)
  dailyBudget: number; // kg CO₂ per day
  activities: Activity[];
  badges: Badge[];
  pledges: Pledge[];
}

// ─── Gamification ────────────────────────
export type BadgeId =
  | "first-log"
  | "week-streak"
  | "month-streak"
  | "carbon-cutter"
  | "energy-saver-pro"
  | "waste-warrior"
  | "transit-champion"
  | "eco-guru"
  | "century-club"
  | "planet-hero";

export interface Badge {
  id: BadgeId;
  name: string;
  icon: string;
  description: string;
  pointsRequired: number;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface Pledge {
  id: string;
  title: string;
  description: string;
  targetReduction: number; // kg CO₂
  currentReduction: number;
  deadline: string;
  completed: boolean;
  communityParticipants: number;
  communityProgress: number; // percentage
}

// ─── Leaderboard ─────────────────────────
export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatar: string;
  points: number;
  co2Reduced: number;
  streak: number;
  isCurrentUser?: boolean;
}

// ─── Challenge ───────────────────────────
export type ChallengeStatus = "active" | "upcoming" | "completed";

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: ActivityCategory;
  participants: number;
  maxParticipants: number;
  goal: number; // kg CO₂ reduction
  progress: number; // percentage
  deadline: string;
  status: ChallengeStatus;
  joined: boolean;
  reward: number; // bonus points
}

// ─── Analytics / Stats ───────────────────
export type EquivalentType = "trees" | "cars" | "flights" | "phones";

export interface StatsData {
  totalCo2: number;
  dailyAverage: number;
  bestDay: { date: string; amount: number };
  worstDay: { date: string; amount: number };
  treesEquiv: number;
  carsEquiv: number;
  projectedMonthly: number;
  trend: "improving" | "stable" | "worsening";
  reductionPercentage: number;
}

export interface DailyDataPoint {
  date: string;
  co2: number;
  budget: number;
  points: number;
}

// ─── Map Locations ───────────────────────
export type LocationType = "recycling" | "transit" | "bike-share" | "ev-charging";

export interface MapLocation {
  id: string;
  name: string;
  type: LocationType;
  lat: number;
  lng: number;
  address: string;
  description: string;
  hours?: string;
  rating?: number;
}

// ─── Eco Tips ────────────────────────────
export interface EcoTip {
  id: string;
  category: ActivityCategory;
  title: string;
  body: string;
  impact: "low" | "medium" | "high";
  icon: string;
}

// ─── Theme ───────────────────────────────
export type Theme = "light" | "dark" | "system";

// ─── Context Types ───────────────────────
export interface ActivityContextType {
  activities: Activity[];
  todayActivities: Activity[];
  todayCo2: number;
  dailyBudget: number;
  addActivity: (
    activity: Omit<Activity, "id" | "timestamp" | "points">
  ) => void;
  removeActivity: (id: string) => void;
  clearActivities: () => void;
  dailyHistory: DailyDataPoint[];
}

export interface GamificationContextType {
  points: number;
  streak: number;
  badges: Badge[];
  pledges: Pledge[];
  addPoints: (amount: number) => void;
  checkBadges: () => Badge[];
  joinPledge: (pledgeId: string) => void;
  updatePledgeProgress: (pledgeId: string, amount: number) => void;
  triggerConfetti: boolean;
  setTriggerConfetti: (value: boolean) => void;
}

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// ─── API Response Types ──────────────────
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  page: number;
  limit: number;
  total: number;
}

// ─── Emission Factors ────────────────────
export interface EmissionFactor {
  category: ActivityCategory;
  subcategory: string;
  factor: number; // kg CO₂ per unit
  unit: string;
  label: string;
}

// ─── Web Speech API Types ────────────────
export interface SpeechRecognitionState {
  isListening: boolean;
  transcript: string;
  interimTranscript: string;
  error: string | null;
  isSupported: boolean;
}

export interface SpeechSynthesisState {
  isSpeaking: boolean;
  isPaused: boolean;
  voices: SpeechSynthesisVoice[];
  isSupported: boolean;
}
