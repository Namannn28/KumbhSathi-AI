import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/lib/utils";
import prisma from "@/lib/db";
import { z } from "zod";
import {
  accommodationTypeSchema,
  optionalSectorSchema,
  validationErrorResponse,
} from "@/lib/validation";

const searchQuerySchema = z.object({
  sector: optionalSectorSchema,
  type: z.preprocess(
    (value) => value || undefined,
    accommodationTypeSchema.optional()
  ),
  budgetMax: z.preprocess(
    (value) => value || undefined,
    z.coerce.number().int().min(0).max(100000).optional()
  ),
  guests: z.preprocess(
    (value) => value || "1",
    z.coerce.number().int().min(1).max(50)
  ),
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsed = searchQuerySchema.safeParse(Object.fromEntries(searchParams));

    if (!parsed.success) {
      return validationErrorResponse(
        parsed.error.issues[0]?.message || "Invalid search parameters"
      );
    }

    const { sector, type, budgetMax, guests } = parsed.data;

    let where: any = {};
    if (sector) where.sector = sector;
    if (type) where.type = type;
    if (budgetMax !== undefined) where.priceMax = { lte: budgetMax };

    const accommodations = await prisma.accommodation.findMany({
      where,
      include: {
        location: true,
      },
      orderBy: { rating: "desc" },
      take: 10,
    });

    const filtered = accommodations.filter(
      (acc) => acc.capacity >= guests && acc.availableUnits > 0
    );

    return NextResponse.json(
      success(
        filtered.map((acc) => ({
          id: acc.id,
          name: acc.name,
          type: acc.type,
          location: acc.location,
          price: `₹${acc.priceMin}-${acc.priceMax}`,
          available: acc.availableUnits,
          rating: acc.rating,
          contact: acc.contactWhatsapp || acc.contactPhone,
        })),
        `Found ${filtered.length} accommodations`
      )
    );
  } catch (err: any) {
    console.error("[ERROR] Accommodation Search GET:", err);
    return NextResponse.json(
      error("ERROR", "Failed to search accommodations"),
      { status: 500 }
    );
  }
}
