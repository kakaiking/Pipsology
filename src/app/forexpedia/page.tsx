"use client";
import { useState } from "react";
import { Search, BookOpen, ChevronRight, Zap } from "lucide-react";
import { glossaryTerms } from "@/lib/data";

const categories = ["All", "Basics", "Technical Analysis", "Indicators", "Risk Management", "Trading Costs", "Account"];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function ForexpediaPage() {
    const [search, setSearch] = useState("");
    const [activeCategory, setActiveCategory] = useState("All");
    const [activeLetter, setActiveLetter] = useState<string | null>(null);

    const filtered = glossaryTerms.filter(t => {
        const matchSearch = t.term.toLowerCase().includes(search.toLowerCase()) || t.definition.toLowerCase().includes(search.toLowerCase());
        const matchCat = activeCategory === "All" || t.category === activeCategory;
        const matchLetter = !activeLetter || t.term[0].toUpperCase() === activeLetter;
        return matchSearch && matchCat && matchLetter;
    });

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            {/* Header */}
            <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-2 text-green-400 text-sm font-medium mb-3">
                    <BookOpen size={14} />
                    <span>Reference Library</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold font-display mb-3">
                    <span className="text-gradient">Forexpedia</span>
                </h1>
                <p className="text-white/50 max-w-lg mx-auto">Your complete forex & trading glossary. Find definitions for every term you encounter in the markets.</p>
            </div>

            {/* Term + Topic of Day */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
                <div className="glass-brand rounded-xl p-5">
                    <div className="text-xs text-green-400 font-semibold uppercase tracking-wider mb-2">📖 Term of the Day</div>
                    <h3 className="text-xl font-bold text-white mb-2">Fibonacci</h3>
                    <p className="text-sm text-white/60 leading-relaxed">Retracement levels derived from the Fibonacci sequence (23.6%, 38.2%, 61.8%) used to identify potential support and resistance zones during price pullbacks.</p>
                    <button className="mt-3 text-xs text-green-400 hover:text-green-300">Read full definition →</button>
                </div>
                <div className="glass rounded-xl p-5">
                    <div className="text-xs text-white/40 font-semibold uppercase tracking-wider mb-2">🗂 Topic of the Day</div>
                    <h3 className="text-xl font-bold text-white mb-2">Technical Analysis</h3>
                    <p className="text-sm text-white/60 leading-relaxed">Explore all terms related to chart analysis, indicators, patterns, and price action — from candlesticks to Elliott Wave theory.</p>
                    <button className="mt-3 text-xs text-green-400 hover:text-green-300">Browse topic →</button>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                <input
                    value={search}
                    onChange={e => { setSearch(e.target.value); setActiveLetter(null); }}
                    placeholder="Search 200+ terms... (e.g., 'pip', 'leverage', 'RSI')"
                    className="w-full pl-10 pr-4 py-3.5 glass rounded-xl text-sm text-white placeholder-white/25 border border-white/5 focus:border-green-500/30 focus:outline-none transition-all bg-transparent"
                />
            </div>

            {/* Alphabet filter */}
            <div className="flex flex-wrap gap-1 mb-6">
                {alphabet.map(l => (
                    <button
                        key={l}
                        onClick={() => { setActiveLetter(activeLetter === l ? null : l); setSearch(""); }}
                        className={`w-7 h-7 rounded text-xs font-mono font-medium transition-all ${activeLetter === l ? "bg-green-500 text-black" : "glass text-white/40 hover:text-white hover:bg-white/8"}`}
                    >
                        {l}
                    </button>
                ))}
            </div>

            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${activeCategory === cat ? "bg-green-500/20 text-green-400 border border-green-500/30" : "glass text-white/50 hover:text-white"}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Results */}
            <div className="space-y-3">
                {filtered.length === 0 ? (
                    <div className="text-center py-16 text-white/30">
                        <div className="text-4xl mb-3">🔍</div>
                        <p>No terms found for &quot;{search}&quot;</p>
                    </div>
                ) : filtered.map((t) => (
                    <div key={t.slug} className="glass rounded-xl p-5 card-hover group cursor-pointer">
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                    <h3 className="font-bold text-white group-hover:text-green-400 transition-colors">{t.term}</h3>
                                    <span className="badge-blue text-xs px-2 py-0.5 rounded-full">{t.category}</span>
                                </div>
                                <p className="text-sm text-white/55 leading-relaxed">{t.definition}</p>
                            </div>
                            <ChevronRight size={16} className="text-white/20 group-hover:text-green-400 shrink-0 mt-1 transition-colors" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Showing count */}
            {filtered.length > 0 && (
                <div className="mt-6 text-center text-xs text-white/30">
                    Showing {filtered.length} of {glossaryTerms.length} terms
                </div>
            )}

            {/* Link to crypto glossary */}
            <div className="mt-8 glass rounded-xl p-5 flex items-center justify-between">
                <div>
                    <div className="font-semibold text-sm text-white mb-1">Looking for crypto terms?</div>
                    <div className="text-xs text-white/40">Explore Decryptopedia™ — our dedicated crypto glossary</div>
                </div>
                <a href="/crypto" className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20 text-sm font-medium hover:bg-orange-500/15 transition-all">
                    <Zap size={13} />
                    Decryptopedia
                </a>
            </div>
        </div>
    );
}
