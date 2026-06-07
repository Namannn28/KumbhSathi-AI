export interface Accommodation {
  id: string;
  name: string;
  nameHi: string;
  type: "tent" | "dharamshala" | "hotel" | "ashram" | "camp";
  sector: string;
  price: number;
  priceLabel: string;
  rating: number;
  reviews: number;
  amenities: string[];
  available: boolean;
  capacity: string;
  distance: string;
  image: string;
  description: string;
  phone: string;
}

export const accommodations: Accommodation[] = [
  {
    id: "ac1", name: "Sangam Tent City", nameHi: "संगम टेंट सिटी", type: "tent", sector: "A1",
    price: 500, priceLabel: "₹500/night", rating: 4.2, reviews: 1240,
    amenities: ["Bedding", "Electricity", "Shared Toilet", "Security"], available: true,
    capacity: "2-4 persons", distance: "0.5 km from Sangam",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400",
    description: "Affordable tent accommodation near Sangam with basic amenities and 24/7 security.", phone: "+91-9999000001",
  },
  {
    id: "ac2", name: "Kumbh Premium Cottages", nameHi: "कुम्भ प्रीमियम कॉटेज", type: "tent", sector: "A1",
    price: 2500, priceLabel: "₹2,500/night", rating: 4.7, reviews: 856,
    amenities: ["AC", "Attached Bath", "Room Service", "Wi-Fi", "Parking"], available: true,
    capacity: "2 persons", distance: "0.8 km from Sangam",
    image: "https://images.unsplash.com/photo-1618767689160-da3fb810aad7?w=400",
    description: "Premium Swiss cottage tents with AC, attached bathroom, and room service.", phone: "+91-9999000002",
  },
  {
    id: "ac3", name: "Prayag Dharamshala", nameHi: "प्रयाग धर्मशाला", type: "dharamshala", sector: "A2",
    price: 200, priceLabel: "₹200/night", rating: 3.8, reviews: 2100,
    amenities: ["Bedding", "Fan", "Common Bath", "Langar"], available: true,
    capacity: "Dormitory (20 beds)", distance: "1.2 km from Sangam",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    description: "Traditional dharamshala with dormitory beds and free langar facility.", phone: "+91-9999000003",
  },
  {
    id: "ac4", name: "Hotel Ganga View", nameHi: "होटल गंगा व्यू", type: "hotel", sector: "B1",
    price: 3500, priceLabel: "₹3,500/night", rating: 4.5, reviews: 654,
    amenities: ["AC", "Attached Bath", "Restaurant", "Wi-Fi", "Parking", "Laundry"], available: true,
    capacity: "2 persons", distance: "2 km from Sangam",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400",
    description: "3-star hotel with river view rooms, in-house restaurant, and modern amenities.", phone: "+91-9999000004",
  },
  {
    id: "ac5", name: "Shri Ram Ashram", nameHi: "श्री राम आश्रम", type: "ashram", sector: "A3",
    price: 0, priceLabel: "Free (Donation)", rating: 4.6, reviews: 3200,
    amenities: ["Bedding", "Yoga", "Meditation", "Langar", "Satsang"], available: true,
    capacity: "100 persons", distance: "1.5 km from Sangam",
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400",
    description: "Free ashram stay with yoga, meditation sessions, and spiritual discourses. Donations welcome.", phone: "+91-9999000005",
  },
  {
    id: "ac6", name: "Government Tent Colony", nameHi: "सरकारी टेंट कॉलोनी", type: "camp", sector: "C1",
    price: 100, priceLabel: "₹100/night", rating: 3.5, reviews: 4500,
    amenities: ["Bedding", "Common Toilet", "Security", "First Aid"], available: true,
    capacity: "4-6 persons", distance: "3 km from Sangam",
    image: "https://images.unsplash.com/photo-1478827536114-da961b7f86d2?w=400",
    description: "Government-run tent colony with basic facilities, ideal for budget pilgrims.", phone: "+91-9999000006",
  },
  {
    id: "ac7", name: "Triveni Hotel & Resort", nameHi: "त्रिवेणी होटल एंड रिसॉर्ट", type: "hotel", sector: "B2",
    price: 5000, priceLabel: "₹5,000/night", rating: 4.8, reviews: 420,
    amenities: ["AC", "Swimming Pool", "Spa", "Restaurant", "Wi-Fi", "Airport Transfer"], available: false,
    capacity: "2 persons", distance: "4 km from Sangam",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
    description: "Luxury resort with spa, pool, and fine dining. Airport/station pickup included.", phone: "+91-9999000007",
  },
  {
    id: "ac8", name: "Naga Sadhu Camp", nameHi: "नागा साधु शिविर", type: "ashram", sector: "A1",
    price: 0, priceLabel: "Free", rating: 4.4, reviews: 890,
    amenities: ["Tent", "Dhuni", "Satsang", "Langar"], available: true,
    capacity: "Open", distance: "0.3 km from Sangam",
    image: "https://images.unsplash.com/photo-1609947017136-9dfe24ca77b0?w=400",
    description: "Stay near Naga Sadhu akhara, experience ancient spiritual traditions.", phone: "+91-9999000008",
  },
];

export const getAccommodationsByType = (type: Accommodation["type"]) => accommodations.filter(a => a.type === type);
export const getAvailableAccommodations = () => accommodations.filter(a => a.available);
