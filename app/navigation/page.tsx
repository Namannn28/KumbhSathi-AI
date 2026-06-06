"use client";

import Link from "next/link";
import { ArrowLeft, MapPin, Navigation2 } from "lucide-react";
import { useState } from "react";

export default function NavigationPage() {
  const [destination, setDestination] = useState("Sangam Ghat");
  const [mode, setMode] = useState("crowd-aware");
  const [route, setRoute] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function calculateRoute() {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/v1/nav/route?fromLat=25.434&fromLng=81.844&toLat=25.4358&toLng=81.8463&mode=${mode}`
      );
      const data = await response.json();
      setRoute(data.data);
    } catch (error) {
      alert("Failed to calculate route");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">Navigation</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Input Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2">Destination</label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Enter destination"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div>
              <label className="block font-medium mb-2">Route Type</label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "crowd-aware", label: "Crowd-Aware" },
                  { id: "fastest", label: "Fastest" },
                  { id: "accessibility", label: "Accessible" },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setMode(option.id)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition ${
                      mode === option.id
                        ? "bg-sacred-600 text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={calculateRoute}
              disabled={loading}
              className="w-full bg-sacred-600 text-white py-3 rounded-lg font-semibold hover:bg-sacred-700 disabled:bg-gray-400 flex items-center justify-center gap-2"
            >
              <Navigation2 className="w-5 h-5" />
              {loading ? "Calculating..." : "Get Directions"}
            </button>
          </div>
        </div>

        {/* Route Results */}
        {route && (
          <div className="bg-white p-6 rounded-lg shadow-sm space-y-6">
            <div className="border-l-4 border-sacred-600 pl-4">
              <h3 className="text-xl font-bold mb-2">{destination}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Distance</p>
                  <p className="text-2xl font-bold">{route.distance} km</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Est. Time</p>
                  <p className="text-2xl font-bold">{route.estimatedTime} min</p>
                </div>
              </div>
            </div>

            {route.crowdAvoidanceActive && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <p className="text-yellow-900">
                  ⚠️ <strong>High crowd ahead.</strong> Your route avoids congested
                  areas. Alternative route available.
                </p>
              </div>
            )}

            {/* Directions */}
            <div>
              <h4 className="font-bold mb-3">Step-by-Step Directions</h4>
              <div className="space-y-3">
                {route.directions?.map((step: any, i: number) => (
                  <div key={i} className="flex gap-3 pb-3 border-b last:border-b-0">
                    <div className="w-8 h-8 bg-sacred-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <p className="font-medium">{step.instruction}</p>
                      <p className="text-sm text-gray-600">
                        📍 {step.landmark} • {step.distance.toFixed(2)} km
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">
              Open in Maps
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
