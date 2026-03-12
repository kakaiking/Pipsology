"use client";
import { useState } from "react";
import { TrendingUp, Target } from "lucide-react";

const generateCandles = (n = 80, start = 1.0820) => {
    let p = start;
    return Array.from({ length: n }, (_, i) => {
        const move = (Math.random() - 0.47) * 0.0025;
        const open = p;
        const close = p + move;
        const high = Math.max(open, close) + Math.random() * 0.0008;
        const low = Math.min(open, close) - Math.random() * 0.0008;
        p = close;
        return { open: +open.toFixed(4), close: +close.toFixed(4), high: +high.toFixed(4), low: +low.toFixed(4), index: i };
    });
};

const pairs = ["EUR/USD", "GBP/USD", "USD/JPY", "GBP/JPY", "AUD/USD", "BTC/USD"];

const quizPatterns = [
    { name: "Double Top", emoji: "🏔", hint: "Two peaks at the same level — bearish reversal signal" },
    { name: "Head and Shoulders", emoji: "👤", hint: "Three peaks, middle is highest — strong bearish reversal" },
    { name: "Bull Flag", emoji: "🚩", hint: "Tight consolidation after sharp rally — bullish continuation" },
    { name: "Descending Triangle", emoji: "📐", hint: "Lower highs with flat support — bearish breakout" },
];

export default function ChartsPage() {
    const [candles] = useState(() => generateCandles());
    const [selectedPair, setSelectedPair] = useState("EUR/USD");
    const [selectedTf, setSelectedTf] = useState("H1");
    const [activeQuiz, setActiveQuiz] = useState<number | null>(null);
    const [quizAnswered, setQuizAnswered] = useState<string | null>(null);
    const [drawingMode, setDrawingMode] = useState<string | null>(null);

    const prices = candles.flatMap(c => [c.high, c.low]);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 0.001;
    const W = 720, H = 300;
    const cw = Math.floor(W / candles.length) - 1;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-8">
                <div className="flex items-center gap-2 text-purple-400 text-sm font-medium mb-3">
                    <TrendingUp size={14} />
                    <span>Practice Arena</span>
                </div>
                <h1 className="text-4xl font-bold font-display mb-2">Chart <span className="text-gradient">Classroom</span></h1>
                <p className="text-white/50">Live charts, pattern quizzes, and drawing tools — all in one place. Practice reading charts without leaving PipForge.</p>
            </div>

            <div className="grid lg:grid-cols-4 gap-5">
                {/* Chart area */}
                <div className="lg:col-span-3 space-y-4">
                    {/* Controls */}
                    <div className="glass rounded-xl px-4 py-3 flex flex-wrap items-center gap-3">
                        {/* Pair */}
                        <select value={selectedPair} onChange={e => setSelectedPair(e.target.value)} className="px-3 py-1.5 glass rounded-lg text-sm text-white border-0 focus:outline-none bg-transparent font-mono font-semibold text-green-400">
                            {pairs.map(p => <option key={p} style={{ backgroundColor: "#0d1411" }}>{p}</option>)}
                        </select>

                        {/* TF */}
                        <div className="flex gap-1">
                            {["M1", "M5", "M15", "H1", "H4", "D1"].map(tf => (
                                <button key={tf} onClick={() => setSelectedTf(tf)} className={`px-2 py-1 rounded text-xs font-mono font-medium transition-all ${selectedTf === tf ? "bg-purple-500/20 text-purple-400" : "glass text-white/40 hover:text-white"}`}>{tf}</button>
                            ))}
                        </div>

                        {/* Drawing tools */}
                        <div className="flex gap-1 ml-auto">
                            <span className="text-xs text-white/30 self-center">Draw:</span>
                            {[
                                { id: "trendline", icon: "╱", label: "Trendline" },
                                { id: "horizontal", icon: "─", label: "Horizontal" },
                                { id: "fibonacci", icon: "fi", label: "Fibonacci" },
                                { id: "rect", icon: "□", label: "Zone" },
                            ].map(tool => (
                                <button key={tool.id} onClick={() => setDrawingMode(drawingMode === tool.id ? null : tool.id)} className={`px-2 py-1 rounded text-xs font-mono transition-all ${drawingMode === tool.id ? "bg-blue-500/20 text-blue-400" : "glass text-white/40 hover:text-white"}`} title={tool.label}>
                                    {tool.icon}
                                </button>
                            ))}
                            <button onClick={() => setDrawingMode(null)} className="px-2 py-1 glass rounded text-xs text-white/30 hover:text-red-400 transition-all ml-1" title="Clear">✕</button>
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="glass rounded-2xl p-3 overflow-hidden">
                        <div className="flex justify-between items-center px-2 pb-2">
                            <span className="font-mono text-sm font-bold text-green-400">{selectedPair}</span>
                            <span className="font-mono text-sm text-white/70">{candles[candles.length - 1]?.close.toFixed(4)}</span>
                        </div>
                        <svg width="100%" viewBox={`0 0 ${W} ${H}`} className="block">
                            <rect width={W} height={H} fill="#0d1411" />
                            {/* Grid */}
                            {[0.2, 0.4, 0.6, 0.8].map(pos => (
                                <g key={pos}>
                                    <line x1={0} x2={W} y1={H * pos} y2={H * pos} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
                                    <text x={4} y={H * pos - 3} fill="rgba(255,255,255,0.2)" fontSize={9} fontFamily="monospace">{(max - range * pos).toFixed(4)}</text>
                                </g>
                            ))}
                            {/* Candles */}
                            {candles.map((c, i) => {
                                const x = i * (W / candles.length) + cw / 2;
                                const isGreen = c.close >= c.open;
                                const hY = ((max - c.high) / range) * H;
                                const lY = ((max - c.low) / range) * H;
                                const oY = ((max - c.open) / range) * H;
                                const clY = ((max - c.close) / range) * H;
                                const bodyTop = Math.min(oY, clY);
                                const bodyH = Math.max(Math.abs(oY - clY), 1);
                                return (
                                    <g key={i}>
                                        <line x1={x} x2={x} y1={hY} y2={lY} stroke={isGreen ? "#22c55e" : "#ef4444"} strokeWidth={1} />
                                        <rect x={x - cw / 2} y={bodyTop} width={cw} height={bodyH} fill={isGreen ? "#22c55e" : "#ef4444"} rx={0.5} opacity={isGreen ? 1 : 0.9} />
                                    </g>
                                );
                            })}
                            {/* 20 EMA line */}
                            {candles.slice(20).map((c, i) => {
                                const ema = candles.slice(i, i + 20).reduce((s, cc) => s + cc.close, 0) / 20;
                                const x = (i + 20) * (W / candles.length) + cw / 2;
                                const y = ((max - ema) / range) * H;
                                if (i === 0) return null;
                                const prevEma = candles.slice(i - 1, i + 19).reduce((s, cc) => s + cc.close, 0) / 20;
                                const prevX = (i + 19) * (W / candles.length) + cw / 2;
                                const prevY = ((max - prevEma) / range) * H;
                                return <line key={i} x1={prevX} y1={prevY} x2={x} y2={y} stroke="#60a5fa" strokeWidth={1} opacity={0.5} />;
                            })}
                            {/* Current price line */}
                            {(() => {
                                const last = candles[candles.length - 1];
                                const y = ((max - last.close) / range) * H;
                                return <>
                                    <line x1={0} x2={W} y1={y} y2={y} stroke="#22c55e" strokeDasharray="3 3" strokeWidth={1} opacity={0.4} />
                                    <rect x={W - 70} y={y - 9} width={66} height={18} fill="#22c55e" rx={3} />
                                    <text x={W - 37} y={y + 5} fill="black" fontSize={9} fontWeight="bold" textAnchor="middle" fontFamily="monospace">{last.close.toFixed(4)}</text>
                                </>;
                            })()}
                        </svg>
                        <div className="flex items-center gap-4 px-2 pt-2 text-xs text-white/25">
                            <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-blue-400 inline-block" /> 20 EMA</span>
                            <span className="flex items-center gap-1"><span className="w-4 h-0.5 bg-green-400 inline-block" style={{ borderTopStyle: "dashed" }} /> Current price</span>
                        </div>
                    </div>

                    {/* Pattern Quiz */}
                    <div className="glass rounded-2xl p-5">
                        <div className="flex items-center gap-2 mb-4">
                            <Target size={15} className="text-yellow-400" />
                            <h3 className="font-semibold text-sm">Pattern Recognition Quiz</h3>
                            <div className="ml-auto text-xs text-white/30">+50 XP per correct answer</div>
                        </div>
                        <p className="text-xs text-white/50 mb-4">Study the chart above and identify which pattern you see. Build your chart reading instinct!</p>
                        <div className="grid sm:grid-cols-2 gap-2">
                            {quizPatterns.map((p) => (
                                <button
                                    key={p.name}
                                    onClick={() => { setActiveQuiz(quizPatterns.indexOf(p)); setQuizAnswered(p.name); }}
                                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm transition-all ${quizAnswered === p.name
                                            ? p.name === "Bull Flag"
                                                ? "bg-green-500/20 border border-green-500/30 text-green-400"
                                                : "bg-red-500/10 border border-red-500/20 text-red-400"
                                            : "glass hover:bg-white/5 text-white/70"
                                        }`}
                                >
                                    <span className="text-xl shrink-0">{p.emoji}</span>
                                    <div>
                                        <div className="font-medium">{p.name}</div>
                                        {quizAnswered && <div className="text-xs opacity-60 mt-0.5">{p.hint}</div>}
                                    </div>
                                </button>
                            ))}
                        </div>
                        {quizAnswered && (
                            <div className={`mt-4 p-3 rounded-xl text-sm ${quizAnswered === "Bull Flag" ? "glass-brand text-green-400" : "bg-red-500/10 text-red-400"}`}>
                                {quizAnswered === "Bull Flag" ? "🎉 Correct! The chart shows a Bull Flag continuation pattern. You earn +50 XP!" : "❌ Not quite. The pattern on the chart is a Bull Flag. Study the tight consolidation after the sharp rally."}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Chart indicators */}
                    <div className="glass rounded-xl p-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">Indicators</h3>
                        <div className="space-y-2">
                            {[
                                { name: "20 EMA", active: true, color: "bg-blue-400" },
                                { name: "50 EMA", active: false, color: "bg-purple-400" },
                                { name: "RSI (14)", active: false, color: "bg-yellow-400" },
                                { name: "MACD", active: false, color: "bg-orange-400" },
                                { name: "Bollinger Bands", active: false, color: "bg-cyan-400" },
                                { name: "Fibonacci", active: false, color: "bg-pink-400" },
                            ].map(ind => (
                                <label key={ind.name} className="flex items-center gap-2.5 cursor-pointer">
                                    <div className={`w-3 h-3 rounded-sm ${ind.active ? ind.color : "bg-white/10"} shrink-0`} />
                                    <span className="text-xs text-white/60">{ind.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Lesson link */}
                    <div className="glass rounded-xl p-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">📚 Learning Mode</h3>
                        <p className="text-xs text-white/45 mb-3">Connect what you see on the chart to the actual lesson. Click a pattern to open the lesson.</p>
                        <div className="space-y-2">
                            {["Candlesticks 101", "Support & Resistance", "Chart Patterns", "Elliott Wave", "Fibonacci Tools"].map(l => (
                                <a key={l} href="/learn" className="block text-xs text-white/50 hover:text-green-400 transition-colors py-1 border-b border-white/5 last:border-0">
                                    📖 {l} →
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Save & share */}
                    <div className="glass rounded-xl p-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">Export</h3>
                        <div className="space-y-2">
                            <button className="w-full py-2 glass rounded-lg text-xs text-white/50 hover:text-white transition-all">📌 Save to Profile</button>
                            <button className="w-full py-2 glass rounded-lg text-xs text-white/50 hover:text-white transition-all">🌐 Post to Social Feed</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
