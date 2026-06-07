"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function AccommodationPage() {
  const [sector, setSector] = useState("1");
  const [budget, setBudget] = useState(500);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function search() {
    setLoading(true);
    const response = await fetch(
      `/api/v1/accommodation/search?sector=${sector}&budgetMax=${budget}`
    );
    const data = await response.json();
    setResults(data.data || []);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">Find Accommodation</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Sector</label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                {Array.from({ length: 12 }).map((_, i) => (
                  <option key={i} value={String(i + 1)}>
                    Sector {i + 1}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Max Budget: ₹{budget}
              </label>
              <input
                type="range"
                min="0"
                max="5000"
                value={budget}
                onChange={(e) => setBudget(Number(e.target.value))}
                className="w-full"
              />
            </div>
          </div>
          <button
            onClick={search}
            className="w-full bg-sacred-600 text-white py-2 rounded-lg font-semibold hover:bg-sacred-700"
          >
            Search
          </button>
        </div>

        {loading && <p className="text-center text-gray-600">Searching...</p>}

        {results.map((acc, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg shadow-sm mb-4 border-l-4 border-green-500"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-bold">{acc.name}</h3>
                <p className="text-sm text-gray-600">{acc.type}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-sacred-600">{acc.price}</p>
                <p className="text-sm text-green-600">{acc.available} units</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              📍 {acc.location?.name}
            </p>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700">
              Contact via WhatsApp
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
