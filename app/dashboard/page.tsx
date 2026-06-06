"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  MessageCircle,
  MapPin,
  AlertCircle,
  Search,
  Users,
  Calendar,
  Activity,
  Bell,
  User,
} from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [crowdData, setCrowdData] = useState<any>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    // Fetch crowd data
    fetch("/api/v1/crowd/heatmap")
      .then((res) => res.json())
      .then((data) => setCrowdData(data.data));
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sacred-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              K
            </div>
            <span className="font-bold text-sacred-600">KumbhSaarthi</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-sacred-600 to-sacred-700 text-white rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Namaste, {session?.user?.name}! 🙏
          </h1>
          <p className="text-sacred-100">Welcome to Mahakumbh. Har Kadam Mein Saath.</p>
        </div>

        {/* Quick Stats */}
        {crowdData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {Array.isArray(crowdData) ? (
              crowdData.slice(0, 3).map((sector: any, i: number) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-sm border-l-4 border-sacred-600">
                  <div className="text-2xl font-bold text-sacred-600">Sector {sector.sector}</div>
                  <div className={`text-sm font-semibold mt-2 ${sector.crowdLevel === "low" ? "text-green-600" : sector.crowdLevel === "medium" ? "text-yellow-600" : "text-red-600"}`}>
                    Crowd: {sector.crowdLevel.toUpperCase()}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {sector.personCount} people estimated
                  </div>
                </div>
              ))
            ) : null}
          </div>
        )}

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              href: "/chat",
              icon: <MessageCircle className="w-6 h-6" />,
              title: "AI Chat",
              desc: "Ask anything in your language",
              color: "blue",
            },
            {
              href: "/navigation",
              icon: <MapPin className="w-6 h-6" />,
              title: "Navigation",
              desc: "Find your way around Mahakumbh",
              color: "green",
            },
            {
              href: "/emergency",
              icon: <AlertCircle className="w-6 h-6" />,
              title: "Emergency SOS",
              desc: "Get immediate help",
              color: "red",
            },
            {
              href: "/lost-found",
              icon: <Search className="w-6 h-6" />,
              title: "Lost & Found",
              desc: "Find family members",
              color: "purple",
            },
            {
              href: "/accommodation",
              icon: <Users className="w-6 h-6" />,
              title: "Accommodation",
              desc: "Find places to stay",
              color: "orange",
            },
            {
              href: "/events",
              icon: <Calendar className="w-6 h-6" />,
              title: "Events",
              desc: "Snan schedule & timings",
              color: "indigo",
            },
          ].map((feature, i) => (
            <Link
              key={i}
              href={feature.href}
              className={`bg-white p-6 rounded-lg shadow-sm hover:shadow-lg hover:scale-105 transition cursor-pointer border-t-4 border-${feature.color}-500`}
            >
              <div className={`w-12 h-12 bg-${feature.color}-100 rounded-lg flex items-center justify-center text-${feature.color}-600 mb-4`}>
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg mb-1">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </Link>
          ))}
        </div>

        {/* Crowd Alert */}
        {crowdData && Array.isArray(crowdData) && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-yellow-800">Crowd Alert</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Sector {crowdData[0]?.sector} is experiencing {crowdData[0]?.crowdLevel} crowd.
                  {crowdData[0]?.crowdLevel === "high" ? " Consider alternative routes or timings." : " You're good to go!"}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* SOS Button (Floating) */}
      <Link
        href="/emergency"
        className="fixed bottom-6 right-6 w-16 h-16 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center shadow-lg font-bold text-sm animate-pulse z-50"
      >
        🆘 SOS
      </Link>
    </div>
  );
}
