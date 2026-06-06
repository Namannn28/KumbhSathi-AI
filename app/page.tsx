"use client";

import { AlertCircle, MessageCircle, MapPin, Heart, Users, Trophy } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sacred-600 to-sacred-900">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-sacred-600 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
              🙏
            </div>
            <div>
              <h1 className="text-2xl font-bold text-sacred-600">KumbhSaarthi</h1>
              <p className="text-xs text-gray-600">हर कदम में साथ</p>
            </div>
          </div>
          <div className="flex gap-3">
            <a href="/auth/login" className="px-6 py-2 bg-sacred-600 text-white rounded-lg hover:bg-sacred-700 font-semibold transition">
              Login
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section with Image */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 max-w-4xl">
          <h2 className="text-6xl md:text-7xl font-bold mb-4 leading-tight">
            Your AI Guide Through Mahakumbh
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            हर कदम में साथ — With you at every step
          </p>
          <p className="text-lg md:text-xl mb-12 text-gray-200 leading-relaxed">
            Get real-time guidance, emergency support, and community connection in your language. Navigate safely among 50 million pilgrims.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href="/auth/login" className="px-8 py-4 bg-white text-sacred-600 font-bold rounded-lg hover:bg-gray-100 shadow-lg transition transform hover:scale-105">
              Get Started Now
            </a>
            <a href="#features" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-sacred-600 transition">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-gradient-to-r from-sacred-700 to-orange-600 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold">50M+</div>
            <div className="text-sm mt-1">Pilgrims Served</div>
          </div>
          <div>
            <div className="text-3xl font-bold">13</div>
            <div className="text-sm mt-1">Languages</div>
          </div>
          <div>
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-sm mt-1">Emergency Support</div>
          </div>
          <div>
            <div className="text-3xl font-bold">500K</div>
            <div className="text-sm mt-1">Concurrent Users</div>
          </div>
          <div>
            <div className="text-3xl font-bold">87%</div>
            <div className="text-sm mt-1">Crowd Accuracy</div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-4 text-sacred-600">
            Powerful Features
          </h3>
          <p className="text-center text-gray-600 mb-16 text-lg">
            Everything you need for a safe and meaningful Mahakumbh experience
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MessageCircle className="w-8 h-8" />,
                title: "🤖 AI Chat",
                desc: "Talk in any language. Instant answers in Hindi, English, Gujarati, Tamil, Telugu, Bengali, and more.",
                color: "blue",
              },
              {
                icon: <MapPin className="w-8 h-8" />,
                title: "🗺️ Smart Navigation",
                desc: "Real-time crowd-aware routes. Avoid stampedes. Works offline with pre-downloaded maps.",
                color: "green",
              },
              {
                icon: <AlertCircle className="w-8 h-8" />,
                title: "🆘 Emergency SOS",
                desc: "Medical help, child safety, women protection. Response time: <8 minutes.",
                color: "red",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "🔍 Lost & Found",
                desc: "AI face recognition. Find lost family members in <2 hours.",
                color: "purple",
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: "❤️ Health Guide",
                desc: "Symptom checking, nearest medical camp, health tips for pilgrims.",
                color: "pink",
              },
              {
                icon: <Trophy className="w-8 h-8" />,
                title: "📅 Event Calendar",
                desc: "Complete Snan schedule with crowd predictions and spiritual significance.",
                color: "yellow",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="p-8 border-2 border-gray-200 rounded-xl hover:border-sacred-600 hover:shadow-xl hover:scale-105 transition-all group cursor-pointer"
              >
                <div className={`text-5xl mb-4 group-hover:scale-125 transition-transform`}>
                  {feature.icon}
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-800">{feature.title}</h4>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kumbh Heritage Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl font-bold text-center mb-16">Why Mahakumbh?</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur p-8 rounded-lg border border-white/20 hover:border-white/50 transition">
              <div className="text-5xl mb-4">🙏</div>
              <h4 className="text-xl font-bold mb-3">Sacred Unity</h4>
              <p className="text-gray-200">
                The world's largest religious gathering. 50 million pilgrims from every corner of India coming together in faith and devotion.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur p-8 rounded-lg border border-white/20 hover:border-white/50 transition">
              <div className="text-5xl mb-4">⚡</div>
              <h4 className="text-xl font-bold mb-3">Challenges at Scale</h4>
              <p className="text-gray-200">
                Unprecedented crowd density. Limited digital infrastructure. Multiple languages. Safety concerns. Our AI handles it all.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur p-8 rounded-lg border border-white/20 hover:border-white/50 transition">
              <div className="text-5xl mb-4">🌟</div>
              <h4 className="text-xl font-bold mb-3">Digital Transformation</h4>
              <p className="text-gray-200">
                Making Mahakumbh 2025 the first AI-native mass pilgrimage. Zero stampede deaths. No lost pilgrims. Every person safe.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-sacred-600 to-orange-500 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-4xl font-bold mb-6">Ready for Your Journey?</h3>
          <p className="text-xl mb-8 text-gray-100">
            Join millions of pilgrims experiencing Mahakumbh safely with KumbhSaarthi AI
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/auth/login" className="px-8 py-4 bg-white text-sacred-600 font-bold rounded-lg hover:bg-gray-100 shadow-lg transition transform hover:scale-105">
              Start Now (Free)
            </a>
            <a href="#features" className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-sacred-600 transition">
              Learn More
            </a>
          </div>
          <p className="mt-6 text-gray-100 text-sm">
            Or call: 1800-200-0001 | WhatsApp: KumbhSaarthi Bot
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h5 className="font-bold mb-4">Product</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Features</a></li>
                <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition">Security</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Resources</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition">API Docs</a></li>
                <li><a href="#" className="hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Emergency</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="tel:112" className="hover:text-white transition">Police: 112</a></li>
                <li><a href="tel:100" className="hover:text-white transition">Ambulance: 100</a></li>
                <li><a href="tel:1800200001" className="hover:text-white transition">Helpline: 1800-200-0001</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-bold mb-4">Follow Us</h5>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                <li><a href="#" className="hover:text-white transition">Facebook</a></li>
                <li><a href="#" className="hover:text-white transition">WhatsApp</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-gray-400 text-sm mb-2">
              © 2025 KumbhSaarthi AI. All rights reserved. | Built for Mahakumbh 2025
            </p>
            <p className="text-center text-gray-500 text-xs">
              हर कदम में साथ — With you at every step | Har Kadam Mein Saath
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
