import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Ujjain Coordinates: 23.1765° N, 75.7885° E
    const res = await fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=23.1765&longitude=75.7885&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max&timezone=Asia%2FKolkata',
      { next: { revalidate: 3600 } } // Cache for 1 hour
    );

    if (!res.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Weather API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
