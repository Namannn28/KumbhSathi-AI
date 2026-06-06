"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AlertCircle, Phone, Heart, Users, Flame } from "lucide-react";

export default function EmergencyPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [caseId, setCaseId] = useState<string | null>(null);

  const emergencyTypes = [
    {
      id: "MEDICAL",
      icon: <Heart className="w-8 h-8" />,
      label: "Medical Emergency",
      color: "red",
    },
    {
      id: "LOST_CHILD",
      icon: <Users className="w-8 h-8" />,
      label: "Lost Child",
      color: "orange",
    },
    {
      id: "WOMEN_SAFETY",
      icon: <AlertCircle className="w-8 h-8" />,
      label: "Women Safety",
      color: "pink",
    },
    {
      id: "FIRE",
      icon: <Flame className="w-8 h-8" />,
      label: "Fire/Disaster",
      color: "red",
    },
  ];

  async function handleSOS() {
    if (!selectedType) return;

    setLoading(true);
    try {
      const response = await fetch("/api/v1/emergency/sos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: selectedType,
          description: "Emergency reported from mobile app",
          latitude: 25.4358,
          longitude: 81.8463,
          sector: "1",
        }),
      });

      const data = await response.json();
      if (data.success) {
        setCaseId(data.data.caseId);
      }
    } catch (error) {
      alert("Failed to report emergency. Try calling 112.");
    } finally {
      setLoading(false);
    }
  }

  if (caseId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-8 max-w-md text-center shadow-2xl">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Emergency Registered</h1>
          <p className="text-gray-600 mb-6">
            Help is on the way. Your case ID:
          </p>
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="font-mono text-lg font-bold text-gray-800">{caseId}</p>
          </div>
          <div className="space-y-2 mb-6 text-sm text-gray-600">
            <p>📍 Location: Sector 1, Near Sangam Ghat</p>
            <p>⏱️ ETA: ~5 minutes</p>
            <p>👥 Responders: Medical team + Police</p>
          </div>
          <button
            onClick={() => router.push("/dashboard")}
            className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-600 to-red-900 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-white text-center mb-12">
          <AlertCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">EMERGENCY</h1>
          <p className="text-red-100">Select the type of emergency</p>
        </div>

        {/* Emergency Type Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {emergencyTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedType(type.id)}
              className={`p-6 rounded-lg transition transform ${
                selectedType === type.id
                  ? "bg-white shadow-xl scale-105"
                  : "bg-white/20 text-white hover:bg-white/30"
              }`}
            >
              <div className={`w-12 h-12 mx-auto mb-2 ${selectedType === type.id ? "text-red-600" : ""}`}>
                {type.icon}
              </div>
              <p className="font-semibold">{type.label}</p>
            </button>
          ))}
        </div>

        {/* SOS Button */}
        {selectedType && (
          <div className="space-y-4">
            <button
              onClick={handleSOS}
              disabled={loading}
              className="w-full bg-white text-red-600 py-4 rounded-lg font-bold text-xl hover:bg-gray-100 disabled:bg-gray-300 transition"
            >
              {loading ? "Reporting..." : "🆘 SEND EMERGENCY ALERT"}
            </button>

            <button
              onClick={() => setSelectedType(null)}
              className="w-full bg-white/20 text-white py-3 rounded-lg font-semibold hover:bg-white/30"
            >
              Cancel
            </button>
          </div>
        )}

        {/* Emergency Contacts */}
        <div className="mt-12 bg-white/10 text-white rounded-lg p-6">
          <h3 className="font-bold text-lg mb-4">Direct Emergency Contacts</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 bg-white/10 rounded">
              <span>🚑 Medical Emergency</span>
              <a href="tel:112" className="font-bold text-lg">
                112
              </a>
            </div>
            <div className="flex justify-between items-center p-2 bg-white/10 rounded">
              <span>👮 Police</span>
              <a href="tel:112" className="font-bold text-lg">
                112
              </a>
            </div>
            <div className="flex justify-between items-center p-2 bg-white/10 rounded">
              <span>📞 KumbhSaarthi Helpline</span>
              <a href="tel:18002000001" className="font-bold text-lg">
                1800-2000-001
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
