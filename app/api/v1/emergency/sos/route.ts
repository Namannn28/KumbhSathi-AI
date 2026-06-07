import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/lib/utils";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import { EmergencySeverity, EmergencyType } from "@prisma/client";
import { z } from "zod";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rateLimit";
import {
  emergencyTypeSchema,
  latitudeSchema,
  longitudeSchema,
  optionalLimitedTextSchema,
  optionalSectorSchema,
  parseJsonBody,
} from "@/lib/validation";

const optionalLatitudeSchema = z.preprocess(
  (value) => (value === null || value === "" ? undefined : value),
  latitudeSchema.optional()
);
const optionalLongitudeSchema = z.preprocess(
  (value) => (value === null || value === "" ? undefined : value),
  longitudeSchema.optional()
);

const sosBodySchema = z
  .object({
    type: emergencyTypeSchema,
    description: optionalLimitedTextSchema(500),
    latitude: optionalLatitudeSchema,
    longitude: optionalLongitudeSchema,
    sector: optionalSectorSchema,
  })
  .refine(
    (body) =>
      (body.latitude === undefined && body.longitude === undefined) ||
      (body.latitude !== undefined && body.longitude !== undefined),
    "Latitude and longitude must be provided together"
  );

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
      return NextResponse.json(
        error("UNAUTHORIZED", "Please login first"),
        { status: 401 }
      );
    }

    const user = session.user as any;

    const rateLimitCheck = await checkRateLimit(
      `sos:${user.id}`,
      RATE_LIMITS.EMERGENCY_SOS.max,
      RATE_LIMITS.EMERGENCY_SOS.window
    );

    if (!rateLimitCheck.success) {
      return NextResponse.json(
        error("RATE_LIMITED", "Too many SOS requests"),
        { status: 429 }
      );
    }

    const parsedBody = await parseJsonBody(req, sosBodySchema);
    if (parsedBody.response) return parsedBody.response;

    const { type, description, latitude, longitude, sector } = parsedBody.data;

    // Determine severity based on type
    const severityMap: Record<string, EmergencySeverity> = {
      MEDICAL: "HIGH",
      LOST_CHILD: "HIGH",
      WOMEN_SAFETY: "HIGH",
      STAMPEDE: "CRITICAL",
      FIRE: "CRITICAL",
      CROWD_SURGE: "HIGH",
      OTHER: "MEDIUM",
    };

    const emergency = await prisma.emergencyEvent.create({
      data: {
        userId: user.id,
        emergencyType: type as EmergencyType,
        severity: severityMap[type],
        status: "REPORTED",
        latitude,
        longitude,
        sector: sector || user.sector,
        description,
        aiUrgencyScore: severityMap[type] === "CRITICAL" ? 0.95 : 0.75,
        reportedAt: new Date(),
      },
    });

    // Find nearest police post or medical camp based on emergency type
    let nearestFacility = null;
    if (type === "MEDICAL") {
      nearestFacility = await prisma.location.findFirst({
        where: {
          locationType: "MEDICAL_CAMP",
          sector: sector || user.sector,
        },
      });
    } else {
      nearestFacility = await prisma.location.findFirst({
        where: {
          locationType: "POLICE_POST",
          sector: sector || user.sector,
        },
      });
    }

    // Send alert to volunteers and police
    const volunteers = await prisma.user.findMany({
      where: {
        role: "VOLUNTEER",
        sector: sector || user.sector,
      },
      take: 5,
    });

    // In production, send push notifications here

    return NextResponse.json(
      success(
        {
          caseId: emergency.id,
          status: "REPORTED",
          severity: emergency.severity,
          nearestFacility: nearestFacility ? {
            name: nearestFacility.name,
            distance: "340m",
            eta: "5 mins",
          } : null,
          alertsSent: volunteers.length,
        },
        "Emergency registered successfully"
      )
    );
  } catch (err: any) {
    console.error("SOS error:", err);
    return NextResponse.json(
      error("SOS_ERROR", "Failed to register emergency"),
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session?.user) {
      return NextResponse.json(
        error("UNAUTHORIZED", "Please login first"),
        { status: 401 }
      );
    }

    const user = session.user as any;
    const { searchParams } = new URL(req.url);
    const caseId = searchParams.get("caseId");

    if (caseId) {
      const emergency = await prisma.emergencyEvent.findUnique({
        where: { id: caseId },
      });
      if (!emergency || emergency.userId !== user.id) {
        return NextResponse.json(
          error("NOT_FOUND", "Emergency not found"),
          { status: 404 }
        );
      }
      return NextResponse.json(success(emergency));
    }

    // Get user's emergency history
    const emergencies = await prisma.emergencyEvent.findMany({
      where: { userId: user.id },
      orderBy: { reportedAt: "desc" },
      take: 20,
    });

    return NextResponse.json(
      success(emergencies, "Emergency history retrieved")
    );
  } catch (err: any) {
    return NextResponse.json(
      error("ERROR", err.message || "Failed to retrieve emergencies"),
      { status: 500 }
    );
  }
}
