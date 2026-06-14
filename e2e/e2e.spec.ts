import { test, expect } from "@playwright/test";

test.describe("Carbon Tracker E2E Flows", () => {
  test("toggles dark mode theme globally", async ({ page }) => {
    // Go to homepage
    await page.goto("/");

    // Locate the dark mode switch button in the navbar
    const themeButton = page.locator('button[aria-label^="Switch to"]');
    await expect(themeButton).toBeVisible();

    // Verify initial state (HTML element does not have 'dark' class by default)
    const htmlElement = page.locator("html");
    await expect(htmlElement).not.toHaveClass(/dark/);

    // Toggle theme
    await themeButton.click();

    // Verify dark class is applied
    await expect(htmlElement).toHaveClass(/dark/);

    // Toggle back
    await themeButton.click();
    await expect(htmlElement).not.toHaveClass(/dark/);
  });

  test("navigates to eco tracker, toggles equivalent view and downloads CSV", async ({ page }) => {
    await page.goto("/");

    // Navigate to Analytics/Eco Tracker page
    const navLink = page.locator('a:has-text("Eco Tracker")');
    await navLink.click();
    await expect(page).toHaveURL(/\/analytics/);

    // Locate the equivalent impact toggle
    const equivToggle = page.locator('button[aria-label="Toggle equivalent environmental impact view"]');
    await expect(equivToggle).toBeVisible();
    await expect(equivToggle).toHaveAttribute("aria-checked", "false");

    // Click to toggle equivalent view
    await equivToggle.click();
    await expect(equivToggle).toHaveAttribute("aria-checked", "true");

    // Verify that equivalent text (e.g., "saplings" or "miles") appears
    await expect(page.locator("text=saplings")).toBeVisible();
    await expect(page.locator("text=miles")).toBeVisible();

    // Navigate back to Dashboard to test CSV download
    await page.locator('a:has-text("Dashboard")').click();
    await expect(page).toHaveURL(/\//);

    // Check if Export CSV button works and initiates download
    const [download] = await Promise.all([
      page.waitForEvent("download"),
      page.locator('button:has-text("Export CSV")').click(),
    ]);

    // Verify download filename
    expect(download.suggestedFilename()).toContain("carbon-tracker-export");
  });
});
