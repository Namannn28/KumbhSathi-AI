"use client";

import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";

export default function EventsPage() {
  const events = [
    {
      date: "Jan 14, 2025",
      name: "Makar Sankranti Snan",
      time: "6:00 AM - 9:00 AM",
      significance: "Most important bathing day",
      ghat: "Sangam Ghat",
    },
    {
      date: "Jan 29, 2025",
      name: "Mauni Amavasya Snan",
      time: "5:30 AM - 8:30 AM",
      significance: "Second major bathing festival",
      ghat: "Triveni Ghat",
    },
    {
      date: "Feb 12, 2025",
      name: "Basant Panchami",
      time: "7:00 AM - 10:00 AM",
      significance: "Spring festival celebration",
      ghat: "Ganga Ghat",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">Snan Schedule 2025</h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {events.map((event, i) => (
          <div key={i} className="bg-white p-6 rounded-lg shadow-sm mb-4 border-l-4 border-sacred-600">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-sm text-gray-500">📅 {event.date}</p>
                <h3 className="text-xl font-bold mt-1">{event.name}</h3>
              </div>
              <span className="text-2xl">🙏</span>
            </div>
            <div className="space-y-2 text-sm">
              <p><strong>⏰ Time:</strong> {event.time}</p>
              <p><strong>📍 Location:</strong> {event.ghat}</p>
              <p><strong>ℹ️ Significance:</strong> {event.significance}</p>
            </div>
            <button className="mt-4 bg-sacred-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sacred-700">
              Set Reminder
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
