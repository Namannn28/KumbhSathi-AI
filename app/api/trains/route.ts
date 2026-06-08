import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received payload for IRCTC proxy:", body);

    // The user requested to use /CRISApi/ws1/nget/availabilityFareEnquiry
    // This proxies the request to the official IRCTC/CRIS API.
    // Note: This requires proper authentication headers (e.g. auth tokens) 
    // which need to be configured in your .env file or passed by the client.
    
    const crisApiUrl = 'https://www.irctc.co.in/CRISApi/ws1/nget/availabilityFareEnquiry';
    console.log("Target IRCTC endpoint:", crisApiUrl);
    
    // We are setting up the structure. Once headers are provided, it will work.
    /*
    const response = await fetch(crisApiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Authorization': `Bearer ${process.env.CRIS_API_KEY}`,
        // 'greq': '...',
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`CRIS API returned ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
    */

    // Since IRCTC APIs require authentication, this proxy simulates a live 
    // fetch from a rail data provider for demo purposes.
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    return NextResponse.json({
      status: "success",
      source: "RailAPI (Simulated)",
      timestamp: new Date().toISOString(),
      trains: [
        {
          trainNo: "12919",
          trainName: "MALWA EXPRESS",
          from: body.from || "DEL",
          to: body.to || "UJN",
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
          from: body.from || "DEL",
          to: body.to || "UJN",
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
    console.error('CRIS API Proxy Error:', error);
    return NextResponse.json(
      { error: 'Failed to proxy request to CRIS API' },
      { status: 500 }
    );
  }
}
