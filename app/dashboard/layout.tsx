"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Home, MessageSquare, Map, AlertTriangle, Search, 
  Bed, Calendar, Plane, Info, Bell, Moon, Sun, User
} from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  
  const [isDarkMode, setIsDarkMode] = useState(false);


  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    // Check local storage or system preference
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sacred-500"></div>
      </div>
    );
  }

  if (!session) return null;

  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: MessageSquare, label: "AI Chat", href: "/dashboard/chat" },
    { icon: Map, label: "Navigation", href: "/dashboard/navigation" },
    { icon: AlertTriangle, label: "Emergency", href: "/dashboard/emergency", color: "text-red-500" },
    { icon: Search, label: "Lost & Found", href: "/dashboard/lost-found" },
    { icon: Bed, label: "Accommodation", href: "/dashboard/accommodation" },
    { icon: Calendar, label: "Events", href: "/dashboard/events" },
    { icon: Plane, label: "Travel Booking", href: "/dashboard/travel" },
    { icon: Info, label: "Services", href: "/dashboard/services" },
    { icon: User, label: "Profile", href: "/dashboard/profile" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col md:flex-row">
      {/* Top Navbar (Mobile & Desktop) */}
      <header className="md:hidden fixed top-0 w-full z-50 glass-card rounded-none border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-bold flex items-center gap-2">
          <span className="text-sacred-500">🙏</span> KumbhSaarthi
        </Link>
        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
        </div>
      </header>

      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 fixed h-screen glass-card rounded-none border-r border-gray-200 dark:border-gray-800 z-40">
        <div className="p-6">
          <Link href="/dashboard" className="text-2xl font-bold flex items-center gap-2 mb-8">
            <span className="text-sacred-500">🙏</span> KumbhSaarthi
          </Link>

          <nav className="space-y-2 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  pathname === item.href 
                    ? "bg-sacred-100 dark:bg-sacred-900/30 text-sacred-600 dark:text-sacred-400 font-medium" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                <item.icon size={20} className={item.color || ""} />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sacred-500 text-white flex items-center justify-center font-bold">
                {session?.user?.name?.[0] || "U"}
              </div>
              <div className="overflow-hidden">
                <p className="font-medium truncate text-sm">{session?.user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{(session?.user as any)?.role?.toLowerCase()}</p>
              </div>
            </div>
            <button onClick={toggleDarkMode} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800">
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-64 pt-16 md:pt-0 pb-20 md:pb-0 min-h-screen relative">
        {children}
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 w-full glass-card rounded-none border-t border-gray-200 dark:border-gray-800 z-50 px-2 py-2 flex justify-around items-center safe-area-bottom">
        {[
          { icon: Home, label: "Home", href: "/dashboard" },
          { icon: MessageSquare, label: "Chat", href: "/dashboard/chat" },
          { icon: Map, label: "Map", href: "/dashboard/navigation" },
          { icon: AlertTriangle, label: "SOS", href: "/dashboard/emergency", color: "text-red-500" },
          { icon: User, label: "Profile", href: "/dashboard/profile" },
        ].map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex flex-col items-center p-2 rounded-xl min-w-[64px] ${
              pathname === item.href 
                ? "text-sacred-600 dark:text-sacred-400" 
                : item.color || "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            }`}
          >
            <item.icon size={24} className={pathname === item.href ? "mb-1" : "mb-1 opacity-80"} />
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
