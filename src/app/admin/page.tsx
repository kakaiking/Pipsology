"use client";

import React from "react";
import { 
  Video, 
  BookOpen, 
  HelpCircle, 
  Users, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  Eye,
  MessageSquare
} from "lucide-react";

const stats = [
  { name: "Total Videos", value: "48", change: "+12%", icon: Video, color: "text-blue-400", bg: "bg-blue-400/10" },
  { name: "Active Lessons", value: "124", change: "+5%", icon: BookOpen, color: "text-green-400", bg: "bg-green-400/10" },
  { name: "Total Students", value: "12.2k", change: "+24%", icon: Users, color: "text-orange-400", bg: "bg-orange-400/10" },
];

const recentActivity = [
  { id: 1, user: "John Doe", action: "Completed 'What is Forex?'", time: "2 mins ago", icon: Eye },
  { id: 2, user: "Admin", action: "Added new video: 'Price Action Masterclass'", time: "45 mins ago", icon: Video },
  { id: 4, user: "Mike Johnson", action: "New comment on 'EUR/USD' analysis", time: "3 hours ago", icon: MessageSquare },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-white/50">Welcome back, Admin. Here's what's happening with Tradey Markets today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon size={24} />
              </div>
              <div className="flex items-center gap-1 text-green-400 text-sm font-medium bg-green-400/10 px-2 py-1 rounded-lg">
                <TrendingUp size={14} />
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-white/50 text-sm mb-1">{stat.name}</p>
              <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock size={20} className="text-green-500" /> Recent Activity
            </h2>
            <button className="text-green-500 hover:text-green-400 text-sm font-medium transition-colors">View All</button>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl divide-y divide-white/5 overflow-hidden">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="p-4 hover:bg-white/[0.02] transition-colors flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40">
                    <activity.icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white group-hover:text-green-400 transition-colors">
                      <span className="text-white/60 font-normal">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-white/30">{activity.time}</p>
                  </div>
                </div>
                <ArrowUpRight size={18} className="text-white/20 group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white px-2">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-3">
            {[
              { label: "New Video", href: "/admin/videos", color: "bg-blue-500" },
              { label: "New Lesson", href: "/admin/lessons", color: "bg-green-500" },
            ].map((action) => (
              <a 
                key={action.label} 
                href={action.href}
                className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 hover:border-white/20 transition-all group"
              >
                <span className="font-medium">{action.label}</span>
                <div className={`${action.color} w-8 h-8 rounded-lg flex items-center justify-center text-black`}>
                  <ArrowUpRight size={18} />
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}


