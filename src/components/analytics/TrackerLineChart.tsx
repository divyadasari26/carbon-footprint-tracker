"use client";

import { useTheme } from "@/hooks/useTheme";
import type { DailyDataPoint } from "@/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface TrackerLineChartProps {
  data: DailyDataPoint[];
}

export function TrackerLineChart({ data }: TrackerLineChartProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Format date for readable X axis
  const chartData = data.map((d) => {
    const dateObj = new Date(d.date);
    return {
      ...d,
      formattedDate: dateObj.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
    };
  });

  // Theme-sensitive styling parameters
  const gridColor = isDark ? "#2D7537" : "#E2E8F0"; // Custom border color
  const textColor = isDark ? "#9CB5A0" : "#4A5568";
  const budgetColor = "#EF4444"; // Red for danger/budget limit

  return (
    <div className="glass-card p-6 dark:bg-carbon-card dark:border-carbon-surface bg-white border border-mist-200 rounded-2xl shadow-sm">
      <div className="mb-4">
        <h3 className="text-lg font-bold text-charcoal-700 dark:text-carbon-text font-display">
          30-Day Footprint & Savings Trend
        </h3>
        <p className="text-xs text-charcoal-400 dark:text-carbon-muted">
          Compare daily carbon footprint (kg CO₂) against daily savings points
        </p>
      </div>

      <div className="h-80 w-full" role="region" aria-label="30-day carbon footprint line chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.6} />
            <XAxis
              dataKey="formattedDate"
              stroke={textColor}
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke={textColor}
              fontSize={11}
              tickLine={false}
              axisLine={false}
              label={{
                value: "kg CO₂",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fill: textColor, fontSize: 11 },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1A2E23" : "#FFFFFF",
                borderColor: isDark ? "#2D6A4F" : "#E2E8F0",
                color: isDark ? "#E8F0E8" : "#2B2D42",
                borderRadius: "0.75rem",
                fontSize: "12px",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
              }}
              labelStyle={{ fontWeight: "bold", marginBottom: "4px" }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: "12px", paddingBottom: "10px" }}
            />
            {/* Limit Reference line */}
            <ReferenceLine
              y={10}
              stroke={budgetColor}
              strokeDasharray="4 4"
              label={{
                value: "Budget Limit (10kg)",
                position: "top",
                fill: budgetColor,
                fontSize: 10,
                fontWeight: "bold",
              }}
            />
            <Line
              type="monotone"
              dataKey="co2"
              name="Carbon Footprint (kg)"
              stroke="#52B788"
              strokeWidth={3}
              dot={{ r: 2 }}
              activeDot={{ r: 6 }}
            />
            <Line
              type="monotone"
              dataKey="points"
              name="Eco Points Earned"
              stroke="#D4A373"
              strokeWidth={2}
              dot={{ r: 1 }}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
