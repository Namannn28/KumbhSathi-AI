"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, HeartPulse, UserCircle2, Baby, PersonStanding, ChevronDown, ChevronUp, FileText } from "lucide-react";
import { firstAidGuides, safetyTips } from "@/lib/data/emergency";

export default function SafetyHubPage() {
  const [activeTab, setActiveTab] = useState("first-aid");
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);

  const tabs = [
    { id: "first-aid", label: "First Aid", icon: HeartPulse },
    { id: "women", label: "Women Safety", icon: UserCircle2 },
    { id: "children", label: "Children", icon: Baby },
    { id: "elderly", label: "Elderly", icon: PersonStanding },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Shield className="text-sacred-500" size={32} />
            Safety Hub
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Guidelines and assistance for a safe pilgrimage</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-sacred-500 text-white shadow-lg shadow-sacred-500/25"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-6"
          >
            {activeTab === "first-aid" && (
              <div className="space-y-4">
                <h2 className="section-title text-xl mb-4">First Aid Guides</h2>
                {firstAidGuides.map((guide) => (
                  <div key={guide.id} className="glass-card overflow-hidden">
                    <button
                      onClick={() => setExpandedGuide(expandedGuide === guide.id ? null : guide.id)}
                      className="w-full flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{guide.icon}</span>
                        <div className="text-left">
                          <h3 className="font-semibold text-gray-900 dark:text-white">{guide.title}</h3>
                          <p className="text-sm text-gray-500 font-hindi">{guide.titleHi}</p>
                        </div>
                      </div>
                      {expandedGuide === guide.id ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                    </button>
                    
                    <AnimatePresence>
                      {expandedGuide === guide.id && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: "auto" }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900">
                            <ul className="space-y-3">
                              {guide.steps.map((step, idx) => (
                                <li key={idx} className="flex gap-3 text-sm">
                                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-sacred-100 dark:bg-sacred-900/30 text-sacred-600 flex items-center justify-center font-bold text-xs">
                                    {idx + 1}
                                  </span>
                                  <div>
                                    <p className="text-gray-800 dark:text-gray-200">{step}</p>
                                    <p className="text-gray-500 font-hindi mt-0.5">{guide.stepsHi[idx]}</p>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                <div className="mt-8">
                  <h2 className="section-title text-xl mb-4">General Safety Tips</h2>
                  <div className="glass-card p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {safetyTips.map((tip, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="w-2 h-2 rounded-full bg-sacred-500 mt-2 shrink-0"></div>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "women" && (
              <div className="space-y-6">
                <div className="glass-card p-8 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border-pink-100 dark:border-pink-800/50 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-600 flex items-center justify-center mb-4">
                    <UserCircle2 size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-pink-900 dark:text-pink-100 mb-2">Women's Safety Help Desk</h2>
                  <p className="text-pink-700 dark:text-pink-300 mb-6 max-w-md">Dedicated women police officers and volunteers are available 24/7 across the Mela area.</p>
                  <a href="tel:1091" className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 px-8 rounded-full shadow-lg shadow-pink-600/30 transition-all active:scale-95 text-xl flex items-center gap-3">
                    <Shield size={24} /> Call 1091
                  </a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="glass-card p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Changing Rooms</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Secure changing facilities are available at all major bathing ghats.</p>
                  </div>
                  <div className="glass-card p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Pink Toilets</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Dedicated clean and safe washrooms located in every sector.</p>
                  </div>
                  <div className="glass-card p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Women Patrols</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Female officers patrol the camping areas and ghats continuously.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Placeholder for other tabs to save space in demo */}
            {(activeTab === "children" || activeTab === "elderly") && (
              <div className="glass-card p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400 flex items-center justify-center mx-auto mb-4">
                  {activeTab === "children" ? <Baby size={32} /> : <PersonStanding size={32} />}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Dedicated Assistance</h3>
                <p className="text-gray-500 max-w-md mx-auto">Special facilities and tracking services are available at the Mela grounds. Visit any Information Center for details.</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Digital Emergency Card */}
      <div className="mt-12">
        <h2 className="section-title text-xl mb-4 flex items-center gap-2">
          <FileText className="text-sacred-500" /> My Digital Emergency Card
        </h2>
        <div className="glass-card p-6 bg-gradient-to-r from-gray-900 to-gray-800 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-white">
            <Shield size={120} />
          </div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Pilgrim ID</p>
                <p className="font-mono text-sacred-400">KMB-2028-14092</p>
              </div>
              <div className="bg-red-500 text-white px-3 py-1 rounded text-sm font-bold">
                O+
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Name</p>
                <p className="font-medium text-lg">Arjun Sharma</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Emergency Contact</p>
                <p className="font-medium text-lg">+91 98765 00000</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">Medical Conditions</p>
                <p className="font-medium">None / N/A</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
