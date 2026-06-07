import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/lib/utils";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import { z } from "zod";
import { parseJsonBody } from "@/lib/validation";
import { EmergencyStatus } from "@prisma/client";

const emergencyStatusEnum = z.enum(["ACKNOWLEDGED", "DISPATCHED", "RESOLVED", "FALSE_ALARM"]);

const resolveEmergencySchema = z.object({
  caseId: z.string().trim().min(1).max(128),
  status: emergencyStatusEnum,
  notes: z.string().trim().max(1000).optional(),
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
    // Only administrators, police officers, or volunteers can update/resolve emergencies
    if (!["VOLUNTEER", "POLICE", "ADMIN"].includes(user.role)) {
      return NextResponse.json(
        error("FORBIDDEN", "Insufficient permissions to update emergencies"),
        { status: 403 }
      );
    }

    const parsedBody = await parseJsonBody(req, resolveEmergencySchema);
    if (parsedBody.response) return parsedBody.response;

    const { caseId, status, notes } = parsedBody.data;

    // Check if the emergency exists
    const emergency = await prisma.emergencyEvent.findUnique({
      where: { id: caseId },
    });

    if (!emergency) {
      return NextResponse.json(
        error("NOT_FOUND", "Emergency alert case not found"),
        { status: 404 }
      );
    }

    const updateData: any = {
      status: status as EmergencyStatus,
      description: notes ? `${emergency.description || ""}\n\nResolution Notes: ${notes}` : emergency.description,
      updatedAt: new Date(),
    };

    if (status === "ACKNOWLEDGED" && !emergency.acknowledgedAt) {
      updateData.acknowledgedAt = new Date();
      updateData.assignedToId = user.id;
    }

    if (status === "RESOLVED") {
      updateData.resolvedAt = new Date();
    }

    const updatedEmergency = await prisma.emergencyEvent.update({
      where: { id: caseId },
      data: updateData,
    });

    console.log(`[AUDIT] Emergency case ${caseId} updated to ${status} by user ${user.id}`);

    return NextResponse.json(
      success(updatedEmergency, `Emergency case updated to ${status} successfully`)
    );
  } catch (err: any) {
    console.error("[ERROR] Emergency resolve POST:", err);
    return NextResponse.json(
      error("ERROR", "Failed to update emergency case"),
      { status: 500 }
    );
  }
}
