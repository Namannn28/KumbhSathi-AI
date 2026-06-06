import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/lib/utils";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const isSnan = searchParams.get("snan") === "true";
    const date = searchParams.get("date");

    let where: any = {};
    if (isSnan) where.isSnan = true;

    if (date) {
      const startDate = new Date(date);
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
