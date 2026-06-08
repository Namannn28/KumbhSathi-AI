"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Newspaper, ExternalLink, Clock, RefreshCw } from "lucide-react";
import Tilt from "react-parallax-tilt";

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/news");
      const data = await res.json();
      if (data.articles) {
        setNews(data.articles);
      }
    } catch (error) {
      console.error("Failed to fetch news:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-8 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Newspaper className="text-sacred-500" />
            Live Updates
          </h1>
          <p className="text-gray-500 mt-1">Real-time news and announcements for Mahakumbh 2028</p>
        </div>
        <button 
          onClick={fetchNews}
          className="btn-secondary flex items-center gap-2"
        >
          <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
          Refresh Feed
        </button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white dark:bg-gray-900 p-6 rounded-2xl animate-pulse shadow-sm">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6 mb-6"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      ) : news.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article, idx) => (
            <Tilt 
              key={article.id} 
              tiltMaxAngleX={5} 
              tiltMaxAngleY={5} 
              scale={1.02} 
              transitionSpeed={2500}
              className="h-full"
            >
              <motion.a 
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="block h-full bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-6 rounded-2xl shadow-sm hover:shadow-xl hover:border-sacred-400/50 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={20} className="text-sacred-500" />
                </div>
                
                <span className="text-xs font-bold uppercase tracking-wider text-sacred-600 dark:text-sacred-400 mb-2 block">
                  {article.source}
                </span>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-3 group-hover:text-sacred-500 transition-colors">
                  {article.title}
                </h3>
                
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                  <Clock size={14} />
                  <span>{new Date(article.pubDate).toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </motion.a>
            </Tilt>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
          <Newspaper className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No updates found</h3>
          <p className="text-gray-500">Please try refreshing the feed.</p>
        </div>
      )}
    </div>
  );
}
