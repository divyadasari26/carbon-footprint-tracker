import { NextResponse } from "next/server";
import { createActivitySchema } from "@/lib/validators";
import { calculateEmission } from "@/lib/carbon-calculator";
import { calculateActivityPoints } from "@/lib/points-engine";
import { MOCK_ACTIVITIES } from "@/data/mock-activities";
import type { Activity } from "@/types";

// In-memory simulation database for hackathon purposes
let inMemoryActivities: Activity[] = [...MOCK_ACTIVITIES];

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: inMemoryActivities,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Validate request body
    const result = createActivitySchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { category, subcategory, description, amount, source } = result.data;

    // Calculate CO2 and points using core engines
    const co2Amount = calculateEmission(category, subcategory, amount);
    const points = calculateActivityPoints(co2Amount, category);

    const newActivity: Activity = {
      id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
      category,
      description,
      co2Amount,
      points,
      source,
      timestamp: new Date().toISOString(),
    };

    // Store in-memory
    inMemoryActivities = [newActivity, ...inMemoryActivities];

    return NextResponse.json({
      success: true,
      data: newActivity,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
