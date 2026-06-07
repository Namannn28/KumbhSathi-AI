import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/lib/utils";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authConfig } from "@/auth.config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const session = (await getServerSession(authConfig)) as any;
    if (!session?.user) {
      return NextResponse.json(
        error("UNAUTHORIZED", "Please login first"),
        { status: 401 }
      );
    }

    const body = await req.json();
    const { message, sessionId, language = "en" } = body;

    if (!message) {
      return NextResponse.json(
        error("MISSING_FIELD", "Message is required"),
        { status: 400 }
      );
    }

    const user = session.user as any;
    const userId = user.id;

    // Get conversation history
    const history = await prisma.chatMessage.findMany({
      where: {
        userId,
        sessionId: sessionId || "default",
      },
      orderBy: { createdAt: "asc" },
      take: 10,
    });

    // Build context
    const faqDocs = await prisma.faqDocument.findMany({
      take: 5,
      where: {
        language: language,
      },
    });

    const systemPrompt = `You are KumbhSaarthi, a helpful AI assistant for pilgrims visiting Mahakumbh 2025.
You assist in multiple languages including Hindi, English, Gujarati, Tamil, Telugu, Bengali, Punjabi, and Urdu.
You are warm, respectful, and culturally sensitive. Keep responses concise (2-3 sentences for voice mode).
Current user sector: ${user.sector || "Unknown"}
Language: ${language}
Available FAQ context: ${JSON.stringify(faqDocs.map((d) => d.answer))}`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: history
        .filter((h) => h.role === "USER" || h.role === "ASSISTANT")
        .map((h) => ({
          role: h.role === "USER" ? "user" : "model",
          parts: [{ text: h.content }],
        })),
    });

    // Sanitize message to prevent prompt injection
    const sanitizedMessage = message
      .replace(/\\[\\\\`]/g, "\\$&")
      .slice(0, 1000); // Limit length

    // Detect injection attempts
    const injectionPatterns = [
      /ignore.*instruction/i,
      /forget.*prompt/i,
      /system.*prompt/i,
      /administrator/i,
    ];
    const isLikelyInjection = injectionPatterns.some((p) =>
      p.test(sanitizedMessage)
    );
    if (isLikelyInjection) {
      console.warn(
        `[SECURITY] Potential prompt injection detected from user ${user.id}`
      );
      // Don't block, just log - let LLM handle gracefully
    }

    const result = await chat.sendMessage(
      `${systemPrompt}\n\nUser question: ${sanitizedMessage}`
    );
    const responseText =
      result.response.candidates?.[0]?.content?.parts[0]?.text ||
      "I'm not sure. Please try again.";

    // Save to database
    await prisma.chatMessage.create({
      data: {
        userId,
        sessionId: sessionId || "default",
        role: "USER",
        content: message,
        inputType: "text",
      },
    });

    await prisma.chatMessage.create({
      data: {
        userId,
        sessionId: sessionId || "default",
        role: "ASSISTANT",
        content: responseText,
        agentUsed: "GEMINI_CHAT",
        latencyMs: 1500,
      },
    });

    return NextResponse.json(
      success(
        {
          message: responseText,
          sources: faqDocs.map((d) => ({
            question: d.question,
            category: d.category,
          })),
        },
        "Response generated successfully"
      )
    );
  } catch (err: any) {
    console.error("Chat error:", err);
    // Don't expose error details to client
    return NextResponse.json(
      error("CHAT_ERROR", "Unable to process your request. Please try again."),
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = (await getServerSession(authConfig)) as any;
    if (!session?.user) {
      return NextResponse.json(
        error("UNAUTHORIZED", "Please login first"),
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId") || "default";
    const user = session.user as any;

    const messages = await prisma.chatMessage.findMany({
      where: {
        userId: user.id,
        sessionId,
      },
      orderBy: { createdAt: "asc" },
    });

    return NextResponse.json(success(messages, "Chat history retrieved"));
  } catch (err: any) {
    return NextResponse.json(
      error("ERROR", err.message || "Failed to retrieve chat history"),
      { status: 500 }
    );
  }
}
