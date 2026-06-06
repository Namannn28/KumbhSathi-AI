import { NextRequest, NextResponse } from "next/server";
import { success, error, calculateDistance } from "@/lib/utils";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const latitude = parseFloat(searchParams.get("latitude") || "25.4358");
    const longitude = parseFloat(searchParams.get("longitude") || "81.8463");
    const type = searchParams.get("type") || "GHAT";
    const radius = parseFloat(searchParams.get("radius") || "2");

    const locations = await prisma.location.findMany({
      where: {
        locationType: type as any,
        isActive: true,
      },
      take: 20,
    });

    // Calculate distances and sort
    const locationsWithDistance = locations
      .map((loc) => ({
        ...loc,
        distance: calculateDistance(latitude, longitude, loc.latitude, loc.longitude),
      }))
      .filter((loc) => loc.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 10);

    return NextResponse.json(
      success(
        locationsWithDistance,
        `Found ${locationsWithDistance.length} nearby locations`
      )
    );
  } catch (err: any) {
    return NextResponse.json(
      error("ERROR", err.message || "Failed to fetch locations"),
      { status: 500 }
    );
  }
}
