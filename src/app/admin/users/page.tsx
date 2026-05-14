"use client";

import React, { useState } from "react";
import { 
  Users, 
  Search, 
  UserPlus, 
  MoreVertical, 
  Mail, 
  Shield, 
  Calendar,
  CheckCircle2,
  Clock,
  Filter
} from "lucide-react";

const mockUsers = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Student", joined: "May 10, 2026", progress: "65%", status: "Active" },
  { id: 2, name: "Sarah Smith", email: "sarah.s@forex.com", role: "Student", joined: "May 08, 2026", progress: "82%", status: "Active" },
  { id: 3, name: "Admin User", email: "admin@Tradey Markets.com", role: "Admin", joined: "Jan 12, 2026", progress: "N/A", status: "Active" },
  { id: 4, name: "Mike Johnson", email: "mike.j@gmail.com", role: "Student", joined: "May 05, 2026", progress: "12%", status: "Inactive" },
  { id: 5, name: "Emily Brown", email: "emily@trade.io", role: "Student", joined: "May 01, 2026", progress: "100%", status: "Active" },
  { id: 6, name: "Alex Rivera", email: "alex@rivera.com", role: "Student", joined: "Apr 28, 2026", progress: "45%", status: "Active" },
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
            User Management
          </h1>
          <p className="text-white/50">Manage student accounts, permissions, and learning progress.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          <UserPlus size={20} />
          Add New User
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: "12,240", icon: Users, color: "text-blue-400" },
          { label: "Active Today", value: "1,842", icon: CheckCircle2, color: "text-green-400" },
          { label: "New This Week", value: "+156", icon: Clock, color: "text-purple-400" },
          { label: "Pending Verification", value: "24", icon: Mail, color: "text-orange-400" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl bg-white/5 ${stat.color} flex items-center justify-center`}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">{stat.label}</p>
              <p className="text-xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-white/70">
          <Filter size={18} />
          Advanced Filters
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-[10px] text-white/40 uppercase tracking-widest font-bold">
                <th className="p-4 font-bold">User</th>
                <th className="p-4 font-bold">Role</th>
                <th className="p-4 font-bold">Joined</th>
                <th className="p-4 font-bold">Progress</th>
                <th className="p-4 font-bold">Status</th>
                <th className="p-4 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockUsers.map((user) => (
                <tr key={user.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-white/10 flex items-center justify-center font-bold text-green-400">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white group-hover:text-green-400 transition-colors">{user.name}</p>
                        <p className="text-xs text-white/30">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2 text-sm text-white/60">
                      {user.role === "Admin" ? <Shield size={14} className="text-purple-400" /> : <Users size={14} className="text-blue-400" />}
                      {user.role}
                    </div>
                  </td>
                  <td className="p-4 text-sm text-white/50">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      {user.joined}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="w-full max-w-[100px]">
                      <div className="flex justify-between text-[10px] text-white/40 mb-1">
                        <span>{user.progress}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-1000 ${user.progress === "100%" ? "bg-green-500" : "bg-green-500/50"}`}
                          style={{ width: user.progress === "N/A" ? "0%" : user.progress }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                      user.status === "Active" ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-white/5 text-white/30 border border-white/10"
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="p-2 hover:bg-white/10 rounded-lg text-white/30 hover:text-white transition-all">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


