export interface KumbhEvent {
  id: string;
  name: string;
  nameHi: string;
  date: string;
  endDate?: string;
  type: "snan" | "ceremony" | "cultural" | "spiritual" | "akhara";
  significance: string;
  significanceHi: string;
  location: string;
  expectedCrowd: string;
  isMajor: boolean;
}

export const events: KumbhEvent[] = [
  {
    id: "e1", name: "First Shahi Snan (Chaitra Purnima)", nameHi: "प्रथम शाही स्नान (चैत्र पूर्णिमा)",
    date: "2028-04-09", type: "snan",
    significance: "The grand inaugural royal bath marking the start of the Simhastha Mahakumbh in Ujjain.",
    significanceHi: "उज्जैन में सिंहस्थ महाकुंभ की शुरुआत का प्रतीक भव्य उद्घाटन शाही स्नान।",
    location: "Ram Ghat, Kshipra River", expectedCrowd: "3 Crore", isMajor: true,
  },
  {
    id: "e2", name: "Second Shahi Snan (Vaishakh Amavasya)", nameHi: "द्वितीय शाही स्नान (वैशाख अमावस्या)",
    date: "2028-04-23", type: "snan",
    significance: "The main royal bath on the highly auspicious new moon day. Millions of Naga Sadhus take the holy dip.",
    significanceHi: "अत्यंत शुभ अमावस्या के दिन मुख्य शाही स्नान। लाखों नागा साधु पवित्र स्नान करते हैं।",
    location: "Ram Ghat, Kshipra River", expectedCrowd: "5 Crore", isMajor: true,
  },
  {
    id: "e3", name: "Third Shahi Snan (Vaishakh Purnima)", nameHi: "तृतीय शाही स्नान (वैशाख पूर्णिमा)",
    date: "2028-05-08", type: "snan",
    significance: "The concluding royal bath on the full moon day of Vaishakh, closing the month-long spiritual festival.",
    significanceHi: "वैशाख की पूर्णिमा पर अंतिम शाही स्नान, एक महीने तक चलने वाले आध्यात्मिक उत्सव का समापन।",
    location: "Ram Ghat, Kshipra River", expectedCrowd: "3 Crore", isMajor: true,
  },
  {
    id: "e4", name: "Akhara Peshwai Procession", nameHi: "अखाड़ा पेशवाई जुलूस",
    date: "2028-03-25", endDate: "2028-04-05", type: "akhara",
    significance: "Grand entry processions of the 13 Akharas into Kumbh Nagari. Sadhus march with traditional weapons and elephants.",
    significanceHi: "13 अखाड़ों का कुम्भ नगरी में भव्य प्रवेश जुलूस। साधु पारंपरिक हथियारों और हाथियों के साथ मार्च करते हैं।",
    location: "Ujjain City to Mela Grounds", expectedCrowd: "50 Lakh", isMajor: true,
  },
  {
    id: "e5", name: "Panchkroshi Yatra", nameHi: "पंचक्रोशी यात्रा",
    date: "2028-04-15", endDate: "2028-04-20", type: "spiritual",
    significance: "A 118-km sacred circumambulation of Ujjain, visiting ancient Shiva temples along the route.",
    significanceHi: "उज्जैन की 118 किमी लंबी पवित्र परिक्रमा, जिसमें प्राचीन शिव मंदिरों के दर्शन किए जाते हैं।",
    location: "Ujjain Surroundings", expectedCrowd: "15 Lakh", isMajor: false,
  },
  {
    id: "e6", name: "Kshipra Aarti", nameHi: "क्षिप्रा आरती",
    date: "2028-04-09", endDate: "2028-05-08", type: "ceremony",
    significance: "Daily evening prayer ceremony on the banks of the Kshipra River. Spectacular display of fire and chanting.",
    significanceHi: "क्षिप्रा नदी के तट पर दैनिक संध्या पूजा। अग्नि और मंत्रों का भव्य प्रदर्शन।",
    location: "Ram Ghat", expectedCrowd: "5 Lakh (daily)", isMajor: false,
  },
  {
    id: "e7", name: "Kalpavas Begin", nameHi: "कल्पवास आरम्भ",
    date: "2028-04-09", endDate: "2028-05-08", type: "spiritual",
    significance: "Month-long spiritual retreat where devotees live in tents by the river, following strict rituals.",
    significanceHi: "एक महीने का आध्यात्मिक अनुष्ठान जहाँ भक्त नदी किनारे तम्बूओं में रहकर कठोर नियमों का पालन करते हैं।",
    location: "Simhastha Mela Area", expectedCrowd: "10 Lakh", isMajor: false,
  },
  {
    id: "e8", name: "Simhastha Cultural Festival", nameHi: "सिंहस्थ सांस्कृतिक उत्सव",
    date: "2028-04-10", endDate: "2028-05-05", type: "cultural",
    significance: "Classical music, traditional Malvi folk dances, spiritual discourses, and exhibitions.",
    significanceHi: "शास्त्रीय संगीत, पारंपरिक मालवी लोक नृत्य, आध्यात्मिक प्रवचन और प्रदर्शनियाँ।",
    location: "Cultural Zone, Mangalnath", expectedCrowd: "2 Lakh (daily)", isMajor: false,
  },
];

export const snanDates = events.filter(e => e.type === "snan");
export const majorEvents = events.filter(e => e.isMajor);

export const dailyActivities = [
  { name: "Morning Aarti", description: "First prayer of the day", time: "05:00 AM", location: "Ram Ghat" },
  { name: "Langar Service", description: "Free food distribution", time: "12:00 PM", location: "Sector 1 & 2" },
  { name: "Evening Kshipra Aarti", description: "Grand prayer ceremony", time: "07:00 PM", location: "Ram Ghat" },
];
