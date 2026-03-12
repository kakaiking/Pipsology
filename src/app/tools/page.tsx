"use client";
import { useState } from "react";

const tools = [
    {
        id: "position-size",
        title: "Position Size Calculator",
        icon: "📐",
        desc: "Calculate the right lot size based on your risk tolerance.",
        color: "text-green-400",
        fields: ["Account Balance ($)", "Risk % per Trade", "Stop Loss (pips)", "Currency Pair"],
        defaults: ["10000", "1", "50", "EUR/USD"],
    },
    {
        id: "pip-value",
        title: "Pip Value Calculator",
        icon: "💹",
        desc: "Find out how much each pip movement is worth.",
        color: "text-blue-400",
        fields: ["Currency Pair", "Lot Size", "Account Currency"],
        defaults: ["EUR/USD", "1", "USD"],
    },
    {
        id: "pivot-point",
        title: "Pivot Point Calculator",
        icon: "🎯",
        desc: "Calculate key support & resistance levels from OHLC data.",
        color: "text-purple-400",
        fields: ["High Price", "Low Price", "Close Price"],
        defaults: ["1.0920", "1.0760", "1.0850"],
    },
    {
        id: "gain-loss",
        title: "Gain & Loss Calculator",
        icon: "📊",
        desc: "How much gain do you need to recover a loss?",
        color: "text-orange-400",
        fields: ["Account Balance ($)", "Loss Amount ($)"],
        defaults: ["10000", "1500"],
    },
    {
        id: "correlation",
        title: "Currency Correlation",
        icon: "🔗",
        desc: "Measure correlations between currency pairs.",
        color: "text-cyan-400",
        fields: ["Pair 1", "Pair 2", "Timeframe"],
        defaults: ["EUR/USD", "GBP/USD", "1M"],
    },
    {
        id: "market-hours",
        title: "Market Hours Clock",
        icon: "🕐",
        desc: "See which forex sessions are currently active.",
        color: "text-yellow-400",
        fields: [],
        defaults: [],
    },
    {
        id: "risk-meter",
        title: "Risk-On / Risk-Off Meter",
        icon: "🌡️",
        desc: "Gauge overall market risk sentiment in real-time.",
        color: "text-red-400",
        fields: [],
        defaults: [],
    },
];

function PositionSizeCalc() {
    const [balance, setBalance] = useState("10000");
    const [risk, setRisk] = useState("1");
    const [sl, setSl] = useState("50");
    const [pair, setPair] = useState("EUR/USD");

    const riskAmount = (parseFloat(balance) * parseFloat(risk)) / 100;
    const pipValue = pair.includes("JPY") ? 9.09 : 10;
    const lots = isNaN(riskAmount) || isNaN(parseFloat(sl)) ? 0 : riskAmount / (parseFloat(sl) * pipValue);

    return (
        <div className="space-y-4">
            {[
                { label: "Account Balance ($)", value: balance, setter: setBalance, type: "number" },
                { label: "Risk % per Trade", value: risk, setter: setRisk, type: "number" },
                { label: "Stop Loss (pips)", value: sl, setter: setSl, type: "number" },
            ].map(({ label, value, setter, type }) => (
                <div key={label}>
                    <label className="block text-xs text-white/50 mb-1.5">{label}</label>
                    <input type={type} value={value} onChange={e => setter(e.target.value)} className="w-full px-3 py-2.5 glass rounded-xl text-sm text-white font-mono border border-white/5 focus:border-green-500/30 focus:outline-none bg-transparent transition-all" />
                </div>
            ))}
            <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between">
                    <span className="text-sm text-white/50">Risk Amount</span>
                    <span className="text-sm font-bold text-white/80 font-mono">${riskAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-sm text-white/50">Pip Value</span>
                    <span className="text-sm font-mono text-white/80">${pipValue.toFixed(2)}/pip</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-white">Recommended Lot Size</span>
                    <span className="text-xl font-bold text-gradient font-mono">{lots.toFixed(2)}</span>
                </div>
            </div>
        </div>
    );
}

function PivotPointCalc() {
    const [high, setHigh] = useState("1.0920");
    const [low, setLow] = useState("1.0760");
    const [close, setClose] = useState("1.0850");

    const h = parseFloat(high), l = parseFloat(low), c = parseFloat(close);
    const pp = (h + l + c) / 3;
    const r1 = 2 * pp - l;
    const s1 = 2 * pp - h;
    const r2 = pp + (h - l);
    const s2 = pp - (h - l);
    const r3 = h + 2 * (pp - l);
    const s3 = l - 2 * (h - pp);

    return (
        <div className="space-y-4">
            {[
                { label: "High", value: high, setter: setHigh },
                { label: "Low", value: low, setter: setLow },
                { label: "Close", value: close, setter: setClose },
            ].map(({ label, value, setter }) => (
                <div key={label}>
                    <label className="block text-xs text-white/50 mb-1.5">{label}</label>
                    <input type="number" step="0.0001" value={value} onChange={e => setter(e.target.value)} className="w-full px-3 py-2.5 glass rounded-xl text-sm text-white font-mono border border-white/5 focus:border-green-500/30 focus:outline-none bg-transparent" />
                </div>
            ))}
            <div className="border-t border-white/10 pt-4 space-y-2">
                {[
                    { label: "R3", val: r3, col: "text-red-300" },
                    { label: "R2", val: r2, col: "text-red-400" },
                    { label: "R1", val: r1, col: "text-red-500" },
                    { label: "PP", val: pp, col: "text-yellow-400" },
                    { label: "S1", val: s1, col: "text-green-500" },
                    { label: "S2", val: s2, col: "text-green-400" },
                    { label: "S3", val: s3, col: "text-green-300" },
                ].map(({ label, val, col }) => (
                    <div key={label} className="flex justify-between items-center py-1.5 border-b border-white/5 last:border-0">
                        <span className={`text-sm font-bold ${col} w-8`}>{label}</span>
                        <div className="flex-1 mx-3 h-1 bg-white/5 rounded overflow-hidden">
                            <div className={`h-full ${label === "PP" ? "bg-yellow-400" : label.startsWith("R") ? "bg-red-500/50" : "bg-green-500/50"}`} style={{ width: `${label === "PP" ? 50 : label === "R1" || label === "S1" ? 60 : label === "R2" || label === "S2" ? 70 : 80}%` }} />
                        </div>
                        <span className="font-mono text-sm font-semibold text-white">{isNaN(val) ? "—" : val.toFixed(4)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function MarketHoursClock() {
    const sessions = [
        { name: "Sydney", open: 21, close: 6, color: "bg-blue-500", active: true },
        { name: "Tokyo", open: 23, close: 8, color: "bg-purple-500", active: true },
        { name: "London", open: 7, close: 16, color: "bg-green-500", active: false },
        { name: "New York", open: 12, close: 21, color: "bg-orange-500", active: false },
    ];

    return (
        <div className="space-y-4">
            <div className="text-center">
                <div className="text-4xl font-bold font-mono text-gradient">
                    {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </div>
                <div className="text-xs text-white/40 mt-1">UTC+3 (Your local time)</div>
            </div>
            {sessions.map(s => (
                <div key={s.name} className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${s.active ? s.color : "bg-white/10"} ${s.active ? "shadow-lg" : ""} shrink-0`} />
                    <span className="text-sm font-medium text-white/80 w-16">{s.name}</span>
                    <div className="flex-1 h-5 bg-white/5 rounded-full overflow-hidden relative">
                        <div className={`absolute inset-y-0 ${s.color} opacity-${s.active ? "60" : "20"} rounded-full`} style={{ left: `${(s.open / 24) * 100}%`, width: `${((s.close - s.open + 24) % 24 / 24) * 100}%` }} />
                    </div>
                    <span className={`text-xs font-semibold ${s.active ? "text-green-400" : "text-white/30"}`}>{s.active ? "Open" : "Closed"}</span>
                </div>
            ))}
            <div className="glass rounded-xl p-3 text-center">
                <div className="text-xs text-white/50">🔥 <strong className="text-white/80">London-NY Overlap</strong> (12:00–16:00 UTC) — Highest liquidity window</div>
            </div>
        </div>
    );
}

function RiskMeter() {
    const score = 62; // simulated
    return (
        <div className="space-y-4">
            <div className="text-center">
                <div className="text-xs text-white/40 mb-2 uppercase tracking-wider">Market Sentiment</div>
                <div className="relative w-full h-4 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500 rounded-full overflow-hidden">
                    <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg shadow-white/50 transition-all" style={{ left: `${score}%` }} />
                </div>
                <div className="flex justify-between text-xs mt-1 text-white/40">
                    <span>🟢 Risk-On</span>
                    <span>🔴 Risk-Off</span>
                </div>
            </div>
            <div className="text-center glass rounded-xl p-4">
                <div className="text-3xl font-bold font-display text-yellow-400">{score}</div>
                <div className="text-sm text-white/60 font-semibold mt-1">Neutral</div>
                <div className="text-xs text-white/35 mt-1">Markets balanced between risk assets and safe havens</div>
            </div>
            <div className="space-y-2 text-xs">
                {[
                    { label: "JPY Strength", val: 42, desc: "Safe haven demand" },
                    { label: "Gold Demand", val: 58, desc: "Moderate hedging" },
                    { label: "S&P 500 Momentum", val: 65, desc: "Slight bullish bias" },
                    { label: "VIX Level", val: 38, desc: "Low fear index" },
                ].map(({ label, val, desc }) => (
                    <div key={label} className="flex justify-between items-center">
                        <div>
                            <span className="text-white/60">{label}</span>
                            <span className="text-white/30 ml-2">{desc}</span>
                        </div>
                        <span className="font-mono text-white/70">{val}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ToolsPage() {
    const [activeTool, setActiveTool] = useState("position-size");

    const renderCalc = () => {
        switch (activeTool) {
            case "position-size": return <PositionSizeCalc />;
            case "pivot-point": return <PivotPointCalc />;
            case "market-hours": return <MarketHoursClock />;
            case "risk-meter": return <RiskMeter />;
            default: return (
                <div className="text-center py-12 text-white/30">
                    <div className="text-4xl mb-3">🛠️</div>
                    <p className="text-sm">Interactive calculator coming soon</p>
                </div>
            );
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-10">
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium mb-3">
                    <span>🛠️</span>
                    <span>Trader&apos;s Toolkit</span>
                </div>
                <h1 className="text-4xl font-bold font-display mb-2">Trading <span className="text-gradient">Tools</span></h1>
                <p className="text-white/50">7 essential calculators and visualizers. All free, all in one place.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Tool selector */}
                <div className="space-y-2">
                    {tools.map(tool => (
                        <button
                            key={tool.id}
                            onClick={() => setActiveTool(tool.id)}
                            className={`w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all ${activeTool === tool.id ? "glass-brand border border-green-500/20" : "glass hover:bg-white/5"}`}
                        >
                            <span className="text-2xl shrink-0">{tool.icon}</span>
                            <div className="flex-1 min-w-0">
                                <div className={`text-sm font-medium ${activeTool === tool.id ? "text-green-400" : "text-white/80"}`}>{tool.title}</div>
                                <div className="text-xs text-white/35 truncate">{tool.desc}</div>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Active tool */}
                <div className="lg:col-span-2 glass rounded-2xl p-6">
                    <div className="flex items-center gap-3 mb-6 pb-5 border-b border-white/5">
                        <span className="text-3xl">{tools.find(t => t.id === activeTool)?.icon}</span>
                        <div>
                            <h2 className="font-bold text-white">{tools.find(t => t.id === activeTool)?.title}</h2>
                            <p className="text-xs text-white/45">{tools.find(t => t.id === activeTool)?.desc}</p>
                        </div>
                    </div>
                    {renderCalc()}
                </div>
            </div>
        </div>
    );
}
