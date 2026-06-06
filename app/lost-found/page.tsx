"use client";

import Link from "next/link";
import { ArrowLeft, Upload, Search } from "lucide-react";
import { useState } from "react";

export default function LostFoundPage() {
  const [mode, setMode] = useState("report"); // report or search
  const [name, setName] = useState("");
  const [sector, setSector] = useState("");
  const [results, setResults] = useState<any[]>([]);

  async function handleReport(e: React.FormEvent) {
    e.preventDefault();
    // Call API to report missing person
    alert(`Missing person report submitted for ${name} in Sector ${sector}`);
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    // Call API to search
    setResults([
      {
        id: "1",
        name: "Ramesh Kumar",
        age: 65,
        sector: "2",
        lastSeen: "2 hours ago",
        confidence: 0.92,
      },
    ]);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">Lost & Found</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Mode Tabs */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setMode("report")}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              mode === "report"
                ? "bg-sacred-600 text-white"
                : "bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            📝 Report Missing
          </button>
          <button
            onClick={() => setMode("search")}
            className={`flex-1 py-3 rounded-lg font-semibold transition ${
              mode === "search"
                ? "bg-sacred-600 text-white"
                : "bg-white border border-gray-300 hover:bg-gray-50"
            }`}
          >
            🔍 Search
          </button>
        </div>

        {/* Report Mode */}
        {mode === "report" && (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <form onSubmit={handleReport} className="space-y-4">
              <div>
                <label className="block font-medium mb-2">
                  Missing Person Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block font-medium mb-2">Last Seen Sector</label>
                <select
                  value={sector}
                  onChange={(e) => setSector(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select sector</option>
                  {Array.from({ length: 12 }).map((_, i) => (
                    <option key={i} value={String(i + 1)}>
                      Sector {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block font-medium mb-2">Upload Photo</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">
                    Tap to upload photo (helps with AI matching)
                  </p>
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-sacred-600 text-white py-3 rounded-lg font-semibold hover:bg-sacred-700"
              >
                Report Missing Person
              </button>
            </form>
          </div>
        )}

        {/* Search Mode */}
        {mode === "search" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <form onSubmit={handleSearch} className="space-y-4">
                <div>
                  <label className="block font-medium mb-2">
                    Upload Photo to Search
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Tap to upload photo of person you're looking for
                    </p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
                >
                  Search with AI
                </button>
              </form>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-bold text-lg">Possible Matches</h3>
                {results.map((result) => (
                  <div key={result.id} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-green-500">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-bold text-lg">{result.name}</h4>
                        <p className="text-sm text-gray-600">Age {result.age}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">
                          {Math.round(result.confidence * 100)}%
                        </p>
                        <p className="text-xs text-gray-500">Match confidence</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Last seen: Sector {result.sector} ({result.lastSeen})
                    </p>
                    <button className="w-full bg-green-600 text-white py-2 rounded-lg text-sm hover:bg-green-700">
                      This is them! Contact family
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
