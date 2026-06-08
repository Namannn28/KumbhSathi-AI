"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Phone, Globe, BookHeart, Loader2 } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    language: "hi",
    purpose: "spiritual"
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const languages = [
    { code: "hi", name: "हिन्दी (Hindi)" },
    { code: "en", name: "English" },
    { code: "bn", name: "বাংলা (Bengali)" },
    { code: "te", name: "తెలుగు (Telugu)" },
    { code: "mr", name: "मराठी (Marathi)" },
    { code: "ta", name: "தமிழ் (Tamil)" },
  ];

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Auto-login with mock OTP 123456
      const res = await signIn("credentials", {
        phone: formData.phone,
        otp: "123456",
        name: formData.name,
        redirect: false,
      });

      if (res?.error) {
        setError("Registration failed. Please try again.");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50 dark:bg-gray-950">
      {/* Left side - Branding (hidden on mobile) */}
      <div className="hidden md:flex md:w-1/2 sacred-gradient text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <img 
            src="/simhastha-kumbh.jpg" 
            alt="Kumbh Mela" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
          />
        <div className="relative z-10">
          <Link href="/" className="text-4xl font-bold tracking-tight inline-block hover:scale-105 transition-transform">
            🙏 KumbhSaarthi
          </Link>
          <p className="mt-4 text-xl text-white/90 font-light">Join the Mahakumbh 2028 Community</p>
        </div>
        
        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-bold mb-4 font-hindi leading-tight">आपका स्वागत है</h2>
          <p className="text-white/80">Register now to plan your trip, receive crowd alerts, and access our AI assistant in 100+ languages.</p>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-y-auto">
        {/* Mobile background image overlay */}
        <div className="absolute inset-0 md:hidden bg-black/60 z-0"></div>
        <img 
          src="/simhastha-kumbh.jpg" 
          alt="Kumbh Background" 
          className="absolute inset-0 w-full h-full object-cover md:hidden opacity-30 z-0"
        />
        
        <div 
          className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 relative z-10 my-8"
        >
          {/* Auth Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-8">
            <Link href="/auth/login" className="flex-1 text-center py-2 rounded-md text-gray-500 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">Login</Link>
            <Link href="/auth/signup" className="flex-1 text-center py-2 rounded-md bg-white dark:bg-gray-900 shadow-sm font-semibold text-sacred-600 dark:text-sacred-400">Sign Up</Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Create Account</h1>
            <p className="text-gray-500 dark:text-gray-400">Join thousands of pilgrims using KumbhSaarthi</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="input-field pl-12"
                  placeholder="Your name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                  <Phone size={20} />
                </div>
                <div className="absolute inset-y-0 left-10 flex items-center text-gray-500 font-medium">
                  +91
                </div>
                <input
                  type="tel"
                  required
                  pattern="[0-9]{10}"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10)})}
                  className="input-field pl-20"
                  placeholder="Enter 10 digit number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preferred Language</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                  <Globe size={20} />
                </div>
                <select
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                  className="input-field pl-12 appearance-none"
                >
                  {languages.map(lang => (
                    <option key={lang.code} value={lang.code}>{lang.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Primary Purpose of Visit</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                  <BookHeart size={20} />
                </div>
                <select
                  value={formData.purpose}
                  onChange={(e) => setFormData({...formData, purpose: e.target.value})}
                  className="input-field pl-12 appearance-none"
                >
                  <option value="spiritual">Spiritual / Snan</option>
                  <option value="tourism">Tourism / Photography</option>
                  <option value="volunteer">Volunteering</option>
                  <option value="business">Business / Vendor</option>
                </select>
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-sm text-center font-medium animate-pulse">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-4"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Register & Auto-Login"}
            </button>
            <p className="text-xs text-center text-gray-500 mt-2">
              For demo, this will automatically log you in without requiring real OTP verification.
            </p>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-sacred-600 dark:text-sacred-400 font-semibold hover:underline">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
