import { NextRequest, NextResponse } from "next/server";
import { success, error, calculateDistance } from "@/lib/utils";
import prisma from "@/lib/db";
import { z } from "zod";
import {
  latitudeSchema,
  locationTypeSchema,
  longitudeSchema,
  validationErrorResponse,
} from "@/lib/validation";

const nearestQuerySchema = z.object({
  latitude: z.preprocess((value) => value || "25.4358", latitudeSchema),
  longitude: z.preprocess((value) => value || "81.8463", longitudeSchema),
  type: z.preprocess((value) => value || "GHAT", locationTypeSchema),
  radius: z.preprocess(
    (value) => value || "2",
    z.coerce.number().finite().min(0.1).max(10)
  ),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = nearestQuerySchema.safeParse(Object.fromEntries(searchParams));

    if (!parsed.success) {
      return validationErrorResponse(
        parsed.error.issues[0]?.message || "Invalid location parameters"
      );
    }

    const { latitude, longitude, type, radius } = parsed.data;

    const locations = await prisma.location.findMany({
      where: {
        locationType: type,
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
    console.error("[ERROR] Nearest locations GET:", err);
    return NextResponse.json(
      error("ERROR", "Failed to fetch locations"),
      { status: 500 }
    );
  }
}
