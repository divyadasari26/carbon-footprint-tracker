import type { Activity } from "@/types";

/* ═══════════════════════════════════════
   Mock Activities — 30-day seed data
   ═══════════════════════════════════════ */

function daysAgo(n: number): string {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(8 + Math.floor(Math.random() * 12), Math.floor(Math.random() * 60));
  return d.toISOString();
}

export const MOCK_ACTIVITIES: Activity[] = [
  // Today
  { id: "act-001", category: "transport", description: "Drove to work", co2Amount: 4.2, points: 5, timestamp: daysAgo(0), source: "text" },
  { id: "act-002", category: "food", description: "Chicken lunch", co2Amount: 1.38, points: 12, timestamp: daysAgo(0), source: "text" },

  // Yesterday
  { id: "act-003", category: "transport", description: "Took the bus to downtown", co2Amount: 0.89, points: 18, timestamp: daysAgo(1), source: "text" },
  { id: "act-004", category: "energy", description: "Used space heater for 3hrs", co2Amount: 1.63, points: 8, timestamp: daysAgo(1), source: "voice" },
  { id: "act-005", category: "food", description: "Vegan dinner bowl", co2Amount: 0.7, points: 20, timestamp: daysAgo(1), source: "text" },

  // 2 days ago
  { id: "act-006", category: "transport", description: "Cycled to grocery store", co2Amount: 0.0, points: 25, timestamp: daysAgo(2), source: "text" },
  { id: "act-007", category: "waste", description: "Recycled cardboard boxes", co2Amount: 0.042, points: 22, timestamp: daysAgo(2), source: "text" },
  { id: "act-008", category: "shopping", description: "Bought secondhand jacket", co2Amount: 2.5, points: 15, timestamp: daysAgo(2), source: "voice" },

  // 3 days ago
  { id: "act-009", category: "transport", description: "Train to city center", co2Amount: 0.82, points: 18, timestamp: daysAgo(3), source: "text" },
  { id: "act-010", category: "food", description: "Beef steak dinner", co2Amount: 6.75, points: 3, timestamp: daysAgo(3), source: "text" },
  { id: "act-011", category: "water", description: "Long shower (10 min)", co2Amount: 1.05, points: 5, timestamp: daysAgo(3), source: "text" },

  // 4 days ago
  { id: "act-012", category: "energy", description: "Solar panel generation offset", co2Amount: 0.0, points: 25, timestamp: daysAgo(4), source: "text" },
  { id: "act-013", category: "food", description: "Local farmers market produce", co2Amount: 0.8, points: 20, timestamp: daysAgo(4), source: "text" },

  // 5 days ago
  { id: "act-014", category: "transport", description: "Carpool with colleagues", co2Amount: 1.4, points: 15, timestamp: daysAgo(5), source: "text" },
  { id: "act-015", category: "waste", description: "Composted kitchen scraps", co2Amount: 0.01, points: 22, timestamp: daysAgo(5), source: "voice" },

  // 6 days ago
  { id: "act-016", category: "transport", description: "Walked to pharmacy", co2Amount: 0.0, points: 25, timestamp: daysAgo(6), source: "text" },
  { id: "act-017", category: "energy", description: "LED bulb swap (saved 60W)", co2Amount: 0.0, points: 20, timestamp: daysAgo(6), source: "text" },

  // 7 days ago
  { id: "act-018", category: "transport", description: "Short flight to conference", co2Amount: 51.0, points: 2, timestamp: daysAgo(7), source: "text" },
  { id: "act-019", category: "food", description: "Vegetarian pasta", co2Amount: 1.2, points: 18, timestamp: daysAgo(7), source: "text" },

  // 10 days ago
  { id: "act-020", category: "transport", description: "Electric car to store", co2Amount: 0.53, points: 20, timestamp: daysAgo(10), source: "text" },
  { id: "act-021", category: "waste", description: "Recycled plastic bottles", co2Amount: 0.063, points: 22, timestamp: daysAgo(10), source: "text" },

  // 14 days ago
  { id: "act-022", category: "food", description: "Plant-based milk switch", co2Amount: 0.4, points: 20, timestamp: daysAgo(14), source: "text" },
  { id: "act-023", category: "energy", description: "Turned off standby devices", co2Amount: 0.0, points: 15, timestamp: daysAgo(14), source: "text" },

  // 20 days ago
  { id: "act-024", category: "transport", description: "Bus to airport", co2Amount: 2.67, points: 10, timestamp: daysAgo(20), source: "text" },
  { id: "act-025", category: "shopping", description: "New laptop purchase", co2Amount: 50.0, points: 2, timestamp: daysAgo(20), source: "text" },

  // 25 days ago
  { id: "act-026", category: "food", description: "Fish and chips takeaway", co2Amount: 2.44, points: 8, timestamp: daysAgo(25), source: "text" },
  { id: "act-027", category: "water", description: "Quick 5-min shower", co2Amount: 0.525, points: 15, timestamp: daysAgo(25), source: "text" },

  // 28 days ago
  { id: "act-028", category: "transport", description: "Walked to work", co2Amount: 0.0, points: 25, timestamp: daysAgo(28), source: "text" },
  { id: "act-029", category: "waste", description: "Landfill trash bag", co2Amount: 2.935, points: 3, timestamp: daysAgo(28), source: "text" },
  { id: "act-030", category: "energy", description: "Natural gas heating", co2Amount: 4.0, points: 5, timestamp: daysAgo(28), source: "text" },
];
