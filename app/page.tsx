"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  MessageSquare, Navigation, Users, AlertTriangle, 
  Search, Bed, Calendar, Plane, Info, Phone 
} from "lucide-react";

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    { icon: MessageSquare, title: "AI Chat Assistant", desc: "Multilingual guidance in 100+ languages", link: "/dashboard/chat" },
    { icon: Navigation, title: "Smart Navigation", desc: "Interactive maps and POI finder", link: "/dashboard/navigation" },
    { icon: Users, title: "Crowd Monitor", desc: "Real-time density and alerts", link: "/dashboard/crowd" },
    { icon: AlertTriangle, title: "Emergency SOS", desc: "One-tap help and emergency routing", link: "/dashboard/emergency" },
    { icon: Search, title: "Lost & Found", desc: "Report and find missing persons", link: "/dashboard/lost-found" },
    { icon: Bed, title: "Accommodation", desc: "Find tents, hotels, and dharamshalas", link: "/dashboard/accommodation" },
    { icon: Calendar, title: "Events & Schedule", desc: "Snan dates and ceremony timings", link: "/dashboard/events" },
    { icon: Plane, title: "Travel Booking", desc: "Flight and train ticket reservations", link: "/dashboard/travel" },
    { icon: Info, title: "Services Directory", desc: "Locate essential facilities near you", link: "/dashboard/services" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-kumbh-deepBlue/80 via-kumbh-deepBlue/60 to-gray-950/90 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1609947017136-9dfe24ca77b0?w=1200" 
            alt="Mahakumbh Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="max-w-4xl mx-auto space-y-8"
          >
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              Kumbh<span className="text-sacred-400">Saarthi</span> AI
            </motion.h1>
            
            <motion.p variants={itemVariants} className="text-xl md:text-3xl text-gray-200 font-light">
              Your AI-Powered Companion for Mahakumbh 2028
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-2xl text-sacred-400 font-hindi">
              हर कदम में साथ | Har Kadam Mein Saath
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-6 py-8">
              <div className="glass-card-dark px-6 py-4 rounded-xl text-white">
                <div className="text-3xl font-bold text-sacred-400">40 Cr+</div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">Expected Pilgrims</div>
              </div>
              <div className="glass-card-dark px-6 py-4 rounded-xl text-white">
                <div className="text-3xl font-bold text-sacred-400">55</div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">Days of Festival</div>
              </div>
              <div className="glass-card-dark px-6 py-4 rounded-xl text-white">
                <div className="text-3xl font-bold text-sacred-400">25+</div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">Sacred Ghats</div>
              </div>
              <div className="glass-card-dark px-6 py-4 rounded-xl text-white">
                <div className="text-3xl font-bold text-sacred-400">100+</div>
                <div className="text-sm text-gray-300 uppercase tracking-wider">Languages Supported</div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/login" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto text-center">
                Start Your Journey
              </Link>
              <a href="#features" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto text-center bg-transparent text-white border-white/30 hover:bg-white/10 dark:bg-transparent dark:text-white dark:border-white/30 dark:hover:bg-white/10">
                Explore Features
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title mb-4">Complete Digital Companion</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience Mahakumbh safely and comfortably with our comprehensive suite of AI-powered tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <Link key={idx} href={feature.link}>
              <motion.div 
                whileHover={{ y: -5 }}
                className="glass-card p-6 h-full border border-gray-200 dark:border-gray-800 hover:border-sacred-500/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-sacred-100 dark:bg-sacred-900/30 flex items-center justify-center mb-4 text-sacred-600 dark:text-sacred-400 group-hover:scale-110 transition-transform">
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="section-title text-center mb-16">How It Works</h2>
          <div className="flex flex-col md:flex-row justify-center items-start gap-8 md:gap-4 relative">
            {[
              { step: 1, title: "Register", desc: "Sign up with your phone number" },
              { step: 2, title: "Personalize", desc: "Set language & preferences" },
              { step: 3, title: "Plan", desc: "Book travel and accommodation" },
              { step: 4, title: "Navigate", desc: "Use app offline at Prayagraj" }
            ].map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center text-center relative z-10">
                <div className="w-16 h-16 rounded-full sacred-gradient text-white flex items-center justify-center text-2xl font-bold shadow-lg mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2 dark:text-white">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold text-sacred-400 mb-4">KumbhSaarthi</h3>
              <p className="text-gray-400">Your trusted digital companion for Mahakumbh 2028, Prayagraj.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Emergency Contacts</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2"><Phone size={16} /> Police: 100</li>
                <li className="flex items-center gap-2"><Phone size={16} /> Ambulance: 108</li>
                <li className="flex items-center gap-2"><Phone size={16} /> Women Helpline: 1091</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/auth/login" className="hover:text-sacred-400 transition-colors">Login / Register</Link></li>
                <li><Link href="#features" className="hover:text-sacred-400 transition-colors">Features</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>&copy; 2028 KumbhSaarthi AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
