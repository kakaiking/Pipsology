import Link from "next/link";
import { Star, Shield, ChevronRight, Check } from "lucide-react";
import { brokers } from "@/lib/data";

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map(i => (
                <Star key={i} size={12} className={i <= Math.round(rating) ? "text-yellow-400 fill-yellow-400" : "text-white/15"} />
            ))}
            <span className="text-sm font-bold text-white/90 ml-1">{rating}</span>
        </div>
    );
}

export default function BrokersPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="mb-8">
                <div className="flex items-center gap-2 text-cyan-400 text-sm font-medium mb-3">
                    <Shield size={14} />
                    <span>Independent Reviews</span>
                </div>
                <h1 className="text-4xl font-bold font-display mb-2">Broker <span className="text-gradient">Reviews</span></h1>
                <p className="text-white/50">Unbiased, community-driven reviews. Find the right broker for your trading style.</p>
            </div>

            {/* Filter bar */}
            <div className="glass rounded-xl px-4 py-3 mb-6 flex flex-wrap gap-3 items-center">
                <span className="text-xs text-white/40">Filter:</span>
                {["All", "ECN/STP", "Market Maker", "US Clients", "Low Min Deposit", "Best Spreads", "MT4", "MT5", "cTrader"].map((f, i) => (
                    <button key={f} className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${i === 0 ? "bg-green-500/20 text-green-400 border border-green-500/30" : "glass text-white/50 hover:text-white"}`}>{f}</button>
                ))}
            </div>

            {/* Broker cards */}
            <div className="space-y-4 mb-10">
                {brokers.map((broker, i) => (
                    <div key={broker.id} className="glass rounded-2xl p-5 card-hover">
                        {/* Rank badge */}
                        {i < 3 && (
                            <div className="float-right ml-4">
                                <span className={`text-xs font-bold px-2 py-1 rounded-full ${i === 0 ? "badge-gold" : i === 1 ? "badge-blue" : "badge-green"}`}>
                                    #{i + 1} Top Rated
                                </span>
                            </div>
                        )}

                        <div className="flex items-start gap-4">
                            {/* Logo */}
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#1e3a2e] to-[#0d1411] border border-green-500/10 flex items-center justify-center font-bold text-green-400 text-sm shrink-0">
                                {broker.logo}
                            </div>

                            <div className="flex-1">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-bold text-white text-lg">{broker.name}</h3>
                                        <StarRating rating={broker.rating} />
                                        <div className="text-xs text-white/35 mt-1">{broker.reviews} community reviews · {broker.type}</div>
                                    </div>
                                </div>

                                {/* Stats grid */}
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3 mb-3">
                                    {[
                                        { label: "Min Deposit", value: broker.minDeposit },
                                        { label: "Regulation", value: broker.regulation.split(",")[0] },
                                        { label: "Spread From", value: broker.spread },
                                        { label: "Platform", value: broker.platform.split(",")[0] },
                                    ].map(({ label, value }) => (
                                        <div key={label} className="glass rounded-lg px-3 py-2">
                                            <div className="text-xs text-white/35">{label}</div>
                                            <div className="text-xs font-semibold text-white/80 mt-0.5">{value}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pros */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {broker.pros.map(p => (
                                        <span key={p} className="flex items-center gap-1 text-xs text-green-400/80">
                                            <Check size={10} /> {p}
                                        </span>
                                    ))}
                                </div>

                                {/* CTAs */}
                                <div className="flex gap-2">
                                    <Link href={`/brokers/${broker.slug}`} className="flex items-center gap-1.5 px-4 py-2 glass rounded-xl text-xs font-medium text-white/70 hover:text-white transition-all">
                                        Full Review <ChevronRight size={12} />
                                    </Link>
                                    <button className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-green-500/15 text-green-400 border border-green-500/20 hover:bg-green-500/20 transition-all">
                                        Open Account ↗
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Comparison tool */}
            <div className="glass rounded-2xl p-6 mb-8">
                <h2 className="font-bold text-white mb-1">🔀 Compare Brokers Side-by-Side</h2>
                <p className="text-xs text-white/45 mb-4">Select up to 3 brokers to compare across all key metrics</p>
                <div className="grid md:grid-cols-3 gap-4">
                    {["Broker 1", "Broker 2", "Broker 3"].map((slot) => (
                        <select key={slot} className="w-full px-3 py-2.5 glass rounded-xl text-sm text-white/60 border border-white/5 focus:outline-none bg-[#0d1411]">
                            <option>{slot} — Select</option>
                            {brokers.map(b => <option key={b.id}>{b.name}</option>)}
                        </select>
                    ))}
                </div>
                <button className="mt-4 px-5 py-2.5 rounded-xl bg-green-500/15 text-green-400 text-sm font-semibold border border-green-500/20 hover:bg-green-500/20 transition-all">
                    Compare Now →
                </button>
            </div>

            {/* Disclaimer */}
            <div className="glass rounded-xl p-4 text-xs text-white/35 leading-relaxed">
                ⚠️ <strong className="text-white/50">Disclaimer:</strong> Broker reviews are provided for educational purposes only. PipForge may earn affiliate commissions from broker links. Always conduct your own due diligence before opening an account. Trading involves significant risk of loss.
            </div>
        </div>
    );
}
