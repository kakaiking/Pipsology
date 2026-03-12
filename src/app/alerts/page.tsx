import Link from "next/link";
import { Bell, Plus, TrendingUp, Calendar, MessageSquare, Check, X } from "lucide-react";

const activeAlerts = [
    { id: 1, type: "price", pair: "EUR/USD", condition: "above", price: "1.0950", status: "active", created: "2h ago" },
    { id: 2, type: "price", pair: "BTC/USD", condition: "below", price: "80,000", status: "active", created: "6h ago" },
    { id: 3, type: "calendar", event: "NFP Release", time: "30 min before", status: "active", created: "1d ago" },
    { id: 4, type: "pattern", pair: "GBP/USD", signal: "Doji at H4 resistance", status: "triggered", triggered: "45 min ago", created: "2d ago" },
];

const notifHistory = [
    { id: 1, icon: "📈", title: "GBP/USD Doji Detected", desc: "A Doji candle formed at the H4 resistance zone you bookmarked at 1.2750", time: "45 min ago", read: false },
    { id: 2, icon: "🔔", title: "NFP Event Tomorrow", desc: "Non-Farm Payrolls releases at 08:30 ET tomorrow — forecast 182K", time: "2h ago", read: false },
    { id: 3, icon: "🔥", title: "Streak Reminder", desc: "Complete 1 lesson today to keep your 7-day streak alive!", time: "5h ago", read: true },
    { id: 4, icon: "💬", title: "Reply to Your Post", desc: "FXProTrader replied to your EUR/USD trade idea: Great analysis! I see the same setup.", time: "1d ago", read: true },
    { id: 5, icon: "📉", title: "EUR/USD Alert Missed", desc: "EUR/USD touched 1.0800 while you were offline. Consider reviewing the chart.", time: "2d ago", read: true },
];

export default function AlertsPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 py-12">
            <div className="mb-8">
                <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-3">
                    <Bell size={14} />
                    <span>Smart Notifications</span>
                </div>
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold font-display mb-2">Price <span className="text-gradient">Alerts</span></h1>
                        <p className="text-white/50">Never miss a setup. Get notified via browser push, email, or SMS.</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold text-sm hover:shadow-lg transition-all">
                        <Plus size={15} />
                        New Alert
                    </button>
                </div>
            </div>

            {/* Create alert form */}
            <div className="glass rounded-2xl p-6 mb-6">
                <h3 className="font-semibold text-sm mb-4">Create Alert</h3>
                <div className="grid sm:grid-cols-4 gap-3 items-end">
                    <div>
                        <label className="block text-xs text-white/40 mb-1.5">Alert Type</label>
                        <select className="w-full px-3 py-2.5 glass rounded-xl text-sm text-white border border-white/5 focus:outline-none bg-[#0d1411]">
                            <option>💹 Price Alert</option>
                            <option>📅 Calendar Event</option>
                            <option>📊 AI Pattern Alert</option>
                            <option>🔔 Lesson Reminder</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-white/40 mb-1.5">Pair / Event</label>
                        <select className="w-full px-3 py-2.5 glass rounded-xl text-sm text-white border border-white/5 focus:outline-none bg-[#0d1411]">
                            {["EUR/USD", "GBP/USD", "BTC/USD", "XAU/USD", "USD/JPY"].map(p => <option key={p}>{p}</option>)}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-white/40 mb-1.5">Price Level</label>
                        <input placeholder="e.g. 1.0950" className="w-full px-3 py-2.5 glass rounded-xl text-sm text-white font-mono placeholder-white/20 border border-white/5 focus:border-green-500/30 focus:outline-none bg-transparent" />
                    </div>
                    <button className="py-2.5 rounded-xl bg-green-500/20 text-green-400 text-sm font-semibold border border-green-500/20 hover:bg-green-500/25 transition-all">
                        Set Alert
                    </button>
                </div>
                <div className="flex items-center gap-4 mt-4">
                    <span className="text-xs text-white/35">Deliver via:</span>
                    {["🔔 Browser Push", "📧 Email", "📱 SMS (Premium)"].map(d => (
                        <label key={d} className="flex items-center gap-1.5 text-xs text-white/50 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-3.5 h-3.5 rounded accent-green-500" />
                            {d}
                        </label>
                    ))}
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Active alerts */}
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white/30 mb-3">Active Alerts ({activeAlerts.filter(a => a.status === "active").length})</h2>
                    <div className="space-y-2">
                        {activeAlerts.map(alert => (
                            <div key={alert.id} className={`glass rounded-xl p-4 flex items-center gap-3 ${alert.status === "triggered" ? "border border-green-500/20 bg-green-500/5" : ""}`}>
                                <div className={`w-2 h-2 rounded-full shrink-0 ${alert.status === "triggered" ? "bg-green-500" : "bg-blue-500 animate-pulse"}`} />
                                <div className="flex-1 min-w-0">
                                    {alert.type === "price" && (
                                        <div className="text-sm font-semibold text-white/80">
                                            <span className="font-mono text-green-400">{alert.pair}</span> {alert.condition} <span className="font-mono text-white">{alert.price}</span>
                                        </div>
                                    )}
                                    {alert.type === "calendar" && (
                                        <div className="text-sm font-semibold text-white/80">
                                            📅 <span>{alert.event}</span> — {alert.time}
                                        </div>
                                    )}
                                    {alert.type === "pattern" && (
                                        <div className="text-sm font-semibold text-white/80">
                                            🤖 {alert.pair}: <span className="text-purple-400">{alert.signal}</span>
                                        </div>
                                    )}
                                    <div className="text-xs text-white/30 mt-0.5">
                                        {alert.status === "triggered" ? `✅ Triggered ${alert.triggered}` : `Set ${alert.created}`}
                                    </div>
                                </div>
                                <div className="flex gap-1 shrink-0">
                                    {alert.status === "triggered" && <span className="text-xs text-green-400 font-semibold">FIRED</span>}
                                    <button className="text-white/20 hover:text-red-400 transition-colors"><X size={13} /></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Notification history */}
                <div>
                    <h2 className="text-sm font-semibold uppercase tracking-wider text-white/30 mb-3">Notification History</h2>
                    <div className="space-y-2">
                        {notifHistory.map(n => (
                            <div key={n.id} className={`glass rounded-xl p-4 flex items-start gap-3 ${!n.read ? "border border-white/8 bg-white/2" : "opacity-60"}`}>
                                <span className="text-xl shrink-0">{n.icon}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="text-sm font-semibold text-white/85">{n.title}</span>
                                        {!n.read && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />}
                                    </div>
                                    <p className="text-xs text-white/45 leading-relaxed">{n.desc}</p>
                                    <span className="text-xs text-white/25 mt-1 block">{n.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* AI Alerts upgrade */}
            <div className="mt-6 glass-brand rounded-2xl p-5 flex items-center gap-5 flex-wrap">
                <div className="text-3xl shrink-0">🤖</div>
                <div className="flex-1">
                    <h3 className="font-bold text-white mb-1">AI Pattern Alerts — Premium Feature</h3>
                    <p className="text-sm text-white/50">Get instant AI-powered alerts when key patterns form on your watchlisted pairs. Head & Shoulders, Double Tops, Doji at key levels, RSI divergence — spotted for you automatically.</p>
                </div>
                <Link href="/premium" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-yellow-500 to-amber-400 text-black font-bold text-sm shrink-0 hover:shadow-lg transition-all">
                    Upgrade ✦
                </Link>
            </div>
        </div>
    );
}
