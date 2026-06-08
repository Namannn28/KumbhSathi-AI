"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Info, MapPin, Phone, Search, ShieldCheck } from "lucide-react";
import { serviceCategories, faqData } from "@/lib/data/services";
import { locations } from "@/lib/data/locations";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = serviceCategories.filter(cat => 
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    cat.nameHi.includes(searchQuery)
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Info className="text-sacred-500" size={32} />
            Services Directory
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Essential facilities and information at Mahakumbh</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text" 
          placeholder="Search for medical, food, toilets, parking..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input-field pl-12 py-3 text-base"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Categories Grid */}
        <div className="lg:col-span-2 space-y-6">
          {activeCategory ? (
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <button 
                onClick={() => setActiveCategory(null)}
                className="text-gray-500 hover:text-gray-900 dark:hover:text-white mb-4 flex items-center gap-2 text-sm font-medium transition-colors"
              >
                ← Back to Categories
              </button>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-sacred-100 dark:bg-sacred-900/30 text-sacred-600 flex items-center justify-center text-2xl">
                  {serviceCategories.find(c => c.id === activeCategory)?.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{serviceCategories.find(c => c.id === activeCategory)?.name}</h2>
                  <p className="text-sm text-gray-500 font-hindi">{serviceCategories.find(c => c.id === activeCategory)?.nameHi}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {locations.filter(l => l.type === activeCategory).map(loc => (
                  <div key={loc.id} className="glass-card p-5 hover:border-sacred-400/50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-gray-900 dark:text-white">{loc.name}</h3>
                      <span className="text-[10px] uppercase font-bold text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded ml-2">Sec {loc.sector}</span>
                    </div>
                    <p className="text-xs text-gray-500 font-hindi mb-3">{loc.nameHi}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{loc.description}</p>
                    <div className="flex gap-2">
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-secondary py-2 text-xs flex items-center justify-center gap-1"
                      >
                        <MapPin size={14} /> Navigate
                      </a>
                      <a 
                        href={`tel:+919876543210`}
                        className="flex-1 btn-secondary py-2 text-xs flex items-center justify-center gap-1"
                      >
                        <Phone size={14} /> Call
                      </a>
                    </div>
                  </div>
                ))}
                {locations.filter(l => l.type === activeCategory).length === 0 && (
                  <div className="col-span-full p-8 text-center text-gray-500 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
                    No detailed locations available in demo data for this category.
                  </div>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredCategories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="glass-card p-4 flex flex-col items-center text-center hover:border-sacred-500/50 hover:bg-sacred-50 dark:hover:bg-sacred-900/10 transition-colors group"
                >
                  <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{cat.icon}</span>
                  <span className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{cat.name}</span>
                  <span className="text-[10px] text-gray-500 font-hindi mb-2">{cat.nameHi}</span>
                  <span className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full mt-auto">
                    {locations.filter(l => l.type === cat.id).length || Math.floor(Math.random() * 50) + 10} Locations
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </div>

        {/* FAQ Sidebar */}
        <div className="space-y-6">
          <div className="glass-card p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-800/50">
            <h2 className="font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
              <ShieldCheck className="text-blue-500" /> Pilgrim Guidelines
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-blue-800 dark:text-blue-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                Carry valid photo ID at all times
              </li>
              <li className="flex items-start gap-2 text-sm text-blue-800 dark:text-blue-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                Register dependents at the family locator booth
              </li>
              <li className="flex items-start gap-2 text-sm text-blue-800 dark:text-blue-300">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                Do not use soap/detergents while bathing in the river
              </li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <h2 className="font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqData.slice(0, 4).map((faq, idx) => (
                <div key={idx} className="group">
                  <h3 className="font-medium text-sm text-gray-900 dark:text-white mb-1 group-hover:text-sacred-600 dark:group-hover:text-sacred-400 transition-colors">
                    {faq.q}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-2 text-sm text-sacred-600 dark:text-sacred-400 font-medium hover:bg-sacred-50 dark:hover:bg-sacred-900/20 rounded-lg transition-colors">
              View All FAQs
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
