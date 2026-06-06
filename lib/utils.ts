export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
}

export function success<T>(data: T, message?: string): ApiResponse<T> {
  return {
    success: true,
    data,
    message: message || "Success",
    timestamp: new Date().toISOString(),
  };
}

export function error(error: string, message?: string): ApiResponse<null> {
  return {
    success: false,
    data: null,
    error,
    message: message || "An error occurred",
    timestamp: new Date().toISOString(),
  };
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function getCrowdColor(score: number): string {
  if (score < 0.3) return "#10b981"; // green
  if (score < 0.6) return "#f59e0b"; // amber
  if (score < 0.85) return "#ef4444"; // red
  return "#000000"; // black - critical
}

export function getCrowdLabel(score: number): string {
  if (score < 0.3) return "Low";
  if (score < 0.6) return "Medium";
  if (score < 0.85) return "High";
  return "Critical";
}

export function getEmergencyColor(severity: string): string {
  const colors: Record<string, string> = {
    LOW: "#10b981",
    MEDIUM: "#f59e0b",
    HIGH: "#ef4444",
    CRITICAL: "#7c3aed",
  };
  return colors[severity] || "#6b7280";
}

export function generateCaseId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `CASE-${timestamp.toUpperCase()}-${random.toUpperCase()}`;
}

export function sanitizePhone(phone: string): string {
  return phone.replace(/\D/g, "").slice(-10);
}

export function validatePhone(phone: string): boolean {
  const cleaned = sanitizePhone(phone);
  return cleaned.length === 10;
}

export const SECTORS = Array.from({ length: 12 }, (_, i) => String(i + 1));

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "hi", name: "हिंदी" },
  { code: "gu", name: "ગુજરાતી" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "bn", name: "বাংলা" },
  { code: "mr", name: "मराठी" },
  { code: "pa", name: "ਪੰਜਾਬੀ" },
  { code: "ur", name: "اردو" },
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "ml", name: "മലയാളം" },
  { code: "or", name: "ଓଡ଼ିଆ" },
];

export const EMERGENCY_TYPES = [
  "MEDICAL",
  "LOST_CHILD",
  "WOMEN_SAFETY",
  "STAMPEDE",
  "FIRE",
  "CROWD_SURGE",
  "OTHER",
];

export const ACCOMMODATION_TYPES = ["TENT", "DHARAMSHALA", "HOTEL", "ASHRAM", "CAMP"];

export const LOCATION_TYPES = [
  "GHAT",
  "TEMPLE",
  "MEDICAL_CAMP",
  "POLICE_POST",
  "TOILET",
  "WATER_STATION",
  "FOOD_STALL",
  "PARKING",
  "FERRY",
  "INFO_KIOSK",
];
