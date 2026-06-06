"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Zap } from "lucide-react";

export default function CrowdPage() {
  const [sectors, setSectors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/v1/crowd/heatmap")
      .then((res) => res.json())
      .then((data) => {
        setSectors(Array.isArray(data.data) ? data.data : [data.data]);
        setLoading(false);
      });
  }, []);

  const getColor = (level: string) => {
    switch (level) {
      case "low":
        return "bg-green-100 border-green-500 text-green-900";
      case "medium":
        return "bg-yellow-100 border-yellow-500 text-yellow-900";
      case "high":
        return "bg-orange-100 border-orange-500 text-orange-900";
      case "critical":
        return "bg-red-100 border-red-500 text-red-900";
      default:
        return "bg-gray-100 border-gray-500 text-gray-900";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">Crowd Intelligence</h1>
          <Zap className="w-5 h-5 text-yellow-500 ml-auto" />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Info Card */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
          <p className="text-blue-900">
            🌊 <strong>Real-time crowd density</strong> in each sector. Plan your visit accordingly.
          </p>
        </div>

        {/* Sector Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin">⏳</div>
            <p className="mt-4 text-gray-600">Loading crowd data...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sectors.map((sector, i) => (
              <div key={i} className={`p-6 rounded-lg border-2 ${getColor(sector.crowdLevel)}`}>
                <h3 className="text-2xl font-bold mb-2">Sector {sector.sector}</h3>
                <div className="mb-4">
                  <div className="text-3xl font-bold capitalize">{sector.crowdLevel}</div>
                  <p className="text-sm opacity-75 mt-1">
                    {sector.personCount || 0} people estimated
                  </p>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-3 mb-4">
                  <div
                    className={`h-3 rounded-full ${
                      sector.crowdLevel === "low"
                        ? "bg-green-500"
                        : sector.crowdLevel === "medium"
                          ? "bg-yellow-500"
                          : sector.crowdLevel === "high"
                            ? "bg-orange-500"
                            : "bg-red-500"
                    }`}
                    style={{
                      width: `${Math.min((sector.density || 0) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
                <div className="text-xs opacity-75">
                  Updated: {new Date(sector.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Predictions */}
        <div className="mt-12 bg-white rounded-lg p-6 shadow-sm">
          <h2 className="text-xl font-bold mb-4">📊 Next 2 Hours Forecast</h2>
          <div className="text-gray-600">
            <p className="mb-2">
              🟢 <strong>5-8am:</strong> Low to medium crowd. Best time to visit most ghats.
            </p>
            <p className="mb-2">
              🟡 <strong>8-10am:</strong> Rising crowd. Expect congestion in central areas.
            </p>
            <p>
              🔴 <strong>10am onwards:</strong> Peak crowd expected. Consider visiting later or using alternative routes.
            </p>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-gradient-to-r from-sacred-600 to-sacred-700 text-white rounded-lg p-6">
          <h3 className="font-bold text-lg mb-3">💡 Smart Visiting Tips</h3>
          <ul className="space-y-2">
            <li>✓ Visit early morning (5-7am) for low crowds</li>
            <li>✓ Use our navigation for crowd-aware routes</li>
            <li>✓ Set reminders for optimal visit windows</li>
            <li>✓ Check real-time updates before heading out</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
