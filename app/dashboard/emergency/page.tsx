"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Phone, MapPin, CheckCircle2, ShieldAlert } from "lucide-react";
import { emergencyContacts, emergencyTypes } from "@/lib/data/emergency";

export default function EmergencyPage() {
  const [showModal, setShowModal] = useState(false);
  const [reportedType, setReportedType] = useState<string | null>(null);
  const [trackingId, setTrackingId] = useState<string | null>(null);

  const handleSosClick = () => {
    setReportedType("General SOS");
    setShowModal(true);
  };

  const handleTypeClick = (typeName: string) => {
    setReportedType(typeName);
    setShowModal(true);
  };

  const confirmEmergency = () => {
    setTrackingId(`KMB-${Math.floor(100000 + Math.random() * 900000)}`);
    setShowModal(false);
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-24 md:pb-8">
      {/* Header & SOS Button */}
      <div className="flex flex-col items-center text-center space-y-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-red-600 dark:text-red-500 flex items-center justify-center gap-3">
            <AlertTriangle size={32} />
            Emergency SOS
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2 font-medium">Tap the button below for immediate assistance</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSosClick}
          className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-red-500 to-red-700 text-white flex flex-col items-center justify-center shadow-[0_0_50px_rgba(239,68,68,0.5)] border-8 border-red-400/30"
        >
          <AlertTriangle size={64} className="mb-2" />
          <span className="text-4xl font-bold tracking-widest">SOS</span>
          <span className="text-sm font-medium mt-2 text-red-100">Press for Help</span>
        </motion.button>

        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-full">
          <MapPin size={16} />
          Current Location: <strong className="text-gray-900 dark:text-white">Sector A1, Near Sangam Ghat</strong>
        </div>
      </div>

      {trackingId && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="bg-green-50 dark:bg-green-900/20 border-2 border-green-500 rounded-2xl p-6 text-center shadow-lg">
          <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">Emergency Reported!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">Help is on the way. Please stay at your current location.</p>
          <div className="bg-white dark:bg-gray-800 inline-block px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 mb-1">Tracking ID</p>
            <p className="text-2xl font-mono font-bold text-gray-900 dark:text-white">{trackingId}</p>
          </div>
        </motion.div>
      )}

      {/* Emergency Types Grid */}
      <div>
        <h2 className="section-title text-xl mb-4">Report Specific Emergency</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {emergencyTypes.map(type => (
            <button
              key={type.id}
              onClick={() => handleTypeClick(type.name)}
              className="glass-card p-4 flex flex-col items-center text-center hover:border-red-500/50 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors group"
            >
              <span className="text-4xl mb-3 group-hover:scale-110 transition-transform">{type.icon}</span>
              <span className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{type.name}</span>
              <span className="text-xs text-gray-500 font-hindi">{type.nameHi}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Direct Call Contacts */}
      <div>
        <h2 className="section-title text-xl mb-4">One-Tap Calling</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {emergencyContacts.map(contact => (
            <a
              key={contact.number}
              href={`tel:${contact.number}`}
              className="glass-card p-4 flex items-center justify-between hover:border-blue-500/50 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-xl bg-${contact.color}-100 dark:bg-${contact.color}-900/30`}>
                  {contact.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white leading-tight">{contact.name}</h3>
                  <p className="text-xs text-gray-500 font-hindi">{contact.nameHi}</p>
                </div>
              </div>
              <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full text-gray-600 dark:text-gray-300 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                <Phone size={20} />
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Recent Alerts Mock */}
      <div className="glass-card p-6 border-l-4 border-orange-500 bg-gradient-to-r from-orange-50 to-transparent dark:from-orange-900/10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <ShieldAlert className="text-orange-500" /> Recent Safety Alerts in Your Area
        </h2>
        <ul className="space-y-3">
          <li className="text-sm flex justify-between items-center border-b border-orange-200/50 dark:border-orange-800/30 pb-2">
            <span className="text-gray-700 dark:text-gray-300">Lost child reported near Gate 3. Male, 8 yrs, red shirt.</span>
            <span className="text-orange-600 dark:text-orange-400 font-medium text-xs whitespace-nowrap ml-4">5 mins ago</span>
          </li>
          <li className="text-sm flex justify-between items-center pb-1">
            <span className="text-gray-700 dark:text-gray-300">Medical emergency handled at Sector A1. Path cleared.</span>
            <span className="text-orange-600 dark:text-orange-400 font-medium text-xs whitespace-nowrap ml-4">12 mins ago</span>
          </li>
        </ul>
      </div>

      {/* Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-6 w-full max-w-md shadow-2xl"
            >
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-2">Confirm Emergency</h3>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                You are about to report: <strong className="text-gray-900 dark:text-white block mt-1 text-lg">{reportedType}</strong>
              </p>
              
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl mb-6 flex items-start gap-3">
                <MapPin className="text-sacred-500 shrink-0 mt-0.5" size={20} />
                <p className="text-sm text-gray-600 dark:text-gray-300">Your current location (Sector A1) will be sent to the control room automatically.</p>
              </div>

              <div className="flex gap-3">
                <button 
                  onClick={() => setShowModal(false)}
                  className="flex-1 btn-secondary"
                >
                  Cancel
                </button>
                <button 
                  onClick={confirmEmergency}
                  className="flex-1 btn-primary bg-gradient-to-r from-red-600 to-red-500 shadow-red-500/25"
                >
                  Send Alert
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
