"use client";

import React, { useState } from "react";
import { 
  Settings, 
  Globe, 
  Shield, 
  Bell, 
  Lock, 
  Save,
  Mail,
  Smartphone,
  Eye,
  CreditCard,
  Zap
} from "lucide-react";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("general");

  const tabs = [
    { id: "general", label: "General", icon: Globe },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "integrations", label: "Integrations", icon: Zap },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600">
            Platform Settings
          </h1>
          <p className="text-white/50">Configure global site preferences, security, and API integrations.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-400 text-black font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          <Save size={20} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <div className="space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all ${
                activeTab === tab.id 
                  ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                  : "text-white/40 hover:bg-white/5 hover:text-white"
              }`}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Settings Form */}
        <div className="lg:col-span-3 space-y-6">
          {activeTab === "general" && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-8 backdrop-blur-xl">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Globe size={20} className="text-green-500" /> General Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-white/60 font-medium">Site Name</label>
                    <input type="text" defaultValue="Tradey Markets" className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-green-500 transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/60 font-medium">Admin Contact Email</label>
                    <input type="email" defaultValue="admin@Tradey Markets.com" className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-green-500 transition-all" />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Eye size={20} className="text-blue-500" /> Platform Visibility
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Maintenance Mode", desc: "Only admins can access the site when active.", default: false },
                    { label: "Public Registration", desc: "Allow new students to sign up without an invite.", default: true },
                    { label: "Beta Features", desc: "Enable experimental features for all users.", default: false },
                  ].map((toggle) => (
                    <div key={toggle.label} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                      <div>
                        <p className="font-medium">{toggle.label}</p>
                        <p className="text-xs text-white/30">{toggle.desc}</p>
                      </div>
                      <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${toggle.default ? "bg-green-500" : "bg-white/10"}`}>
                        <div className={`w-4 h-4 bg-white rounded-full transition-transform ${toggle.default ? "translate-x-6" : "translate-x-0"}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-8 backdrop-blur-xl">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Lock size={20} className="text-red-500" /> Password Requirements
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <div>
                      <p className="font-medium">Enforce Strong Passwords</p>
                      <p className="text-xs text-white/30">Require uppercase, numbers, and special characters.</p>
                    </div>
                    <div className="w-12 h-6 bg-green-500 rounded-full p-1 cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full translate-x-6" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-xs text-white/30">Strongly recommend 2FA for all users.</p>
                    </div>
                    <div className="w-12 h-6 bg-white/10 rounded-full p-1 cursor-pointer">
                      <div className="w-4 h-4 bg-white rounded-full translate-x-0" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6 border-t border-white/5">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Shield size={20} className="text-orange-500" /> API Access
                </h3>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-white/60">Main API Key</span>
                    <button className="text-xs text-green-400 hover:text-green-300">Regenerate</button>
                  </div>
                  <div className="bg-black/60 p-3 rounded-lg font-mono text-sm text-white/40 overflow-hidden text-ellipsis">
                    pk_live_51Msz34Lkjf98Hjksd9823Hkjfd8...
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
                <Bell size={48} className="text-white/10 mb-4" />
                <h3 className="text-xl font-bold">Notification Settings</h3>
                <p className="text-white/30 max-w-sm mt-2">Configure how you receive system alerts, user messages, and platform updates.</p>
             </div>
          )}

          {activeTab === "integrations" && (
             <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
                <Zap size={48} className="text-white/10 mb-4" />
                <h3 className="text-xl font-bold">App Integrations</h3>
                <p className="text-white/30 max-w-sm mt-2">Connect Tradey Markets with 3rd-party services like Stripe, Slack, or Mailchimp.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
}


