import { NextRequest, NextResponse } from "next/server";
import { success, error } from "@/lib/utils";
import prisma from "@/lib/db";
import { checkRateLimit, RATE_LIMITS } from "@/lib/rateLimit";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const WHATSAPP_API_TOKEN = process.env.WHATSAPP_BUSINESS_TOKEN;
const WHATSAPP_PHONE_ID = process.env.WHATSAPP_BUSINESS_PHONE_ID;

export async function GET(req: NextRequest) {
  // WhatsApp webhook verification
  const { searchParams } = new URL(req.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
    console.log("[WhatsApp] Webhook verified");
    return NextResponse.json(challenge);
  }

  return NextResponse.json(error("FORBIDDEN", "Verification failed"), {
    status: 403,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { entry } = body;

    if (!entry || !entry[0]?.changes) {
      return NextResponse.json(success(null));
    }

    const changes = entry[0].changes[0];
    const { value } = changes;

    if (!value?.messages) {
      return NextResponse.json(success(null));
    }

    const message = value.messages[0];
    const phoneNumber = message.from;
    const messageText = message.text?.body || "";

    console.log(`[WhatsApp] Message from ${phoneNumber}: ${messageText}`);

    // Rate limiting
    const rateLimitCheck = await checkRateLimit(
      `whatsapp:${phoneNumber}`,
      RATE_LIMITS.CHAT.max,
      RATE_LIMITS.CHAT.window
    );

    if (!rateLimitCheck.success) {
      await sendWhatsAppMessage(
        phoneNumber,
        "🔄 Too many messages. Please wait before sending another message."
      );
      return NextResponse.json(success(null));
    }

    // Get or create WhatsApp session
    let session = await prisma.whatsappSession.findUnique({
      where: { phoneNumber },
    });

    if (!session) {
      session = await prisma.whatsappSession.create({
        data: { phoneNumber },
      });
    }

    // Process message with AI
    const response = await processWhatsAppMessage(messageText, phoneNumber);

    // Send response back
    await sendWhatsAppMessage(phoneNumber, response);

    // Update last message time
    await prisma.whatsappSession.update({
      where: { phoneNumber },
      data: { lastMessageAt: new Date() },
    });

    return NextResponse.json(success(null));
  } catch (err: any) {
    console.error("[WhatsApp Error]:", err);
    return NextResponse.json(success(null)); // Return 200 to acknowledge receipt
  }
}

async function processWhatsAppMessage(
  messageText: string,
  phoneNumber: string
): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Detect intent from message
    let response = "";

    if (messageText.toLowerCase().includes("snan")) {
      response = `🙏 *Snan Schedule 2025*

📅 *Makar Sankranti Snan*
📍 Sangam Ghat
⏰ 6:00 AM - 9:00 AM (Jan 14)

📅 *Mauni Amavasya Snan*
📍 Triveni Ghat
⏰ 5:30 AM - 8:30 AM (Jan 29)

📅 *Basant Panchami*
📍 Ganga Ghat
⏰ 7:00 AM - 10:00 AM (Feb 12)

Reply with:
🏨 for accommodation
🗺️ for directions
🆘 for emergency`;
    } else if (messageText.toLowerCase().includes("accommodation") || messageText.toLowerCase().includes("hotel")) {
      response = `🏨 *Find Accommodation*

Send location or sector number (1-12)

*Available types:*
⛺ Tent - ₹200-500
🛕 Dharamshala - Free to ₹500
🏨 Hotel - ₹500-5000
🏛️ Ashram - Donation-based

Contact us for personalized recommendations!`;
    } else if (
      messageText.toLowerCase().includes("emergency") ||
      messageText.toLowerCase().includes("help") ||
      messageText.toLowerCase().includes("sos")
    ) {
      response = `🆘 *EMERGENCY SERVICES*

📞 Police: 112
🚑 Ambulance: 112
☎️ KumbhSaarthi Helpline: 1800-200-0001

*For immediate help:*
📍 Share your location
🏥 Describe the emergency
👥 Tell us who needs help

We're here 24/7!`;
    } else if (messageText.toLowerCase().includes("hindi") || messageText.toLowerCase().includes("भाषा")) {
      response = `नमस्ते! 🙏

आपका स्वागत है KumbhSaarthi में।

कृपया बताएं:
📅 स्नान का समय जानना है?
🏨 ठहरने की जगह चाहिए?
🗺️ रास्ता बताइए?
🆘 आपातकाल सहायता?

'समाचार' लिखिए समाचार के लिए`;
    } else {
      // Default: Use AI to respond
      const prompt = `You are KumbhSaarthi, WhatsApp assistant for Mahakumbh pilgrims.
User asks: "${messageText}"

Respond in under 240 characters (WhatsApp limit), use emojis, be helpful.`;

      const result = await model.generateContent(prompt);
      response = result.response.text();

      // Truncate if too long
      if (response.length > 240) {
        response = response.substring(0, 237) + "...";
      }
    }

    return response;
  } catch (err) {
    console.error("[WhatsApp AI Error]:", err);
    return "Unable to process. Please try again or call 1800-200-0001 for help.";
  }
}

async function sendWhatsAppMessage(
  phoneNumber: string,
  message: string
): Promise<void> {
  try {
    if (!WHATSAPP_API_TOKEN || !WHATSAPP_PHONE_ID) {
      console.warn("[WhatsApp] API credentials not configured");
      return;
    }

    const response = await fetch(
      `https://graph.instagram.com/v18.0/${WHATSAPP_PHONE_ID}/messages`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WHATSAPP_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          to: phoneNumber,
          type: "text",
          text: { body: message },
        }),
      }
    );

    if (!response.ok) {
      console.error(
        "[WhatsApp Send Error]:",
        await response.text()
      );
    }
  } catch (err) {
    console.error("[WhatsApp Send Error]:", err);
  }
}
