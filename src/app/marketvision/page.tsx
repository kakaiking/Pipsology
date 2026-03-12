import Link from "next/link";
import { BarChart2 } from "lucide-react";

const pairs = [
    { pair: "EUR/USD", strength: 72, rsi: 38, atr: "0.0085", trend: "DOWN", ema: "Below", vol: "Low" },
    { pair: "GBP/USD", strength: 81, rsi: 56, atr: "0.0124", trend: "UP", ema: "Above", vol: "Medium" },
    { pair: "USD/JPY", strength: 44, rsi: 65, atr: "0.72", trend: "UP", ema: "Above", vol: "High" },
    { pair: "AUD/USD", strength: 63, rsi: 45, atr: "0.0063", trend: "NEUTRAL", ema: "At", vol: "Low" },
    { pair: "USD/CAD", strength: 55, rsi: 52, atr: "0.0091", trend: "NEUTRAL", ema: "Above", vol: "Medium" },
    { pair: "NZD/USD", strength: 68, rsi: 41, atr: "0.0058", trend: "DOWN", ema: "Below", vol: "Low" },
    { pair: "EUR/GBP", strength: 33, rsi: 29, atr: "0.0044", trend: "DOWN", ema: "Below", vol: "Low" },
    { pair: "GBP/JPY", strength: 88, rsi: 72, atr: "1.25", trend: "UP", ema: "Above", vol: "High" },
];

const currencyStrength = [
    { ccy: "GBP", val: 88 },
    { ccy: "JPY", val: 78 },
    { ccy: "USD", val: 66 },
    { ccy: "EUR", val: 48 },
    { ccy: "NZD", val: 42 },
    { ccy: "AUD", val: 38 },
    { ccy: "CAD", val: 34 },
    { ccy: "CHF", val: 28 },
];

const trendColor = { UP: "text-green-400", DOWN: "text-red-400", NEUTRAL: "text-yellow-400" };
const rsiColor = (rsi: number) => rsi >= 70 ? "text-red-400" : rsi <= 30 ? "text-green-400" : "text-white/70";

export default function MarketVisionPage() {
    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-8">
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium mb-3">
                    <BarChart2 size={14} />
                    <span>Visual Analytics</span>
                </div>
                <div className="flex items-end justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-bold font-display mb-2">Market<span className="text-gradient">Vision™</span></h1>
                        <p className="text-white/50">Visual technical analysis dashboard across all major forex pairs at a glance.</p>
                    </div>
                    <div className="flex items-center gap-1.5 glass-brand px-3 py-1.5 rounded-full text-xs text-green-400">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        Live data
                    </div>
                </div>
            </div>

            {/* Timeframe selector */}
            <div className="flex gap-2 mb-6">
                {["H1", "H4", "D1", "W1"].map((tf, i) => (
                    <button key={tf} className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${i === 1 ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30" : "glass text-white/50 hover:text-white"}`}>
                        {tf}
                    </button>
                ))}
                <div className="flex gap-1 ml-4">
                    <button className="px-3 py-1.5 glass rounded-lg text-xs text-white/50 hover:text-white">Forex</button>
                    <button className="px-3 py-1.5 glass rounded-lg text-xs text-white/50 hover:text-white">Crypto</button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-5 mb-6">
                {/* Currency Strength */}
                <div className="glass rounded-2xl p-5">
                    <h3 className="font-semibold text-sm mb-4">Currency Strength</h3>
                    <div className="space-y-3">
                        {currencyStrength.map((c) => (
                            <div key={c.ccy} className="flex items-center gap-2">
                                <span className="font-mono text-xs text-white/60 w-9">{c.ccy}</span>
                                <div className="flex-1 h-5 bg-white/5 rounded overflow-hidden relative">
                                    <div
                                        className={`absolute inset-y-0 left-0 rounded transition-all ${c.val >= 70 ? "bg-green-500" : c.val >= 50 ? "bg-green-500/60" : c.val >= 35 ? "bg-yellow-500/60" : "bg-red-500/60"}`}
                                        style={{ width: `${c.val}%` }}
                                    />
                                </div>
                                <span className={`text-xs font-mono font-bold w-6 text-right ${c.val >= 70 ? "text-green-400" : c.val <= 35 ? "text-red-400" : "text-yellow-400"}`}>{c.val}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Volatility heatmap */}
                <div className="glass rounded-2xl p-5">
                    <h3 className="font-semibold text-sm mb-4">Volatility Heatmap (ATR)</h3>
                    <div className="grid grid-cols-4 gap-1">
                        {["EUR", "GBP", "JPY", "USD", "AUD", "CAD", "CHF", "NZD"].flatMap(a =>
                            ["EUR", "GBP", "JPY", "USD"].map(b => {
                                if (a === b) return null;
                                const vol = Math.random();
                                const bg = vol > 0.7 ? "bg-red-500/60" : vol > 0.4 ? "bg-yellow-500/40" : "bg-green-500/20";
                                return <div key={`${a}${b}`} className={`h-7 ${bg} rounded text-center text-xs leading-7 text-white/40 font-mono`} title={`${a}/${b}`}></div>;
                            })
                        ).filter(Boolean).slice(0, 16)}
                    </div>
                    <div className="flex items-center gap-3 mt-3 text-xs text-white/30">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-green-500/20 rounded" /> Low</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-yellow-500/40 rounded" /> Med</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500/60 rounded" /> High</span>
                    </div>
                </div>

                {/* Market snapshot */}
                <div className="glass rounded-2xl p-5">
                    <h3 className="font-semibold text-sm mb-4">Top Movers (24h)</h3>
                    <div className="space-y-3">
                        {[
                            { pair: "GBP/JPY", change: "+1.42%", pips: "+185" },
                            { pair: "EUR/CHF", change: "+0.87%", pips: "+92" },
                            { pair: "USD/CAD", change: "-0.65%", pips: "-63" },
                            { pair: "NZD/USD", change: "-0.54%", pips: "-36" },
                            { pair: "AUD/JPY", change: "+0.48%", pips: "+52" },
                        ].map(m => (
                            <div key={m.pair} className="flex items-center justify-between">
                                <span className="font-mono text-xs text-white/70">{m.pair}</span>
                                <div className="text-right">
                                    <div className={`text-xs font-bold font-mono ${m.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}>{m.change}</div>
                                    <div className={`text-xs font-mono ${m.pips.startsWith("+") ? "text-green-400/60" : "text-red-400/60"}`}>{m.pips}p</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Overbought/Oversold */}
                <div className="glass rounded-2xl p-5">
                    <h3 className="font-semibold text-sm mb-4">RSI Signals</h3>
                    <div className="space-y-2">
                        {pairs.slice(0, 6).map(p => (
                            <div key={p.pair} className="flex items-center gap-2">
                                <span className="font-mono text-xs text-white/60 w-16">{p.pair}</span>
                                <div className="flex-1 h-3 bg-white/5 rounded overflow-hidden relative">
                                    <div className="absolute inset-y-0 bg-white/5 w-full rounded" />
                                    <div className="absolute top-0 bottom-0 w-0.5 bg-yellow-400/30" style={{ left: "50%" }} />
                                    <div className={`absolute top-0 bottom-0 w-1.5 rounded-full ${rsiColor(p.rsi)} ${p.rsi >= 70 ? "bg-red-500" : p.rsi <= 30 ? "bg-green-500" : "bg-white/30"}`} style={{ left: `${p.rsi}%`, transform: "translateX(-50%)" }} />
                                </div>
                                <span className={`text-xs font-mono font-bold w-8 ${rsiColor(p.rsi)}`}>{p.rsi}</span>
                            </div>
                        ))}
                        <div className="flex justify-between text-xs text-white/20 mt-1">
                            <span>0</span><span>30</span><span>50</span><span>70</span><span>100</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Full pair table */}
            <div className="glass rounded-2xl overflow-hidden">
                <div className="px-5 py-3 border-b border-white/5">
                    <h3 className="font-semibold text-sm">All Major Pairs — H4 Overview</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/5">
                                {["Pair", "Trend", "EMA Stack", "RSI", "ATR", "Volatility", "Signal"].map(h => (
                                    <th key={h} className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wider text-white/25">{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {pairs.map((p) => (
                                <tr key={p.pair} className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-all">
                                    <td className="px-4 py-3 font-mono text-sm font-semibold text-white/90">{p.pair}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-sm font-bold ${trendColor[p.trend as keyof typeof trendColor]}`}>
                                            {p.trend === "UP" ? "▲" : p.trend === "DOWN" ? "▼" : "◆"} {p.trend}
                                        </span>
                                    </td>
                                    <td className={`px-4 py-3 text-xs font-medium ${p.ema === "Above" ? "text-green-400" : p.ema === "Below" ? "text-red-400" : "text-yellow-400"}`}>{p.ema}</td>
                                    <td className={`px-4 py-3 font-mono text-sm font-bold ${rsiColor(p.rsi)}`}>{p.rsi}</td>
                                    <td className="px-4 py-3 font-mono text-xs text-white/50">{p.atr}</td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${p.vol === "High" ? "badge-red" : p.vol === "Medium" ? "badge-gold" : "badge-green"}`}>{p.vol}</span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`text-xs font-semibold ${p.trend === "UP" && p.rsi < 70 ? "text-green-400" : p.trend === "DOWN" && p.rsi > 30 ? "text-red-400" : "text-white/30"}`}>
                                            {p.trend === "UP" && p.rsi < 70 ? "✅ Buy Bias" : p.trend === "DOWN" && p.rsi > 30 ? "🔴 Sell Bias" : "— Neutral"}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="px-5 py-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-xs text-white/25">8 pairs shown · Premium unlocks all 28 pairs</span>
                    <Link href="/premium" className="text-xs text-yellow-400 hover:text-yellow-300">Unlock All →</Link>
                </div>
            </div>
        </div>
    );
}
