"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bed, Map as MapIcon, Star, MapPin, Check, Search, CalendarDays, Users, Phone, Info } from "lucide-react";
import { accommodations } from "@/lib/data/accommodations";

export default function AccommodationPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [showMap, setShowMap] = useState(false);
  const [selectedAcc, setSelectedAcc] = useState<any>(null);
  const [liveHotels, setLiveHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: "all", label: "All Stays" },
    { id: "tent", label: "Tent City" },
    { id: "dharamshala", label: "Dharamshala" },
    { id: "hotel", label: "Hotels" },
    { id: "ashram", label: "Ashrams" },
  ];

  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/hotels', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ type: activeTab === 'all' ? '' : activeTab })
        });
        const data = await res.json();
        setLiveHotels(data.hotels || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (activeTab === 'hotel' || activeTab === 'all') {
      fetchHotels();
    }
  }, [activeTab]);

  const mappedLiveHotels = liveHotels.map(h => ({
    id: h.id, type: 'hotel', name: h.name, nameHi: '', rating: h.rating, distance: h.distance, description: h.type,
    amenities: h.amenities, priceLabel: `₹${h.price}/night`, available: h.availableRooms > 0, sector: 'Ujjain Center', image: h.image
  }));

  const filteredAccs = activeTab === "all" 
    ? [...accommodations.filter(a => a.type !== 'hotel'), ...mappedLiveHotels]
    : activeTab === "hotel"
      ? mappedLiveHotels
      : accommodations.filter(a => a.type === activeTab);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Bed className="text-sacred-500" size={32} />
            Accommodation
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Find your perfect stay for Mahakumbh 2028</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowMap(!showMap)}
            className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            {showMap ? <Search size={18} /> : <MapIcon size={18} />}
            {showMap ? "List View" : "Map View"}
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2.5 rounded-full whitespace-nowrap font-medium transition-all ${
              activeTab === tab.id
                ? "bg-sacred-500 text-white shadow-md shadow-sacred-500/25"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 px-4 py-3 rounded-xl border border-blue-100 dark:border-blue-800/50 flex flex-wrap gap-4 text-sm font-medium">
        <span>✅ {filteredAccs.filter(a => a.available).length} Available stays</span>
        <span>🏷️ Starting at Free/₹100</span>
        <span>🛡️ Verified by Kumbh Authority</span>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sacred-500 mb-4"></div>
          <p className="text-gray-500 dark:text-gray-400">Finding the best accommodations...</p>
        </div>
      ) : showMap ? (
        <div className="h-[600px] bg-gray-200 dark:bg-gray-800 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center border border-gray-200 dark:border-gray-700">
          <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800')] mix-blend-luminosity object-cover"></div>
          <MapIcon size={48} className="text-gray-400 mb-4 z-10" />
          <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 z-10">Map View Available in Navigation Section</h3>
          <p className="text-gray-500 z-10 mt-2">Switch back to list view to browse and book accommodations.</p>
          <button onClick={() => setShowMap(false)} className="btn-primary mt-6 z-10">Return to List</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAccs.map((acc) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              key={acc.id} 
              className="glass-card overflow-hidden flex flex-col group hover:border-sacred-400/50 transition-colors"
            >
              <div className="h-48 relative overflow-hidden">
                <img 
                  src={acc.image} 
                  alt={acc.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                />
                <div className="absolute top-3 left-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold font-mono text-gray-800 dark:text-gray-200">
                  {acc.sector}
                </div>
                <div className="absolute top-3 right-3">
                  {acc.available ? (
                    <span className="bg-emerald-500 text-white px-2 py-1 rounded text-xs font-bold shadow-lg flex items-center gap-1">
                      <Check size={12} /> Available
                    </span>
                  ) : (
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold shadow-lg">
                      Full
                    </span>
                  )}
                </div>
              </div>
              
              <div className="p-5 flex-1 flex flex-col">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-1">{acc.name}</h3>
                    <p className="text-sm text-gray-500 font-hindi">{acc.nameHi}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-2 py-1 rounded text-sm font-bold">
                    <Star size={14} className="fill-current" /> {acc.rating}
                  </div>
                </div>

                <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                  <MapPin size={14} /> {acc.distance}
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{acc.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {acc.amenities.slice(0, 3).map((amenity: string, idx: number) => (
                    <span key={idx} className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-md">
                      {amenity}
                    </span>
                  ))}
                  {acc.amenities.length > 3 && (
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 text-xs px-2 py-1 rounded-md">
                      +{acc.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <div className="mt-auto flex items-end justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">Price</p>
                    <p className="text-xl font-bold text-sacred-600 dark:text-sacred-400">{acc.priceLabel}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedAcc(acc)}
                    disabled={!acc.available}
                    className={`px-4 py-2 rounded-xl font-semibold transition-all ${
                      acc.available 
                        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-sacred-600 dark:hover:bg-sacred-500" 
                        : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {acc.available ? "Book Now" : "Sold Out"}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Booking Modal */}
      <AnimatePresence>
        {selectedAcc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden w-full max-w-lg shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="h-40 relative">
                <img src={selectedAcc.image} alt={selectedAcc.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-2xl font-bold">{selectedAcc.name}</h3>
                  <p className="text-white/80 text-sm">{selectedAcc.priceLabel}</p>
                </div>
              </div>

              <div className="p-6 overflow-y-auto">
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Booking confirmed! (Demo)"); setSelectedAcc(null); }}>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Check-in</label>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="date" required className="input-field pl-10 py-2 text-sm" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Check-out</label>
                      <div className="relative">
                        <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="date" required className="input-field pl-10 py-2 text-sm" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Guests</label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <select className="input-field pl-10 py-2 text-sm">
                          <option>1 Person</option>
                          <option>2 Persons</option>
                          <option>3 Persons</option>
                          <option>4+ Persons</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input type="tel" required className="input-field pl-10 py-2 text-sm" placeholder="Contact number" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Special Requests</label>
                    <textarea className="input-field py-2 text-sm resize-none" rows={2} placeholder="Any specific requirements..."></textarea>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-100 dark:border-blue-800/50 flex gap-2 text-sm text-blue-800 dark:text-blue-300">
                    <Info size={18} className="shrink-0 mt-0.5" />
                    <p>No payment required now. Pay directly at the accommodation.</p>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                    <button type="button" onClick={() => setSelectedAcc(null)} className="flex-1 btn-secondary py-2">Cancel</button>
                    <button type="submit" className="flex-1 btn-primary py-2">Confirm Booking</button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
