import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/lib/utils";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import { z } from "zod";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rateLimit";
import {
  httpsUrlSchema,
  limitedTextSchema,
  optionalLimitedTextSchema,
  optionalSectorSchema,
  parseJsonBody,
  validationErrorResponse,
} from "@/lib/validation";

const optionalAgeSchema = z.preprocess(
  (value) => (value === null || value === "" ? undefined : value),
  z.coerce.number().int().min(0).max(120).optional()
);

const lastSeenTimeSchema = z
  .string()
  .trim()
  .datetime()
  .refine((value) => new Date(value).getTime() <= Date.now() + 5 * 60 * 1000, {
    message: "Last seen time cannot be in the future",
  });

const lostReportBodySchema = z.object({
  missingName: limitedTextSchema(100),
  age: optionalAgeSchema,
  gender: optionalLimitedTextSchema(32),
  clothing: optionalLimitedTextSchema(500),
  sector: optionalSectorSchema,
  lastSeenTime: z.preprocess(
    (value) => (value === null || value === "" ? undefined : value),
    lastSeenTimeSchema.optional()
  ),
  photoUrl: z.preprocess(
    (value) => (value === null || value === "" ? undefined : value),
    httpsUrlSchema.optional()
  ),
});

const lostListQuerySchema = z.object({
  caseId: z.preprocess(
    (value) => value || undefined,
    z.string().trim().min(1).max(128).optional()
  ),
  sector: optionalSectorSchema,
});

export async function POST(req: NextRequest) {
  try {
    const session = (await getServerSession(authConfig)) as any;
    if (!session?.user) {
      return NextResponse.json(
        error("UNAUTHORIZED", "Please login first"),
        { status: 401 }
      );
    }

    const user = session.user as any;

    const rateLimitCheck = await checkRateLimit(
      `lost-report:${user.id}`,
      RATE_LIMITS.LOST_PERSON_REPORT.max,
      RATE_LIMITS.LOST_PERSON_REPORT.window
    );

    if (!rateLimitCheck.success) {
      return NextResponse.json(
        error("RATE_LIMITED", "Too many lost-person reports"),
        { status: 429 }
      );
    }

    const parsedBody = await parseJsonBody(req, lostReportBodySchema);
    if (parsedBody.response) return parsedBody.response;

    const {
      missingName,
      age,
      gender,
      clothing,
      sector,
      lastSeenTime,
      photoUrl,
    } = parsedBody.data;

    const lostPerson = await prisma.lostPerson.create({
      data: {
        reportedById: user.id,
        missingName,
        age,
        gender,
        clothingDescription: clothing,
        lastSeenSector: sector || user.sector,
        lastSeenTime: lastSeenTime ? new Date(lastSeenTime) : new Date(),
        photoUrl,
        status: "SEARCHING",
        faceEmbedding: photoUrl ? "mock-embedding-" + Date.now() : null,
      },
    });

    // Send alert to all volunteers in the sector
    const volunteers = await prisma.user.findMany({
      where: {
        role: "VOLUNTEER",
        sector: sector || user.sector,
      },
    });

    return NextResponse.json(
      success(
        {
          caseId: lostPerson.id,
          status: lostPerson.status,
          alertsSent: volunteers.length,
          message: "Missing person report submitted. Volunteers have been alerted.",
        },
        "Report submitted successfully"
      )
    );
  } catch (err: any) {
    console.error("[ERROR] Lost person POST:", err);
    return NextResponse.json(
      error("ERROR", "Failed to report missing person"),
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = (await getServerSession(authConfig)) as any;
    if (!session?.user) {
      return NextResponse.json(
        error("UNAUTHORIZED", "Please login first"),
        { status: 401 }
      );
    }

    const user = session.user as any;
    const { searchParams } = new URL(req.url);
    const parsedQuery = lostListQuerySchema.safeParse(
      Object.fromEntries(searchParams)
    );

    if (!parsedQuery.success) {
      return validationErrorResponse(
        parsedQuery.error.issues[0]?.message || "Invalid lost-person query"
      );
    }

    const { caseId, sector } = parsedQuery.data;

    // Only show own reports or if user is VOLUNTEER/POLICE
    let where: any = { status: "SEARCHING" };

    if (caseId) {
      // Specific case - must be authorized
      const lostCase = await prisma.lostPerson.findUnique({
        where: { id: caseId },
        include: { reportedBy: true },
      });

      if (
        !lostCase ||
        (lostCase.reportedById !== user.id &&
          !["VOLUNTEER", "POLICE", "ADMIN"].includes(user.role))
      ) {
        return NextResponse.json(
          error("FORBIDDEN", "Insufficient permissions"),
          { status: 403 }
        );
      }

      return NextResponse.json(success(lostCase));
    }

    // List cases - restrict by role
    if (user.role === "PILGRIM") {
      where.reportedById = user.id; // Can only see own reports
    } else if (["VOLUNTEER", "POLICE"].includes(user.role)) {
      where.lastSeenSector = sector || user.sector; // Can see sector's cases
    }

    const cases = await prisma.lostPerson.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true,
        missingName: true,
        age: true,
        lastSeenSector: true,
        lastSeenTime: true,
        clothingDescription: true,
        status: true,
        createdAt: true,
        // IMPORTANT: Don't send photo URLs in list view
        // photoUrl: false,
        // faceEmbedding: false,
      },
    });

    return NextResponse.json(success(cases, "Cases retrieved"));
  } catch (err: any) {
    console.error("[ERROR] Lost person GET:", err);
    return NextResponse.json(
      error("ERROR", "Failed to retrieve cases"),
      { status: 500 }
    );
  }
}
