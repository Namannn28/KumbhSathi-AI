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
    id: "e1", name: "Paush Purnima Snan", nameHi: "पौष पूर्णिमा स्नान",
    date: "2028-01-26", type: "snan",
    significance: "Marks the official beginning of Mahakumbh 2028. The first holy dip at the sacred Sangam.",
    significanceHi: "महाकुम्भ 2028 की शुरुआत। पवित्र संगम पर पहला पवित्र स्नान।",
    location: "Sangam Ghat", expectedCrowd: "2 Crore", isMajor: true,
  },
  {
    id: "e2", name: "Makar Sankranti Snan", nameHi: "मकर संक्रांति स्नान",
    date: "2028-01-14", type: "snan",
    significance: "Auspicious bathing day marking the Sun's transition into Capricorn.",
    significanceHi: "सूर्य की मकर राशि में प्रवेश का शुभ स्नान दिवस।",
    location: "Sangam Ghat", expectedCrowd: "3 Crore", isMajor: true,
  },
  {
    id: "e3", name: "Mauni Amavasya (Shahi Snan)", nameHi: "मौनी अमावस्या (शाही स्नान)",
    date: "2028-02-09", type: "snan",
    significance: "The most important bathing day. Royal procession of Akharas to the Sangam. Millions take the holy dip in silence.",
    significanceHi: "सबसे महत्वपूर्ण स्नान दिवस। अखाड़ों का शाही जुलूस। लाखों लोग मौन व्रत रखकर स्नान करते हैं।",
    location: "Sangam Ghat", expectedCrowd: "5 Crore", isMajor: true,
  },
  {
    id: "e4", name: "Basant Panchami Snan", nameHi: "बसंत पंचमी स्नान",
    date: "2028-02-14", type: "snan",
    significance: "Celebration of spring's arrival. Devotees worship Goddess Saraswati.",
    significanceHi: "वसंत ऋतु के आगमन का उत्सव। भक्त मां सरस्वती की पूजा करते हैं।",
    location: "Saraswati Ghat", expectedCrowd: "1.5 Crore", isMajor: true,
  },
  {
    id: "e5", name: "Maghi Purnima Snan", nameHi: "माघी पूर्णिमा स्नान",
    date: "2028-02-24", type: "snan",
    significance: "Full moon bathing in the month of Magh. Believed to wash away all sins.",
    significanceHi: "माघ माह की पूर्णिमा का स्नान। सभी पापों को धोने की मान्यता।",
    location: "Sangam Ghat", expectedCrowd: "2 Crore", isMajor: true,
  },
  {
    id: "e6", name: "Mahashivratri (Shahi Snan)", nameHi: "महाशिवरात्रि (शाही स्नान)",
    date: "2028-03-07", type: "snan",
    significance: "Night of Lord Shiva. Final royal bathing day of Mahakumbh. Grand Akhara processions.",
    significanceHi: "भगवान शिव की रात्रि। महाकुम्भ का अंतिम शाही स्नान। भव्य अखाड़ा जुलूस।",
    location: "Sangam Ghat", expectedCrowd: "3 Crore", isMajor: true,
  },
  {
    id: "e7", name: "Akhara Peshwai Procession", nameHi: "अखाड़ा पेशवाई जुलूस",
    date: "2028-01-10", endDate: "2028-01-13", type: "akhara",
    significance: "Grand entry processions of the 13 Akharas into Kumbh Nagari. Naga Sadhus march with traditional weapons and elephants.",
    significanceHi: "13 अखाड़ों का कुम्भ नगरी में भव्य प्रवेश जुलूस। नागा साधु पारंपरिक हथियारों और हाथियों के साथ मार्च करते हैं।",
    location: "Kumbh Nagari", expectedCrowd: "50 Lakh", isMajor: true,
  },
  {
    id: "e8", name: "Ganga Aarti", nameHi: "गंगा आरती",
    date: "2028-01-14", endDate: "2028-03-07", type: "ceremony",
    significance: "Daily evening prayer ceremony on the banks of the Ganga. Spectacular display of fire, chanting, and devotion.",
    significanceHi: "गंगा तट पर दैनिक संध्या पूजा। अग्नि, मंत्र और भक्ति का भव्य प्रदर्शन।",
    location: "Sangam Ghat", expectedCrowd: "5 Lakh (daily)", isMajor: false,
  },
  {
    id: "e9", name: "Kalpavas Begin", nameHi: "कल्पवास आरम्भ",
    date: "2028-01-15", endDate: "2028-02-12", type: "spiritual",
    significance: "Month-long spiritual retreat where devotees live in tents by the river, following strict rituals.",
    significanceHi: "एक महीने का आध्यात्मिक अनुष्ठान जहाँ भक्त नदी किनारे तम्बूओं में रहकर कठोर नियमों का पालन करते हैं।",
    location: "Kalpvasi Area", expectedCrowd: "10 Lakh", isMajor: false,
  },
  {
    id: "e10", name: "Cultural Festival", nameHi: "सांस्कृतिक उत्सव",
    date: "2028-01-20", endDate: "2028-02-28", type: "cultural",
    significance: "Classical music, dance performances, spiritual discourses, and exhibitions throughout the Mela.",
    significanceHi: "शास्त्रीय संगीत, नृत्य प्रदर्शन, आध्यात्मिक प्रवचन और प्रदर्शनियाँ।",
    location: "Cultural Zone", expectedCrowd: "2 Lakh (daily)", isMajor: false,
  },
];

export const snanDates = events.filter(e => e.type === "snan");
export const majorEvents = events.filter(e => e.isMajor);
