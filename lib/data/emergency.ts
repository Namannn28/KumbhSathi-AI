export const emergencyContacts = [
  { name: "Police", nameHi: "पुलिस", number: "100", icon: "🚔", color: "blue" },
  { name: "Ambulance", nameHi: "एम्बुलेंस", number: "108", icon: "🚑", color: "red" },
  { name: "Women Helpline", nameHi: "महिला हेल्पलाइन", number: "1091", icon: "👩", color: "pink" },
  { name: "Fire", nameHi: "अग्निशमन", number: "101", icon: "🔥", color: "orange" },
  { name: "Disaster", nameHi: "आपदा", number: "112", icon: "⚠️", color: "yellow" },
  { name: "Child Helpline", nameHi: "बाल हेल्पलाइन", number: "1098", icon: "👶", color: "green" },
  { name: "Kumbh Control Room", nameHi: "कुम्भ नियंत्रण कक्ष", number: "0532-2470290", icon: "📋", color: "sacred" },
  { name: "Tourist Helpline", nameHi: "पर्यटक हेल्पलाइन", number: "1363", icon: "ℹ️", color: "purple" },
];

export const emergencyTypes = [
  { id: "medical", name: "Medical Emergency", nameHi: "चिकित्सा आपातकाल", icon: "🏥", color: "red", description: "Heart attack, injury, unconscious person" },
  { id: "lost_child", name: "Lost Child", nameHi: "बच्चा खोया", icon: "👶", color: "blue", description: "Child separated from family" },
  { id: "women_safety", name: "Women Safety", nameHi: "महिला सुरक्षा", icon: "👩", color: "pink", description: "Harassment, unsafe situation" },
  { id: "stampede", name: "Stampede Alert", nameHi: "भगदड़ चेतावनी", icon: "⚠️", color: "orange", description: "Crowd surge, stampede risk" },
  { id: "fire", name: "Fire", nameHi: "आग", icon: "🔥", color: "red", description: "Fire in tent, camp, or area" },
  { id: "theft", name: "Theft / Robbery", nameHi: "चोरी / लूट", icon: "🔒", color: "gray", description: "Stolen belongings, pickpocket" },
  { id: "drowning", name: "Drowning", nameHi: "डूबना", icon: "🌊", color: "blue", description: "Person drowning in river" },
  { id: "other", name: "Other Emergency", nameHi: "अन्य आपातकाल", icon: "🆘", color: "gray", description: "Any other emergency" },
];

export const firstAidGuides = [
  { id: "fa1", title: "Heatstroke", titleHi: "लू लगना", icon: "☀️", steps: ["Move person to shade/cool area", "Remove excess clothing", "Apply cool water to skin", "Fan the person", "Give small sips of cool water", "Call 108 if unconscious"], stepsHi: ["व्यक्ति को छाया/ठंडी जगह ले जाएँ", "अतिरिक्त कपड़े हटाएँ", "त्वचा पर ठंडा पानी लगाएँ", "पंखा करें", "ठंडे पानी की छोटी-छोटी घूँट दें", "बेहोश हो तो 108 कॉल करें"] },
  { id: "fa2", title: "Dehydration", titleHi: "निर्जलीकरण", icon: "💧", steps: ["Move to cool area", "Give ORS solution or salted water", "Rest in shade", "Drink small sips frequently", "Seek medical help if severe"], stepsHi: ["ठंडी जगह पर ले जाएँ", "ORS या नमक-चीनी का पानी दें", "छाया में आराम करें", "बार-बार छोटी-छोटी घूँट पिएँ", "गंभीर हो तो चिकित्सा सहायता लें"] },
  { id: "fa3", title: "Cuts & Wounds", titleHi: "कटना और घाव", icon: "🩹", steps: ["Clean wound with clean water", "Apply pressure to stop bleeding", "Use antiseptic if available", "Apply clean bandage", "Visit medical camp if deep"], stepsHi: ["साफ पानी से घाव धोएँ", "खून रोकने के लिए दबाव डालें", "उपलब्ध हो तो एंटीसेप्टिक लगाएँ", "साफ पट्टी बाँधें", "गहरा हो तो चिकित्सा शिविर जाएँ"] },
];

export const safetyTips = [
  "Always keep your phone fully charged and carry a power bank",
  "Wear comfortable shoes — you'll walk 5-10 km daily",
  "Keep ID proof, emergency contact card, and cash in a waterproof pouch",
  "Travel in groups, especially at night",
  "Drink only packaged or purified water",
  "Note your tent/accommodation number and sector on your phone",
  "Keep children's photos and details saved on your phone",
  "Follow crowd flow — never walk against the crowd",
  "Use the family locator feature to track your group members",
  "Set meeting points with family in case you get separated",
];
