"use client";

import { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import { Search, MapPin, Navigation as NavIcon, Filter } from "lucide-react";
import { locations } from "@/lib/data/locations";
// Dynamically import our custom MapComponent to avoid SSR and Leaflet init issues
const MapComponent = dynamic(() => import('./MapComponent'), { 
  ssr: false, 
  loading: () => <MapLoading /> 
});

const MapLoading = () => (
  <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex flex-col items-center justify-center text-gray-500">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sacred-500 mb-4"></div>
    <p>Loading Map Data...</p>
  </div>
);

export default function NavigationPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const categories = [
    { id: "all", label: "All" },
    { id: "ghat", label: "Ghats" },
    { id: "temple", label: "Temples" },
    { id: "medical", label: "Medical" },
    { id: "police", label: "Police" },
    { id: "food", label: "Food" },
    { id: "toilet", label: "Toilets" },
  ];

  const filteredLocations = locations.filter(loc => 
    (activeCategory === "all" || loc.type === activeCategory) &&
    (loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || loc.nameHi.includes(searchQuery))
  );

  return (
    <div className="h-[calc(100vh-64px)] md:h-screen flex flex-col md:flex-row relative">
      
      {/* Sidebar Panel */}
      <div className="w-full md:w-96 bg-white dark:bg-gray-950 flex flex-col h-[40vh] md:h-full z-20 shadow-xl relative">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2 mb-4">
            <NavIcon className="text-sacred-500" /> Map & Navigation
          </h1>
          
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search locations..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input-field pl-10 py-2 text-sm"
            />
          </div>

          <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-full whitespace-nowrap text-xs font-medium transition-colors ${
                  activeCategory === cat.id
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredLocations.map(loc => (
            <div key={loc.id} className="p-3 border border-gray-100 dark:border-gray-800 rounded-xl hover:border-sacred-400/50 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors cursor-pointer group">
              <div className="flex justify-between items-start mb-1">
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{loc.name}</h3>
                <span className="text-[10px] uppercase font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{loc.type}</span>
              </div>
              <p className="text-xs text-gray-500 font-hindi mb-2">{loc.nameHi}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-sacred-600 dark:text-sacred-400 font-medium">Sector {loc.sector}</span>
                <a 
                  href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <NavIcon size={12} /> Navigate
                </a>
              </div>
            </div>
          ))}
          {filteredLocations.length === 0 && (
            <div className="text-center p-8 text-gray-500 text-sm">No locations found.</div>
          )}
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative h-[60vh] md:h-full z-10 bg-gray-200 dark:bg-gray-800">
        {isMounted ? (
          <MapComponent filteredLocations={filteredLocations} />
        ) : (
          <MapLoading />
        )}

        {/* Map Overlays */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button className="bg-white text-gray-900 p-2.5 rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
            <Filter size={20} />
          </button>
          <button className="bg-white text-gray-900 p-2.5 rounded-xl shadow-lg hover:bg-gray-50 transition-colors">
            <MapPin size={20} className="text-blue-500" />
          </button>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
          <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-gray-200 flex items-center gap-2 text-xs font-medium text-gray-700">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Map Data Live • GPS Active
          </div>
        </div>
      </div>
    </div>
  );
}
