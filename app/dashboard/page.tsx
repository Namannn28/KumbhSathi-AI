"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  MessageSquare, Navigation, Users, AlertTriangle, 
  Search, Bed, Calendar, Plane, Info, CloudSun, BellRing
} from "lucide-react";
import { crowdData, crowdLevelColors } from "@/lib/data/crowd";
import { majorEvents } from "@/lib/data/events";
import { weatherData } from "@/lib/data/services";
import { safetyTips } from "@/lib/data/emergency";
import { useEffect, useState } from "react";
import Tilt from "react-parallax-tilt";

export default function DashboardHome() {
  const { data: session } = useSession();
  const [currentTip, setCurrentTip] = useState(0);
  const [liveWeather, setLiveWeather] = useState(weatherData);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % safetyTips.length);
    }, 5000);

    // Fetch live weather
    fetch('/api/weather')
      .then(res => res.json())
      .then(data => {
        if (data?.current_weather) {
          setLiveWeather(prev => ({
            ...prev,
            temperature: Math.round(data.current_weather.temperature),
            condition: data.current_weather.weathercode <= 3 ? "Clear" : "Rain/Showers",
            icon: data.current_weather.weathercode <= 3 ? "☀️" : "🌧️",
            aqi: 45, // Hardcoded for demo
            humidity: 60 // Hardcoded for demo
          }));
        }
      })
      .catch(console.error);

    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const quickActions = [
    { icon: MessageSquare, label: "AI Chat", href: "/dashboard/chat", color: "bg-blue-500" },
    { icon: Navigation, label: "Map & Nav", href: "/dashboard/navigation", color: "bg-emerald-500" },
    { icon: Users, label: "Crowd", href: "/dashboard/crowd", color: "bg-orange-500" },
    { icon: Bed, label: "Stay", href: "/dashboard/accommodation", color: "bg-purple-500" },
    { icon: Calendar, label: "Events", href: "/dashboard/events", color: "bg-pink-500" },
    { icon: Plane, label: "Travel", href: "/dashboard/travel", color: "bg-indigo-500" },
    { icon: Search, label: "Lost/Found", href: "/dashboard/lost-found", color: "bg-teal-500" },
    { icon: Info, label: "Services", href: "/dashboard/services", color: "bg-gray-500" },
  ];

  // Calculate days to Kumbh
  const kumbhStartDate = new Date("2028-01-14");
  const today = new Date("2026-06-07"); // Mock current date
  const daysToKumbh = Math.ceil((kumbhStartDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-24 md:pb-8">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
        
        {/* Welcome Banner */}
        <motion.div variants={itemVariants} className="relative overflow-hidden rounded-3xl p-8 text-white sacred-gradient shadow-xl">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Namaste, {session?.user?.name || "Pilgrim"}! 🙏
            </h1>
            <p className="text-white/90 text-lg mb-6">
              Welcome to your personal Mahakumbh 2028 companion.
            </p>
            
            <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
              </span>
              <span className="font-medium text-sm md:text-base">{daysToKumbh} days until Mahakumbh begins</span>
            </div>
          </div>
        </motion.div>

        {/* Safety Tip Banner */}
        <motion.div variants={itemVariants} className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-4 flex items-center gap-4">
          <div className="bg-blue-100 dark:bg-blue-800 p-2 rounded-full text-blue-600 dark:text-blue-400 shrink-0">
            <BellRing size={20} />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-blue-800 dark:text-blue-300">Safety Tip of the Day</p>
            <p className="text-sm text-blue-600 dark:text-blue-400 animate-fade-in" key={currentTip}>
              {safetyTips[currentTip]}
            </p>
          </div>
        </motion.div>

        {/* Quick Actions Grid */}
        <motion.div variants={itemVariants}>
          <h2 className="section-title mb-4 text-xl">Quick Actions</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {quickActions.map((action, idx) => (
              <Tilt key={idx} tiltMaxAngleX={15} tiltMaxAngleY={15} scale={1.1} transitionSpeed={2000}>
                <Link href={action.href} className="flex flex-col items-center gap-2 group">
                  <div className={`w-14 h-14 rounded-2xl ${action.color} text-white flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all`}>
                    <action.icon size={24} />
                  </div>
                  <span className="text-xs font-medium text-center text-gray-700 dark:text-gray-300">{action.label}</span>
                </Link>
              </Tilt>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Crowd Status */}
          <motion.div variants={itemVariants} className="md:col-span-2 glass-card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="section-title text-xl flex items-center gap-2">
                <Users className="text-sacred-500" /> Live Crowd Status
              </h2>
              <Link href="/dashboard/crowd" className="text-sm text-sacred-600 dark:text-sacred-400 font-medium hover:underline">View Map</Link>
            </div>
            
            <div className="space-y-4">
              {crowdData.slice(0, 3).map((sector) => {
                const levelConfig = crowdLevelColors[sector.level];
                return (
                  <div key={sector.id} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">{sector.name}</h3>
                        <p className="text-xs text-gray-500">{sector.nameHi}</p>
                      </div>
                      <span className={levelConfig.badge}>{sector.level.toUpperCase()}</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-1">
                      <div className={`h-2 rounded-full ${levelConfig.bg}`} style={{ width: `${sector.density}%` }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>{sector.personCount.toLocaleString()} people</span>
                      <span>Trend: {sector.trend}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Weather & Next Event */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Weather Widget */}
            <div className="glass-card p-6 bg-gradient-to-br from-blue-50 to-emerald-50 dark:from-blue-900/20 dark:to-emerald-900/20">
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
                <CloudSun size={16} /> Ujjain Live Weather
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white">{liveWeather.temperature}°C</div>
                  <div className="text-lg text-gray-600 dark:text-gray-300">{liveWeather.condition}</div>
                </div>
                <div className="text-5xl">{liveWeather.icon}</div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>AQI: <span className="font-semibold text-orange-500">{liveWeather.aqi}</span></span>
                <span>Humidity: {liveWeather.humidity}%</span>
              </div>
            </div>

            {/* Next Event */}
            <div className="glass-card p-6">
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-4 flex items-center gap-2">
                <Calendar size={16} /> Next Major Event
              </h2>
              {majorEvents[0] && (
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{majorEvents[0].name}</h3>
                  <p className="text-sm text-gray-500 mb-3">{new Date(majorEvents[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{majorEvents[0].significance}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating SOS Button */}
      <Link href="/dashboard/emergency" className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50">
        <div className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-xl shadow-red-600/40 animate-pulse-slow hover:scale-105 transition-transform">
          <AlertTriangle size={32} />
        </div>
      </Link>
    </div>
  );
}
