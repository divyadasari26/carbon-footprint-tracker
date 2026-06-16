import { describe, test, expect } from "vitest";
import { totalCo2 } from "./carbon-calculator";

describe("totalCo2", () => {
  test("calculates total emissions", () => {
    const activities = [
      { co2Amount: 5 },
      { co2Amount: 10 }
    ] as any;

    expect(totalCo2(activities)).toBe(15);
  });
});