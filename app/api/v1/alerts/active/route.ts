import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/lib/utils";
import prisma from "@/lib/db";
import { z } from "zod";
import { optionalSectorSchema, validationErrorResponse } from "@/lib/validation";

const alertsQuerySchema = z.object({
  sector: optionalSectorSchema,
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = alertsQuerySchema.safeParse(Object.fromEntries(searchParams));

    if (!parsed.success) {
      return validationErrorResponse(
        parsed.error.issues[0]?.message || "Invalid query parameters"
      );
    }

    const { sector } = parsed.data;
    const now = new Date();

    // Find alerts where activeFrom <= now AND (activeUntil is null OR activeUntil >= now)
    const activeAlerts = await prisma.alert.findMany({
      where: {
        activeFrom: {
          lte: now,
        },
        OR: [
          { activeUntil: null },
          { activeUntil: { gte: now } },
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    // If a sector was specified, filter alerts that affect this sector
    const filteredAlerts = sector
      ? activeAlerts.filter((alert) => alert.affectedSectors.includes(sector))
      : activeAlerts;

    const formatted = filteredAlerts.map((alert) => ({
      id: alert.id,
      type: alert.alertType,
      severity: alert.severity,
      sectors: alert.affectedSectors,
      message: {
        en: alert.messageEn,
        hi: alert.messageHi,
      },
      activeFrom: alert.activeFrom,
      activeUntil: alert.activeUntil,
    }));

    return NextResponse.json(
      success(formatted, `Retrieved ${formatted.length} active alerts`)
    );
  } catch (err: any) {
    console.error("[ERROR] Active alerts GET:", err);
    return NextResponse.json(
      error("ERROR", "Failed to retrieve active safety alerts"),
      { status: 500 }
    );
  }
}
