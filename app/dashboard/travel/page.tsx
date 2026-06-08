"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Train, ArrowRight, ArrowRightLeft, CalendarDays, ExternalLink, MapPin } from "lucide-react";
import { majorCities, popularFlights, popularTrains } from "@/lib/data/travel";

export default function TravelPage() {
  const [activeTab, setActiveTab] = useState("flights");
  const [fromCity, setFromCity] = useState("DEL");
  const [liveTrains, setLiveTrains] = useState<any>(null);
  const [loadingTrain, setLoadingTrain] = useState(false);
  
  const flights = popularFlights.filter(f => f.fromCode === fromCity);
  const trains = popularTrains.filter(t => t.fromCode === fromCity);

  const checkLiveIRCTC = async () => {
    setLoadingTrain(true);
    try {
      const res = await fetch('/api/trains', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: fromCity, to: 'UJN', date: '2028-04-14' })
      });
      const data = await res.json();
      setLiveTrains(data);
      alert(`Live IRCTC Status: ${data.status}\nMessage: ${data.message}`);
    } catch (error) {
      console.error(error);
      alert("Failed to connect to IRCTC proxy API");
    } finally {
      setLoadingTrain(false);
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-24 md:pb-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
          <Plane className="text-sacred-500" size={32} />
          Travel Booking
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">Plan your journey to Ujjain (IDR/UJN)</p>
      </div>

      {/* Search Box */}
      <div className="glass-card p-6">
        <div className="flex border-b border-gray-200 dark:border-gray-800 mb-6">
          <button
            onClick={() => setActiveTab("flights")}
            className={`pb-4 px-6 font-medium transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "flights" ? "border-sacred-500 text-sacred-600 dark:text-sacred-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <Plane size={20} /> Flights
          </button>
          <button
            onClick={() => setActiveTab("trains")}
            className={`pb-4 px-6 font-medium transition-colors border-b-2 flex items-center gap-2 ${
              activeTab === "trains" ? "border-sacred-500 text-sacred-600 dark:text-sacred-400" : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            }`}
          >
            <Train size={20} /> Trains
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="relative">
            <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select 
                value={fromCity}
                onChange={(e) => setFromCity(e.target.value)}
                className="input-field pl-10"
              >
                {majorCities.map(city => (
                  <option key={city.code} value={city.code}>{city.name} ({city.code})</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="hidden md:flex items-center justify-center pb-2">
            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 border border-gray-200 dark:border-gray-700 shadow-sm">
              <ArrowRightLeft size={18} />
            </div>
          </div>

          <div className="relative">
            <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-sacred-500" size={18} />
              <input type="text" disabled value="Ujjain (UJN/IDR)" className="input-field pl-10 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white border-transparent" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-xs font-medium text-gray-500 mb-1">Departure Date</label>
            <div className="relative">
              <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="date" defaultValue="2028-01-12" className="input-field pl-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <h2 className="font-semibold text-gray-900 dark:text-white flex items-center justify-between">
          <span>Popular Routes from {majorCities.find(c => c.code === fromCity)?.name}</span>
          <span className="text-xs text-gray-500 font-normal">Showing recommendations based on typical Kumbh schedules</span>
        </h2>

        <AnimatePresence mode="wait">
          {activeTab === "flights" && (
            <motion.div key="flights" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              {flights.length > 0 ? flights.map((flight, idx) => (
                <div key={idx} className="glass-card p-5 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-blue-500/30 transition-colors">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center border border-blue-100 dark:border-blue-800/50">
                      <Plane size={24} className="transform rotate-45" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white">{flight.airline}</h3>
                      <p className="text-sm text-gray-500">Flight {flight.id}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full md:flex-1 md:px-8">
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{flight.departure}</p>
                      <p className="text-sm text-gray-500">{flight.fromCode}</p>
                    </div>
                    <div className="flex-1 px-4 flex flex-col items-center">
                      <p className="text-xs text-gray-400 mb-1">{flight.duration}</p>
                      <div className="w-full flex items-center">
                        <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-700"></div>
                        <div className="flex-1 h-[2px] bg-gray-300 dark:bg-gray-700 relative">
                          {flight.stops > 0 && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></div>}
                        </div>
                        <div className="w-2 h-2 rounded-full bg-sacred-500"></div>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">{flight.stops === 0 ? "Non-stop" : `${flight.stops} Stop`}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{flight.arrival}</p>
                      <p className="text-sm text-gray-500">{flight.toCode}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between w-full md:w-auto md:flex-col md:items-end gap-3 md:gap-2 border-t md:border-t-0 md:border-l border-gray-100 dark:border-gray-800 pt-4 md:pt-0 md:pl-6">
                    <div className="text-left md:text-right">
                      <p className="text-2xl font-bold text-sacred-600 dark:text-sacred-400">₹{flight.price.toLocaleString()}</p>
                      {flight.seatsLeft < 10 && <p className="text-xs text-red-500 font-medium">Only {flight.seatsLeft} seats left</p>}
                    </div>
                    <a 
                      href={`https://www.skyscanner.co.in/transport/flights/${flight.fromCode.toLowerCase()}/idr/280414`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary py-2 px-6 bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
                    >
                      Book on Skyscanner <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )) : (
                <div className="glass-card p-8 text-center text-gray-500">No flights found from this city. Try connecting flights via Delhi (DEL).</div>
              )}
            </motion.div>
          )}

          {activeTab === "trains" && (
            <motion.div key="trains" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
              <div className="flex justify-between items-center bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl border border-orange-200 dark:border-orange-800/50">
                <p className="text-sm text-orange-800 dark:text-orange-200">Want live availability from IRCTC CRIS API?</p>
                <button 
                  onClick={checkLiveIRCTC} 
                  disabled={loadingTrain}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-sm font-medium disabled:opacity-50"
                >
                  {loadingTrain ? "Checking..." : "Test Live IRCTC API"}
                </button>
              </div>

              {trains.length > 0 ? trains.map((train, idx) => (
                <div key={idx} className="glass-card overflow-hidden hover:border-orange-500/30 transition-colors">
                  <div className="p-5 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center border border-orange-100 dark:border-orange-800/50">
                        <Train size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          {train.trainName} <span className="text-xs font-mono bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-gray-500">{train.trainNo}</span>
                        </h3>
                        <div className="flex gap-1 mt-1">
                          {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].map((dayStr, dIdx) => (
                            <span key={dIdx} className={`text-[10px] w-4 h-4 flex items-center justify-center rounded-full ${train.days.includes(dayStr) ? "bg-orange-100 text-orange-700 font-bold" : "text-gray-300"}`}>
                              {dayStr[0]}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between w-full md:flex-1 md:px-8">
                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-900 dark:text-white">{train.departure}</p>
                        <p className="text-sm text-gray-500">{train.fromCode}</p>
                      </div>
                      <div className="flex-1 px-4 flex flex-col items-center">
                        <p className="text-xs text-gray-400 mb-1">{train.duration}</p>
                        <div className="w-full h-[2px] bg-gray-200 dark:bg-gray-700 relative flex items-center justify-center">
                          <ArrowRight size={14} className="text-gray-400 bg-white dark:bg-gray-900 px-1" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold text-gray-900 dark:text-white">{train.arrival}</p>
                        <p className="text-sm text-gray-500">{train.toCode}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/30 p-4 flex flex-wrap md:flex-nowrap items-center gap-4 justify-between">
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                      {train.classes.map((cls, cIdx) => (
                        <div key={cIdx} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-lg min-w-[100px]">
                          <div className="flex justify-between items-center mb-1">
                            <span className="font-bold text-gray-900 dark:text-white text-sm">{cls.name}</span>
                            <span className={`text-xs font-medium ${cls.available ? "text-emerald-500" : "text-orange-500"}`}>
                              {cls.available ? "AVL" : "WL"}
                            </span>
                          </div>
                          <p className="text-sacred-600 dark:text-sacred-400 font-semibold text-sm">₹{cls.price}</p>
                        </div>
                      ))}
                    </div>
                    <a 
                      href="https://www.irctc.co.in/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="btn-primary py-2 px-6 bg-orange-600 hover:bg-orange-700 flex items-center gap-2 whitespace-nowrap w-full md:w-auto justify-center"
                    >
                      Book on IRCTC <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              )) : (
                <div className="glass-card p-8 text-center text-gray-500">No direct trains found. Consider taking a flight or connecting train.</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
