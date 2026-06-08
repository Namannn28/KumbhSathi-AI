import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received payload for CRIS API Proxy:", body);

    const start = body.from || "DEL";
    const destination = body.to || "UJN";

    // Simulate calling the IRCTC CRIS API: /CRISApi/ws1/nget/availabilityFareEnquiry
    // In a real scenario, this requires valid session cookies, captcha, and tokens.
    // We mock the response to match the expected format for the frontend.
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json({
      status: "success",
      source: "CRIS API",
      timestamp: new Date().toISOString(),
      trains: [
        {
          trainNo: "12919",
          trainName: "MALWA EXPRESS",
          from: start,
          to: destination,
          departureTime: "19:15",
          arrivalTime: "08:30",
          duration: "13h 15m",
          availability: [
            { class: "3A", status: "AVAILABLE", seats: 45, price: 1250 },
            { class: "2A", status: "WL", seats: 12, price: 1800 },
            { class: "SL", status: "RAC", seats: 8, price: 480 }
          ]
        },
        {
          trainNo: "12416",
          trainName: "NDLS INDB EXP",
          from: start,
          to: destination,
          departureTime: "22:00",
          arrivalTime: "09:05",
          duration: "11h 05m",
          availability: [
            { class: "3A", status: "WL", seats: 5, price: 1350 },
            { class: "SL", status: "AVAILABLE", seats: 120, price: 520 }
          ]
        },
        {
          trainNo: "22941",
          trainName: "INDB EXPRESS",
          from: start,
          to: destination,
          departureTime: "15:20",
          arrivalTime: "04:10",
          duration: "12h 50m",
          availability: [
            { class: "1A", status: "AVAILABLE", seats: 2, price: 3100 },
            { class: "3A", status: "WL", seats: 24, price: 1100 }
          ]
        }
      ]
    });

  } catch (error) {
    console.error('CRIS API Proxy Error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request' },
      { status: 500 }
    );
  }
}
