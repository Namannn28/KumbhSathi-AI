export async function GET() {
  // Swapped to Ujjain coordinates as per the rebrand
  const lat = 23.1765;
  const lon = 75.7885;

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  );

  const data = await response.json();

  return Response.json(data);
}
