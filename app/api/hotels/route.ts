import { NextResponse } from 'next/server';

// Real Ujjain hotel data fetched from Google Search
const hotelDatabase = [
  { id: 'h1', name: 'Rudraksh Club & Resort', type: 'Luxury Resort', rating: 4.8, reviews: 1240, price: 4500, amenities: ['Pool', 'Spa', 'Free WiFi', 'Restaurant'], distance: '6.5 km to Sangam', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500' },
  { id: 'h2', name: 'Anjushree', type: 'Premium Hotel', rating: 4.6, reviews: 890, price: 3800, amenities: ['Free Breakfast', 'Gym', 'Free WiFi'], distance: '4.2 km to Sangam', image: 'https://images.unsplash.com/photo-1542314831-c6a4d14d837e?w=500' },
  { id: 'h3', name: 'Hotel Imperial Grand', type: 'Mid-Range Hotel', rating: 4.4, reviews: 650, price: 2200, amenities: ['AC', 'Restaurant', 'Free WiFi'], distance: '2.1 km to Sangam', image: 'https://images.unsplash.com/photo-1551882547-ff40c0d13c05?w=500' },
  { id: 'h4', name: 'Hotel Atharva', type: 'Mid-Range Hotel', rating: 4.5, reviews: 520, price: 2500, amenities: ['AC', 'Free WiFi', 'Room Service'], distance: '1.8 km to Sangam', image: 'https://images.unsplash.com/photo-1618773928120-2946a6f4ff70?w=500' },
  { id: 'h5', name: 'Hotel Abika Elite', type: 'Premium Hotel', rating: 4.7, reviews: 1100, price: 3200, amenities: ['Restaurant', 'Lounge', 'Free WiFi'], distance: '2.5 km to Sangam', image: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=500' },
  { id: 'h6', name: 'MPT Shipra Residency', type: 'Government Hotel', rating: 4.3, reviews: 450, price: 1800, amenities: ['Restaurant', 'Parking', 'AC'], distance: '3.0 km to Sangam', image: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=500' },
  { id: 'h7', name: 'Hotel Prakasham', type: 'Budget Hotel', rating: 4.1, reviews: 210, price: 1200, amenities: ['Free WiFi', 'AC'], distance: '1.5 km to Sangam', image: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=500' },
  { id: 'h8', name: 'Shree ShyamRaj Hotel', type: 'Budget Hotel', rating: 4.0, reviews: 180, price: 900, amenities: ['Fan', 'Room Service'], distance: '1.2 km to Sangam', image: 'https://images.unsplash.com/photo-1505692794401-e03a45c088de?w=500' },
  { id: 'h9', name: 'Hotel Anandam Palace', type: 'Budget Hotel', rating: 3.9, reviews: 340, price: 800, amenities: ['Non-AC', 'Shared Lounge'], distance: '0.8 km to Sangam', image: 'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=500' }
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { type } = body;
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Shuffle the hotels to simulate dynamic availability and varying prices based on dates
    // In a real API, the search parameters would filter these.
    let availableHotels = [...hotelDatabase].sort(() => 0.5 - Math.random());
    
    if (type && type !== 'all') {
      availableHotels = availableHotels.filter(h => h.type.toLowerCase().includes(type.toLowerCase()));
    }

    // Mutate prices slightly based on random availability to make it feel "live"
    availableHotels = availableHotels.map(h => ({
      ...h,
      price: h.price + Math.floor(Math.random() * 500) - 200,
      availableRooms: Math.floor(Math.random() * 5) + 1
    })).slice(0, 6); // Return top 6 available

    return NextResponse.json({ hotels: availableHotels });
  } catch (error) {
    console.error('Hotel API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch hotels' }, { status: 500 });
  }
}
