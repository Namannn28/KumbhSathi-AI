import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/lib/utils";
import prisma from "@/lib/db";
import { z } from "zod";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rateLimit";
import {
  getClientIdentifier,
  languageSchema,
  limitedTextSchema,
  parseJsonBody,
} from "@/lib/validation";

// Mock translation function - in production, use actual API
async function translateText(text: string, targetLang: string): Promise<string> {
  const translations: Record<string, string> = {
    "Hello|hi": "नमस्ते",
    "Sangam Ghat|gu": "સંગમ ઘાટ",
    "Emergency|hi": "आपातकाल",
    "Medical Camp|hi": "चिकित्सा शिविर",
    "Lost Child|ta": "இழந்த குழந்தை",
    "Where is the nearest toilet?|hi":
      "निकटतम शौचालय कहाँ है?",
  };

  for (const key in translations) {
    if (text.includes(key.split("|")[0])) {
      return translations[key];
    }
  }

  return `[${targetLang}] ${text}`;
}

const translateBodySchema = z.object({
  text: limitedTextSchema(1000),
  sourceLang: languageSchema.default("en"),
  targetLang: languageSchema,
});

export async function POST(req: NextRequest) {
  try {
    const rateLimitCheck = await checkRateLimit(
      getClientIdentifier(req, "translate"),
      RATE_LIMITS.TRANSLATION.max,
      RATE_LIMITS.TRANSLATION.window
    );

    if (!rateLimitCheck.success) {
      return NextResponse.json(
        error("RATE_LIMITED", "Too many translation requests"),
        { status: 429 }
      );
    }

    const parsedBody = await parseJsonBody(req, translateBodySchema);
    if (parsedBody.response) return parsedBody.response;

    const { text, sourceLang, targetLang } = parsedBody.data;

    // Check cache first
    const cached = await prisma.translationCache.findUnique({
      where: {
        sourceText_sourceLang_targetLang: {
          sourceText: text,
          sourceLang,
          targetLang,
        },
      },
    });

    if (cached) {
      return NextResponse.json(
        success(
          { original: text, translated: cached.translatedText, cached: true },
          "Translation retrieved from cache"
        )
      );
    }

    // Translate
    const translated = await translateText(text, targetLang);

    // Cache the result
    await prisma.translationCache.create({
      data: {
        sourceText: text,
        sourceLang,
        targetLang,
        translatedText: translated,
      },
    });

    return NextResponse.json(
      success(
        { original: text, translated, cached: false },
        "Translation completed"
      )
    );
  } catch (err: any) {
    console.error("[ERROR] Translate POST:", err);
    return NextResponse.json(
      error("ERROR", "Translation failed"),
      { status: 500 }
    );
  }
}
