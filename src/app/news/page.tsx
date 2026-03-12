import Link from "next/link";
import { TrendingUp, ArrowRight, Filter } from "lucide-react";
import { latestArticles } from "@/lib/data";

const tagColors: Record<string, string> = {
    "chart-art": "badge-blue", "event-guide": "badge-purple", "crypto": "badge-orange",
    "watchlist": "badge-gold", "macro": "badge-red", "psychology": "badge-green",
};

const categories = ["All", "Recap", "Events", "Chart Art", "Analysis", "Psychology", "Crypto"];

function ArticleCard({ article }: { article: typeof latestArticles[0] }) {
    return (
        <Link href={`/trading/${article.slug}`} className="flex gap-4 glass rounded-xl p-4 card-hover group">
            <div className="w-20 h-16 sm:w-28 sm:h-20 rounded-lg bg-gradient-to-br from-[#1e2d24] to-[#111a16] shrink-0 flex items-center justify-center">
                <TrendingUp size={18} className="text-green-400/30" />
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${tagColors[article.tag] || "badge-green"}`}>{article.category}</span>
                    <span className="text-xs text-white/30">{article.date} · {article.readTime}</span>
                </div>
                <h3 className="text-sm font-semibold text-white/90 group-hover:text-green-400 transition-colors line-clamp-2">{article.title}</h3>
                <p className="text-xs text-white/40 mt-1 line-clamp-2">{article.excerpt}</p>
            </div>
        </Link>
    );
}

export default function NewsPage() {
    const allArticles = [...latestArticles, ...latestArticles.map(a => ({ ...a, id: a.id + 100 }))];

    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-orange-400 text-sm font-medium mb-3">
                        <TrendingUp size={14} />
                        <span>Market Intelligence</span>
                    </div>
                    <h1 className="text-4xl font-bold font-display mb-2">Market <span className="text-gradient">News</span></h1>
                    <p className="text-white/50">Daily forex & crypto coverage from the Pipsology editorial team.</p>
                </div>
                <div className="flex items-center gap-1.5 glass-brand px-3 py-1.5 rounded-full text-xs text-green-400">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    Updated {new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </div>
            </div>

            {/* Category tabs */}
            <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                <Filter size={13} className="text-white/30 shrink-0" />
                {categories.map(cat => (
                    <button key={cat} className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${cat === "All" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "glass text-white/50 hover:text-white"}`}>
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Main feed */}
                <div className="lg:col-span-2 space-y-4">
                    {allArticles.map((a) => <ArticleCard key={a.id} article={a} />)}
                    <button className="w-full py-3 glass rounded-xl text-sm text-white/50 hover:text-white transition-all">
                        Load More Articles
                    </button>
                </div>

                {/* Sidebar */}
                <div className="space-y-5">
                    {/* Most Read */}
                    <div className="glass rounded-xl p-5">
                        <h3 className="font-semibold text-sm mb-4">Most Read This Week</h3>
                        <div className="space-y-3">
                            {latestArticles.slice(0, 5).map((a, i) => (
                                <Link key={a.id} href={`/news/${a.slug}`} className="flex items-start gap-3 group">
                                    <span className="text-2xl font-bold font-display text-white/10 leading-none shrink-0 w-6">{i + 1}</span>
                                    <span className="text-xs text-white/60 group-hover:text-green-400 transition-colors line-clamp-2">{a.title}</span>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="glass rounded-xl p-5">
                        <h3 className="font-semibold text-sm mb-4">Popular Topics</h3>
                        <div className="flex flex-wrap gap-2">
                            {["EUR/USD", "GBP/JPY", "Bitcoin", "NFP", "Fed Policy", "Gold", "Oil", "CPI", "ECB", "Bank of Japan"].map(tag => (
                                <button key={tag} className="px-2.5 py-1 glass rounded-full text-xs text-white/50 hover:text-green-400 hover:border-green-500/20 transition-all">
                                    #{tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="glass-brand rounded-xl p-5">
                        <div className="text-xl mb-2">📬</div>
                        <h3 className="font-semibold text-sm mb-1.5">Daily Market Digest</h3>
                        <p className="text-xs text-white/50 mb-3">Get the day&apos;s top 5 market stories in your inbox every morning.</p>
                        <input placeholder="your@email.com" className="w-full px-3 py-2 glass rounded-lg text-xs text-white placeholder-white/25 mb-2 border border-white/5 focus:border-green-500/30 focus:outline-none bg-transparent" />
                        <button className="w-full py-2 rounded-lg bg-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/25 transition-all">Subscribe Free</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
