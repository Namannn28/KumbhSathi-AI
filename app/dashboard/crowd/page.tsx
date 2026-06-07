"use client";

import { motion } from "framer-motion";
import { Users, AlertTriangle, Info, CheckCircle2, TrendingUp, TrendingDown, Minus, Clock } from "lucide-react";
import { crowdData, crowdAlerts, crowdLevelColors } from "@/lib/data/crowd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export default function CrowdPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="text-orange-500" />;
      case 'info': return <Info className="text-blue-500" />;
      case 'success': return <CheckCircle2 className="text-emerald-500" />;
      default: return <Info />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'rising': return <TrendingUp size={16} className="text-red-500" />;
      case 'falling': return <TrendingDown size={16} className="text-emerald-500" />;
      case 'stable': return <Minus size={16} className="text-blue-500" />;
      default: return null;
    }
  };

  const chartData = crowdData.map(d => ({
    name: d.sector,
    density: d.density,
    fill: d.density >= 80 ? '#ef4444' : d.density >= 60 ? '#f97316' : d.density >= 40 ? '#f59e0b' : '#10b981'
  }));

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-24 md:pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Users className="text-sacred-500" size={32} />
            Live Crowd Monitor
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Real-time density across Kumbh Mela sectors</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-full text-sm font-medium border border-emerald-200 dark:border-emerald-800/50">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          Last updated: Just now
        </div>
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
        
        {/* Alerts Section */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Live Alerts</h2>
          {crowdAlerts.map(alert => (
            <div key={alert.id} className="glass-card p-4 flex items-start gap-4">
              <div className="mt-0.5">{getAlertIcon(alert.type)}</div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white font-medium">{alert.message}</p>
                <p className="text-gray-500 text-sm mt-1">{alert.messageHi}</p>
              </div>
              <div className="text-xs text-gray-400 flex items-center gap-1 whitespace-nowrap">
                <Clock size={12} /> {alert.time}
              </div>
            </div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sector Cards */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-4">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Sector Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {crowdData.map(sector => {
                const colors = crowdLevelColors[sector.level];
                return (
                  <div key={sector.id} className="glass-card p-5 hover:border-sacred-400/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded text-xs font-bold font-mono">
                            {sector.sector}
                          </span>
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{sector.name}</h3>
                        </div>
                        <p className="text-sm text-gray-500 font-hindi mt-0.5">{sector.nameHi}</p>
                      </div>
                      <span className={colors.badge}>{sector.level.toUpperCase()}</span>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 dark:text-gray-400">Density</span>
                        <span className="font-bold text-gray-900 dark:text-white">{sector.density}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div className={`h-2.5 rounded-full ${colors.bg}`} style={{ width: `${sector.density}%` }}></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Estimated Count</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{sector.personCount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Current Trend</p>
                        <p className="font-medium flex items-center gap-1 capitalize text-gray-900 dark:text-white">
                          {getTrendIcon(sector.trend)} {sector.trend}
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg flex gap-2 items-start">
                      <Info size={16} className="text-gray-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{sector.prediction}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Chart & Recommendations */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div className="glass-card p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">Density Overview</h2>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                    <Bar dataKey="density" radius={[4, 4, 0, 0]}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="glass-card p-6 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-emerald-100 dark:border-emerald-800/50">
              <h2 className="text-emerald-800 dark:text-emerald-400 font-bold mb-4 flex items-center gap-2">
                <CheckCircle2 /> Safe Zone Recommendations
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-200 dark:bg-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-xs shrink-0 mt-0.5">1</div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">Ram Ghat (A3) is optimal</p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300/80 mt-1">Currently operating at 40% capacity. Best for families and elderly.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-200 dark:bg-emerald-800 flex items-center justify-center text-emerald-700 dark:text-emerald-300 font-bold text-xs shrink-0 mt-0.5">2</div>
                  <div>
                    <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-100">Use Gate 3 for Entry</p>
                    <p className="text-xs text-emerald-700 dark:text-emerald-300/80 mt-1">Main gates are congested. Gate 3 (Jhunsi side) has 15 min waiting time.</p>
                  </div>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
