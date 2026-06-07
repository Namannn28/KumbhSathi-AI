"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Phone, Lock } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLoginSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!/^\d{10}$/.test(phone)) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      setError("Please enter a 6-digit OTP code");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        phone,
        otp,
        redirect: false,
      });

      if (result?.ok) {
        router.push("/dashboard");
      } else {
        setError(result?.error || "Login failed. Please verify credentials.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sacred-600 to-sacred-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-sacred-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              🙏
            </div>
            <h1 className="text-3xl font-bold text-sacred-600">KumbhSaarthi</h1>
            <p className="text-gray-600 mt-2">Har Kadam Mein Saath</p>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Enter 10-digit phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sacred-600 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">
                  Enter OTP
                </label>
                <span className="text-xs text-sacred-600 font-semibold bg-sacred-50 px-2 py-0.5 rounded">
                  Demo Code: 123456
                </span>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sacred-600 focus:border-transparent"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-sacred-600 text-white py-2 rounded-lg font-semibold hover:bg-sacred-700 disabled:bg-gray-400 transition shadow-md"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="text-center text-sm">
              <p className="text-gray-600">
                New pilgrim?{" "}
                <Link href="/auth/signup" className="text-sacred-600 font-semibold hover:underline">
                  Sign Up / Register
                </Link>
              </p>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              Emergency? Call 112 or use our SOS feature
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
