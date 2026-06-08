export interface CrowdSector {
  id: string;
  sector: string;
  name: string;
  nameHi: string;
  density: number; // 0-100
  level: "low" | "moderate" | "high" | "critical";
  personCount: number;
  trend: "rising" | "stable" | "falling";
  prediction: string;
  lastUpdated: string;
}

export const crowdData: CrowdSector[] = [
  { id: "c1", sector: "A1", name: "Ram Ghat Zone", nameHi: "राम घाट क्षेत्र", density: 82, level: "high", personCount: 185000, trend: "rising", prediction: "Expected to reach critical by 2 PM", lastUpdated: "2 min ago" },
  { id: "c2", sector: "A2", name: "Dashashwamedh Area", nameHi: "दशाश्वमेध क्षेत्र", density: 65, level: "moderate", personCount: 95000, trend: "stable", prediction: "Moderate crowd expected till evening", lastUpdated: "1 min ago" },
  { id: "c3", sector: "A3", name: "Ram Ghat Zone", nameHi: "राम घाट क्षेत्र", density: 40, level: "low", personCount: 42000, trend: "falling", prediction: "Crowd decreasing, good time to visit", lastUpdated: "3 min ago" },
  { id: "c4", sector: "B1", name: "Arail Sector", nameHi: "अरैल सेक्टर", density: 55, level: "moderate", personCount: 68000, trend: "rising", prediction: "Gradually increasing, peak at 4 PM", lastUpdated: "2 min ago" },
  { id: "c5", sector: "B2", name: "Jhunsi Area", nameHi: "झूँसी क्षेत्र", density: 30, level: "low", personCount: 28000, trend: "stable", prediction: "Low crowd expected throughout the day", lastUpdated: "5 min ago" },
  { id: "c6", sector: "C1", name: "Parking & Entry Zone", nameHi: "पार्किंग और प्रवेश क्षेत्र", density: 70, level: "high", personCount: 120000, trend: "rising", prediction: "High congestion at gates, use Gate 3 for faster entry", lastUpdated: "1 min ago" },
];

export const crowdAlerts = [
  { id: "a1", type: "warning", message: "Ram Ghat Zone reaching critical density. Avoid Sector A1 for next 2 hours.", messageHi: "राम घाट क्षेत्र गंभीर घनत्व पर पहुँच रहा है। अगले 2 घंटे सेक्टर A1 से बचें।", time: "10 min ago" },
  { id: "a2", type: "info", message: "Alternative bathing route via Sector B1 is less crowded.", messageHi: "सेक्टर B1 से वैकल्पिक स्नान मार्ग कम भीड़भाड़ वाला है।", time: "15 min ago" },
  { id: "a3", type: "success", message: "Ram Ghat Zone has cleared up. Good time for darshan.", messageHi: "राम घाट क्षेत्र खाली हो गया है। दर्शन के लिए अच्छा समय।", time: "20 min ago" },
];

export const getCrowdLevel = (density: number): CrowdSector["level"] => {
  if (density >= 80) return "critical";
  if (density >= 60) return "high";
  if (density >= 40) return "moderate";
  return "low";
};

export const crowdLevelColors = {
  low: { bg: "bg-emerald-500", text: "text-emerald-700", badge: "badge-green" },
  moderate: { bg: "bg-amber-500", text: "text-amber-700", badge: "badge-yellow" },
  high: { bg: "bg-orange-500", text: "text-orange-700", badge: "badge-sacred" },
  critical: { bg: "bg-red-500", text: "text-red-700", badge: "badge-red" },
};
