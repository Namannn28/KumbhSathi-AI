import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/lib/utils";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sector = searchParams.get("sector");

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
    return NextResponse.json(
      error("ERROR", err.message || "Failed to retrieve crowd data"),
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
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
    const { sector, densityScore, personCount, predictions } = body;

    // Validate inputs
    if (!sector || typeof densityScore !== "number") {
      return NextResponse.json(
        error("VALIDATION_ERROR", "Missing or invalid parameters"),
        { status: 400 }
      );
    }

    if (densityScore < 0 || densityScore > 1) {
      return NextResponse.json(
        error("VALIDATION_ERROR", "Density score must be between 0 and 1"),
        { status: 400 }
      );
    }

    if (personCount < 0 || personCount > 1000000) {
      return NextResponse.json(
        error("VALIDATION_ERROR", "Invalid person count"),
        { status: 400 }
      );
    }

    const snapshot = await prisma.crowdSnapshot.create({
      data: {
        sector,
        densityScore,
        personCount,
        dataSources: ["API_REPORT", `USER:${user.id}`],
        predictions,
      },
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
