"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Info, Phone, KeyRound, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        phone,
        otp,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid phone number or OTP");
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
          <p className="mt-4 text-xl text-white/90 font-light">Your Digital Companion for Mahakumbh 2028</p>
        </div>
        
        <div className="relative z-10 max-w-md">
          <h2 className="text-3xl font-bold mb-4 font-hindi leading-tight">हर कदम में साथ</h2>
          <p className="text-white/80">Access maps, find your family, book accommodation, and stay safe with our AI-powered features.</p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Mobile background image overlay */}
        <div className="absolute inset-0 md:hidden bg-black/60 z-0"></div>
        <img 
          src="/simhastha-kumbh.jpg" 
          alt="Kumbh Background" 
          className="absolute inset-0 w-full h-full object-cover md:hidden opacity-30 z-[-1]"
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 relative z-10"
        >
          {/* Auth Toggle */}
          <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 mb-8">
            <Link href="/auth/login" className="flex-1 text-center py-2 rounded-md bg-white dark:bg-gray-900 shadow-sm font-semibold text-sacred-600 dark:text-sacred-400">Login</Link>
            <Link href="/auth/signup" className="flex-1 text-center py-2 rounded-md text-gray-500 hover:text-gray-900 dark:hover:text-white font-medium transition-colors">Sign Up</Link>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400">Login to access your Kumbh itinerary</p>
          </div>

          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-xl flex gap-3 text-blue-700 dark:text-blue-400">
            <Info className="shrink-0 mt-0.5" size={20} />
            <div className="text-sm">
              <strong>Demo Login:</strong><br />
              Any 10-digit phone number<br />
              OTP: <strong>123456</strong>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="input-field pl-20"
                  placeholder="Enter 10 digit number"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">OTP Verification</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-gray-400">
                  <KeyRound size={20} />
                </div>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="input-field pl-12"
                  placeholder="Enter 6 digit OTP"
                />
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
              {loading ? <Loader2 className="animate-spin" size={20} /> : "Login via OTP"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-sacred-600 dark:text-sacred-400 font-semibold hover:underline">
              Register here
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
