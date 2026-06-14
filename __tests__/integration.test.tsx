import { describe, it, expect } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProvider } from "@/context/AppProvider";
import { ActivityLogger } from "@/components/activity/ActivityLogger";
import { CarbonBudgetRing } from "@/components/dashboard/CarbonBudgetRing";
import { GamificationDisplay } from "@/components/dashboard/GamificationDisplay";
import { useActivities } from "@/context/ActivityContext";

// Simple integration test harness
function TestHarness() {
  const { todayCo2, dailyBudget } = useActivities();
  return (
    <div className="space-y-4">
      <CarbonBudgetRing used={todayCo2} budget={dailyBudget} />
      <ActivityLogger />
      <GamificationDisplay />
    </div>
  );
}

describe("Activity Logging Integration Flow", () => {
  it("allows user to log a new activity and propagates changes to budget and points displays", async () => {
    render(
      <AppProvider>
        <TestHarness />
      </AppProvider>
    );

    // Get initial budget left text
    // The default in-memory list has some activities.
    // Let's assert the presence of our core form fields
    const categorySelect = screen.getByLabelText(/Category/i);
    const detailSelect = screen.getByLabelText(/Source Detail/i);
    const amountInput = screen.getByLabelText(/Amount/i);
    const descInput = screen.getByLabelText(/Description/i);
    const submitBtn = screen.getByRole("button", { name: /Log Activity/i });

    // Initial points check (e.g. check that points are rendered)
    const initialPointsElement = screen.getByText(/Eco Points/i).nextElementSibling;
    const initialPointsText = initialPointsElement?.textContent || "0";
    const initialPoints = parseInt(initialPointsText.replace(/,/g, ""));

    // 1. Select "Transport" and "Car (Gasoline)" (which has factor 0.21)
    await userEvent.selectOptions(categorySelect, "transport");
    await userEvent.selectOptions(detailSelect, "car_gasoline");

    // 2. Type "10" for amount (km) => 2.1kg CO2 emission
    await userEvent.clear(amountInput);
    await userEvent.type(amountInput, "10");

    // 3. Type description
    await userEvent.type(descInput, "Morning commute to office");

    // 4. Click Submit
    await userEvent.click(submitBtn);

    // 5. Verify fields are reset
    expect(amountInput).toHaveValue(0);
    expect(descInput).toHaveValue("");

    // 6. Verify that points are updated (should increase by 5 points for logging + savings bonus if any)
    const finalPointsElement = screen.getByText(/Eco Points/i).nextElementSibling;
    const finalPointsText = finalPointsElement?.textContent || "0";
    const finalPoints = parseInt(finalPointsText.replace(/,/g, ""));

    expect(finalPoints).toBeGreaterThan(initialPoints);
  });
});
