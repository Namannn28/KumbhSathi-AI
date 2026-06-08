export interface Location {
  id: string;
  name: string;
  nameHi: string;
  type: "ghat" | "temple" | "medical" | "police" | "food" | "toilet" | "water" | "parking" | "atm" | "charging" | "wifi" | "cloakroom" | "pharmacy" | "info";
  lat: number;
  lng: number;
  sector: string;
  description?: string;
  descriptionHi?: string;
  isOpen: boolean;
  rating?: number;
  phone?: string;
}

export const locations: Location[] = [
  // Ghats
  { id: "l1", name: "Ram Ghat", nameHi: "राम घाट", type: "ghat", lat: 23.1765, lng: 75.7885, sector: "A1", description: "Sacred bathing ghat on the Kshipra River", descriptionHi: "क्षिप्रा नदी पर पवित्र स्नान घाट", isOpen: true, rating: 5 },
  { id: "l2", name: "Mahakaleshwar Temple", nameHi: "महाकालेश्वर मंदिर", type: "temple", lat: 23.1827, lng: 75.7682, sector: "A2", description: "One of the 12 Jyotirlingas, ancient Shiva temple", descriptionHi: "12 ज्योतिर्लिंगों में से एक, प्राचीन शिव मंदिर", isOpen: true, rating: 4.9 },
  { id: "l3", name: "Harsiddhi Temple", nameHi: "हरसिद्धि मंदिर", type: "temple", lat: 23.1812, lng: 75.7665, sector: "A2", description: "One of the 51 Shakti Peethas", descriptionHi: "51 शक्तिपीठों में से एक", isOpen: true, rating: 4.8 },
  { id: "l4", name: "Sector A1 Medical Camp", nameHi: "सेक्टर A1 चिकित्सा शिविर", type: "medical", lat: 23.1750, lng: 75.7850, sector: "A1", description: "24/7 emergency medical facility with ambulance", descriptionHi: "एम्बुलेंस के साथ 24/7 आपातकालीन चिकित्सा सुविधा", isOpen: true, rating: 4.5 },
  { id: "l5", name: "Mangalnath Temple", nameHi: "मंगलनाथ मंदिर", type: "temple", lat: 23.2132, lng: 75.7811, sector: "B1", description: "Birthplace of Mars, famous for Bhat Puja", descriptionHi: "मंगल देव का जन्मस्थान, भात पूजा के लिए प्रसिद्ध", isOpen: true, rating: 4.6 },
  { id: "l6", name: "Kal Bhairav Temple", nameHi: "काल भैरव मंदिर", type: "temple", lat: 23.2100, lng: 75.7725, sector: "B1", description: "Ancient temple of Lord Kal Bhairav", descriptionHi: "भगवान काल भैरव का प्राचीन मंदिर", isOpen: true, rating: 4.7 },
  { id: "l7", name: "Alopi Devi Mandir", nameHi: "अलोपी देवी मंदिर", type: "temple", lat: 25.4320, lng: 81.8780, sector: "A2", description: "One of the Shakti Peethas", descriptionHi: "शक्ति पीठों में से एक", isOpen: true, rating: 4.6 },
  { id: "l8", name: "Mankameshwar Mandir", nameHi: "मनकामेश्वर मंदिर", type: "temple", lat: 25.4340, lng: 81.8830, sector: "A2", description: "Ancient Shiva temple", descriptionHi: "प्राचीन शिव मंदिर", isOpen: true, rating: 4.4 },

  // Medical Camps
  { id: "l9", name: "Central Medical Camp", nameHi: "केंद्रीय चिकित्सा शिविर", type: "medical", lat: 25.4280, lng: 81.8860, sector: "A1", description: "24/7 emergency medical facility", descriptionHi: "24/7 आपातकालीन चिकित्सा सुविधा", isOpen: true, phone: "108" },
  { id: "l10", name: "Sector B Medical Unit", nameHi: "सेक्टर बी चिकित्सा इकाई", type: "medical", lat: 25.4240, lng: 81.8920, sector: "B1", description: "First aid and basic medical support", descriptionHi: "प्राथमिक चिकित्सा और बुनियादी चिकित्सा सहायता", isOpen: true, phone: "108" },

  // Police Posts
  { id: "l11", name: "Central Police Station", nameHi: "केंद्रीय पुलिस थाना", type: "police", lat: 25.4310, lng: 81.8840, sector: "A1", description: "Main police control room for Kumbh Nagari", descriptionHi: "कुम्भ नगरी का मुख्य पुलिस नियंत्रण कक्ष", isOpen: true, phone: "100" },
  { id: "l12", name: "Women's Help Desk", nameHi: "महिला सहायता केंद्र", type: "police", lat: 25.4295, lng: 81.8815, sector: "A2", description: "Dedicated women safety assistance", descriptionHi: "समर्पित महिला सुरक्षा सहायता", isOpen: true, phone: "1091" },

  // Amenities
  { id: "l13", name: "Main Parking Area", nameHi: "मुख्य पार्किंग", type: "parking", lat: 25.4400, lng: 81.8700, sector: "C1", description: "Large vehicle parking with shuttle to ghats", descriptionHi: "घाटों तक शटल सेवा के साथ बड़ी वाहन पार्किंग", isOpen: true },
  { id: "l14", name: "SBI ATM - Sector A", nameHi: "एसबीआई एटीएम - सेक्टर ए", type: "atm", lat: 25.4305, lng: 81.8825, sector: "A1", description: "24/7 ATM facility", descriptionHi: "24/7 एटीएम सुविधा", isOpen: true },
  { id: "l15", name: "Public Toilet Complex A", nameHi: "सार्वजनिक शौचालय ए", type: "toilet", lat: 25.4275, lng: 81.8850, sector: "A1", isOpen: true },
  { id: "l16", name: "Drinking Water Station 1", nameHi: "पेयजल स्टेशन 1", type: "water", lat: 25.4285, lng: 81.8835, sector: "A1", isOpen: true },
  { id: "l17", name: "Mobile Charging Station", nameHi: "मोबाइल चार्जिंग स्टेशन", type: "charging", lat: 25.4260, lng: 81.8855, sector: "A1", isOpen: true },
  { id: "l18", name: "Free Wi-Fi Zone", nameHi: "मुफ्त वाई-फाई ज़ोन", type: "wifi", lat: 25.4300, lng: 81.8850, sector: "A1", isOpen: true },
  { id: "l19", name: "Cloakroom - Gate 1", nameHi: "सामान रखने का कमरा - गेट 1", type: "cloakroom", lat: 25.4390, lng: 81.8710, sector: "C1", description: "Secure luggage storage", descriptionHi: "सुरक्षित सामान भंडारण", isOpen: true },
  { id: "l20", name: "Pharmacy - Sector A", nameHi: "फार्मेसी - सेक्टर ए", type: "pharmacy", lat: 25.4295, lng: 81.8845, sector: "A1", description: "Medicines and first aid supplies", descriptionHi: "दवाइयाँ और प्राथमिक चिकित्सा सामग्री", isOpen: true },

  // Food
  { id: "l21", name: "Annapurna Bhandara", nameHi: "अन्नपूर्णा भंडारा", type: "food", lat: 25.4310, lng: 81.8810, sector: "A2", description: "Free langar serving thousands daily", descriptionHi: "हजारों लोगों को प्रतिदिन मुफ्त भोजन", isOpen: true, rating: 4.9 },
  { id: "l22", name: "Ganga Restaurant", nameHi: "गंगा रेस्टोरेंट", type: "food", lat: 25.4330, lng: 81.8800, sector: "A2", description: "Pure vegetarian thali", descriptionHi: "शुद्ध शाकाहारी थाली", isOpen: true, rating: 4.3 },

  // Info
  { id: "l23", name: "Tourist Info Center", nameHi: "पर्यटक सूचना केंद्र", type: "info", lat: 25.4380, lng: 81.8720, sector: "C1", description: "Official Kumbh Mela information desk", descriptionHi: "आधिकारिक कुम्भ मेला सूचना डेस्क", isOpen: true },
];

export const getLocationsByType = (type: Location["type"]) => locations.filter(l => l.type === type);
export const getLocationsBySector = (sector: string) => locations.filter(l => l.sector === sector);
