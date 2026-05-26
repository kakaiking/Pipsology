"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Video, 
  BookOpen, 
  HelpCircle, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  Menu,
  X,
  FileText,
  Globe
} from "lucide-react";

const sidebarItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Videos", href: "/admin/videos", icon: Video },
  { name: "Lessons", href: "/admin/lessons", icon: BookOpen },
  { name: "Events", href: "/admin/events", icon: Globe },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

import { FeedbackProvider } from "@/components/admin/FeedbackProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <FeedbackProvider>
      <div className="flex min-h-screen bg-[#0a0f0d] text-white">
        {/* Mobile Sidebar Toggle */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="lg:hidden fixed top-4 right-4 z-50 p-2 bg-green-500 rounded-lg text-black"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0d1411] border-r border-white/5 transition-transform duration-300 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
          <div className="flex flex-col h-full p-6">
            <div className="flex items-center gap-3 mb-10 px-2">
              <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center font-bold text-black text-xl">
                P
              </div>
              <span className="text-xl font-bold tracking-tight">Admin Portal</span>
            </div>

            <nav className="flex-1 space-y-1">
              {sidebarItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center justify-between p-3 rounded-xl transition-all group ${
                      isActive 
                        ? "bg-green-500/10 text-green-400" 
                        : "text-white/50 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={20} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    {isActive && <div className="w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />}
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto pt-6 border-t border-white/5">
              <button className="flex items-center gap-3 p-3 w-full text-white/50 hover:text-red-400 transition-colors">
                <LogOut size={20} />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "lg:ml-64" : ""}`}>
          <div className="p-6 lg:p-10 max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </FeedbackProvider>
  );
}


