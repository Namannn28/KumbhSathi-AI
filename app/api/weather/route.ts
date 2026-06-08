import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Swapped to Ujjain coordinates as per the rebrand
  const lat = 23.1765;
  const lon = 75.7885;

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`,
    { cache: 'no-store' }
  );

  const data = await response.json();

  return NextResponse.json(data);
}
