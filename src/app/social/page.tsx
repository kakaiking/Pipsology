import Link from "next/link";
import { Heart, MessageSquare, Share2, TrendingUp, TrendingDown, Check, Star, Users } from "lucide-react";
import { socialPosts } from "@/lib/data";

function IdeaCard({ post }: { post: typeof socialPosts[0] }) {
    const dir = post.direction;
    return (
        <div className="glass rounded-2xl p-5 card-hover">
            {/* Author */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-600/30 flex items-center justify-center text-xs font-bold text-green-400">
                        {post.avatar}
                    </div>
                    <div>
                        <div className="flex items-center gap-1.5 text-sm font-semibold text-white/90">
                            {post.author}
                            {post.verified && <Check size={12} className="text-blue-400 bg-blue-400/20 rounded-full p-0.5" />}
                        </div>
                        <div className="text-xs text-white/35">{post.handle} · {post.time}</div>
                    </div>
                </div>
                {/* Outcome badge */}
                {post.outcome === "win" && <span className="badge-green text-xs px-2 py-0.5 rounded-full">✅ Won</span>}
                {post.outcome === "active" && <span className="badge-blue text-xs px-2 py-0.5 rounded-full animate-pulse-green">▪ Active</span>}
            </div>

            {/* Trade Setup */}
            <div className={`flex items-center gap-3 glass rounded-xl p-3 mb-3 border ${dir === "BUY" ? "border-green-500/15" : "border-red-500/15"}`}>
                <div className={`flex items-center gap-1.5 font-bold text-sm ${dir === "BUY" ? "text-green-400" : "text-red-400"}`}>
                    {dir === "BUY" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    {dir} {post.pair}
                </div>
                <div className="flex gap-3 ml-auto text-xs font-mono text-white/50">
                    <span>Entry: <span className="text-white/80">{post.entry}</span></span>
                    <span>SL: <span className="text-red-400">{post.sl}</span></span>
                    <span>TP: <span className="text-green-400">{post.tp}</span></span>
                </div>
            </div>

            {/* Chart placeholder */}
            <div className="h-32 rounded-xl bg-gradient-to-br from-[#1e2d24] to-[#0d1411] mb-3 flex items-center justify-center">
                <div className="text-center">
                    <TrendingUp size={28} className="text-green-400/20 mx-auto mb-1" />
                    <span className="text-xs text-white/20">Chart Analysis</span>
                </div>
            </div>

            <p className="text-sm text-white/65 leading-relaxed mb-4">{post.content}</p>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-3 border-t border-white/5">
                <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-red-400 transition-colors">
                    <Heart size={14} />{post.likes}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-blue-400 transition-colors">
                    <MessageSquare size={14} />{post.comments}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-white/40 hover:text-green-400 transition-colors ml-auto">
                    <Share2 size={14} />Copy Setup
                </button>
            </div>
        </div>
    );
}

const leaderboard = [
    { rank: 1, name: "FXProTrader", winRate: "74%", ideas: 127, followers: "8.4K", avatar: "FP", verified: true },
    { rank: 2, name: "CryptoKingdom", winRate: "68%", ideas: 84, followers: "5.1K", avatar: "CK", verified: false },
    { rank: 3, name: "SwingMaster_R", winRate: "65%", ideas: 56, followers: "3.2K", avatar: "SM", verified: true },
    { rank: 4, name: "PipSniper99", winRate: "62%", ideas: 43, followers: "1.9K", avatar: "PS", verified: false },
    { rank: 5, name: "MacroMike_FX", winRate: "61%", ideas: 38, followers: "1.5K", avatar: "MM", verified: false },
];

export default function SocialPage() {
    return (
        <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                <div>
                    <div className="flex items-center gap-2 text-orange-400 text-sm font-medium mb-3">
                        <Users size={14} />
                        <span>Trading Community</span>
                    </div>
                    <h1 className="text-4xl font-bold font-display mb-2">Social <span className="text-gradient">Trade Ideas</span></h1>
                    <p className="text-white/50">Follow top traders, share setups, and see real outcomes on every idea.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-black font-semibold text-sm hover:shadow-lg transition-all">
                    <TrendingUp size={16} />
                    Post an Idea
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Feed */}
                <div className="lg:col-span-2 space-y-5">
                    {/* Tabs */}
                    <div className="flex gap-2">
                        {["All Ideas", "Following", "EUR/USD", "Bitcoin", "GBP pairs"].map((t, i) => (
                            <button key={t} className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${i === 0 ? "bg-green-500/20 text-green-400 border border-green-500/30" : "glass text-white/50 hover:text-white"}`}>{t}</button>
                        ))}
                    </div>
                    {socialPosts.map(post => <IdeaCard key={post.id} post={post} />)}
                </div>

                {/* Sidebar */}
                <div className="space-y-5">
                    {/* Leaderboard */}
                    <div className="glass rounded-2xl p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-semibold text-sm flex items-center gap-2"><Star size={14} className="text-yellow-400" /> Top Traders</h3>
                            <span className="text-xs text-white/30">This Month</span>
                        </div>
                        <div className="space-y-3">
                            {leaderboard.map(trader => (
                                <div key={trader.rank} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-0">
                                    <span className={`text-sm font-bold w-4 shrink-0 ${trader.rank === 1 ? "text-yellow-400" : trader.rank === 2 ? "text-white/60" : "text-white/30"}`}>
                                        {trader.rank === 1 ? "🥇" : trader.rank === 2 ? "🥈" : trader.rank === 3 ? "🥉" : trader.rank}
                                    </span>
                                    <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-400 shrink-0">{trader.avatar}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-semibold text-white/80 truncate">{trader.name}</div>
                                        <div className="text-xs text-white/35">{trader.ideas} ideas · {trader.followers} followers</div>
                                    </div>
                                    <div className="text-xs font-bold text-green-400 shrink-0">{trader.winRate}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Hot pairs */}
                    <div className="glass rounded-xl p-5">
                        <h3 className="font-semibold text-sm mb-3">Trending Pairs</h3>
                        <div className="space-y-2">
                            {[
                                { pair: "EUR/USD", ideas: 47, trend: "BEARISH" },
                                { pair: "BTC/USD", ideas: 38, trend: "BULLISH" },
                                { pair: "GBP/JPY", ideas: 31, trend: "BULLISH" },
                                { pair: "XAU/USD", ideas: 22, trend: "NEUTRAL" },
                            ].map(t => (
                                <div key={t.pair} className="flex items-center justify-between py-1.5">
                                    <span className="text-sm font-mono font-medium text-white/80">{t.pair}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-xs text-white/35">{t.ideas} ideas</span>
                                        <span className={`text-xs font-semibold ${t.trend === "BULLISH" ? "text-green-400" : t.trend === "BEARISH" ? "text-red-400" : "text-yellow-400"}`}>{t.trend}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Follow CTA */}
                    <div className="glass-brand rounded-xl p-5 text-center">
                        <div className="text-2xl mb-2">🌐</div>
                        <h3 className="font-semibold text-sm mb-1">Build Your Reputation</h3>
                        <p className="text-xs text-white/45 mb-3">Post ideas, get followers, earn the Verified Analyst badge by maintaining a 60%+ win rate.</p>
                        <Link href="/account/signup" className="block py-2 rounded-lg bg-green-500/15 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-all">Join the Community →</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
