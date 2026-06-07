"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, UserPlus, Map, CheckCircle2, Upload, AlertCircle, MapPin, Clock } from "lucide-react";

export default function LostFoundPage() {
  const [activeTab, setActiveTab] = useState("active");
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const mockCases = [
    { id: "LF-101", name: "Ramesh Kumar", age: 65, gender: "Male", location: "Sector A1, near Sangam", time: "2 hours ago", status: "searching", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop" },
    { id: "LF-102", name: "Aarohi (Child)", age: 8, gender: "Female", location: "Gate 3 Entrance", time: "30 mins ago", status: "searching", image: "https://images.unsplash.com/photo-1514315384763-ba401779410f?w=200&h=200&fit=crop" },
    { id: "LF-103", name: "Sunita Devi", age: 58, gender: "Female", location: "Sector B1, Tent City", time: "4 hours ago", status: "found", location_now: "Central Police Station" },
    { id: "LF-104", name: "Blue Backpack", age: null, gender: "Item", location: "Annapurna Langar", time: "1 hour ago", status: "searching", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop" },
  ];

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSuccess(true);
    setTimeout(() => {
      setShowReportForm(false);
      setReportSuccess(false);
      setActiveTab("active");
    }, 3000);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Search className="text-sacred-500" size={32} />
            Lost & Found
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Report missing persons or check active cases</p>
        </div>
        <button 
          onClick={() => setShowReportForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <UserPlus size={20} /> Report Missing
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="glass-card p-4 text-center">
          <p className="text-2xl md:text-3xl font-bold text-sacred-600">342</p>
          <p className="text-xs md:text-sm text-gray-500">Reunited Today</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl md:text-3xl font-bold text-orange-500">14</p>
          <p className="text-xs md:text-sm text-gray-500">Active Cases</p>
        </div>
        <div className="glass-card p-4 text-center">
          <p className="text-2xl md:text-3xl font-bold text-emerald-500">98%</p>
          <p className="text-xs md:text-sm text-gray-500">Recovery Rate</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => setActiveTab("active")}
          className={`pb-4 px-4 font-medium transition-colors border-b-2 ${
            activeTab === "active" ? "border-sacred-500 text-sacred-600 dark:text-sacred-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          Active Cases
        </button>
        <button
          onClick={() => setActiveTab("family")}
          className={`pb-4 px-4 font-medium transition-colors border-b-2 flex items-center gap-2 ${
            activeTab === "family" ? "border-sacred-500 text-sacred-600 dark:text-sacred-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          }`}
        >
          <Map size={18} /> Family Locator
        </button>
      </div>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "active" && !showReportForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input type="text" placeholder="Search by name, ID, or location..." className="input-field pl-12" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockCases.map((c) => (
                <div key={c.id} className="glass-card overflow-hidden flex flex-col group">
                  <div className="h-48 bg-gray-200 dark:bg-gray-800 relative flex items-center justify-center">
                    {c.image ? (
                      <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                    ) : (
                      <UserPlus size={48} className="text-gray-400" />
                    )}
                    <div className="absolute top-4 right-4">
                      {c.status === "searching" ? (
                        <span className="badge-red shadow-lg"><AlertCircle size={12} className="mr-1" /> Searching</span>
                      ) : (
                        <span className="badge-green shadow-lg"><CheckCircle2 size={12} className="mr-1" /> Found at {c.location_now}</span>
                      )}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{c.name}</h3>
                      <span className="text-xs text-gray-500 font-mono bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{c.id}</span>
                    </div>
                    {c.age && <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{c.gender}, {c.age} years old</p>}
                    
                    <div className="mt-auto space-y-2">
                      <div className="flex items-start gap-2 text-sm text-gray-500">
                        <MapPin size={16} className="shrink-0 mt-0.5" />
                        <span>Last seen: {c.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock size={16} className="shrink-0" />
                        <span>{c.time}</span>
                      </div>
                    </div>
                    
                    {c.status === "searching" && (
                      <button className="w-full mt-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg text-sm font-medium transition-colors">
                        I have information
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === "family" && !showReportForm && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-6">
            <div className="glass-card p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex flex-col sm:flex-row items-center justify-between gap-4 border-blue-100 dark:border-blue-800/50">
              <div>
                <h3 className="font-bold text-blue-900 dark:text-blue-100 text-lg">Family Sharing is Active</h3>
                <p className="text-blue-700 dark:text-blue-300 text-sm">3 family members are currently sharing their location.</p>
              </div>
              <button className="btn-primary bg-gradient-to-r from-blue-600 to-indigo-600 shadow-blue-500/25">
                Invite Member
              </button>
            </div>

            <div className="h-[400px] bg-gray-200 dark:bg-gray-800 rounded-2xl relative overflow-hidden flex items-center justify-center border-2 border-gray-100 dark:border-gray-700">
              {/* Mock Map Background */}
              <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800')] mix-blend-luminosity object-cover"></div>
              
              {/* Mock Pins */}
              <div className="absolute top-1/3 left-1/4 flex flex-col items-center">
                <div className="bg-sacred-500 text-white text-xs px-2 py-1 rounded-full shadow-lg mb-1 z-10 whitespace-nowrap">You (100%)</div>
                <div className="w-4 h-4 bg-sacred-500 rounded-full border-2 border-white shadow-lg z-10"></div>
                <div className="w-12 h-12 bg-sacred-500/30 rounded-full absolute top-5 animate-ping"></div>
              </div>

              <div className="absolute top-1/2 right-1/3 flex flex-col items-center">
                <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full shadow-lg mb-1 z-10 whitespace-nowrap">Priya (85%)</div>
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg z-10"></div>
              </div>

              <div className="absolute bottom-1/4 left-1/2 flex flex-col items-center">
                <div className="bg-emerald-500 text-white text-xs px-2 py-1 rounded-full shadow-lg mb-1 z-10 whitespace-nowrap">Dad (42%)</div>
                <div className="w-4 h-4 bg-emerald-500 rounded-full border-2 border-white shadow-lg z-10"></div>
              </div>
            </div>
          </motion.div>
        )}

        {showReportForm && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <button onClick={() => setShowReportForm(false)} className="text-gray-500 hover:text-gray-900 dark:hover:text-white mb-6 flex items-center gap-2">
              ← Back to list
            </button>
            
            {reportSuccess ? (
              <div className="glass-card p-12 flex flex-col items-center text-center max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Report Submitted Successfully</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Case ID: <strong className="text-gray-900 dark:text-white">LF-105</strong></p>
                <p className="text-gray-500">Control room has been notified. We will contact you immediately if there are any updates.</p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="glass-card p-6 md:p-8 max-w-3xl mx-auto space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Report Missing Person</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name *</label>
                    <input type="text" required className="input-field" placeholder="Name of missing person" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Age *</label>
                      <input type="number" required className="input-field" placeholder="Years" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Gender *</label>
                      <select required className="input-field">
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Seen Location *</label>
                  <select required className="input-field">
                    <option value="">Select sector or area...</option>
                    <option value="A1">Sector A1 - Sangam Zone</option>
                    <option value="A2">Sector A2 - Dashashwamedh Area</option>
                    <option value="B1">Sector B1 - Arail</option>
                    <option value="C1">Sector C1 - Parking & Gates</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Clothing Description & Identifying Marks *</label>
                  <textarea required rows={3} className="input-field resize-none" placeholder="E.g., Wearing red saree, has a scar on left cheek..."></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Recent Photo (Optional)</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer">
                    <Upload size={32} className="mb-2 text-gray-400" />
                    <span className="font-medium">Click to upload photo</span>
                    <span className="text-xs mt-1">JPG, PNG (Max 5MB)</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-end gap-3">
                  <button type="button" onClick={() => setShowReportForm(false)} className="btn-secondary">Cancel</button>
                  <button type="submit" className="btn-primary">Submit Report</button>
                </div>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
