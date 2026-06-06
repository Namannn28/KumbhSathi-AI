import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/lib/utils";
import prisma from "@/lib/db";

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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, sourceLang, targetLang } = body;

    if (!text || !targetLang) {
      return NextResponse.json(
        error("MISSING_FIELD", "Text and targetLang required"),
        { status: 400 }
      );
    }

    // Check cache first
    const cached = await prisma.translationCache.findUnique({
      where: {
        sourceText_sourceLang_targetLang: {
          sourceText: text,
          sourceLang: sourceLang || "en",
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
        sourceLang: sourceLang || "en",
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
    return NextResponse.json(
      error("ERROR", err.message || "Translation failed"),
      { status: 500 }
    );
  }
}
