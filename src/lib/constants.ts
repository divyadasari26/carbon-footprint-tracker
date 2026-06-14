import type {
  EmissionFactor,
  Badge,
  BadgeId,
  Pledge,
  ActivityCategory,
} from "@/types";

/* ═══════════════════════════════════════
   Constants & Configuration
   ═══════════════════════════════════════ */

// ─── Daily CO₂ Budget ────────────────────
/** Average daily carbon budget in kg CO₂ (target for reduction) */
export const DAILY_BUDGET_KG = 8;

/** Maximum budget a user can set */
export const MAX_BUDGET_KG = 20;

/** Minimum budget a user can set */
export const MIN_BUDGET_KG = 2;

// ─── Points System ───────────────────────
/** Base points per kg CO₂ saved */
export const POINTS_PER_KG_SAVED = 10;

/** Streak multiplier brackets */
export const STREAK_MULTIPLIERS: Record<string, number> = {
  "0": 1.0,
  "3": 1.2,
  "7": 1.5,
  "14": 1.8,
  "30": 2.0,
  "60": 2.5,
  "90": 3.0,
};

/** Points awarded for specific actions */
export const ACTION_POINTS = {
  LOG_ACTIVITY: 5,
  STAY_UNDER_BUDGET: 20,
  COMPLETE_PLEDGE: 100,
  JOIN_CHALLENGE: 10,
  SHARE_PROGRESS: 15,
  FIRST_LOG: 25,
} as const;

// ─── Emission Factors ────────────────────
export const EMISSION_FACTORS: EmissionFactor[] = [
  // Transport
  { category: "transport", subcategory: "car_gasoline", factor: 0.21, unit: "km", label: "Car (Gasoline)" },
  { category: "transport", subcategory: "car_diesel", factor: 0.171, unit: "km", label: "Car (Diesel)" },
  { category: "transport", subcategory: "car_electric", factor: 0.053, unit: "km", label: "Car (Electric)" },
  { category: "transport", subcategory: "bus", factor: 0.089, unit: "km", label: "Bus" },
  { category: "transport", subcategory: "train", factor: 0.041, unit: "km", label: "Train" },
  { category: "transport", subcategory: "flight_short", factor: 0.255, unit: "km", label: "Flight (Short-haul)" },
  { category: "transport", subcategory: "flight_long", factor: 0.195, unit: "km", label: "Flight (Long-haul)" },
  { category: "transport", subcategory: "bicycle", factor: 0.0, unit: "km", label: "Bicycle" },
  { category: "transport", subcategory: "walking", factor: 0.0, unit: "km", label: "Walking" },

  // Energy
  { category: "energy", subcategory: "electricity", factor: 0.233, unit: "kWh", label: "Electricity (Grid Avg)" },
  { category: "energy", subcategory: "natural_gas", factor: 2.0, unit: "m³", label: "Natural Gas" },
  { category: "energy", subcategory: "solar", factor: 0.0, unit: "kWh", label: "Solar Energy" },
  { category: "energy", subcategory: "heating_oil", factor: 2.54, unit: "liter", label: "Heating Oil" },

  // Food
  { category: "food", subcategory: "beef", factor: 27.0, unit: "kg", label: "Beef" },
  { category: "food", subcategory: "pork", factor: 12.1, unit: "kg", label: "Pork" },
  { category: "food", subcategory: "chicken", factor: 6.9, unit: "kg", label: "Chicken" },
  { category: "food", subcategory: "fish", factor: 6.1, unit: "kg", label: "Fish" },
  { category: "food", subcategory: "dairy", factor: 3.2, unit: "kg", label: "Dairy Products" },
  { category: "food", subcategory: "vegetables", factor: 2.0, unit: "kg", label: "Vegetables" },
  { category: "food", subcategory: "fruits", factor: 1.1, unit: "kg", label: "Fruits" },
  { category: "food", subcategory: "vegan_meal", factor: 0.7, unit: "meal", label: "Vegan Meal" },

  // Waste
  { category: "waste", subcategory: "landfill", factor: 0.587, unit: "kg", label: "Landfill Waste" },
  { category: "waste", subcategory: "recycled", factor: 0.021, unit: "kg", label: "Recycled Waste" },
  { category: "waste", subcategory: "composted", factor: 0.01, unit: "kg", label: "Composted Waste" },
  { category: "waste", subcategory: "plastic_bag", factor: 0.033, unit: "bag", label: "Plastic Bag" },

  // Water
  { category: "water", subcategory: "tap_water", factor: 0.000344, unit: "liter", label: "Tap Water" },
  { category: "water", subcategory: "hot_water", factor: 0.067, unit: "liter", label: "Hot Water" },
  { category: "water", subcategory: "shower_5min", factor: 0.525, unit: "session", label: "5-min Shower" },
  { category: "water", subcategory: "bath", factor: 1.7, unit: "session", label: "Bath" },

  // Shopping
  { category: "shopping", subcategory: "clothing_new", factor: 25.0, unit: "item", label: "New Clothing Item" },
  { category: "shopping", subcategory: "clothing_secondhand", factor: 2.5, unit: "item", label: "Secondhand Clothing" },
  { category: "shopping", subcategory: "electronics", factor: 50.0, unit: "item", label: "Electronics" },
  { category: "shopping", subcategory: "furniture", factor: 75.0, unit: "item", label: "Furniture" },
];

// ─── Badge Definitions ───────────────────
export const BADGE_DEFINITIONS: Badge[] = [
  {
    id: "first-log",
    name: "First Step",
    icon: "🌱",
    description: "Logged your first carbon activity",
    pointsRequired: 0,
    unlocked: false,
  },
  {
    id: "week-streak",
    name: "Week Warrior",
    icon: "🔥",
    description: "Maintained a 7-day logging streak",
    pointsRequired: 100,
    unlocked: false,
  },
  {
    id: "month-streak",
    name: "Monthly Master",
    icon: "⭐",
    description: "Maintained a 30-day logging streak",
    pointsRequired: 500,
    unlocked: false,
  },
  {
    id: "carbon-cutter",
    name: "Carbon Cutter",
    icon: "✂️",
    description: "Reduced your daily average by 20%",
    pointsRequired: 200,
    unlocked: false,
  },
  {
    id: "energy-saver-pro",
    name: "Energy Saver Pro",
    icon: "⚡",
    description: "Logged 50+ energy-saving activities",
    pointsRequired: 300,
    unlocked: false,
  },
  {
    id: "waste-warrior",
    name: "Waste Warrior",
    icon: "♻️",
    description: "Diverted 100kg from landfill through recycling",
    pointsRequired: 400,
    unlocked: false,
  },
  {
    id: "transit-champion",
    name: "Transit Champion",
    icon: "🚌",
    description: "Used public transit 30+ times",
    pointsRequired: 350,
    unlocked: false,
  },
  {
    id: "eco-guru",
    name: "Eco Guru",
    icon: "🧘",
    description: "Earned 1,000 eco points",
    pointsRequired: 1000,
    unlocked: false,
  },
  {
    id: "century-club",
    name: "Century Club",
    icon: "💯",
    description: "Logged 100 eco-friendly activities",
    pointsRequired: 750,
    unlocked: false,
  },
  {
    id: "planet-hero",
    name: "Planet Hero",
    icon: "🌍",
    description: "Earned 5,000 eco points — a true hero!",
    pointsRequired: 5000,
    unlocked: false,
  },
];

// ─── Default Pledges ─────────────────────
export const DEFAULT_PLEDGES: Pledge[] = [
  {
    id: "pledge-transport",
    title: "Commute Green",
    description: "Use public transit or bike for commuting this month",
    targetReduction: 50,
    currentReduction: 0,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    communityParticipants: 1247,
    communityProgress: 62,
  },
  {
    id: "pledge-food",
    title: "Meatless Mondays",
    description: "Go meat-free every Monday for a month",
    targetReduction: 30,
    currentReduction: 0,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    communityParticipants: 2893,
    communityProgress: 78,
  },
  {
    id: "pledge-energy",
    title: "Energy Detox",
    description: "Reduce electricity usage by 15% this month",
    targetReduction: 40,
    currentReduction: 0,
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    communityParticipants: 982,
    communityProgress: 45,
  },
  {
    id: "pledge-waste",
    title: "Zero Waste Week",
    description: "Produce zero landfill waste for one week",
    targetReduction: 15,
    currentReduction: 0,
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    completed: false,
    communityParticipants: 654,
    communityProgress: 33,
  },
];

// ─── Category Configuration ──────────────
export const CATEGORY_CONFIG: Record<
  ActivityCategory,
  { label: string; icon: string; color: string; darkColor: string }
> = {
  transport: {
    label: "Transport",
    icon: "Car",
    color: "text-blue-600",
    darkColor: "text-blue-400",
  },
  energy: {
    label: "Energy",
    icon: "Zap",
    color: "text-amber-600",
    darkColor: "text-amber-400",
  },
  food: {
    label: "Food",
    icon: "UtensilsCrossed",
    color: "text-orange-600",
    darkColor: "text-orange-400",
  },
  waste: {
    label: "Waste",
    icon: "Trash2",
    color: "text-green-600",
    darkColor: "text-green-400",
  },
  water: {
    label: "Water",
    icon: "Droplets",
    color: "text-cyan-600",
    darkColor: "text-cyan-400",
  },
  shopping: {
    label: "Shopping",
    icon: "ShoppingBag",
    color: "text-purple-600",
    darkColor: "text-purple-400",
  },
};

// ─── Equivalent Impact Constants ─────────
export const EQUIVALENTS = {
  /** One mature tree absorbs ~22 kg CO₂ per year */
  TREE_ABSORPTION_KG_PER_YEAR: 22,
  /** Average car emits ~4,600 kg CO₂ per year */
  CAR_EMISSION_KG_PER_YEAR: 4600,
  /** Average short-haul flight ~255 kg CO₂ */
  FLIGHT_KG: 255,
  /** Charging a phone ~0.008 kg CO₂ */
  PHONE_CHARGE_KG: 0.008,
} as const;
