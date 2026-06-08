export interface FaqItem {
  id: string;
  question: string;
  questionHi: string;
  answer: string;
  answerHi: string;
  category: string;
}

export const faqData: FaqItem[] = [
  { id: "faq1", question: "When is Mahakumbh 2028?", questionHi: "महाकुम्भ 2028 कब है?", answer: "Mahakumbh 2028 will be held from April to May 2028 in Ujjain, Madhya Pradesh.", answerHi: "महाकुम्भ 2028 अप्रैल से मई 2028 तक उज्जैन, मध्य प्रदेश में आयोजित होगा।", category: "general" },
  { id: "faq2", question: "What is the significance of bathing at Ram Ghat?", questionHi: "राम घाट पर स्नान का क्या महत्व है?", answer: "Bathing at Ram Ghat during Simhastha Mahakumbh in Ujjain is believed to wash away all sins. It is a highly sacred ghat on the banks of the Kshipra river where millions gather for the holy dip.", answerHi: "उज्जैन में सिंहस्थ महाकुंभ के दौरान राम घाट पर स्नान करने से सभी पापों का नाश होता है। क्षिप्रा नदी के तट पर यह एक अत्यधिक पवित्र घाट है जहां लाखों लोग पवित्र स्नान के लिए इकट्ठा होते हैं।", category: "spiritual" },
  { id: "faq3", question: "How to reach Ujjain?", questionHi: "उज्जैन कैसे पहुँचें?", answer: "By Air: Indore Airport (IDR) is the nearest. By Train: Ujjain Junction (UJN) is well-connected. By Road: Regular buses run from Indore and Bhopal.", answerHi: "हवाई: इंदौर हवाई अड्डा (IDR)। रेल: उज्जैन जंक्शन (UJN)।", category: "travel" },
  { id: "faq4", question: "Is there free accommodation at Kumbh?", questionHi: "क्या कुम्भ में मुफ्त आवास है?", answer: "Yes! Government tent colonies start at ₹100/night. Many ashrams and dharamshalas offer free accommodation. Free langars serve meals throughout the day.", answerHi: "हाँ! सरकारी टेंट कॉलोनी ₹100/रात से शुरू। कई आश्रम और धर्मशालाएँ मुफ्त आवास देती हैं। मुफ्त लंगर पूरे दिन भोजन परोसते हैं।", category: "accommodation" },
  { id: "faq5", question: "What are the emergency numbers?", questionHi: "आपातकालीन नंबर क्या हैं?", answer: "Police: 100, Ambulance: 108, Women Helpline: 1091, Fire: 101, Disaster: 112, Kumbh Control Room: 0532-2470290", answerHi: "पुलिस: 100, एम्बुलेंस: 108, महिला हेल्पलाइन: 1091, अग्निशमन: 101, आपदा: 112", category: "emergency" },
  { id: "faq6", question: "What should I carry to Kumbh?", questionHi: "कुम्भ में क्या ले जाएँ?", answer: "Essentials: ID proof, warm clothes, comfortable walking shoes, water bottle, first-aid kit, mobile charger, cash/UPI, medicines. Avoid valuables and excessive luggage.", answerHi: "आवश्यक: पहचान पत्र, गरम कपड़े, आरामदायक जूते, पानी की बोतल, प्राथमिक चिकित्सा किट, मोबाइल चार्जर, नकद/UPI, दवाइयाँ।", category: "preparation" },
  { id: "faq7", question: "What are the important Snan dates?", questionHi: "महत्वपूर्ण स्नान तिथियाँ क्या हैं?", answer: "Major Shahi Snan dates for Simhastha 2028 are April 9, April 23, and May 8. The festival spans from late March to late May.", answerHi: "सिंहस्थ 2028 के लिए प्रमुख शाही स्नान की तिथियां 9 अप्रैल, 23 अप्रैल और 8 मई हैं।", category: "spiritual" },
  { id: "faq8", question: "Is Kumbh safe for women and elderly?", questionHi: "क्या कुम्भ महिलाओं और बुजुर्गों के लिए सुरक्षित है?", answer: "Yes. Dedicated women's help desks, CCTV surveillance, women police patrols, and senior citizen assistance booths are available throughout the Mela area.", answerHi: "हाँ। समर्पित महिला सहायता डेस्क, सीसीटीवी निगरानी, महिला पुलिस गश्त, और वरिष्ठ नागरिक सहायता बूथ उपलब्ध हैं।", category: "safety" },
  { id: "faq9", question: "What infrastructure preparations are underway for Simhastha 2028?", questionHi: "सिंहस्थ 2028 के लिए बुनियादी ढांचे की क्या तैयारी चल रही है?", answer: "The MP Govt is investing ₹7,300 crore to build Kumbh Nagri, riverfront upgrades, a 29-km Shipra pathway, and a four-lane Ujjain-Indore highway.", answerHi: "एमपी सरकार कुंभ नगरी, रिवरफ्रंट अपग्रेड, शिप्रा पाथवे और उज्जैन-इंदौर हाईवे के लिए ₹7,300 करोड़ का निवेश कर रही है।", category: "general" },
];

export const chatResponses: Record<string, string> = {
  "hello": "🙏 Namaste! Welcome to KumbhSaarthi AI. I'm your digital companion for Mahakumbh 2028 at Ujjain. How can I help you today?\n\nYou can ask me about:\n• Snan dates & schedules\n• Navigation & directions\n• Accommodation\n• Emergency help\n• Travel booking",
  "namaste": "🙏 नमस्ते! कुम्भसारथी AI में आपका स्वागत है। मैं महाकुम्भ 2028 में आपका डिजिटल सहयोगी हूँ। मैं आपकी कैसे मदद कर सकता हूँ?",
  "snan": "🛕 **Major Shahi Snan Dates - Simhastha Kumbh 2028 (Ujjain):**\n\n1. 🌅 **First Shahi Snan** - April 9, 2028\n2. 🌕 **Second Shahi Snan** - April 23, 2028\n3. 👑 **Third Shahi Snan** - May 8, 2028\n\nThe most auspicious days where all 13 Akharas take the holy dip in the Shipra river. Expect massive crowds, with the first Akhara entering the river around 4:00 AM!",
  "crowd": "📊 **Current Crowd Status:**\n\n• Ram Ghat Zone (A1): 🔴 HIGH - 1.8 Lakh people\n• Mahakaleshwar (A2): 🟡 MODERATE - 95K people\n• Mangalnath (A3): 🟢 LOW - 42K people\n\n💡 **Tip:** Mangalnath zone is less crowded right now. Best time for a peaceful darshan!",
  "emergency": "🆘 **Emergency Contacts:**\n\n📞 Police: **100**\n🚑 Ambulance: **108**\n👩 Women Helpline: **1091**\n🔥 Fire: **101**\n⚠️ Disaster: **112**\n📋 Kumbh Control Room: **0532-2470290**\n\nTap the SOS button in the Emergency section for immediate assistance!",
  "accommodation": "🏨 **Accommodation Options:**\n\n1. 🏕️ Govt Tent Colony - ₹100/night\n2. 🛕 Dharamshala - ₹200/night\n3. ⛺ Ram Ghat Tent City - ₹500/night\n4. 🏨 Premium Cottages - ₹2,500/night\n5. 🏩 Hotels - ₹3,500+/night\n6. 🧘 Ashrams - FREE (donation)\n\nCheck the Accommodation section for availability and booking!",
  "default": "🙏 Thank you for your question! As your Mahakumbh 2028 companion, I can help with:\n\n🛕 **Spiritual:** Snan dates, rituals, temple info\n🗺️ **Navigation:** Routes, maps, POI finder\n🏨 **Stay:** Accommodation, food, services\n🆘 **Safety:** Emergency contacts, crowd alerts\n✈️ **Travel:** Flights, trains to Ujjain\n\nPlease ask me anything specific!",
};
