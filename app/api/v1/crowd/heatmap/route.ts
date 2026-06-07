import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/lib/utils";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import { z } from "zod";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rateLimit";
import {
  optionalSectorSchema,
  sectorSchema,
  validationErrorResponse,
} from "@/lib/validation";

const crowdQuerySchema = z.object({
  sector: optionalSectorSchema,
});

const crowdUpdateSchema = z.object({
  sector: sectorSchema,
  densityScore: z.number().finite().min(0).max(1),
  personCount: z.number().int().min(0).max(1000000),
  predictions: z.unknown().optional(),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = crowdQuerySchema.safeParse(Object.fromEntries(searchParams));

    if (!parsed.success) {
      return validationErrorResponse(
        parsed.error.issues[0]?.message || "Invalid crowd parameters"
      );
    }

    const { sector } = parsed.data;

    let where: any = {};
    if (sector) where.sector = sector;

    const snapshots = await prisma.crowdSnapshot.findMany({
      where,
      orderBy: { timestamp: "desc" },
      take: sector ? 1 : 12, // Get latest for all sectors or specific
    });

    // If no specific sector, group by sector
    if (!sector) {
      const grouped: Record<string, any> = {};
      snapshots.forEach((snap) => {
        if (!grouped[snap.sector]) {
          grouped[snap.sector] = snap;
        }
      });

      return NextResponse.json(
        success(
          Object.values(grouped).map((snap) => ({
            sector: snap.sector,
            density: snap.densityScore,
            personCount: snap.personCount,
            crowdLevel:
              snap.densityScore < 0.3
                ? "low"
                : snap.densityScore < 0.6
                  ? "medium"
                  : snap.densityScore < 0.85
                    ? "high"
                    : "critical",
            predictions: snap.predictions,
            timestamp: snap.timestamp,
          })),
          "Crowd heatmap retrieved"
        )
      );
    }

    if (snapshots.length === 0) {
      return NextResponse.json(
        success(null, "No crowd data available for this sector"),
        { status: 404 }
      );
    }

    const snap = snapshots[0];
    return NextResponse.json(
      success({
        sector: snap.sector,
        density: snap.densityScore,
        personCount: snap.personCount,
        crowdLevel:
          snap.densityScore < 0.3
            ? "low"
            : snap.densityScore < 0.6
              ? "medium"
              : snap.densityScore < 0.85
                ? "high"
                : "critical",
        predictions: snap.predictions,
        timestamp: snap.timestamp,
      })
    );
  } catch (err: any) {
    console.error("[ERROR] Heatmap GET:", err);
    return NextResponse.json(
      error("ERROR", "Failed to retrieve crowd data"),
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = (await getServerSession(authConfig)) as any;
    if (!session?.user) {
      return NextResponse.json(
        error("UNAUTHORIZED", "Authentication required"),
        { status: 401 }
      );
    }

    const user = session.user as any;
    // Only ADMIN or authorized system can update crowd data
    if (!["ADMIN", "VOLUNTEER"].includes(user.role)) {
      return NextResponse.json(
        error("FORBIDDEN", "Insufficient permissions"),
        { status: 403 }
      );
    }

    const body = await req.json();
    const parsed = crowdUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return validationErrorResponse(
        parsed.error.issues[0]?.message || "Invalid crowd update payload"
      );
    }

    const rateLimitCheck = await checkRateLimit(
      `crowd-update:${user.id}`,
      RATE_LIMITS.GENERAL_API.max,
      RATE_LIMITS.GENERAL_API.window
    );

    if (!rateLimitCheck.success) {
      return NextResponse.json(
        error("RATE_LIMITED", "Too many crowd update requests"),
        { status: 429 }
      );
    }

    const { sector, densityScore, personCount, predictions } = parsed.data;
    const snapshotData: any = {
      sector,
      densityScore,
      personCount,
      dataSources: ["API_REPORT", `USER:${user.id}`],
    };

    if (predictions !== undefined) {
      snapshotData.predictions = predictions;
    }

    const snapshot = await prisma.crowdSnapshot.create({
      data: snapshotData,
    });

    // Log for audit trail
    console.log(
      `[AUDIT] Crowd data updated by ${user.id} in sector ${sector}: ${densityScore}`
    );

    return NextResponse.json(
      success(snapshot, "Crowd data recorded successfully")
    );
  } catch (err: any) {
    // Don't expose error details to client
    console.error("[ERROR] Crowd POST:", err);
    return NextResponse.json(
      error("ERROR", "Failed to record crowd data"),
      { status: 500 }
    );
  }
}
