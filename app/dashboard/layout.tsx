"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Home, MessageSquare, Map as MapIcon, Users, 
  AlertTriangle, Search, Bed, Calendar, Plane, 
  Info, LogOut, Menu, X, Bell, Moon, Sun, Newspaper 
} from "lucide-react";

const sidebarLinks = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Live News", href: "/dashboard/news", icon: Newspaper },
  { name: "AI Assistant", href: "/dashboard/chat", icon: MessageSquare },
  { name: "Navigation", href: "/dashboard/navigation", icon: MapIcon },
  { name: "Crowd Monitor", href: "/dashboard/crowd", icon: Users },
  { name: "Emergency", href: "/dashboard/emergency", icon: AlertTriangle },
  { name: "Accommodation", href: "/dashboard/accommodation", icon: Bed },
  { name: "Travel", href: "/dashboard/travel", icon: Plane },
  { name: "Events", href: "/dashboard/events", icon: Calendar },
  { name: "Lost & Found", href: "/dashboard/lost-found", icon: Search },
  { name: "Services", href: "/dashboard/services", icon: Info },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDark = localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
      setDarkMode(isDark);
      if (isDark) document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setDarkMode(true);
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

  const [globalSearch, setGlobalSearch] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const filteredLinks = sidebarLinks.filter(link => 
    link.name.toLowerCase().includes(globalSearch.toLowerCase()) || 
    link.href.toLowerCase().includes(globalSearch.toLowerCase())
  );

  return (
    <div className="h-screen overflow-hidden w-full bg-gray-50 dark:bg-gray-950 flex flex-col md:flex-row">
      
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <span className="text-xl">🙏</span>
          <span className="font-bold text-gray-900 dark:text-white">KumbhSaarthi</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={toggleDarkMode} className="text-gray-500 dark:text-gray-400">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-gray-500 dark:text-gray-400">
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Sidebar Desktop / Mobile Overlay */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
        transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="h-full flex flex-col">
          <div className="p-6 hidden md:flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🙏</span>
              <span className="font-bold text-xl text-gray-900 dark:text-white">KumbhSaarthi</span>
            </Link>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors
                    ${isActive 
                      ? "bg-sacred-50 dark:bg-sacred-900/20 text-sacred-600 dark:text-sacred-400" 
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"}
                  `}
                >
                  <link.icon size={20} className={isActive ? "text-sacred-600 dark:text-sacred-400" : "text-gray-400"} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3 mb-4 px-3">
              <div className="w-10 h-10 rounded-full bg-sacred-100 dark:bg-sacred-900/30 flex items-center justify-center text-sacred-600 dark:text-sacred-400 font-bold">
                {session?.user?.name?.charAt(0) || "U"}
              </div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-gray-900 dark:text-white truncate">{session?.user?.name}</p>
                <p className="text-xs text-gray-500 truncate">Pilgrim Profile</p>
              </div>
            </div>
            <button 
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
              className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium transition-colors"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Desktop Header */}
        <header className="hidden md:flex items-center justify-between p-4 lg:px-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              value={globalSearch}
              onChange={(e) => {
                setGlobalSearch(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              onBlur={() => setTimeout(() => setShowSearchDropdown(false), 200)}
              placeholder="Search features..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-800 border-none rounded-full text-sm focus:ring-2 focus:ring-sacred-500 outline-none dark:text-white"
            />
            {showSearchDropdown && globalSearch && (
              <div className="absolute top-full mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl overflow-hidden z-50">
                {filteredLinks.length > 0 ? filteredLinks.map(link => (
                  <button
                    key={link.name}
                    onClick={() => {
                      router.push(link.href);
                      setGlobalSearch("");
                      setShowSearchDropdown(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800 text-sm text-left transition-colors"
                  >
                    <link.icon size={16} className="text-sacred-500" />
                    <span className="text-gray-900 dark:text-white">{link.name}</span>
                  </button>
                )) : (
                  <div className="px-4 py-3 text-sm text-gray-500">No features found.</div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleDarkMode} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>

        {/* Mobile Bottom Nav */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 z-40 pb-safe">
          <div className="flex justify-around p-2">
            {[
              { name: "Home", href: "/dashboard", icon: Home },
              { name: "News", href: "/dashboard/news", icon: Newspaper },
              { name: "Chat", href: "/dashboard/chat", icon: MessageSquare },
              { name: "Map", href: "/dashboard/navigation", icon: MapIcon },
              { name: "SOS", href: "/dashboard/emergency", icon: AlertTriangle },
            ].map((item) => (
              <Link 
                key={item.name} 
                href={item.href}
                className={`flex flex-col items-center p-2 rounded-lg min-w-[64px] ${
                  pathname === item.href 
                    ? "text-sacred-600 dark:text-sacred-400" 
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                <item.icon size={20} className="mb-1" />
                <span className="text-[10px] font-medium">{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
