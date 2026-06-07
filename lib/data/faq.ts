export interface FaqItem {
  id: string;
  question: string;
  questionHi: string;
  answer: string;
  answerHi: string;
  category: string;
}

export const faqData: FaqItem[] = [
  { id: "faq1", question: "When is Mahakumbh 2028?", questionHi: "महाकुम्भ 2028 कब है?", answer: "Mahakumbh 2028 will be held from January to March 2028 in Prayagraj (Allahabad), Uttar Pradesh. The main bathing dates are between January 14 to March 7, 2028.", answerHi: "महाकुम्भ 2028 जनवरी से मार्च 2028 तक प्रयागराज (इलाहाबाद), उत्तर प्रदेश में आयोजित होगा।", category: "general" },
  { id: "faq2", question: "What is the significance of bathing at Sangam?", questionHi: "संगम पर स्नान का क्या महत्व है?", answer: "Bathing at Sangam during Kumbh Mela is believed to wash away all sins. The Sangam is the sacred confluence of three rivers: Ganga, Yamuna, and the mythical Saraswati.", answerHi: "कुम्भ मेले के दौरान संगम पर स्नान करने से सभी पापों का नाश होता है। संगम तीन नदियों - गंगा, यमुना और पौराणिक सरस्वती का पवित्र संगम है।", category: "spiritual" },
  { id: "faq3", question: "How to reach Prayagraj?", questionHi: "प्रयागराज कैसे पहुँचें?", answer: "By Air: Prayagraj Airport (IXD) has flights from major cities. By Train: Prayagraj Junction (PRYJ) is well-connected. By Road: NH-19 connects to Delhi, Varanasi, and Lucknow.", answerHi: "हवाई: प्रयागराज हवाई अड्डा (IXD)। रेल: प्रयागराज जंक्शन (PRYJ)। सड़क: NH-19 दिल्ली, वाराणसी और लखनऊ से जोड़ता है।", category: "travel" },
  { id: "faq4", question: "Is there free accommodation at Kumbh?", questionHi: "क्या कुम्भ में मुफ्त आवास है?", answer: "Yes! Government tent colonies start at ₹100/night. Many ashrams and dharamshalas offer free accommodation. Free langars serve meals throughout the day.", answerHi: "हाँ! सरकारी टेंट कॉलोनी ₹100/रात से शुरू। कई आश्रम और धर्मशालाएँ मुफ्त आवास देती हैं। मुफ्त लंगर पूरे दिन भोजन परोसते हैं।", category: "accommodation" },
  { id: "faq5", question: "What are the emergency numbers?", questionHi: "आपातकालीन नंबर क्या हैं?", answer: "Police: 100, Ambulance: 108, Women Helpline: 1091, Fire: 101, Disaster: 112, Kumbh Control Room: 0532-2470290", answerHi: "पुलिस: 100, एम्बुलेंस: 108, महिला हेल्पलाइन: 1091, अग्निशमन: 101, आपदा: 112", category: "emergency" },
  { id: "faq6", question: "What should I carry to Kumbh?", questionHi: "कुम्भ में क्या ले जाएँ?", answer: "Essentials: ID proof, warm clothes, comfortable walking shoes, water bottle, first-aid kit, mobile charger, cash/UPI, medicines. Avoid valuables and excessive luggage.", answerHi: "आवश्यक: पहचान पत्र, गरम कपड़े, आरामदायक जूते, पानी की बोतल, प्राथमिक चिकित्सा किट, मोबाइल चार्जर, नकद/UPI, दवाइयाँ।", category: "preparation" },
  { id: "faq7", question: "What are the important Snan dates?", questionHi: "महत्वपूर्ण स्नान तिथियाँ क्या हैं?", answer: "Major Snan dates: Makar Sankranti (Jan 14), Paush Purnima (Jan 26), Mauni Amavasya/Shahi Snan (Feb 9), Basant Panchami (Feb 14), Maghi Purnima (Feb 24), Mahashivratri (Mar 7).", answerHi: "प्रमुख स्नान तिथियाँ: मकर संक्रांति (14 जन.), पौष पूर्णिमा (26 जन.), मौनी अमावस्या (9 फ़र.), बसंत पंचमी (14 फ़र.), माघी पूर्णिमा (24 फ़र.), महाशिवरात्रि (7 मार्च)।", category: "spiritual" },
  { id: "faq8", question: "Is Kumbh safe for women and elderly?", questionHi: "क्या कुम्भ महिलाओं और बुजुर्गों के लिए सुरक्षित है?", answer: "Yes. Dedicated women's help desks, CCTV surveillance, women police patrols, and senior citizen assistance booths are available throughout the Mela area.", answerHi: "हाँ। समर्पित महिला सहायता डेस्क, सीसीटीवी निगरानी, महिला पुलिस गश्त, और वरिष्ठ नागरिक सहायता बूथ उपलब्ध हैं।", category: "safety" },
];

export const chatResponses: Record<string, string> = {
  "hello": "🙏 Namaste! Welcome to KumbhSaarthi AI. I'm your digital companion for Mahakumbh 2028 at Prayagraj. How can I help you today?\n\nYou can ask me about:\n• Snan dates & schedules\n• Navigation & directions\n• Accommodation\n• Emergency help\n• Travel booking",
  "namaste": "🙏 नमस्ते! कुम्भसारथी AI में आपका स्वागत है। मैं महाकुम्भ 2028 में आपका डिजिटल सहयोगी हूँ। मैं आपकी कैसे मदद कर सकता हूँ?",
  "snan": "🛕 **Major Snan Dates - Mahakumbh 2028:**\n\n1. 🌅 **Makar Sankranti** - Jan 14, 2028\n2. 🌕 **Paush Purnima** - Jan 26, 2028\n3. 👑 **Mauni Amavasya (Shahi Snan)** - Feb 9, 2028\n4. 🌸 **Basant Panchami** - Feb 14, 2028\n5. 🌕 **Maghi Purnima** - Feb 24, 2028\n6. 🔱 **Mahashivratri (Shahi Snan)** - Mar 7, 2028\n\nThe most auspicious day is **Mauni Amavasya** when 5 crore+ pilgrims take the holy dip!",
  "crowd": "📊 **Current Crowd Status:**\n\n• Sangam Zone (A1): 🔴 HIGH - 1.8 Lakh people\n• Dashashwamedh (A2): 🟡 MODERATE - 95K people\n• Ram Ghat (A3): 🟢 LOW - 42K people\n\n💡 **Tip:** Ram Ghat zone is less crowded right now. Best time for a peaceful bathing experience!",
  "emergency": "🆘 **Emergency Contacts:**\n\n📞 Police: **100**\n🚑 Ambulance: **108**\n👩 Women Helpline: **1091**\n🔥 Fire: **101**\n⚠️ Disaster: **112**\n📋 Kumbh Control Room: **0532-2470290**\n\nTap the SOS button in the Emergency section for immediate assistance!",
  "accommodation": "🏨 **Accommodation Options:**\n\n1. 🏕️ Govt Tent Colony - ₹100/night\n2. 🛕 Dharamshala - ₹200/night\n3. ⛺ Sangam Tent City - ₹500/night\n4. 🏨 Premium Cottages - ₹2,500/night\n5. 🏩 Hotels - ₹3,500+/night\n6. 🧘 Ashrams - FREE (donation)\n\nCheck the Accommodation section for availability and booking!",
  "default": "🙏 Thank you for your question! As your Mahakumbh 2028 companion, I can help with:\n\n🛕 **Spiritual:** Snan dates, rituals, temple info\n🗺️ **Navigation:** Routes, maps, POI finder\n🏨 **Stay:** Accommodation, food, services\n🆘 **Safety:** Emergency contacts, crowd alerts\n✈️ **Travel:** Flights, trains to Prayagraj\n\nPlease ask me anything specific!",
};
