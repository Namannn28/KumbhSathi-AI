import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received payload for Train Proxy:", body);

    const start = body.from || "DEL";
    const destination = body.to || "UJN";

    // Attempt to use the provided RapidAPI endpoint
    try {
      const response = await fetch(
        `https://indian-railways-train-fetcher.p.rapidapi.com/get_train_info?start=${start}&destination=${destination}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-host': 'indian-railways-train-fetcher.p.rapidapi.com',
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.ok) {
        const data = await response.json();
        return NextResponse.json({
          status: "success",
          source: "RapidAPI",
          trains: data
        });
      }
    } catch (e) {
      console.error("RapidAPI fetch failed, falling back to mock", e);
    }

    // Fallback to simulated data if RapidAPI fails (e.g. no API key provided)
    return NextResponse.json({
      status: "success",
      source: "RailAPI (Simulated Fallback)",
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
        }
      ]
    });

  } catch (error) {
    console.error('Train API Proxy Error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request' },
      { status: 500 }
    );
  }
}
