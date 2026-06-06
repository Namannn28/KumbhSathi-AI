import { NextRequest, NextResponse } from "next/server";
import { success, error, calculateDistance } from "@/lib/utils";
import prisma from "@/lib/db";

interface RouteStep {
  instruction: string;
  landmark?: string;
  distance: number;
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const fromLat = parseFloat(searchParams.get("fromLat") || "25.434");
    const fromLng = parseFloat(searchParams.get("fromLng") || "81.844");
    const toLat = parseFloat(searchParams.get("toLat") || "25.4358");
    const toLng = parseFloat(searchParams.get("toLng") || "81.8463");
    const mode = searchParams.get("mode") || "normal";
    const language = searchParams.get("language") || "en";

    const totalDistance = calculateDistance(fromLat, fromLng, toLat, toLng);
    const estimatedTime = Math.ceil(totalDistance * 12); // ~12 min per km on foot

    // Find intermediate landmarks
    const landmarks = await prisma.location.findMany({
      where: {
        latitude: { gte: Math.min(fromLat, toLat) - 0.01, lte: Math.max(fromLat, toLat) + 0.01 },
        longitude: { gte: Math.min(fromLng, toLng) - 0.01, lte: Math.max(fromLng, toLng) + 0.01 },
      },
      take: 5,
    });

    // Get crowd data for mode=crowd_aware
    let crowdAvoidance = false;
    if (mode === "crowd_aware") {
      const crowdData = await prisma.crowdSnapshot.findMany({
        orderBy: { timestamp: "desc" },
        take: 1,
      });

      if (crowdData.length > 0) {
        crowdAvoidance = crowdData[0].densityScore > 0.7;
      }
    }

    const directions: RouteStep[] = [
      {
        instruction:
          language === "hi"
            ? "पूर्व की ओर जाएं"
            : "Head east",
        landmark: landmarks[0]?.name || "Near main gate",
        distance: totalDistance * 0.3,
      },
      {
        instruction:
          language === "hi"
            ? "बाईं ओर मुड़ें"
            : "Turn left",
        landmark: landmarks[1]?.name || "At the temple",
        distance: totalDistance * 0.4,
      },
      {
        instruction:
          language === "hi"
            ? "सीधे चलते रहें"
            : "Continue straight",
        landmark: landmarks[2]?.name || "Pass water station",
        distance: totalDistance * 0.3,
      },
    ];

    return NextResponse.json(
      success(
        {
          from: { lat: fromLat, lng: fromLng },
          to: { lat: toLat, lng: toLng },
          distance: Math.round(totalDistance * 100) / 100,
          estimatedTime,
          crowdAvoidanceActive: crowdAvoidance,
          directions,
          alternativeRoute: crowdAvoidance ? "Available - less crowded path" : null,
        },
        "Route calculated successfully"
      )
    );
  } catch (err: any) {
    return NextResponse.json(
      error("ERROR", err.message || "Failed to calculate route"),
      { status: 500 }
    );
  }
}
