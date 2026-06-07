import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/lib/utils";
import prisma from "@/lib/db";
import { z } from "zod";
import { validationErrorResponse } from "@/lib/validation";

const eventQuerySchema = z.object({
  snan: z.enum(["true", "false"]).optional(),
  date: z.preprocess(
    (value) => value || undefined,
    z.string().trim().regex(/^\d{4}-\d{2}-\d{2}$/).optional()
  ),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = eventQuerySchema.safeParse(Object.fromEntries(searchParams));

    if (!parsed.success) {
      return validationErrorResponse(
        parsed.error.issues[0]?.message || "Invalid event parameters"
      );
    }

    const isSnan = parsed.data.snan === "true";
    const date = parsed.data.date;

    let where: any = {};
    if (isSnan) where.isSnan = true;

    if (date) {
      const startDate = new Date(`${date}T00:00:00.000Z`);
      if (Number.isNaN(startDate.getTime())) {
        return validationErrorResponse("Invalid date");
      }
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 1);
      where.startTime = {
        gte: startDate,
        lt: endDate,
      };
    }

    const events = await prisma.event.findMany({
      where,
      include: {
        location: true,
      },
      orderBy: { startTime: "asc" },
    });

    const formatted = events.map((event) => ({
      id: event.id,
      name: event.name,
      nameHi: event.nameHi,
      type: event.eventType,
      location: event.location.name,
      locationHi: event.location.nameHi,
      time: {
        start: event.startTime,
        end: event.endTime,
      },
      significance: {
        en: event.significanceEn,
        hi: event.significanceHi,
      },
      isSnan: event.isSnan,
      snanType: event.snanType,
      expectedAttendance: event.expectedAttendance,
    }));

    return NextResponse.json(
      success(formatted, `Found ${formatted.length} events`)
    );
  } catch (err: any) {
    return NextResponse.json(
      error("ERROR", err.message || "Failed to retrieve events"),
      { status: 500 }
    );
  }
}
