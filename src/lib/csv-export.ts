import type { Activity } from "@/types";
import { CATEGORY_CONFIG } from "./constants";

/* ═══════════════════════════════════════
   CSV Export Utility
   ═══════════════════════════════════════ */

/**
 * Generate a CSV string from an array of activities.
 */
export function generateCSV(activities: Activity[]): string {
  const headers = [
    "Date",
    "Time",
    "Category",
    "Description",
    "CO₂ (kg)",
    "Points Earned",
    "Input Method",
  ];

  const rows = activities
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .map((activity) => {
      const date = new Date(activity.timestamp);
      return [
        date.toLocaleDateString("en-US"),
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        CATEGORY_CONFIG[activity.category]?.label ?? activity.category,
        escapeCSVField(activity.description),
        activity.co2Amount.toFixed(3),
        activity.points.toString(),
        activity.source,
      ].join(",");
    });

  return [headers.join(","), ...rows].join("\n");
}

/**
 * Escape a CSV field value (handles commas, quotes, newlines).
 */
function escapeCSVField(value: string): string {
  if (
    value.includes(",") ||
    value.includes('"') ||
    value.includes("\n") ||
    value.includes("\r")
  ) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

/**
 * Trigger a file download in the browser.
 */
export function triggerDownload(
  content: string,
  filename: string,
  mimeType: string = "text/csv;charset=utf-8;"
): void {
  if (typeof window === "undefined") return;

  const blob = new Blob(["\uFEFF" + content], { type: mimeType });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Clean up the URL object
  setTimeout(() => URL.revokeObjectURL(url), 100);
}

/**
 * Export activities as a CSV file download.
 */
export function exportActivitiesCSV(activities: Activity[]): void {
  const csv = generateCSV(activities);
  const date = new Date().toISOString().split("T")[0];
  triggerDownload(csv, `carbon-tracker-export-${date}.csv`);
}
