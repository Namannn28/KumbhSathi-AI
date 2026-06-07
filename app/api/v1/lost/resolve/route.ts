import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/lib/utils";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import { z } from "zod";
import {
  latitudeSchema,
  longitudeSchema,
  parseJsonBody,
  validationErrorResponse,
} from "@/lib/validation";

const resolveSchema = z.object({
  caseId: z.string().trim().min(1).max(128),
  foundLatitude: z.preprocess(
    (value) => (value === null || value === "" ? undefined : value),
    latitudeSchema.optional()
  ),
  foundLongitude: z.preprocess(
    (value) => (value === null || value === "" ? undefined : value),
    longitudeSchema.optional()
  ),
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

    const parsedBody = await parseJsonBody(req, resolveSchema);
    if (parsedBody.response) return parsedBody.response;

    const { caseId, foundLatitude, foundLongitude } = parsedBody.data;

    // Check if the case exists and user is authorized to update it
    const lostCase = await prisma.lostPerson.findUnique({
      where: { id: caseId },
    });

    if (!lostCase) {
      return NextResponse.json(
        error("NOT_FOUND", "Missing person report case not found"),
        { status: 404 }
      );
    }

    const user = session.user as any;
    const isReporter = lostCase.reportedById === user.id;
    const isOfficer = ["VOLUNTEER", "POLICE", "ADMIN"].includes(user.role);

    if (!isReporter && !isOfficer) {
      return NextResponse.json(
        error("FORBIDDEN", "You are not authorized to resolve this case"),
        { status: 403 }
      );
    }

    const updatedCase = await prisma.lostPerson.update({
      where: { id: caseId },
      data: {
        status: "RESOLVED",
        foundLatitude,
        foundLongitude,
        foundTime: new Date(),
      },
    });

    console.log(`[AUDIT] Lost person case ${caseId} resolved by user ${user.id}`);

    return NextResponse.json(
      success(updatedCase, "Missing person case resolved successfully")
    );
  } catch (err: any) {
    console.error("[ERROR] Lost person resolve POST:", err);
    return NextResponse.json(
      error("ERROR", "Failed to resolve missing person case"),
      { status: 500 }
    );
  }
}
