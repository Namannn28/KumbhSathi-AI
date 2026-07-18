"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, Droplets } from "lucide-react";
import { majorEvents, dailyActivities, snanDates } from "@/lib/data/events";

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("snan");

  const today = new Date("2026-06-07"); // Mock today's date

  const calculateDaysLeft = (dateString: string) => {
    const eventDate = new Date(dateString);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-24 md:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Calendar className="text-sacred-500" size={32} />
          Events & Schedule
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Key dates and daily activities at Mahakumbh</p>
      </div>

      {/* Featured Snan Dates */}
      <div>
        <h2 className="section-title text-xl mb-4 flex items-center gap-2">
          <Droplets className="text-blue-500" /> Major Bathing Dates (Shahi Snan)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snanDates.map((snan, idx) => {
            const daysLeft = calculateDaysLeft(snan.date);
            return (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={snan.id} 
                className={`relative overflow-hidden rounded-2xl p-6 text-white ${
                  idx === 0 
                    ? "bg-gradient-to-br from-sacred-600 to-orange-600 shadow-xl shadow-sacred-500/20 md:col-span-2 lg:col-span-1 lg:row-span-2" 
                    : "bg-gradient-to-br from-gray-800 to-gray-900"
                }`}
              >
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1609947017136-9dfe24ca77b0?w=400')] opacity-20 mix-blend-overlay object-cover"></div>
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-lg">
                      <p className="text-sm font-bold" suppressHydrationWarning>{new Date(snan.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                    {daysLeft > 0 && (
                      <div className="text-right">
                        <p className="text-xs text-white/70 uppercase tracking-wider">Countdown</p>
                        <p className="font-bold">{daysLeft} Days</p>
                      </div>
                    )}
                  </div>
                  
                  <h3 className={`font-bold ${idx === 0 ? "text-3xl" : "text-xl"} mb-1`}>{snan.name}</h3>
                  <p className="text-white/80 font-hindi text-sm mb-4">{snan.nameHi}</p>
                  
                  <div className="mt-auto space-y-3">
                    <p className="text-sm text-white/90 leading-relaxed">{snan.significance}</p>
                    <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Users size={16} /> <span className="font-medium">{snan.expectedCrowd}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <MapPin size={16} /> <span>All Ghats</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800 pt-4">
        <button
          onClick={() => setActiveTab("snan")}
          className={`pb-4 px-6 font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === "snan" ? "border-sacred-500 text-sacred-600 dark:text-sacred-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          All Events
        </button>
        <button
          onClick={() => setActiveTab("daily")}
          className={`pb-4 px-6 font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === "daily" ? "border-sacred-500 text-sacred-600 dark:text-sacred-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Daily Activities
        </button>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-1">
        {activeTab === "snan" ? (
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {majorEvents.map((event) => (
              <div key={event.id} className="p-4 md:p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
                <div className="bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 min-w-[100px] text-center p-3 rounded-xl border border-orange-100 dark:border-orange-800/50">
                  <p className="text-2xl font-bold">{new Date(event.date).getDate()}</p>
                  <p className="text-xs uppercase font-medium" suppressHydrationWarning>{new Date(event.date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{event.name}</h3>
                    <span className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-[10px] uppercase font-bold rounded-full">
                      {event.type}
                    </span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{event.significance}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><MapPin size={14} /> {event.location}</span>
                    <span className="flex items-center gap-1"><Users size={14} /> Expected: {event.expectedCrowd}</span>
                  </div>
                </div>

                <a 
                  href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.name)}&dates=${event.date.replace(/-/g, '')}/${event.date.replace(/-/g, '')}&details=${encodeURIComponent(event.significance)}&location=${encodeURIComponent(event.location)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden md:block px-4 py-2 text-sacred-600 dark:text-sacred-400 font-medium bg-sacred-50 dark:bg-sacred-900/20 rounded-lg hover:bg-sacred-100 dark:hover:bg-sacred-900/40 transition-colors text-sm text-center"
                >
                  Add to Calendar
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 md:p-6">
            <div className="relative border-l-2 border-sacred-200 dark:border-sacred-900/50 ml-3 md:ml-6 space-y-8 py-4">
              {dailyActivities.map((activity, idx) => (
                <div key={idx} className="relative pl-8 md:pl-10">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-sacred-500 border-4 border-white dark:border-gray-900"></div>
                  
                  <div className="glass-card p-4 md:p-5 hover:border-sacred-400/50 transition-colors">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                      <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        {activity.name}
                      </h3>
                      <span className="flex items-center gap-1.5 text-sm font-medium text-sacred-600 dark:text-sacred-400 bg-sacred-50 dark:bg-sacred-900/20 px-3 py-1 rounded-full w-fit">
                        <Clock size={14} /> {activity.time}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{activity.description}</p>
                    
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={14} /> {activity.location}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
