import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Create Locations (Ghats, Temples, etc.)
  const sangamGhat = await prisma.location.create({
    data: {
      name: "Sangam Ghat",
      nameHi: "संगम घाट",
      locationType: "GHAT",
      latitude: 25.4358,
      longitude: 81.8463,
      sector: "1",
      crowdLevel: "high",
      crowdScore: 0.85,
      metadata: {
        description: "Most sacred bathing point where three rivers meet",
        capacity: 50000,
      },
    },
  });

  const triveniGhat = await prisma.location.create({
    data: {
      name: "Triveni Ghat",
      nameHi: "त्रिवेणी घाट",
      locationType: "GHAT",
      latitude: 25.4361,
      longitude: 81.8461,
      sector: "1",
      crowdLevel: "medium",
      crowdScore: 0.65,
    },
  });

  const gangaGhat = await prisma.location.create({
    data: {
      name: "Ganga Ghat",
      nameHi: "गंगा घाट",
      locationType: "GHAT",
      latitude: 25.4355,
      longitude: 81.8460,
      sector: "1",
      crowdLevel: "low",
      crowdScore: 0.35,
    },
  });

  // Medical Camps
  const medicalCamp1 = await prisma.location.create({
    data: {
      name: "Main Medical Camp - Sector 1",
      nameHi: "मुख्य चिकित्सा शिविर - सेक्टर 1",
      locationType: "MEDICAL_CAMP",
      latitude: 25.434,
      longitude: 81.844,
      sector: "1",
      metadata: {
        facilities: ["ICU", "Emergency", "General Ward"],
        doctors: 15,
        beds: 50,
      },
    },
  });

  // Police Posts
  const policePost1 = await prisma.location.create({
    data: {
      name: "Police Post - Sector 1",
      nameHi: "पुलिस चौकी - सेक्टर 1",
      locationType: "POLICE_POST",
      latitude: 25.433,
      longitude: 81.846,
      sector: "1",
      metadata: {
        officers: 20,
        vehicle_capacity: 3,
      },
    },
  });

  // Toilet Facilities
  const toilet1 = await prisma.location.create({
    data: {
      name: "Public Toilet Block A",
      nameHi: "सार्वजनिक शौचालय ब्लॉक ए",
      locationType: "TOILET",
      latitude: 25.432,
      longitude: 81.847,
      sector: "1",
      metadata: {
        capacity: 1000,
        gender: "mixed",
      },
    },
  });

  // Water Stations
  const waterStation1 = await prisma.location.create({
    data: {
      name: "Water Station - Sector 1A",
      nameHi: "जल स्टेशन - सेक्टर 1ए",
      locationType: "WATER_STATION",
      latitude: 25.431,
      longitude: 81.848,
      sector: "1A",
      metadata: {
        daily_capacity_liters: 50000,
        type: "drinking",
      },
    },
  });

  // Create Accommodations
  await prisma.accommodation.create({
    data: {
      name: "Sector 1 Government Tent City",
      nameHi: "सेक्टर 1 सरकारी टेंट शहर",
      type: "TENT",
      locationId: sangamGhat.id,
      latitude: 25.434,
      longitude: 81.844,
      sector: "1",
      capacity: 5000,
      availableUnits: 3500,
      priceMin: 200,
      priceMax: 500,
      verified: true,
      amenities: {
        features: ["Toilet", "Water", "Food", "Medical"],
      },
    },
  });

  await prisma.accommodation.create({
    data: {
      name: "Sri Ananda Ashram",
      nameHi: "श्री आनंद आश्रम",
      type: "ASHRAM",
      locationId: triveniGhat.id,
      latitude: 25.436,
      longitude: 81.845,
      sector: "1",
      capacity: 200,
      availableUnits: 80,
      priceMin: 0,
      priceMax: 500,
      verified: true,
      contactPhone: "+91-9876543210",
      amenities: {
        features: ["Prayer Room", "Food", "Clean Rooms"],
      },
    },
  });

  // Create Events (Snan Schedule)
  const makarSankranti = await prisma.event.create({
    data: {
      name: "Makar Sankranti Snan",
      nameHi: "मकर संक्रांति स्नान",
      eventType: "SNAN",
      locationId: sangamGhat.id,
      startTime: new Date("2025-01-14T06:00:00"),
      endTime: new Date("2025-01-14T09:00:00"),
      expectedAttendance: 5000000,
      isSnan: true,
      snanType: "Makar Sankranti",
      significanceEn:
        "The most important bathing festival. Believed to be the day of the great deluge when the world ends.",
      significanceHi:
        "सबसे महत्वपूर्ण स्नान पर्व। माना जाता है कि यह विश्व विलय का दिन है।",
    },
  });

  // Create FAQ Documents (Knowledge Base)
  await prisma.faqDocument.create({
    data: {
      question: "What is the Makar Sankranti Snan timing?",
      questionHi: "मकर संक्रांति स्नान का समय क्या है?",
      answer:
        "Makar Sankranti Snan is on January 14, 2025, from 6:00 AM to 9:00 AM. It is the most important bathing day of Mahakumbh.",
      answerHi:
        "मकर संक्रांति स्नान 14 जनवरी 2025 को सुबह 6:00 से 9:00 बजे तक है। यह महाकुंभ का सबसे महत्वपूर्ण स्नान दिवस है।",
      category: "SNAN_SCHEDULE",
      tags: ["timing", "makar-sankranti", "important"],
      language: "en",
      authority: 5,
      recency: 100,
    },
  });

  await prisma.faqDocument.create({
    data: {
      question: "How do I reach Sangam Ghat by public transport?",
      questionHi: "मैं जनता परिवहन द्वारा संगम घाट तक कैसे पहुंचूं?",
      answer:
        "You can take special trains, buses, or ferries arranged by the government. The railway station is connected to all major sectors. Most pilgrims use the UPSRTC buses or government-arranged transportation.",
      answerHi:
        "आप सरकार द्वारा व्यवस्थित विशेष ट्रेनों, बसों या नाविकाओं का उपयोग कर सकते हैं। रेलवे स्टेशन सभी प्रमुख सेक्टरों से जुड़ा है।",
      category: "TRANSPORT",
      tags: ["transport", "travel", "directions"],
      language: "en",
      authority: 5,
      recency: 100,
    },
  });

  await prisma.faqDocument.create({
    data: {
      question: "What should I do if I lose someone in the crowd?",
      questionHi: "अगर मैं भीड़ में किसी को खो दूं तो मुझे क्या करना चाहिए?",
      answer:
        "Report to the nearest police post or volunteer immediately with a description and photograph. Use the KumbhSaarthi app's 'Lost & Found' feature. Call the helpline: 1800-XXX-XXXX.",
      answerHi:
        "तुरंत निकटतम पुलिस चौकी या स्वयंसेवक को विवरण और फोटोग्राफ के साथ रिपोर्ट करें।",
      category: "LOST_FOUND",
      tags: ["lost-person", "emergency", "safety"],
      language: "en",
      authority: 5,
      recency: 100,
    },
  });

  await prisma.faqDocument.create({
    data: {
      question: "Are there any specific rituals to follow at Sangam Ghat?",
      questionHi: "संगम घाट पर कोई विशिष्ट अनुष्ठान करने हैं?",
      answer:
        "At Sangam Ghat, pilgrims traditionally take a holy dip (Snan) in the confluenceof the three rivers. They often perform puja (prayer) and offer flowers to the river. Follow local customs and respect the sacred environment.",
      answerHi:
        "संगम घाट पर तीन नदियों के संगम में पवित्र स्नान (स्नान) लेना परंपरागत है। वे अक्सर पूजा (प्रार्थना) करते हैं और नदी को फूल अर्पित करते हैं।",
      category: "RITUALS",
      tags: ["rituals", "spiritual", "traditions"],
      language: "en",
      authority: 5,
      recency: 100,
    },
  });

  // Create Crowd Snapshots
  await prisma.crowdSnapshot.create({
    data: {
      sector: "1",
      densityScore: 0.65,
      personCount: 45000,
      dataSources: ["CCTV_1", "CCTV_2", "IOT_SENSOR_1"],
      predictions: {
        forecast_30min: { density: 0.75, confidence: 0.88 },
        forecast_60min: { density: 0.82, confidence: 0.81 },
        forecast_120min: { density: 0.68, confidence: 0.73 },
      },
    },
  });

  await prisma.crowdSnapshot.create({
    data: {
      sector: "2",
      densityScore: 0.35,
      personCount: 12000,
      dataSources: ["CCTV_3", "IOT_SENSOR_2"],
      predictions: {
        forecast_30min: { density: 0.42, confidence: 0.85 },
        forecast_60min: { density: 0.51, confidence: 0.78 },
        forecast_120min: { density: 0.58, confidence: 0.71 },
      },
    },
  });

  // Create Alerts
  await prisma.alert.create({
    data: {
      alertType: "CROWD_SURGE",
      severity: "HIGH",
      affectedSectors: ["1", "2"],
      messageEn: "Expected crowd surge in Sector 1 and 2. Use alternative routes.",
      messageHi: "सेक्टर 1 और 2 में भीड़ की संभावना है। वैकल्पिक मार्गों का उपयोग करें।",
      activeFrom: new Date(),
      activeUntil: new Date(Date.now() + 3600000), // 1 hour
    },
  });

  console.log("✅ Seeding complete!");
  console.log(
    "Created locations:",
    [sangamGhat, triveniGhat, gangaGhat, medicalCamp1, policePost1].length
  );
  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
