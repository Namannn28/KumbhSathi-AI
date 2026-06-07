import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/lib/utils";
import prisma from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sector = searchParams.get("sector");
    const type = searchParams.get("type");
    const budgetMax = searchParams.get("budgetMax");
    const guests = parseInt(searchParams.get("guests") || "1");

    let where: any = {};
    if (sector) where.sector = sector;
    if (type) where.type = type;
    if (budgetMax) where.priceMax = { lte: parseInt(budgetMax) };

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
    return NextResponse.json(
      error("ERROR", err.message || "Failed to search accommodations"),
      { status: 500 }
    );
  }
}
