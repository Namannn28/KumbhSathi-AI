"use client";

import { motion } from "framer-motion";
import { CloudSun, Wind, Droplets, Sun as SunIcon, Sunrise, Sunset, ShieldCheck } from "lucide-react";
import { weatherData } from "@/lib/data/services";

export default function WeatherPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <CloudSun className="text-sacred-500" size={32} />
            Weather & Environment
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Live updates for Prayagraj (Sangam Area)</p>
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Weather Card */}
        <motion.div variants={itemVariants} className="md:col-span-2 relative overflow-hidden rounded-3xl p-8 text-white bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534088568595-a066f410cbda?w=800')] opacity-20 mix-blend-overlay object-cover"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100 font-medium mb-2">Current Weather</p>
                <div className="flex items-center gap-4">
                  <span className="text-7xl font-bold">{weatherData.temperature}°C</span>
                  <span className="text-6xl">{weatherData.icon}</span>
                </div>
                <p className="text-2xl mt-2 font-light">{weatherData.condition}</p>
                <p className="text-blue-200 mt-1 text-sm font-hindi">{weatherData.conditionHi}</p>
              </div>
              <div className="text-right">
                <p className="text-blue-100 mb-1">Feels Like</p>
                <p className="text-3xl font-semibold">{weatherData.feelsLike}°C</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12 pt-6 border-t border-white/20">
              <div className="flex items-center gap-3">
                <Wind className="text-blue-200" />
                <div>
                  <p className="text-blue-200 text-xs">Wind</p>
                  <p className="font-semibold">{weatherData.windSpeed} km/h</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Droplets className="text-blue-200" />
                <div>
                  <p className="text-blue-200 text-xs">Humidity</p>
                  <p className="font-semibold">{weatherData.humidity}%</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Sunrise className="text-blue-200" />
                <div>
                  <p className="text-blue-200 text-xs">Sunrise</p>
                  <p className="font-semibold">{weatherData.sunrise}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Sunset className="text-blue-200" />
                <div>
                  <p className="text-blue-200 text-xs">Sunset</p>
                  <p className="font-semibold">{weatherData.sunset}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* AQI & UV */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="glass-card p-6 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border-orange-100 dark:border-orange-800/50">
            <h3 className="text-gray-600 dark:text-gray-400 font-medium mb-4">Air Quality Index</h3>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-5xl font-bold text-orange-500">{weatherData.aqi}</span>
              <span className="text-xl text-orange-600 dark:text-orange-400 font-medium pb-1">{weatherData.aqiLevel}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
              <div className="bg-gradient-to-r from-green-400 via-yellow-400 to-orange-500 h-2 rounded-full" style={{ width: '45%' }}></div>
            </div>
            <p className="text-sm text-gray-500 mt-4">Acceptable for most people. Sensitive groups should wear masks.</p>
          </div>

          <div className="glass-card p-6 flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 dark:text-gray-400 font-medium mb-1">UV Index</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{weatherData.uvIndex} <span className="text-sm font-normal text-gray-500">Moderate</span></p>
            </div>
            <SunIcon size={32} className="text-yellow-500" />
          </div>
        </motion.div>

        {/* 5 Day Forecast */}
        <motion.div variants={itemVariants} className="md:col-span-2 glass-card p-6">
          <h3 className="font-bold text-gray-900 dark:text-white mb-6">5-Day Forecast</h3>
          <div className="flex justify-between items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {weatherData.forecast.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center min-w-[80px] p-4 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <span className="text-sm font-medium text-gray-500 mb-2">{day.day}</span>
                <span className="text-3xl mb-3">{day.icon}</span>
                <div className="flex gap-2 text-sm">
                  <span className="font-bold text-gray-900 dark:text-white">{day.high}°</span>
                  <span className="text-gray-400">{day.low}°</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Advisories */}
        <motion.div variants={itemVariants} className="glass-card p-6 border-l-4 border-emerald-500">
          <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <ShieldCheck className="text-emerald-500" /> Weather Advisories
          </h3>
          <ul className="space-y-4">
            <li className="flex gap-3 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0"></div>
              <p className="text-gray-600 dark:text-gray-300">Perfect weather for holy dip today. Water temperature is around 16°C.</p>
            </li>
            <li className="flex gap-3 text-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0"></div>
              <p className="text-gray-600 dark:text-gray-300">Carry light warm clothes for evening Ganga Aarti as temperatures drop.</p>
            </li>
          </ul>
        </motion.div>

      </motion.div>
    </div>
  );
}
