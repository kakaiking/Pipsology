"use client";
import { useState, useEffect } from "react";
import { Play, Pause, SkipForward, TrendingUp, TrendingDown, BarChart2, X } from "lucide-react";

const generateCandles = (count: number, start = 1.0800) => {
    const candles = [];
    let price = start;
    for (let i = 0; i < count; i++) {
        const move = (Math.random() - 0.48) * 0.003;
        const open = price;
        const close = price + move;
        const high = Math.max(open, close) + Math.random() * 0.001;
        const low = Math.min(open, close) - Math.random() * 0.001;
        price = close;
        candles.push({ open: +open.toFixed(4), close: +close.toFixed(4), high: +high.toFixed(4), low: +low.toFixed(4) });
    }
    return candles;
};

const allCandles = generateCandles(120);

function CandleChart({ candles, currentIndex, trades }: { candles: typeof allCandles, currentIndex: number, trades: { index: number, dir: string, entry: number }[] }) {
    const visible = candles.slice(Math.max(0, currentIndex - 50), currentIndex + 1);
    const prices = visible.flatMap(c => [c.high, c.low]);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min || 0.001;
    const w = 560, h = 280;
    const candleWidth = Math.floor(w / visible.length) - 2;

    return (
        <svg width="100%" viewBox={`0 0 ${w} ${h}`} className="rounded-xl overflow-hidden">
            <rect width={w} height={h} fill="#0d1411" rx="12" />
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map(pos => (
                <g key={pos}>
                    <line x1={0} x2={w} y1={h * pos} y2={h * pos} stroke="rgba(255,255,255,0.04)" strokeWidth={1} />
                    <text x={4} y={h * pos - 3} fill="rgba(255,255,255,0.25)" fontSize={9}>{(max - range * pos).toFixed(4)}</text>
                </g>
            ))}
            {/* Candles */}
            {visible.map((c, i) => {
                const x = i * (w / visible.length) + candleWidth / 2;
                const isGreen = c.close >= c.open;
                const color = isGreen ? "#22c55e" : "#ef4444";
                const highY = ((max - c.high) / range) * h;
                const lowY = ((max - c.low) / range) * h;
                const openY = ((max - c.open) / range) * h;
                const closeY = ((max - c.close) / range) * h;
                const bodyTop = Math.min(openY, closeY);
                const bodyH = Math.max(Math.abs(openY - closeY), 1);
                return (
                    <g key={i}>
                        <line x1={x} x2={x} y1={highY} y2={lowY} stroke={color} strokeWidth={1} />
                        <rect x={x - candleWidth / 2} y={bodyTop} width={candleWidth} height={bodyH} fill={isGreen ? "#22c55e" : "#ef4444"} rx={1} />
                    </g>
                );
            })}
            {/* Trade markers */}
            {trades.map((t, i) => {
                const relIndex = t.index - (currentIndex > 50 ? currentIndex - 50 : 0);
                if (relIndex < 0 || relIndex >= visible.length) return null;
                const x = relIndex * (w / visible.length) + candleWidth / 2;
                const y = ((max - t.entry) / range) * h;
                return (
                    <g key={i}>
                        <circle cx={x} cy={y} r={5} fill={t.dir === "BUY" ? "#22c55e" : "#ef4444"} />
                        <text x={x + 7} y={y + 4} fill={t.dir === "BUY" ? "#22c55e" : "#ef4444"} fontSize={9}>{t.dir}</text>
                    </g>
                );
            })}
            {/* Current price line */}
            {visible.length > 0 && (() => {
                const last = visible[visible.length - 1];
                const y = ((max - last.close) / range) * h;
                return (
                    <>
                        <line x1={0} x2={w} y1={y} y2={y} stroke="#22c55e" strokeDasharray="3 3" strokeWidth={1} opacity={0.5} />
                        <rect x={w - 68} y={y - 8} width={64} height={16} fill="#22c55e" rx={3} />
                        <text x={w - 36} y={y + 5} fill="black" fontSize={9} fontWeight="bold" textAnchor="middle">{last.close.toFixed(4)}</text>
                    </>
                );
            })()}
        </svg>
    );
}

export default function BacktesterPage() {
    const [currentIndex, setCurrentIndex] = useState(50);
    const [playing, setPlaying] = useState(false);
    const [placedTrades, setPlacedTrades] = useState<{ index: number, dir: string, entry: number, outcome?: string, pips?: number }[]>([]);
    const [selectedPair, setSelectedPair] = useState("EUR/USD");
    const [speed, setSpeed] = useState(1);

    useEffect(() => {
        if (!playing) return;
        const interval = setInterval(() => {
            setCurrentIndex(ci => {
                if (ci >= allCandles.length - 1) { setPlaying(false); return ci; }
                return ci + 1;
            });
        }, 400 / speed);
        return () => clearInterval(interval);
    }, [playing, speed]);

    const addTrade = (dir: string) => {
        const entry = allCandles[currentIndex]?.close;
        if (!entry) return;
        setPlacedTrades(t => [...t, { index: currentIndex, dir, entry }]);
    };

    const stats = {
        wins: placedTrades.filter(t => t.outcome === "WIN").length,
        losses: placedTrades.filter(t => t.outcome === "LOSS").length,
        total: placedTrades.length,
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="mb-8">
                <div className="flex items-center gap-2 text-purple-400 text-sm font-medium mb-3">
                    <BarChart2 size={14} />
                    <span>Historical Data Practice</span>
                </div>
                <h1 className="text-4xl font-bold font-display mb-2">Strategy <span className="text-gradient">Backtester</span></h1>
                <p className="text-white/50">Step through historical price action and test your strategy without risking real money.</p>
            </div>

            {/* Controls */}
            <div className="glass rounded-xl px-4 py-3 mb-4 flex flex-wrap items-center gap-4">
                {/* Pair */}
                <select value={selectedPair} onChange={e => setSelectedPair(e.target.value)} className="px-3 py-1.5 glass rounded-lg text-sm text-white border-0 focus:outline-none bg-transparent">
                    {["EUR/USD", "GBP/USD", "USD/JPY", "GBP/JPY", "AUD/USD"].map(p => <option key={p}>{p}</option>)}
                </select>

                {/* Timeframe */}
                <div className="flex gap-1">
                    {["M1", "M5", "M15", "H1", "H4", "D1"].map(tf => (
                        <button key={tf} className={`px-2 py-1 rounded text-xs font-mono font-medium transition-all ${tf === "H1" ? "bg-purple-500/20 text-purple-400" : "glass text-white/40 hover:text-white"}`}>{tf}</button>
                    ))}
                </div>

                {/* Speed */}
                <div className="flex items-center gap-2">
                    <span className="text-xs text-white/40">Speed:</span>
                    {[1, 5, 10, 50].map(s => (
                        <button key={s} onClick={() => setSpeed(s)} className={`px-2 py-1 rounded text-xs font-mono transition-all ${speed === s ? "bg-green-500/20 text-green-400" : "glass text-white/40 hover:text-white"}`}>{s}x</button>
                    ))}
                </div>

                <div className="ml-auto flex items-center gap-2">
                    <button onClick={() => setPlaying(!playing)} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${playing ? "bg-yellow-500/20 text-yellow-400" : "bg-green-500/20 text-green-400"}`}>
                        {playing ? <Pause size={14} /> : <Play size={14} />}
                        {playing ? "Pause" : "Play"}
                    </button>
                    <button onClick={() => setCurrentIndex(ci => Math.min(ci + 1, allCandles.length - 1))} className="flex items-center gap-1 px-3 py-1.5 glass rounded-lg text-sm text-white/60 hover:text-white">
                        <SkipForward size={14} />+1
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-4 gap-4">
                {/* Chart */}
                <div className="lg:col-span-3">
                    <div className="glass rounded-2xl p-2 mb-3">
                        <CandleChart candles={allCandles} currentIndex={currentIndex} trades={placedTrades} />
                    </div>

                    {/* Trade buttons */}
                    <div className="flex items-center gap-3">
                        <button onClick={() => addTrade("BUY")} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-green-500/20 text-green-400 border border-green-500/20 font-semibold hover:bg-green-500/30 transition-all">
                            <TrendingUp size={16} />
                            BUY at {allCandles[currentIndex]?.close.toFixed(4)}
                        </button>
                        <button onClick={() => addTrade("SELL")} className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500/20 text-red-400 border border-red-500/20 font-semibold hover:bg-red-500/30 transition-all">
                            <TrendingDown size={16} />
                            SELL at {allCandles[currentIndex]?.close.toFixed(4)}
                        </button>
                        <div className="text-xs text-white/35 ml-auto">
                            Bar {currentIndex + 1} / {allCandles.length}
                        </div>
                    </div>
                </div>

                {/* Session Panel */}
                <div className="space-y-4">
                    {/* Session stats */}
                    <div className="glass rounded-xl p-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">Session Results</h3>
                        <div className="space-y-2">
                            {[
                                { label: "Total Trades", value: stats.total, color: "text-white/80" },
                                { label: "Wins", value: stats.wins, color: "text-green-400" },
                                { label: "Losses", value: stats.losses, color: "text-red-400" },
                                { label: "Win Rate", value: stats.total ? `${Math.round((stats.wins / stats.total) * 100)}%` : "—", color: "text-yellow-400" },
                            ].map(({ label, value, color }) => (
                                <div key={label} className="flex justify-between">
                                    <span className="text-xs text-white/40">{label}</span>
                                    <span className={`text-sm font-bold ${color}`}>{value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Placed trades */}
                    <div className="glass rounded-xl p-4">
                        <h3 className="text-xs font-semibold uppercase tracking-wider text-white/30 mb-3">My Trades</h3>
                        {placedTrades.length === 0 ? (
                            <div className="text-xs text-white/25 text-center py-4">No trades yet — click BUY or SELL to start</div>
                        ) : (
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {placedTrades.map((t, i) => (
                                    <div key={i} className="flex items-center gap-2 text-xs">
                                        <span className={`font-bold w-8 ${t.dir === "BUY" ? "text-green-400" : "text-red-400"}`}>{t.dir}</span>
                                        <span className="font-mono text-white/60">{t.entry.toFixed(4)}</span>
                                        <span className="text-white/30">bar {t.index + 1}</span>
                                        <button onClick={() => setPlacedTrades(ts => ts.filter((_, ii) => ii !== i))} className="ml-auto text-white/20 hover:text-red-400 transition-colors">
                                            <X size={11} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Tips */}
                    <div className="glass-brand rounded-xl p-4">
                        <div className="text-xs font-semibold text-green-400 mb-2">💡 Pro Tip</div>
                        <p className="text-xs text-white/50">Pause the replay, identify your entry signal, then unpause to see if the pattern played out. This builds muscle memory for live trading.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
