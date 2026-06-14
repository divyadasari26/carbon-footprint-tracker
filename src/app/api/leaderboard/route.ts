import { NextResponse } from "next/server";
import { MOCK_LEADERBOARD } from "@/data/mock-leaderboard";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: MOCK_LEADERBOARD,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
