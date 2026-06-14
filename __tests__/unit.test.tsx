import { describe, it, expect, vi } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import { calculateEmission } from "@/lib/carbon-calculator";
import { calculateActivityPoints, checkBadgeUnlocks } from "@/lib/points-engine";
import { GamificationDisplay } from "@/components/dashboard/GamificationDisplay";

// Mock the gamification context for component testing
const mockUseGamification = vi.fn();
vi.mock("@/context/GamificationContext", () => ({
  useGamification: () => mockUseGamification(),
}));

describe("Carbon Footprint Utilities & Calculations", () => {
  it("calculates emissions correctly based on factor and subcategory", () => {
    // transport: car_gasoline is 0.21 kg per km. 10km = 2.1kg
    const co2 = calculateEmission("transport", "car_gasoline", 10);
    expect(co2).toBe(2.1);
  });

  it("returns 0 for walking or cycling", () => {
    const walkingCo2 = calculateEmission("transport", "walking", 10);
    expect(walkingCo2).toBe(0);

    const bikingCo2 = calculateEmission("transport", "bicycle", 25);
    expect(bikingCo2).toBe(0);
  });

  it("calculates activity points correctly with savings bonus", () => {
    // base points is 5. DAILY_BUDGET_KG / 4 is 2.
    // co2 is 2.1, which is > 2, so savingsBonus is 0.
    // multiplier for 0 streak is 1.0. Total = 5 points.
    const pts = calculateActivityPoints(2.1, "transport", 0);
    expect(pts).toBe(5);
  });

  it("checks badge unlocks and returns newly unlocked badges", () => {
    const currentBadges = [
      { id: "first-log", name: "First Step", icon: "🌱", description: "First log", pointsRequired: 0, unlocked: false },
      { id: "week-streak", name: "Week Warrior", icon: "🔥", description: "7-day streak", pointsRequired: 100, unlocked: false },
    ];
    // With 150 points, both "first-log" and "week-streak" should unlock
    // @ts-ignore
    const newlyUnlocked = checkBadgeUnlocks(150, currentBadges);
    expect(newlyUnlocked.length).toBe(2);
    expect(newlyUnlocked[0].id).toBe("first-log");
    expect(newlyUnlocked[1].id).toBe("week-streak");
  });
});

describe("GamificationDisplay Component", () => {
  it("renders points and badges correctly based on context", () => {
    mockUseGamification.mockReturnValue({
      points: 250,
      streak: 5,
      badges: [
        { id: "first-log", name: "First Step", icon: "🌱", description: "First log", pointsRequired: 0, unlocked: true },
        { id: "week-streak", name: "Week Warrior", icon: "🔥", description: "7-day streak", pointsRequired: 100, unlocked: true },
        { id: "month-streak", name: "Monthly Master", icon: "⭐", description: "30-day streak", pointsRequired: 500, unlocked: false },
      ],
      triggerConfetti: false,
      setTriggerConfetti: vi.fn(),
    });

    render(<GamificationDisplay />);

    // Check if points are formatted and rendered
    expect(screen.getByText("250")).toBeInTheDocument();

    // Check if unlocked badges are displayed
    expect(screen.getByText("First Step")).toBeInTheDocument();
    expect(screen.getByText("Week Warrior")).toBeInTheDocument();

    // Check if locked badges show up under upcoming
    expect(screen.getByText("Monthly Master")).toBeInTheDocument();
  });
});
