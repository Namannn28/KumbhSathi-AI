import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/lib/utils";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import { z } from "zod";
import { parseJsonBody, validationErrorResponse } from "@/lib/validation";

const bookingSchema = z.object({
  accommodationId: z.string().trim().min(1).max(128),
  checkInDate: z.string().trim().datetime().refine(
    (val) => new Date(val).getTime() >= Date.now() - 24 * 60 * 60 * 1000,
    "Check-in date cannot be in the past"
  ),
  checkOutDate: z.string().trim().datetime(),
  numberOfGuests: z.number().int().min(1).max(50),
  notes: z.string().trim().max(500).optional(),
}).refine(
  (body) => new Date(body.checkOutDate).getTime() > new Date(body.checkInDate).getTime(),
  "Check-out date must be after check-in date"
);

export async function POST(req: NextRequest) {
  try {
    const session = (await getServerSession(authConfig)) as any;
    if (!session?.user) {
      return NextResponse.json(
        error("UNAUTHORIZED", "Please login first"),
        { status: 401 }
      );
    }

    const parsedBody = await parseJsonBody(req, bookingSchema);
    if (parsedBody.response) return parsedBody.response;

    const { accommodationId, checkInDate, checkOutDate, numberOfGuests, notes } = parsedBody.data;

    // Use a transaction to ensure atomic updates (prevent double booking)
    const result = await prisma.$transaction(async (tx) => {
      const accommodation = await tx.accommodation.findUnique({
        where: { id: accommodationId },
      });

      if (!accommodation) {
        throw new Error("ACCOMMODATION_NOT_FOUND");
      }

      if (accommodation.availableUnits <= 0) {
        throw new Error("NO_UNITS_AVAILABLE");
      }

      // Calculate total price if pricing exists
      let totalPrice = null;
      if (accommodation.priceMin) {
        const nights = Math.ceil(
          (new Date(checkOutDate).getTime() - new Date(checkInDate).getTime()) / (1000 * 60 * 60 * 24)
        );
        totalPrice = accommodation.priceMin * numberOfGuests * Math.max(nights, 1);
      }

      // Decrement available units
      await tx.accommodation.update({
        where: { id: accommodationId },
        data: {
          availableUnits: {
            decrement: 1,
          },
        },
      });

      // Create booking
      const booking = await tx.accommodationBooking.create({
        data: {
          userId: session.user.id,
          accommodationId,
          checkInDate: new Date(checkInDate),
          checkOutDate: new Date(checkOutDate),
          numberOfGuests,
          totalPrice,
          status: "CONFIRMED",
          notes,
        },
      });

      return booking;
    });

    return NextResponse.json(
      success(result, "Accommodation booked successfully")
    );
  } catch (err: any) {
    console.error("[ERROR] Accommodation booking POST:", err);
    
    if (err.message === "ACCOMMODATION_NOT_FOUND") {
      return NextResponse.json(
        error("NOT_FOUND", "Accommodation listing not found"),
        { status: 404 }
      );
    }
    if (err.message === "NO_UNITS_AVAILABLE") {
      return NextResponse.json(
        error("UNAVAILABLE", "No available units left in this camp"),
        { status: 400 }
      );
    }

    return NextResponse.json(
      error("ERROR", "Failed to book accommodation"),
      { status: 500 }
    );
  }
}
