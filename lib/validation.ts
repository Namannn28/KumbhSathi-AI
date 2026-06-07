import { NextRequest, NextResponse } from "next/server";
import { z, ZodSchema } from "zod";
import { error } from "@/lib/utils";

const emptyToUndefined = (value: unknown) =>
  value === null || value === "" ? undefined : value;

export const sectorSchema = z
  .string()
  .trim()
  .regex(/^(?:[1-9]|1[0-2])$/, "Sector must be between 1 and 12");

export const optionalSectorSchema = z.preprocess(
  emptyToUndefined,
  sectorSchema.optional()
);

export const languageSchema = z.enum([
  "en",
  "hi",
  "gu",
  "ta",
  "te",
  "bn",
  "mr",
  "pa",
  "ur",
  "kn",
  "ml",
  "or",
]);

export const accommodationTypeSchema = z.enum([
  "TENT",
  "DHARAMSHALA",
  "HOTEL",
  "ASHRAM",
  "CAMP",
]);

export const locationTypeSchema = z.enum([
  "GHAT",
  "TEMPLE",
  "MEDICAL_CAMP",
  "POLICE_POST",
  "TOILET",
  "WATER_STATION",
  "FOOD_STALL",
  "PARKING",
  "FERRY",
  "INFO_KIOSK",
  "CAMPING_AREA",
]);

export const emergencyTypeSchema = z.enum([
  "MEDICAL",
  "LOST_CHILD",
  "WOMEN_SAFETY",
  "STAMPEDE",
  "FIRE",
  "CROWD_SURGE",
  "OTHER",
]);

export const latitudeSchema = z.coerce
  .number()
  .finite()
  .min(-90)
  .max(90);

export const longitudeSchema = z.coerce
  .number()
  .finite()
  .min(-180)
  .max(180);

export const sessionIdSchema = z
  .string()
  .trim()
  .min(1)
  .max(64)
  .regex(/^[A-Za-z0-9_-]+$/, "Invalid session id");

export const limitedTextSchema = (maxLength: number) =>
  z.string().trim().min(1).max(maxLength);

export const optionalLimitedTextSchema = (maxLength: number) =>
  z.preprocess(emptyToUndefined, z.string().trim().max(maxLength).optional());

export const httpsUrlSchema = z
  .string()
  .trim()
  .url()
  .max(2048)
  .refine((value) => new URL(value).protocol === "https:", {
    message: "URL must use https",
  });

export function validationErrorResponse(message: string) {
  return NextResponse.json(error("VALIDATION_ERROR", message), {
    status: 400,
  });
}

export async function parseJsonBody<T>(
  req: NextRequest,
  schema: ZodSchema<T>
): Promise<{ data: T; response?: never } | { data?: never; response: NextResponse }> {
  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return {
      response: validationErrorResponse("Request body must be valid JSON"),
    };
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return {
      response: validationErrorResponse(
        parsed.error.issues[0]?.message || "Invalid request body"
      ),
    };
  }

  return { data: parsed.data };
}

export function getClientIdentifier(req: NextRequest, prefix: string) {
  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const realIp = req.headers.get("x-real-ip")?.trim();
  return `${prefix}:${forwardedFor || realIp || "unknown"}`;
}
