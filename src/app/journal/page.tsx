"use client";
import { useState } from "react";
import { PlusCircle, TrendingUp, TrendingDown, BarChart2, Target, AlertCircle, ChevronDown } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

const trades = [
    { id: 1, date: "Mar 5", pair: "EUR/USD", dir: "BUY", entry: 1.0820, sl: 1.0790, tp: 1.0880, outcome: "WIN", pips: 60, rr: 2.0, notes: "Clean break above resistance, followed the trend", emotion: "Confident" },
    { id: 2, date: "Mar 4", pair: "GBP/JPY", dir: "SELL", entry: 192.80, sl: 193.20, tp: 191.80, outcome: "WIN", pips: 100, rr: 2.5, notes: "Bearish engulfing at key resistance, fundamentals aligned", emotion: "Patient" },
    { id: 3, date: "Mar 4", pair: "USD/CAD", dir: "BUY", entry: 1.4380, sl: 1.4350, tp: 1.4410, outcome: "LOSS", pips: -30, rr: -1.0, notes: "Premature entry before news", emotion: "FOMO" },
    { id: 4, date: "Mar 3", pair: "AUD/USD", dir: "BUY", entry: 0.6240, sl: 0.6210, tp: 0.6310, outcome: "WIN", pips: 70, rr: 2.3, notes: "Strong GDP data, AUD breakout", emotion: "Calm" },
    { id: 5, date: "Mar 2", pair: "EUR/USD", dir: "SELL", entry: 1.0930, sl: 1.0970, tp: 1.0850, outcome: "LOSS", pips: -40, rr: -1.0, notes: "Revenge trade after previous loss — broke my rules", emotion: "Angry" },
];

const equityCurve = [
    { day: "Feb 24", balance: 9800 }, { day: "Feb 25", balance: 10050 }, { day: "Feb 26", balance: 10180 },
    { day: "Mar 1", balance: 10120 }, { day: "Mar 2", balance: 9960 }, { day: "Mar 3", balance: 10240 },
    { day: "Mar 4", balance: 10540 }, { day: "Mar 5", balance: 10720 },
];

const aiInsights = [
    { icon: "📈", title: "Best Session", insight: "You win 74% of trades placed during the London session (8am–4pm UK). Consider focusing your trading here.", color: "text-green-400" },
    { icon: "⚠️", title: "Pattern Detected", insight: "You've logged 3 trades tagged 'FOMO' in 2 weeks — all resulted in losses. Consider adding a 5-minute wait rule.", color: "text-yellow-400" },
    { icon: "📉", title: "Cut Winners Early", insight: "Your average winner closes at 1.4R, while your average loser hits 1.0R — you're leaving money on the table.", color: "text-orange-400" },
    { icon: "🎯", title: "Best Pair", insight: "EUR/USD is your highest-performing pair with a 68% win rate across 22 trades.", color: "text-blue-400" },
];

const emotionColors: Record<string, string> = {
    "Confident": "badge-green", "Patient": "badge-blue", "FOMO": "badge-red",
    "Calm": "badge-green", "Angry": "badge-red",
};

export default function JournalPage() {
    const [showForm, setShowForm] = useState(false);

    const wins = trades.filter(t => t.outcome === "WIN").length;
    const totalPips = trades.reduce((s, t) => s + t.pips, 0);
    const avgRR = trades.filter(t => t.outcome === "WIN").reduce((s, t) => s + t.rr, 0) / wins;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-blue-400 text-sm font-medium mb-3">
                        <BarChart2 size={14} />
                        <span>Performance Analytics</span>
                    </div>
                    <h1 className="text-4xl font-bold font-display mb-2">AI Trade <span className="text-gradient">Journal</span></h1>
                    <p className="text-white/50">Log trades, discover patterns, and let AI coach your improvement.</p>
                </div>
                <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold text-sm hover:shadow-lg hover:shadow-green-500/20 transition-all">
                    <PlusCircle size={16} />
                    Log Trade
                </button>
            </div>

            {/* Log Trade Form */}
            {showForm && (
                <div className="glass rounded-2xl p-6 mb-8 border border-green-500/10">
                    <h3 className="font-semibold text-white mb-5">New Trade Entry</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        {[
                            { label: "Currency Pair", placeholder: "EUR/USD", type: "text" },
                            { label: "Entry Price", placeholder: "1.0820", type: "number" },
                            { label: "Stop Loss", placeholder: "1.0790", type: "number" },
                            { label: "Take Profit", placeholder: "1.0880", type: "number" },
                        ].map(({ label, placeholder, type }) => (
                            <div key={label}>
                                <label className="block text-xs text-white/50 mb-1.5">{label}</label>
                                <input type={type} placeholder={placeholder} className="w-full px-3 py-2.5 glass rounded-xl text-sm text-white font-mono placeholder-white/20 border border-white/5 focus:border-green-500/30 focus:outline-none bg-transparent" />
                            </div>
                        ))}
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label className="block text-xs text-white/50 mb-1.5">Direction</label>
                            <select className="w-full px-3 py-2.5 glass rounded-xl text-sm text-white border border-white/5 focus:border-green-500/30 focus:outline-none bg-[#0d1411]">
                                <option>BUY</option><option>SELL</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-white/50 mb-1.5">Outcome</label>
                            <select className="w-full px-3 py-2.5 glass rounded-xl text-sm text-white border border-white/5 focus:border-green-500/30 focus:outline-none bg-[#0d1411]">
                                <option>WIN</option><option>LOSS</option><option>BREAKEVEN</option><option>Open</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs text-white/50 mb-1.5">Emotional State</label>
                            <select className="w-full px-3 py-2.5 glass rounded-xl text-sm text-white border border-white/5 focus:border-green-500/30 focus:outline-none bg-[#0d1411]">
                                <option>Calm</option><option>Confident</option><option>Patient</option><option>Anxious</option><option>FOMO</option><option>Angry</option>
                            </select>
                        </div>
                    </div>
                    <textarea rows={2} placeholder="Trade notes — what was your thesis? Did you follow your rules?" className="w-full px-3 py-2.5 glass rounded-xl text-sm text-white placeholder-white/20 border border-white/5 focus:border-green-500/30 focus:outline-none bg-transparent resize-none mb-4" />
                    <div className="flex gap-3 justify-end">
                        <button onClick={() => setShowForm(false)} className="px-5 py-2.5 glass rounded-xl text-sm text-white/60 hover:text-white transition-all">Cancel</button>
                        <button className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-emerald-500 text-black rounded-xl text-sm font-semibold hover:shadow-lg transition-all">Save Trade</button>
                    </div>
                </div>
            )}

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                    { label: "Win Rate", value: `${Math.round((wins / trades.length) * 100)}%`, icon: Target, color: "text-green-400" },
                    { label: "Total Pips", value: `+${totalPips}`, icon: TrendingUp, color: "text-blue-400" },
                    { label: "Avg R:R", value: `${avgRR.toFixed(1)}R`, icon: BarChart2, color: "text-purple-400" },
                    { label: "Trades Logged", value: trades.length.toString(), icon: ChevronDown, color: "text-yellow-400" },
                ].map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="glass rounded-xl p-5 text-center">
                        <Icon size={16} className={`${color} mx-auto mb-2`} />
                        <div className={`text-2xl font-bold font-display ${color}`}>{value}</div>
                        <div className="text-xs text-white/35 mt-1">{label}</div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6 mb-6">
                {/* Equity curve */}
                <div className="lg:col-span-2 glass rounded-2xl p-5">
                    <h3 className="font-semibold text-sm mb-4">Equity Curve</h3>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={equityCurve}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="day" tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11 }} axisLine={false} tickLine={false} domain={["dataMin - 100", "dataMax + 100"]} />
                            <Tooltip contentStyle={{ background: "#111a16", border: "1px solid rgba(34,197,94,0.15)", borderRadius: "12px", color: "#e8f5ef" }} />
                            <Line type="monotone" dataKey="balance" stroke="#22c55e" strokeWidth={2.5} dot={{ fill: "#22c55e", strokeWidth: 0, r: 3 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>

                {/* AI Insights */}
                <div className="glass rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <h3 className="font-semibold text-sm">AI Insights</h3>
                    </div>
                    <div className="space-y-3">
                        {aiInsights.map((ins) => (
                            <div key={ins.title} className="glass rounded-xl p-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span>{ins.icon}</span>
                                    <span className={`text-xs font-semibold ${ins.color}`}>{ins.title}</span>
                                </div>
                                <p className="text-xs text-white/50 leading-relaxed">{ins.insight}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Trade Log */}
            <div className="glass rounded-2xl overflow-hidden">
                <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
                    <h3 className="font-semibold text-sm">Trade Log</h3>
                    <span className="text-xs text-white/30">{trades.length} trades this week</span>
                </div>
                <div className="divide-y divide-white/5">
                    {trades.map((t) => (
                        <div key={t.id} className="flex flex-wrap items-center gap-x-5 gap-y-1 px-5 py-4 hover:bg-white/2 transition-all">
                            <span className="text-xs text-white/30 w-14 shrink-0">{t.date}</span>
                            <span className="font-mono text-sm font-semibold text-white/90 w-20 shrink-0">{t.pair}</span>
                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${t.dir === "BUY" ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"}`}>{t.dir}</span>
                            <span className={`text-sm font-bold ${t.outcome === "WIN" ? "text-green-400" : "text-red-400"}`}>
                                {t.pips > 0 ? "+" : ""}{t.pips} pips
                            </span>
                            <span className={`text-xs ${t.rr > 0 ? "text-green-400" : "text-red-400"}`}>{t.rr > 0 ? "+" : ""}{t.rr}R</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${emotionColors[t.emotion] || "badge-blue"}`}>{t.emotion}</span>
                            <span className="text-xs text-white/35 flex-1 truncate">{t.notes}</span>
                            {t.emotion === "FOMO" || t.emotion === "Angry" ? (
                                <span title="Rule violation detected">
                                    <AlertCircle size={13} className="text-red-400 shrink-0" />
                                </span>
                            ) : null}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
